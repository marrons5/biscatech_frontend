import { useState, useEffect } from "react";
import { toast } from "sonner";
import { catalogService, type PredefinedService, type GetCatalogParams } from "@/services/catalogService"; // Ajuste o caminho

function useGetCatalog(defaultParams?: GetCatalogParams) {
    const [data, setData] = useState<PredefinedService[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        let isMounted = true;

        const fetchCatalog = async () => {
            try {
                const response = await catalogService.list(defaultParams);
                const payload = response as unknown as { data: { success: boolean; data: { services: PredefinedService[] } } };
                
                if (payload.data?.success && isMounted) {
                    setData(payload.data.data.services);
                } else if (isMounted) {
                    setData([]);
                }
            } catch (error) {
                if (isMounted) {
                    toast.error("Erro ao carregar o catálogo de serviços", {
                        className: "bg-red-500/10 text-white font-semibold",
                    });
                    console.error("Erro fetchInitialCatalog:", error);
                }
            } finally {
                if (isMounted) {
                    setIsLoading(false);
                }
            }
        };

        fetchCatalog();

        return () => {
            isMounted = false; 
        };
    }, [defaultParams]);

    const refetchCatalog = async (newParams?: GetCatalogParams) => {
        try {
            setIsLoading(true); 
            const response = await catalogService.list(newParams || defaultParams);
            const payload = response as unknown as { data: { success: boolean; data: { services: PredefinedService[] } } };

            if (payload.data?.success) {
                setData(payload.data.data.services);
            } else {
                throw new Error("Erro na resposta do servidor");
            }
        } catch (error) {
            toast.error("Erro ao filtrar o catálogo", {
                className: "bg-red-500/10 text-white font-semibold",
            });
            console.error("Erro refetchCatalog:", error);
        } finally {
            setIsLoading(false);
        }
    };

    return {
        data,
        isLoading,
        refetchCatalog
    };
}

export { useGetCatalog };