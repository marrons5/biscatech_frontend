import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon, GoogleLogoIcon, EyeIcon, EyeSlashIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldGroup, FieldLabel } from "@/components";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { authService } from "@/services/authService";
import { AuthContext } from "@/context/authContext";
import { setAuthToken, setRefreshToken, setAuthUser } from "@/utils/auth/session";
import { toast } from "sonner";
import { logger } from "@/utils/logger";

import background from "@/assets/images/auth_background_left.png";

const loginSchema = z.object({
  email: z.string().email("Check your email."),
  password: z.string().min(8, "Password must be at least 8 characters"),
});
type LoginForm = z.infer<typeof loginSchema>;

const Login = () => {
  const navigate = useNavigate();
  const { login: setAuthUser } = useContext(AuthContext)!;
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);

  const form = useForm<LoginForm>({
    resolver: zodResolver(loginSchema),
  });

  async function submit({ email, password }: LoginForm) {
    setLoading(true);
    try {
      const response = await authService.login({ email, password });

      if (!response.data.success) {
        const msg = (response.data as any).error ?? "Login failed";
        logger.warn("Login", msg, response.data);
        throw new Error(msg);
      }

      const { token, refreshToken, user } = response.data.data;

      setAuthToken(token);
      setRefreshToken(refreshToken);
      setAuthUser({
        id: user.id,
        name: user.name,
        email: user.email,
        phone: user.phone,
        role: user.role,
        initials: user.initials,
      });

      const dashboard = user.role === "provider" ? "/pro/dashboard" : "/client/dashboard";
      navigate(dashboard, { replace: true });

      toast.success("Session started successfully!", {
        className: "bg-green-500 text-white font-semibold",
      });
    } catch (error) {
      const msg = error instanceof Error ? error.message : "Invalid email or password.";
      logger.error("Login", msg, error);
      toast.error(msg, {
        className: "bg-red-500/10 text-white font-semibold",
      });
      console.error("login error:", error);
    } finally {
      setLoading(false);
    }
  }

  return (
    <div
      className="bg-primary/65 bg-cover bg-no-repeat h-svh w-full flex items-center justify-end py-5 md:px-4 px-2"
      style={{ backgroundImage: `url(${background})`, backgroundBlendMode: "color-burn" }}
    >
      <div className="bg-card border border-border/30 shadow-2xl rounded-3xl p-8 lg:p-10 md:w-2/6 w-full animate-in fade-in zoom-in-95 duration-500">

        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Welcome back
        </h1>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Sign in to your account to continue.
        </p>

        <Button
          type="button"
          variant="outline"
          size="lg"
          className="w-full gap-2.5 rounded-2xl border-2 border-border/40 py-5 text-foreground bg-background hover:bg-muted transition-all duration-200"
        >
          <GoogleLogoIcon size={20} weight="bold" />
          Continue with Google
        </Button>

        <div className="my-6 flex items-center gap-3">
          <div className="flex-1 h-px bg-border/30" />
          <span className="text-[11px] text-muted-foreground font-bold tracking-wider">
            OR WITH EMAIL
          </span>
          <div className="flex-1 h-px bg-border/30" />
        </div>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
          <FieldGroup className="space-y-1.5">
            <Field>
              <FieldLabel htmlFor="email-login" className="text-foreground font-semibold">E-mail</FieldLabel>
              <Input
                {...form.register("email")}
                id="email-login"
                type="email"
                placeholder="e.g. joao@email.com"
                className="h-12 rounded-xl border-border focus:border-primary focus:ring-ring/20 transition-all duration-200 bg-background"
              />
              {form.formState.errors.email && <p className="text-xs text-destructive mt-1">{form.formState.errors.email.message}</p>}
            </Field>

            <Field>
              <FieldLabel htmlFor="password-login" className="text-foreground font-semibold flex justify-between">
                <span>Password</span>
                <Link to="/auth/forgot-password" className="text-xs font-bold text-primary hover:underline transition-all">
                  Forgot it?
                </Link>
              </FieldLabel>
              <div className="relative">
                <Input
                  {...form.register("password")}
                  id="password-login"
                  type={showPwd ? "text" : "password"}
                  placeholder="••••••••"
                  className="h-12 rounded-xl pr-10 border-border focus:border-primary focus:ring-ring/20 transition-all duration-200 bg-background"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-neutral hover:text-primary transition-colors cursor-pointer"
                >
                  {showPwd ? <EyeIcon size={20} /> : <EyeSlashIcon size={20} />}
                </button>
              </div>
              {form.formState.errors.password && <p className="text-xs text-destructive mt-1">{form.formState.errors.password.message}</p>}
            </Field>
          </FieldGroup>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-primary-foreground bg-primary hover:bg-primary/90 rounded-2xl h-14 text-lg font-bold shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] mt-2"
          >
            {loading ? <span className="animate-pulse">Signing in…</span> : <>Sign in <ArrowRightIcon size={18} weight="bold" /></>}
          </Button>
        </form>

        <p className="text-center text-sm text-muted-foreground mt-8">
          Don&apos;t have an account yet?{" "}
          <Link to="/auth/register" className="font-bold text-primary hover:underline transition-all">
            Create account
          </Link>
        </p>
      </div>
    </div>
  );
};

export { Login };
