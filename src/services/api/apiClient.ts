import { useMutation, useQuery, useQueryClient, type UseQueryOptions } from "@tanstack/react-query";
import { get, post, patch, remove } from "./api";
type ApiQueryOptions<T> = {
    key: string[];
    endpoint: string;
    enabled?: boolean;
    params?: Record<string, string | number | boolean>;
} & Omit<UseQueryOptions<T>, "queryKey" | "queryFn">;

export function useGet<T>({
    key,
    endpoint,
    enabled = true,
    params,
    ...options
}: ApiQueryOptions<T>) {
    const buildURL = () => {
        if (!params) return endpoint;

        const searchParams = new URLSearchParams(
            Object.entries(params).reduce<Record<string, string>>((acc, [k, v]) => {
                acc[k] = String(v);
                return acc;
            }, {}),
        );

        return `${endpoint}?${searchParams.toString()}`;
    };

    return useQuery<T>({
        queryKey: [...key, JSON.stringify(params ?? {})],
        queryFn: () => get<T>(buildURL()),
        enabled,
        ...options,
    });
}

export function useCreate<T, B = unknown>(
    endpoint: string,
    invalidateKeys: string[] = [],
) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: (data: B) => post<T, B>(endpoint, data),
        onSuccess: () => {
            invalidateKeys.forEach((key) => {
                queryClient.invalidateQueries({queryKey: [key]});
            });
        },
    });
}

export function UseUpdate<T, B = unknown>(
    endpoint: string,
    invalidateKeys: string [] = [],
) {
    const queryClient = useQueryClient();
    
    return useMutation({
        mutationFn: (data: B) => patch<T, B>(endpoint, data),
        onSuccess: () => {
            invalidateKeys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key]});
            });
        },
    });
}

export function useDelete<T>(endPoint: string, invalidateKeys: string[] = []) {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: () => remove<T>(endPoint),
        onSuccess: () => {
            invalidateKeys.forEach((key) => {
                queryClient.invalidateQueries({ queryKey: [key] });
            });
        },
    });
}