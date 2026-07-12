import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { toast } from "sonner";

const resetSchema = z.object({
  password: z
    .string()
    .min(8, "Minimum 8 characters")
    .regex(/[a-zA-Z]/, "Must contain letters")
    .regex(/[0-9]/, "Must contain at least one number"),
  confirmPassword: z.string().min(8),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

type ResetForm = z.infer<typeof resetSchema>;

const ResetPassword = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email") ?? "";
  const code = searchParams.get("code") ?? "";
  const [loading, setLoading] = useState(false);

  const form = useForm<ResetForm>({
    resolver: zodResolver(resetSchema),
  });

  async function submit({ password }: ResetForm) {
    setLoading(true);
    try {
      const response = await authService.resetPassword({ email, code, password });

      if (!response.data.success) {
        throw new Error("Reset failed");
      }

      toast.success("Password updated successfully!", {
        className: "bg-green-500 text-white font-semibold",
      });
      navigate("/auth/login", { replace: true });
    } catch (error) {
      toast.error("Invalid or expired code. Try again.", {
        className: "bg-red-500/10 text-white font-semibold",
      });
      console.error("reset error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="bg-background h-svh flex items-center justify-center">
      <div className="max-w-md w-full px-6 py-8 bg-card rounded-3xl shadow-lg border border-border/30">
        <h1 className="text-2xl font-extrabold tracking-tight text-foreground">
          Reset password
        </h1>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Enter your new password.
        </p>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-4">
          <FieldGroup className="space-y-1.5">
            <Field>
              <FieldLabel htmlFor="password" className="text-foreground font-semibold">
                New password
              </FieldLabel>
              <Input
                {...form.register("password")}
                id="password"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-border bg-background"
              />
              {form.formState.errors.password && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.password.message}</p>
              )}
            </Field>

            <Field>
              <FieldLabel htmlFor="confirmPassword" className="text-foreground font-semibold">
                Confirm new password
              </FieldLabel>
              <Input
                {...form.register("confirmPassword")}
                id="confirmPassword"
                type="password"
                placeholder="••••••••"
                className="h-12 rounded-xl border-border bg-background"
              />
              {form.formState.errors.confirmPassword && (
                <p className="text-xs text-destructive mt-1">{form.formState.errors.confirmPassword.message}</p>
              )}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={loading}
            className="w-full bg-primary text-primary-foreground rounded-2xl h-14 text-lg font-bold"
          >
            {loading ? "Updating…" : "Update password"}
          </Button>
        </form>
      </div>
    </div>
  );
};

export { ResetPassword };
