// import { Controller, useForm } from "react-hook-form";
// import { zodResolver } from "@hookform/resolvers/zod";
// import { z } from "zod";
// import { useNavigate } from "react-router-dom";
import {
  EnvelopeIcon,
  PhoneIcon,
  MapPinIcon,
  WrenchIcon
} from "@phosphor-icons/react";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import {
//   Field,
//   FieldError,
//   FieldGroup,
//   FieldLabel,
//   FieldDescription,
// } from "@/components/ui/field";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components";
import { UserIcon } from "lucide-react";
// import { useAuth } from "@/hooks/useAuth";
// // import { toast } from "sonner";

// const accountSchema = z.object({
//   email: z.string().email("Email inválido"),
//   password: z
//     .string()
//     .min(6, "Mínimo 6 caracteres")
//     .optional()
//     .or(z.literal("")),
// });
// const serviceSchema = z.object({
//   specialty: z.string().min(2, "Indica a especialidade"),
//   hourly: z.coerce.number().min(0, "Valor inválido"),
// });

// type ServiceFormData = z.input<typeof serviceSchema>;
const ProSettings = () => {
  // const { user, logout } = useAuth();
  // const navigate = useNavigate();

  // const accountForm = useForm<z.infer<typeof accountSchema>>({
  //   resolver: zodResolver(accountSchema),
  //   defaultValues: { email: "celso@nema.app", password: "" },
  // });
  // const serviceForm = useForm<ServiceFormData>({
  //   resolver: zodResolver(serviceSchema),
  //   defaultValues: { specialty: "Canalizador", hourly: 2500 },
  // });

  return (
    <section className="grid grid-cols-10 gap-10 px-10 w-full h-full">
      <main className="col-span-10 lg:col-span-7 flex flex-col gap-5">

            <Accordion
            type="single"
            collapsible
            defaultValue="0"

            >
              <AccordionItem value="perfil" className="bg-card rounded-xl">
                <AccordionTrigger className="bg-card rounded-xl items-center gap-5 p-5">
                  <div className="bg-primary-gradient /20 rounded-full p-2">
                    <UserIcon className="text-primary-foreground"/>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-foreground text-base">Perfil e Dados Pessoais</span>
                    <span className="text-muted-foreground text-sm">Nome, foto, contacto e endereços guardados</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <span>ajd</span>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="perfil" className="bg-card rounded-xl">
                <AccordionTrigger className="bg-card rounded-xl items-center gap-5 p-5">
                  <div className="bg-primary-gradient /20 rounded-full p-2">
                    <UserIcon className="text-primary-foreground"/>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-foreground text-base">Perfil e Dados Pessoais</span>
                    <span className="text-muted-foreground text-sm">Nome, foto, contacto e endereços guardados</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <span>ajd</span>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="perfil" className="bg-card rounded-xl">
                <AccordionTrigger className="bg-card rounded-xl items-center gap-5 p-5">
                  <div className="bg-primary-gradient /20 rounded-full p-2">
                    <UserIcon className="text-primary-foreground"/>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-foreground text-base">Perfil e Dados Pessoais</span>
                    <span className="text-muted-foreground text-sm">Nome, foto, contacto e endereços guardados</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <span>ajd</span>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="perfil" className="bg-card rounded-xl">
                <AccordionTrigger className="bg-card rounded-xl items-center gap-5 p-5">
                  <div className="bg-primary-gradient /20 rounded-full p-2">
                    <UserIcon className="text-primary-foreground"/>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-foreground text-base">Perfil e Dados Pessoais</span>
                    <span className="text-muted-foreground text-sm">Nome, foto, contacto e endereços guardados</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <span>ajd</span>
                </AccordionContent>
              </AccordionItem>

              <AccordionItem value="perfil" className="bg-card rounded-xl">
                <AccordionTrigger className="bg-card rounded-xl items-center gap-5 p-5">
                  <div className="bg-primary-gradient /20 rounded-full p-2">
                    <UserIcon className="text-primary-foreground"/>
                  </div>
                  <div className="flex flex-col ">
                    <span className="text-foreground text-base">Perfil e Dados Pessoais</span>
                    <span className="text-muted-foreground text-sm">Nome, foto, contacto e endereços guardados</span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <span>ajd</span>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
      </main>
      
      <aside className="col-span-10 lg:col-span-3 flex flex-col gap-5">
            <section className="relative overflow-hidden rounded-2xl bg-primary-gradient shadow-sm text-primary-foreground p-6 text-center">
              <div className="absolute -top-12 -right-12 h-36 w-36 rounded-full bg-white/15 blur-2xl" />
              <div className="relative">
                <div className="mx-auto h-20 w-20 rounded-full bg-white/20 backdrop-blur border-2 border-white/30 flex items-center justify-center text-3xl font-extrabold">
                  EF
                </div>
                <h2 className="mt-4 text-xl font-extrabold">
                  Enzo Fernandez
                </h2>
                <p className="text-xs opacity-90">Canalizador</p>
                <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
                  <WrenchIcon size={14} weight="fill" /> Verificado
                </span>
              </div>
            </section>

            <section className="rounded-2xl bg-white border border-slate-200 shadow-sm p-6">
              <h3 className="font-extrabold text-base mb-4">
                Dados de Contacto
              </h3>
              <ul className="space-y-3 text-sm">
                <li className="flex items-start gap-3">
                  <EnvelopeIcon size={18} className="text-primary mt-0.5" />
                  <div className="min-w-0">
                    <p className="text-[11px] uppercase font-bold text-muted-foreground">
                      Email
                    </p>
                    <p className="font-semibold truncate">enzofernandez@gmail.com</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <PhoneIcon size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase font-bold text-muted-foreground">
                      Telefone
                    </p>
                    <p className="font-semibold">+244 923 456 789</p>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <MapPinIcon size={18} className="text-primary mt-0.5" />
                  <div>
                    <p className="text-[11px] uppercase font-bold text-muted-foreground">
                      Endereço
                    </p>
                    <p className="font-semibold">Talatona, Luanda</p>
                  </div>
                </li>
              </ul>
            </section>
      </aside>
    </section>
  );
};

export { ProSettings };
