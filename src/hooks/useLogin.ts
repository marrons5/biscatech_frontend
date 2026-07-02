import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { authService } from "@/services/authService";
import { toast } from "sonner";


const loginSchema = z.object({
    role: z.enum(["CLIENTE", "PRESTADOR"]),
    identifier: z.string().min(4, "Insira um número de telefone ou e-mail válido. Ex: +244912345678 ou joaodomingos@gmail.com"),
    password: z
        .string()
        .min(8, { error: 'A palavra-passe deve conter no minimo 8 caracteres'})
        .regex(/[a-zA-Z]/, "A palavra-passe deve conter letras")
        .regex(/[0-9]/, { error: 'A palavra-passe deve conter pelo menos um número' })
        .regex(/[^A-Za-z0-9]/, { error: 'A palavra-passe deve conter um caractere especial' }),
});

function useLogin () {

    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false);
    
    const form = useForm<z.infer<typeof loginSchema>>({
        resolver: zodResolver(loginSchema),
        defaultValues: {
            identifier: "",
            password: "",
            role: "CLIENTE"
        },
    });

    async function onSubmit(value: z.infer<typeof loginSchema>) {

        const payload = {
            identifier: value.identifier,
            password: value.password,
            role: value.role
        };

        try {
            setIsLoading(true);

            const response = await authService.login(payload);

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
    };
}

export {useLogin};