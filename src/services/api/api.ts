function getToken() {
    const token = localStorage.getItem("auth_token");
    const expiry = localStorage.getItem("auth_token_exp");

    if (expiry && Date.now() > parseInt(expiry, 10)) {
        localStorage.removeItem("auth_token");
        localStorage.removeItem("auth_token_exp")
    }

    return token;
}

export async function api<T>(
    endpoint: string,
    options: RequestInit = {},
): Promise<T> {
    const token = getToken();

    const res = await fetch(`${endpoint}`, {
        ...options,
        headers: {
            "Content-Type": "application/json",
            ...(token && { Authorization: `Bearer ${token}`}),
            ...options.headers,
        },
    });

    if(!res.ok) {
        const contentType = res.headers.get("content-type");
        let error: { message?: string; statusCode?: number } = {};

        if (contentType?.includes("application/json")) {
            error = await res.json().catch(() => ({}));
        }

        throw {
            message: error.message || `Erro ${res.status}: ${res.statusText}`,
            status: res.status,
        };
    }

    return res.json();
}

export const get = <T>(endPoint: string): Promise<T> => {
    return api<T>(endPoint);
};

export const post = <T, B = unknown>(endPoint: string, data: B): Promise<T> => {
    return api<T>(endPoint, {
        method: "POST",
        body: JSON.stringify(data),
    });
};

export const patch = <T, B = unknown>(
    endPoint: string,
    data: B,
): Promise<T> => {
    return api<T>(endPoint, {
        method: "PATCH",
        body: JSON.stringify(data),
    });
};

export const remove = <T>(endPoint: string): Promise<T> => {
    return api<T>(endPoint, {
        method: "DELETE",
    });
};