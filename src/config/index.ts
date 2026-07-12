export interface AppConfig {
    apiURL: string;
}

const devApiUrl = `https://localhost:3000`;

const resolveApiUrl = (): string => {
    // if (typeof window === "undefined") {
    //     return prodApiUrl;
    // }

    const { hostname } = window.location;
    if(hostname === "localhost" || hostname === "127.0.0.1") {
        return devApiUrl;
    }

    return devApiUrl
};

const config: AppConfig = {
    apiURL: resolveApiUrl()
}

export function getImageUrl(url: string | undefined) : string {
    if (!url) return "";
    if (url.startsWith("http")) return url;
    return `${devApiUrl}${url}`
}

export { config };