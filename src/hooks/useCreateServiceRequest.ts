import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { useState } from "react";
import { serviceRequestService } from "@/services/serviceRequestService";

const createServiceRequestSchema = z.object({
    title: z.string().min(5, "O título é obrigatório"),
    description: z.string().min(10, "A descrição é obrigatória"),
    category: z.string().nonempty("A categoria é obrigatória"),
    type: z.enum(["REPARO", "MANUTENÇÃO", "INSTALAÇÃO", "EMERGÊNCIA"]),
    location: z.string().nonempty("A localização é obrigatória"),
    scheduledDate: z.string().nonempty("A data é obrigatória"),
    price: z.number().min(1, "O preço é obrigatório"),
    isCustom: z.boolean(),
});

function useCreateServiceRequest (){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof createServiceRequestSchema>>({
        resolver: zodResolver(createServiceRequestSchema),
        defaultValues: {
            title: "",
            description: "",
            category: "",
            type: "EMERGÊNCIA",
            location: "",
            scheduledDate: "",
            price: 0,
            isCustom: true,
        }
    });

    async function onSubmit(value: z.infer<typeof createServiceRequestSchema>) {
        const payload = {
            title: value.title,
            description: value.description,
            category: value.category,
            type: value.type,
            location: value.location,
            scheduledDate: value.scheduledDate,
            price: value.price,
            isCustom: value.isCustom, // <-- 3. Enviamos para a API!
        }

        try {
            setIsLoading(true);

            const response = await serviceRequestService.create(payload);

            if(!response.data.success){
                throw new Error (`Erro ${response.status}`);
            }

            navigate("/clientHome", { replace: true}); 
            toast.success("Solicitação de Serviço criada com sucesso!", {
                className: "bg-green-500 text-white font-semibold"
            });
        } catch (error) {
            toast.error("Erro ao criar a solicitação de serviço", {
                className: "bg-red-500/10 text-white font-semibold",
            });

            console.error("error:", error);
        } finally {
            setIsLoading(false);
        }
    }

    return {
        form,
        onSubmit,
        isLoading
    }
}

export {useCreateServiceRequest};