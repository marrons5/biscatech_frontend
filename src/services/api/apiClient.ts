import { useQuery, type UseQueryOptions } from "@tanstack/react-query";

type ApiQueryOptions<T> = {
    key: string[];
    endpoint: string;
    enabled?: boolean;
    params?: Record<string, string | number | boolean>;
} & Omit <UseQueryOptions<T>, "queryKey" | "queryFn">

export function useGet<T>({
    key,
    endpoint,
    enabled = true,
    params,
    ...options
}: ApiQueryOptions<T>) {
    const buildUrl = () => {
        if (!params) return endpoint;

        const searchParams = new URLSearchParams(
            Object.entries(params).reduce<Record<string, string>>((acc, [key, value]) => {
                acc[key] = String(value);
                return acc;
            }, {}),
        );

        return ``
    }
}