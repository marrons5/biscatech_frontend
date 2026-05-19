import background from "@/assets/images/tool.png";
import { Card, CardHeader, CardContent, CardFooter, CardTitle, CardDescription } from "@/components";
import { Tabs, TabsTrigger, TabsContent, TabsList } from "@/components";
import { FieldGroup, Field, FieldLabel, FieldError, FieldDescription, FieldTitle } from "@/components";
import { Input, Button } from "@/components"; // Não te esqueças de importar o Button!
import { Controller, useForm } from "react-hook-form";
import * as z from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "sonner";
import { Link } from "react-router-dom";

import { WrenchIcon } from "@phosphor-icons/react";
import type React from "react";

const formSchema = z.object({
  fullName: z.string(),
  email: z.email("Formato de e-mail inválido."),
  phone: z.string()
    .regex(/^\+[1-9]\d{7,14}$/, {message: "Verifique o seu número de telefone (ex: +244923000000)"}),
  password: z.string()
    .min(8, "A palavra-passe deve ter pelo menos 8 caracteres.")
    .regex(/[0-9]/, "A senha deve conter um número")
    .regex(/[a-zA-Z]/, "A senha deve conter letras")
    .regex(/[^a-zA-Z0-9]/, "A senha deve conter um caractere especial"),
  confirmPassword: z.string(),

})
.refine((data) => data.password === data.confirmPassword, {
    message: "As senhas não coincidem.",
    path: ["confirmPassword"],
});

function Register() {
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phone: "",
      password: "",
      confirmPassword: ""
    }
  });

  function onSubmit(data: z.infer<typeof formSchema>) {
    toast("Conta criada com sucesso!", {
      description: (
        <pre className="mt-2 w-[320px] overflow-x-auto rounded-md bg-slate-900 p-4 text-emerald-400">
          <code>{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
      position: "bottom-right",
      classNames: {
        content: "flex flex-col gap-2"
      },
      style: {
        "--border-radius": "calc(var(--radius) + 4px)"
      } as React.CSSProperties
    });
  }

  return (
    <>
      <section
        className="bg-primary bg-cover bg-left bg-no-repeat flex items-center justify-center lg:justify-end p-4 lg:p-12 h-dvh w-dvw "
        style={{ 
          backgroundImage: `url(${background})`,
          backgroundBlendMode: 'luminosity' 
        }}
      >
        <div className="w-full lg:w-2/5 h-full">
          <Card className="bg-white/95 rounded-[2rem] shadow-2xl border-slate-100 backdrop-blur-sm flex-col justify-center gap-15 p-2 sm:p-4 h-full">
            <CardHeader>
                    <div className="flex justify-center items-center gap-2">
                        <div className="bg-primary rounded-full flex justify-center items-center">
                            <WrenchIcon className="text-white size-10 p-2"/>
                        </div>
                        <h1 className="text-3xl font-black">BiscaTech</h1>
                    </div>
            </CardHeader>
            
            <CardContent>

              <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">
                  <FieldGroup className="gap-5">
                    <Field>
                        
                      <FieldTitle className="text-2xl sm:text-3xl font-extrabold text-slate-900">
                        Junte-se a Nós
                      </FieldTitle>
                        
                      <FieldDescription className="text-base text-slate-500 font-medium">
                        Registe-se em nossa plataforma para poder pedir ou prestar um serviço
                      </FieldDescription>
                    </Field>

                    <Controller
                      name="fullName"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="form-rhf-demo-email" className="text-base text-slate-700 font-medium">
                            Nome Completo
                          </FieldLabel>
                          <Input
                            {...field}
                            id="fullName"
                            type="text"
                            aria-invalid={fieldState.invalid}
                            placeholder="João Costa"
                            className="bg-slate-50 rounded-xl text-sm placeholder:text-sm  py-6  border-slate-200 focus-visible:ring-ring"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error?.message || "Erro"]} className="text-red-500 text-xs font-medium mt-1" />
                          )}
                        </Field>
                      )}
                    />

                    <div className="flex gap-2">
                      <Controller
                        name="email"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="form-rhf-demo-email" className="text-base text-slate-700 font-medium">
                              E-mail
                            </FieldLabel>
                            <Input
                              {...field}
                              id="form-rhf-demo-email"
                              type="email"
                              aria-invalid={fieldState.invalid}
                              placeholder="exemplo@gmail.com"
                              autoComplete="email"
                              className="bg-slate-50 rounded-xl text-sm placeholder:text-sm  py-6  border-slate-200 focus-visible:ring-ring"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error?.message || "Erro"]} className="text-red-500 text-xs font-medium mt-1" />
                            )}
                          </Field>
                        )}
                      />

                      <Controller
                        name="phone"
                        control={form.control}
                        render={({ field, fieldState }) => (
                          <Field data-invalid={fieldState.invalid}>
                            <FieldLabel htmlFor="phone" className="text-base text-slate-700 font-medium">
                              Nº de Telemóvel
                            </FieldLabel>
                            <Input
                              {...field}
                              id="phone"
                              type="text"
                              aria-invalid={fieldState.invalid}
                              placeholder="+244 912 345 678"
                              className="bg-slate-50 rounded-xl text-sm placeholder:text-sm  py-6  border-slate-200 focus-visible:ring-ring"
                            />
                            {fieldState.invalid && (
                              <FieldError errors={[fieldState.error?.message || "Erro"]} className="text-red-500 text-xs font-medium mt-1" />
                            )}
                          </Field>
                        )}
                      />
                    </div>

                    <Controller
                      name="password"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="password" className="text-base text-slate-700 font-medium">
                            Palavra-passe
                          </FieldLabel>
                          <Input
                            {...field}
                            id="password"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="bg-slate-50 rounded-xl text-sm placeholder:text-sm  py-6  border-slate-200 focus-visible:ring-ring"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error?.message || "Erro"]} className="text-red-500 text-xs font-medium mt-1" />
                          )}
                        </Field>
                      )}
                    />

                    <Controller
                      name="confirmPassword"
                      control={form.control}
                      render={({ field, fieldState }) => (
                        <Field data-invalid={fieldState.invalid}>
                          <FieldLabel htmlFor="password" className="text-base text-slate-700 font-medium">
                            Confirmar Palavra-passe
                          </FieldLabel>
                          <Input
                            {...field}
                            id="confirmPassword"
                            type="password"
                            aria-invalid={fieldState.invalid}
                            placeholder="••••••••"
                            autoComplete="current-password"
                            className="bg-slate-50 rounded-xl text-sm placeholder:text-sm  py-6  border-slate-200 focus-visible:ring-ring"
                          />
                          {fieldState.invalid && (
                            <FieldError errors={[fieldState.error?.message || "Erro"]} className="text-red-500 text-xs font-medium mt-1" />
                          )}
                        </Field>
                      )}
                    />

                  </FieldGroup>
                <Button 
                  type="submit" 
                  className="w-full h-12 mt-6 rounded-xl text-base font-bold bg-primary hover:bg-primary/90 shadow-md active:scale-[0.98] transition-all"
                >
                  Iniciar sessão
                </Button>
              </form>
            </CardContent>

            <CardFooter className="border-muted p-5 justify-center">
                <p className="text-center text-sm text-slate-500 font-regular">
                  Não tem conta?{" "}
                  <Link to="/register" className="font-medium text-primary hover:underline">
                    Registe-se
                  </Link>
                </p>
            </CardFooter>
          </Card>
        </div>
      </section>
    </>
  );
}

export { Register };