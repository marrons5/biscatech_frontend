import { config } from "@/config";
import { logger } from "@/utils/logger";

type ApiErrorDetails = Record <string, unknown>;
type HTTPMethod = "GET" | "POST" | "PUT" | "PATCH" | "DELETE";

type ApiRequestOptions = Omit<RequestInit, "body" | "headers"> & {
    headers?: Record<string, string>;
    body?: BodyInit | Record<string, unknown> | FormData | URLSearchParams | null;
};

interface APIErrorResponse {
    message?: string;
    status?: number;
    code?: string;
    details?: ApiErrorDetails;
};

class ApiError extends Error {
    status?: number;
    code?: string;
    details?: ApiErrorDetails;

    constructor(
        message: string,
        status?: number,
        code?: string,
        details?: ApiErrorDetails,
    ) {
        super(message);
        this.name = "ApiError";
        this.status = status;
        this.code = code;
        this.details = details;
    }
}

class ApiClient {
    private baseURL: string;
    private timeout: number;
    private isRefreshing = false;
    private refreshSubscribers: Array<(token: string) => void> = [];

    constructor() {
        this.baseURL = String(config.apiURL ?? "");
        this.timeout = 120_000;
        logger.debug("ApiClient", "init", { baseURL: this.baseURL });
    }

    private onRefreshed(token: string) {
        this.refreshSubscribers.forEach((cb) => cb(token));
        this.refreshSubscribers = [];
    }

    private addRefreshSubscriber(cb: (token: string) => void) {
        this.refreshSubscribers.push(cb);
    }

    getAuthToken(): string | null {
        const token = localStorage.getItem("auth_token");
        const expiry = localStorage.getItem("auth_token_exp");

        if (expiry && Date.now() > parseInt(expiry, 10)) {
            this.clearAuthToken();
            return null;
        }

        return token;
    }

    clearAuthToken(): void {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_exp");
        localStorage.removeItem("auth_refresh_token");
    }

    private setAuthToken(token: string): void {
        const expiresInMs = 15 * 60 * 1000;
        localStorage.setItem("auth_token", token);
        localStorage.setItem("auth_token_exp", String(Date.now() + expiresInMs));
    }

    private setRefreshToken(token: string): void {
        localStorage.setItem("auth_refresh_token", token);
    }

    private getRefreshToken(): string | null {
        return localStorage.getItem("auth_refresh_token");
    }

    private createHeaders(
        customHeaders: Record<string, string> = {}
    ): Record<string, string> {
        const headers: Record<string, string> = {
            "Content-Type": "application/json",
            Accept: "application/json",
            ...customHeaders,
        };

        const token = this.getAuthToken();
        if (token) {
            headers.Authorization = `Bearer ${token}`;
        }

        return headers;
    }

