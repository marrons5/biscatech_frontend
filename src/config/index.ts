export interface AppConfig {
    apiURL: string;
}

const resolveApiUrl = (): string => {
    const envUrl = import.meta.env.VITE_API_URL as string | undefined;
    if (envUrl) return envUrl.replace(/\/$/, "");

    // Em dev, usa o proxy do Vite (mesma origem)
    return "";
};

const apiURL = resolveApiUrl();

const config: AppConfig = {
    apiURL,
};

export function getImageUrl(url: string | undefined): string {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${apiURL}${url}`;
}

export { config };
