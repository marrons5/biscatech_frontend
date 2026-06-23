import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useRegister } from "@/services/auth/userAuth";
import { handleAuthError } from "@/utils/auth/errors";

const registerSchema = z.object({
    name: z.string(),
    email: z.email({error: "Insira um e-mail válido. Ex: joaodomingos@gmail.com"}),
    phone: z.e164({error: "Insira um número de telefone váLido. Ex: +244912345678"}),
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

type RegisterForm = z.infer<typeof registerSchema>;

export function useRegisterForm() {
    const { mutate, isPending } = useRegister();
    const navigate = useNavigate();

    const form = useForm<RegisterForm>({
        resolver: zodResolver(registerSchema),
        defaultValues: {
            phone: "+244"
        }
    });

    function onSubmit(data: RegisterForm) {
        mutate(
            {
                name: data.name,
                email: data.email,
                password: data.password,
                phone: data.phone,
            },
            {
                onSuccess: (response) => {
                    toast.success("Conta criada! Verifique o seu email para o código de verificação.");
                    navigate(`auth/verify-otp?email=${encodeURIComponent(response.email)}`)
                },
                onError: (error) => {
                    toast.error(handleAuthError(error), {
                        className: "bg-red-500/10 text-white font-semibold",
                        position: "bottom-right"
                    });
                },
            },
        );
    }

    return { form, onSubmit: form.handleSubmit(onSubmit), isPending };
}