    private async tryRefreshToken(): Promise<string | null> {
        const refreshToken = this.getRefreshToken();
        if (!refreshToken) return null;

        logger.debug("ApiClient", "refreshing token");
        try {
            const { data } = await fetch(`${this.baseURL}/api/v1/auth/refresh`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ refreshToken }),
            }).then((r) => r.json());

            if (data?.token) {
                this.setAuthToken(data.token);
                if (data.refreshToken) {
                    this.setRefreshToken(data.refreshToken);
                }
                logger.info("ApiClient", "token refreshed");
                return data.token;
            }
            logger.warn("ApiClient", "refresh returned no token");
            return null;
        } catch (err) {
            logger.error("ApiClient", "refresh failed", err);
            this.clearAuthToken();
            return null;
        }
    }

    private createAbortController(): AbortController {
        const controller = new AbortController;
        const timeoutId = setTimeout(() => controller.abort(), this.timeout);
        controller.signal.addEventListener("abort", () => clearTimeout(timeoutId));
        return controller;
    }

    private async request<T>(
        endpoint: string,
        options: ApiRequestOptions = {},
    ): Promise<{ data: T; status: number }> {
        const controller = this.createAbortController();
        const headers = this.createHeaders(options.headers ?? {});

        let body: BodyInit | null | undefined = null;
        if (options.body === null) {
            body = null;
        } else if (
            typeof options.body === "string" ||
            options.body instanceof FormData ||
            options.body instanceof URLSearchParams ||
            options.body instanceof Blob ||
            options.body instanceof ArrayBuffer
        ) {
            body = options.body as BodyInit;
        } else if (typeof options.body === "object" && options.body !== undefined) {
            body = JSON.stringify(options.body as Record<string, unknown>);
        } else {
            body = undefined;
        }

        const requestConfig: RequestInit = {
            method: (options.method ?? "GET") as HTTPMethod,
            headers,
            signal: controller.signal,
            credentials: options.credentials,
            cache: options.cache,
            redirect: options.redirect,
            referrer: options.referrer,
            referrerPolicy: options.referrerPolicy,
            integrity: options.integrity,
            keepalive: options.keepalive,
            mode: options.mode,
            window: options.window,
            body,
        };

        const url = `${this.baseURL}${endpoint}`;
        const start = Date.now();
        logger.debug("ApiClient", `→ ${options.method ?? "GET"} ${url}`);
        const response = await fetch(url, requestConfig);
        const dur = Date.now() - start;

        if (response.status === 401 && this.getRefreshToken()) {
            if (!this.isRefreshing) {
                this.isRefreshing = true;
                const newToken = await this.tryRefreshToken();
                this.isRefreshing = false;

                if (newToken) {
                    this.onRefreshed(newToken);
                    headers.Authorization = `Bearer ${newToken}`;
                    requestConfig.headers = headers;
                    const retryResponse = await fetch(url, requestConfig);
                    const contentType = retryResponse.headers.get("content-type");
                    const retryData = contentType?.includes("application/json")
                        ? await retryResponse.json()
                        : await retryResponse.text();
                    logger.info("ApiClient", `← ${retryResponse.status} ${url} (${Date.now() - start}ms)`);
                    return { data: retryData, status: retryResponse.status };
                }

                this.clearAuthToken();
            } else {
                return new Promise((resolve) => {
                    this.addRefreshSubscriber((newToken: string) => {
                        headers.Authorization = `Bearer ${newToken}`;
                        requestConfig.headers = headers;
                        fetch(url, requestConfig).then((retryResponse) => {
                            retryResponse.json().then((retryData) => {
                                resolve({ data: retryData, status: retryResponse.status });
                            });
                        });
                    });
                });
            }
        }

        const contentType = response.headers.get("content-type");
        const data = contentType?.includes("application/json")
            ? await response.json()
            : await response.text();

        logger.debug("ApiClient", `← ${response.status} ${url} (${Date.now() - start}ms)`);
        return { data, status: response.status };
    }

    async getBlob(
        endpoint: string,
        params: Record<string, string | number | boolean> = {},
    ): Promise<Blob> {
        const searchParams = new URLSearchParams(
            Object.entries(params).reduce<Record<string, string>>((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
            }, {}),
        );

        const url = searchParams.toString()
            ? `${endpoint}?${searchParams.toString()}`
            : endpoint;

        const controller = this.createAbortController();
        const headers = this.createHeaders();

        const response = await fetch(`${this.baseURL}${url}`, {
            method: "GET",
            headers,
            signal: controller.signal,
        });

        if (!response.ok) {
            throw new ApiError(`HTTP Error: ${response.status}`, response.status);
        }

        return await response.blob();
    }

    async post<T = unknown>(
        endpoint: string,
        data: Record<string, unknown> | FormData | URLSearchParams = {},
    ): Promise<{ data: T; status: number }> {
        return this.request<T>(endpoint, {
            method: "POST",
            body: data,
        });
    }

    async get<T>(
        endpoint: string,
        params: Record<string, string | number | boolean> = {},
    ): Promise<{ data: T; status: number }> {
        const searchParams = new URLSearchParams(
            Object.entries(params).reduce<Record<string, string>>((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
            }, {}),
        );

        const url = searchParams.toString()
            ? `${endpoint}?${searchParams.toString()}`
            : endpoint;

        return this.request<T>(url, { method: "GET" });
    }

    async patch<T = unknown>(
        endpoint: string,
        data: Record<string, unknown> | FormData | URLSearchParams = {},
    ): Promise<{ data: T; status: number }> {
        return this.request<T>(endpoint, { method: "PATCH", body: data });
    }

    async put<T = unknown>(
        endpoint: string,
        data: Record<string, unknown> | FormData | URLSearchParams = {},
    ): Promise<{ data: T; status: number }> {
        return this.request<T>(endpoint, { method: "PUT", body: data });
    }

    async delete<T = unknown>(
        endpoint: string,
    ): Promise<{ data: T; status: number }> {
        return this.request<T>(endpoint, { method: "DELETE" });
    }
}

const apiClient = new ApiClient();

export default apiClient;
export { ApiError };
export type { ApiErrorDetails, APIErrorResponse };
