import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { authService } from "@/services/authService";
import { useState } from "react";

const changePasswordSchema = z.object({
    currentPassword: z.string(),
    newPassword: z
        .string()
        .min(8, { error: 'A palavra-passe deve conter no minimo 8 caracteres'})
        .regex(/[a-zA-Z]/, "A palavra-passe deve conter letras")
        .regex(/[0-9]/, { error: 'A palavra-passe deve conter pelo menos um número' })
        .regex(/[^A-Za-z0-9]/, { error: 'A palavra-passe deve conter um caractere especial' }),
    confirmNewPassword: z
        .string()
        .min(8, { error: 'A palavra-passe deve conter no minimo 8 caracteres'}),
}).refine((data) => data.newPassword === data.confirmNewPassword, {
    error: "As palavras-passes não coincidem",
    path: ["confirmPassword"],
}).refine((data) => data.currentPassword === data.newPassword, {
    error: "A palavras-passe nova não pode ser igual à antiga.",
    path: ["confirmPassword"],
});

function useChangePassword() {
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const form = useForm<z.infer<typeof changePasswordSchema>>({
        resolver: zodResolver(changePasswordSchema),
        defaultValues: {
            currentPassword: "",
            newPassword: "",
            confirmNewPassword: "",
        }
    });

    async function onSubmit(value: z.infer<typeof changePasswordSchema>) {

        const payload = {
            currentPassword: value.currentPassword,
            newPassword: value.newPassword,
        }

        try {
            setIsLoading(true);

            const response = await authService.changePassword(payload);

            if(!response.data.success) {
                throw new Error(`Erro ${response.status}`);
            }

            toast.success("Palavra-passe atualizada com sucesso", {
                className: "bg-success text-primary-foreground font-semibold",
            });
        } catch (error){
            toast.error("Erro ao atualizar palavra-passe", {
                className: "bg-destructive text-primary-foreground font-semibold",
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
    }
}

export { useChangePassword }