import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { useLogin } from "@/features/auth/services/userAuth";
import { storeToken } from "@/features/auth/services/token";
import { handleAuthError } from "@/features/auth/utils/errors";
import { useUserData } from "@/features/userProfile/hooks/useUserData";
import { UserRole, UserTypeAction } from "@/features/userProfile/types";
import { useQueryClient } from "@tanstack/react-query";

const loginSchema = z.object({
  email: z.string().email("Verifica o seu email."),
  password: z
    .string()
    .min(8, "A senha deve conter no mínimo 8 caracteres")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[a-zA-Z]/, "A senha deve conter letras")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter um caractere especial"),
});

type LoginForm = z.infer<typeof loginSchema>;

export function useLoginForm() {
  const { mutate, isPending } = useLogin();
  const { dispatch } = useUserData();
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  function onSubmit(data: LoginForm) {
    mutate(
      { email: data.email, password: data.password },
      {
        onSuccess: (response) => {
          storeToken(response.accessToken);

          dispatch({
            type: UserTypeAction.SIGNIN,
            payload: {
              id: response.user.id,
              name: response.user.name,
              email: response.user.email,
              role: response.user.role as UserRole,
              phone: response.user.phone ,
            },
          });
          

          queryClient.setQueryData(["current-user"], response.user);
          toast.success("Sessão iniciada com sucesso!");

          if (
            response.user.role === UserRole.ADMIN ||
            response.user.role === UserRole.OPERATIONS ||
            response.user.role === UserRole.GUIDE
          ) {
            localStorage.setItem("isAdmin", "true");
            navigate("/dashboard");
          } else {
            navigate("/user/dashboard");
          }
        },
        onError: (error) => {
          console.error(error);
          toast.error(handleAuthError(error), {
            className: "bg-red-500/10 text-white font-semibold",
            position: "bottom-right",
          });
        },
      },
    );
  }

  return { form, onSubmit: form.handleSubmit(onSubmit), isPending };
}
