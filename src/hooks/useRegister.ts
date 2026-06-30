import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { useState } from "react";

const registerSchema = z.object({
    firstName: z.string().nonempty(),
    lastName: z.string().nonempty(),
    email: z.email({error: "Insira um e-mail válido. Ex: joaodomingos@gmail.com"}).optional(),
    phone: z.e164({error: "Insira um número de telefone váLido. Ex: +244912345678"}),
    role: z.enum(["CLIENTE", "PRESTADOR"]),
    password: z
        .string()
        .min(8, { error: 'A palavra-passe deve conter no minimo 8 caracteres'})
        .regex(/[a-zA-Z]/, "A palavra-passe deve conter letras")
        .regex(/[0-9]/, { error: 'A palavra-passe deve conter pelo menos um número' })
        .regex(/[^A-Za-z0-9]/, { error: 'A palavra-passe deve conter um caractere especial' }),
    confirmPassword: z
        .string()
        .min(8, { error: 'Por favor, confirme a sua palavra-passe' })
}).refine((data) => data.password === data.confirmPassword, {
    error: "As palavras-passes não coincidem",
    path: ["confirmPassword"],
});


function useRegister() {
    const navigate = useNavigate();
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof registerSchema>>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
            phone: "+244",
            role: "CLIENTE",
            password: "",
            confirmPassword: "",
        }
    });

    async function onSubmit(value: z.infer<typeof registerSchema>) {
        const payload = {
            firstName: value.firstName,
            lastName: value.lastName,
            email: value.email,
            phone: value.phone,
            role: value.role,
            password: value.password,
        }

        try {
            setIsLoading(true);

            const response = await authService.register(payload);
            
            if(!response.data.success) {
                throw new Error(`Erro ${response.status}`);
            }
            
            if( value.role === "CLIENTE"){
                navigate("/clientDashboard", { replace: true });
            } else if ( value.role === "PRESTADOR"){
                navigate("/proDashboard", { replace: true });
            }

            toast.success("Conta criada com sucesso!", {
                className: "bg-green-500 text-white font-semibold",
            });
        } catch (error) {
            toast.error("Erro ao criar conta.", {
                className: "bg-red-500/10 text-white font-semibold",
            });

            console.error("error:", error)
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

export {useRegister};