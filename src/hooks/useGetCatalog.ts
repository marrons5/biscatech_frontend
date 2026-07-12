import { useState, useEffect } from "react";
import { toast } from "sonner";
import { catalogService, type PredefinedService, type GetCatalogParams } from "@/services/catalogService"; // Ajuste o caminho

function useGetCatalog(defaultParams?: GetCatalogParams) {
    const [data, setData] = useState<PredefinedService[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    // Carregamento inicial do Catálogo
    useEffect(() => {
        let isMounted = true;

        const fetchCatalog = async () => {
            try {
                const response = await catalogService.list(defaultParams);
                
                if (response.data?.success && isMounted) {
                    setData(response.data.data.services);
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

        // Função de limpeza
        return () => {
            isMounted = false; 
        };
    }, [defaultParams]);

    // A função para filtrar por categorias

    const refetchCatalog = async (newParams?: GetCatalogParams) => {
        try {
            setIsLoading(true); 
            const response = await catalogService.list(newParams || defaultParams);

            if (response.data?.success) {
                setData(response.data.data.services);
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