import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ArrowRightIcon } from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Field, FieldError, FieldGroup, FieldLabel } from "@/components";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";

// Mantém a mesma imagem de fundo usada no Login
import background from "@/assets/images/auth_background_left.png"; 

const forgotPasswordSchema = z.object({
  email: z.string().email("Formato de e-mail inválido.")
});

type ForgotPasswordForm = z.infer<typeof forgotPasswordSchema>;

const ForgotPassword = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);

  const form = useForm<ForgotPasswordForm>({
    resolver: zodResolver(forgotPasswordSchema),
    defaultValues: {
      email: ""
    }
  });

  function submit() {
    setLoading(true);
    // Simulação do envio do email
    setTimeout(() => {
      setLoading(false);
      navigate("/auth/verify");
    }, 1500);
  }

  return (
    <div 
      className="bg-primary/65 bg-cover bg-no-repeat h-svh w-full flex items-center justify-end py-5 md:px-4 px-2"
      style={{ backgroundImage: `url(${background})`, backgroundBlendMode: "color-burn" }}
    >
      <div className="bg-card border border-border/30 shadow-2xl rounded-3xl p-8 lg:p-10 md:w-2/6 w-full animate-in fade-in zoom-in-95 duration-500">
        
        <h1 className="text-3xl font-extrabold tracking-tight text-foreground">
          Recuperar senha
        </h1>
        <p className="text-sm text-muted-foreground mt-2 mb-6">
          Insere o teu e-mail para receberes as instruções de recuperação da tua conta.
        </p>

        <form onSubmit={form.handleSubmit(submit)} className="space-y-5">
          <FieldGroup className="space-y-1.5">
            <Controller
              name="email"
              control={form.control}
              render={({ field, fieldState }) => (
                <Field data-invalid={fieldState.invalid}>
                  <FieldLabel htmlFor="email-forgot" className="text-foreground font-semibold">
                    E-mail
                  </FieldLabel>
                  <Input
                    {...field}
                    id="email-forgot"
                    type="email"
                    placeholder="exemplo@gmail.com"
                    className="h-12 rounded-xl border-border focus:border-primary focus:ring-ring/20 transition-all duration-200 bg-background"
                  />
                  {fieldState.invalid && <FieldError errors={[fieldState.error]} />}
                </Field>
              )}
            />
          </FieldGroup>

          <Button
            type="submit"
            disabled={loading}
            className="w-full text-primary-foreground bg-primary hover:bg-primary/90 rounded-2xl h-14 text-lg font-bold shadow-md cursor-pointer transition-all duration-300 hover:shadow-lg hover:-translate-y-1 active:translate-y-0 active:scale-[0.98] mt-2 flex items-center justify-center gap-2"
          >
            {loading ? (
              <span className="animate-pulse">A enviar…</span>
            ) : (
              <>Enviar e-mail <ArrowRightIcon size={18} weight="bold" /></>
            )}
          </Button>
        </form>

        {/* Texto e Link estruturados exatamente como nas outras páginas */}
        <p className="text-center text-sm text-muted-foreground mt-8">
          Lembraste-te da senha?{" "}
          <Link to="/auth/login" className="font-bold text-primary hover:underline transition-all">
            Voltar ao Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export { ForgotPassword };