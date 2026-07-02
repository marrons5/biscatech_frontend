import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { authService } from "@/services/authService";
import { toast } from "sonner";

const forgotPasswordSchema = z.object({
    identifier: z.string().min(9, "Insira um e-mail ou numero de telefone valido. Ex: joaodomingos@gmail.com ou 912345678")
})

function useForgotPassword (){
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
        defaultValues: {
            identifier: ""
        }
    });

    async function onSubmit(value: z.infer<typeof forgotPasswordSchema>) {
        const payload = {
            identifier: value.identifier,
        }

        try {
            setIsLoading(true);

            const response = await authService.forgotPassword(payload);

            if(!response.data.success) {
                throw new Error (`Erro ${response.status}`);
            }
            
            navigate("/dashboard", { replace: true});
            toast.success("Sessão iniciada com sucesso!", {
                className: "bg-green-500 text-white font-semibold",
            });
        } catch (error) {
            toast.error("Erro ao iniciar a sessão", {
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

export {useForgotPassword}