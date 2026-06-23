import type { ApiError } from "@/types/auth";

export function getErrorMessage(error: unknown, defaultMessage: string): string {
  if (error && typeof error === "object" && "message" in error) {
    const err = error as ApiError;
    return err.message || defaultMessage;
  }
  return defaultMessage;
}

export function handleAuthError(error: unknown): string {
  if (error && typeof error === "object" && "message" in error) {
    const err = error as ApiError;

    switch (err.message) {
      case "Invalid credentials":
        return "Email ou senha incorretos.";
      case "Email not verified":
        return "Por favor, verifique o seu email antes de iniciar sessão.";
      case "Email already exists":
        return "Este email já está registado.";
      case "Verification token expired":
        return "O link de verificação expirou. Solicite um novo.";
      case "Reset token expired":
        return "O link de recuperação expirou. Solicite um novo.";
      case "Current password is invalid":
        return "A senha atual está incorreta.";
      default:
        return err.message || "Ocorreu um erro. Tente novamente.";
    }
  }
  return "Ocorreu um erro. Tente novamente.";
}
