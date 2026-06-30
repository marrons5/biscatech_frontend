import { useState } from "react";
import {
  Gear,
  Moon,
  Globe,
  SignOutIcon,
  QuestionIcon,
  WhatsappLogoIcon,
  FileTextIcon,
  EnvelopeIcon,
  PipeWrenchIcon,
  UploadSimpleIcon,
  IdentificationCardIcon,
  UserIcon,
  WrenchIcon,
  Bell
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import {
  Accordion,
  AccordionItem,
  AccordionTrigger,
  AccordionContent,
} from "@/components/ui/accordion";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui";
import {
  HeadsetIcon,
  MapPinIcon,
  PhoneIcon,
} from "lucide-react";

const ProSettings = () => {
  const categories = [
    "Canalização",
    "Eletricidade",
    "Pintura",
    "Carpintaria",
    "Refrigeração",
    "Construção",
  ];
  const [selectedCats, setSelectedCats] = useState<string[]>([
    "Canalização",
    "Eletricidade",
  ]);

  const toggleCat = (c: string) =>
    setSelectedCats((s) =>
      s.includes(c) ? s.filter((x) => x !== c) : [...s, c],
    );

  return (
    <section className="w-full grid grid-cols-10 gap-10 px-10 pb-20">
      <main className="col-span-10 lg:col-span-7 flex flex-col gap-5">
        <Accordion
          type="single"
          collapsible
          defaultValue="services"
          className="gap-2.5"
        >
          {/* 1. PERFIL E DADOS PESSOAIS */}
          <AccordionItem
            value="profile"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
              <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                <UserIcon weight="fill" className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center text-left h-full">
                <span className="text-foreground text-sm font-bold">Perfil e Dados Pessoais</span>
                <span className="text-sm text-muted-foreground font-normal">Nome, foto, telefone e biografia</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-gradient-to-br from-primary to-primary/70 flex items-center justify-center text-xl font-extrabold text-primary-foreground">
                  EF
                </div>
                <Button type="button" variant="outline" size="sm" className="rounded-xl">
                  Alterar foto
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label>Nome completo</Label>
                  <Input defaultValue="Enzo Fernandez" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label>Telefone</Label>
                  <Input defaultValue="+244 923 456 789" className="rounded-xl" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Email</Label>
                  <Input type="email" defaultValue="celso@nema.app" className="rounded-xl" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label>Biografia</Label>
                  <Textarea
                    rows={4}
                    className="rounded-xl"
                    placeholder="Conte um pouco sobre a sua experiência..."
                    defaultValue="Canalizador com 8 anos de experiência in Luanda."
                  />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button className="rounded-xl">Guardar alterações</Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. DOCUMENTAÇÃO */}
          <AccordionItem
            value="documentation"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
                <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                  <FileTextIcon weight="fill" className="text-primary-foreground h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center text-left h-full">
                  <span className="text-foreground text-sm font-bold">Documentação</span>
                  <span className="text-sm text-muted-foreground font-normal">Bilhete de Identidade e NIF</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-2.5">
              <div className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <IdentificationCardIcon weight="duotone" className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-[#091B3D]">Bilhete de Identidade</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  <UploadSimpleIcon className="h-4 w-4" /> Carregar
                </Button>
              </div>
              <div className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl flex justify-between items-center p-4">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center">
                    <IdentificationCardIcon weight="duotone" className="h-5 w-5" />
                  </div>
                  <div>
                    <span className="font-semibold text-sm text-foreground">Número de Identificação Fiscal</span>
                  </div>
                </div>
                <Button variant="outline" size="sm" className="rounded-full">
                  <UploadSimpleIcon className="h-4 w-4" /> Carregar
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. SERVIÇOS (ARRANJADO: Apenas Categorias e Tempo) */}
          <AccordionItem
            value="services"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
                <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                  <WrenchIcon weight="fill" className="text-primary-foreground h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center text-left h-full">
                  <span className="text-foreground text-sm font-bold">Serviços</span>
                  <span className="text-sm text-muted-foreground font-normal">Categorias de atuação e horários</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-4">
              
              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <p className="font-semibold text-sm mb-3 text-[#091B3D]">Categorias de atuação</p>
                <div className="flex flex-wrap gap-2">
                  {categories.map((c) => {
                    const active = selectedCats.includes(c);
                    return (
                      <button
                        key={c}
                        type="button"
                        onClick={() => toggleCat(c)}
                        className={`px-3 py-1.5 rounded-full text-xs font-semibold border transition-colors cursor-pointer ${active ? "bg-primary text-primary-foreground border-primary" : "bg-white text-foreground border-slate-200 hover:border-primary/40"}`}
                      >
                        {c}
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-4 rounded-xl border border-slate-200 bg-white">
                <p className="font-semibold text-sm mb-3 text-[#091B3D]">Horário de disponibilidade</p>
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label className="text-xs">Início</Label>
                    <Input type="time" defaultValue="08:00" className="rounded-xl" />
                  </div>
                  <div className="space-y-2">
                    <Label className="text-xs">Fim</Label>
                    <Input type="time" defaultValue="18:00" className="rounded-xl" />
                  </div>
                </div>
              </div>

              <div className="flex justify-end pt-2">
                <Button className="rounded-xl">Guardar alterações</Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 4. SISTEMA */}
          <AccordionItem
            value="system"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
                <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                  <Gear weight="fill" className="text-primary-foreground h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center text-left h-full">
                  <span className="text-foreground text-sm font-bold">Sistema</span>
                  <span className="text-sm text-muted-foreground font-normal">Tema, idioma e gestão de conta</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <Moon weight="duotone" className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-[#091B3D]">Modo escuro</p>
                    <p className="text-xs text-muted-foreground">Reduz o brilho do ecrã</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <Globe weight="duotone" className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-[#091B3D]">Idioma</p>
                    <p className="text-xs text-muted-foreground">Escolha o idioma da app</p>
                  </div>
                </div>
                <Select defaultValue="pt">
                  <SelectTrigger className="w-40 rounded-xl">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="pt">Português</SelectItem>
                    <SelectItem value="en">English</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="p-4 rounded-xl border border-slate-200 bg-white space-y-3">
                <p className="font-semibold text-sm text-[#091B3D]">Gestão de conta</p>
                <div className="flex flex-wrap gap-2">
                  <Button variant="outline" size="sm" className="rounded-xl">
                    Alterar password
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-destructive border-destructive/40 hover:bg-destructive/5 rounded-xl"
                  >
                    Eliminar conta
                  </Button>
                </div>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 5. NOTIFICAÇÕES */}
          <AccordionItem
            value="notifications"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
                <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                  <Bell weight="fill" className="text-primary-foreground h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center text-left h-full">
                  <span className="text-foreground text-sm font-bold">Notificações</span>
                  <span className="text-sm text-muted-foreground font-normal">Alertas de novos pedidos e avisos</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-3">
              {[
                { t: "Novos pedidos", d: "Alertas quando surgir um novo trabalho", on: true },
                { t: "Avaliações de clientes", d: "Quando um cliente te avaliar", on: true },
                { t: "Avisos do sistema", d: "Atualizações e manutenções", on: true },
                { t: "Promoções Biscatech", d: "Campanhas e novidades", on: false },
              ].map((n) => (
                <div
                  key={n.t}
                  className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white"
                >
                  <div>
                    <p className="font-semibold text-sm text-[#091B3D]">{n.t}</p>
                    <p className="text-xs text-muted-foreground">{n.d}</p>
                  </div>
                  <Switch defaultChecked={n.on} />
                </div>
              ))}
            </AccordionContent>
          </AccordionItem>

          {/* 6. AJUDA E SUPORTE */}
          <AccordionItem
            value="help"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
                <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                  <QuestionIcon weight="fill" className="text-primary-foreground h-5 w-5" />
                </div>
                <div className="flex flex-col justify-center text-left h-full">
                  <span className="text-foreground text-sm font-bold">Ajuda e Suporte</span>
                  <span className="text-sm text-muted-foreground font-normal">FAQ, fale conosco e termos legais</span>
                </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5">
              <div className="grid sm:grid-cols-2 gap-3 pt-2">
                {[
                  { i: QuestionIcon, t: "Perguntas Frequentes", d: "Respostas às dúvidas comuns" },
                  { i: HeadsetIcon, t: "Fale Conosco", d: "Suporte ao prestador" },
                  { i: WhatsappLogoIcon, t: "WhatsApp", d: "+244 923 000 000" },
                  { i: FileTextIcon, t: "Termos Legais", d: "Política e termos de uso" },
                ].map((l) => (
                  <a
                    key={l.t}
                    href="#"
                    className="flex items-center gap-3 p-4 rounded-xl border border-slate-200 bg-white hover:border-primary/40 hover:bg-primary/5 transition-colors"
                  >
                    <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                      <l.i weight="duotone" className="h-5 w-5" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-[#091B3D]">{l.t}</p>
                      <p className="text-xs text-muted-foreground">{l.d}</p>
                    </div>
                  </a>
                ))}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>

        <div className="pt-2">
          <Button
            variant="outline"
            className="text-destructive border-destructive/40 hover:bg-destructive/5 rounded-xl gap-2"
          >
            <SignOutIcon size={18} weight="bold" /> Terminar Sessão
          </Button>
        </div>
      </main>

      {/* COLUNA LATERAL */}
      <aside className="col-span-10 lg:col-span-3 flex flex-col gap-5">
        <Card className="relative overflow-hidden rounded-2xl bg-primary-gradient shadow-sm text-primary-foreground p-6 text-center border-none">
          <CardContent className="relative p-0">
            <div className="mx-auto w-20 aspect-square rounded-full bg-white/20 backdrop-blur border-2 border-white/30 flex items-center justify-center text-3xl font-extrabold">
              <span className="text-xl">EF</span>
            </div>
            <h2 className="mt-4 text-base font-extrabold">Enzo Fernandez</h2>
            <p className="text-sm opacity-90">Canalizador</p>
            <span className="inline-flex items-center gap-1 mt-3 text-xs font-bold bg-white/20 px-3 py-1 rounded-full">
              <PipeWrenchIcon size={14} weight="fill" /> Verificado
            </span>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 *:p-0">
          <CardHeader>
            <CardTitle>
              Dados de Contacto
            </CardTitle>  
          </CardHeader>
          <CardContent>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <EnvelopeIcon size={18} className="text-primary mt-0.5" />
                <div className="min-w-0">
                  <p className="text-[11px] uppercase font-bold text-muted-foreground">Email</p>
                  <p className="font-semibold truncate text-[#091B3D]">celso@nema.app</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <PhoneIcon size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase font-bold text-muted-foreground">Telefone</p>
                  <p className="font-semibold text-[#091B3D]">+244 923 456 789</p>
                </div>
              </li>
              <li className="flex items-start gap-3">
                <MapPinIcon size={18} className="text-primary mt-0.5" />
                <div>
                  <p className="text-[11px] uppercase font-bold text-muted-foreground">Endereço</p>
                  <p className="font-semibold text-[#091B3D]">Talatona, Luanda</p>
                </div>
              </li>
            </ul>
          </CardContent>
        </Card>
      </aside>
    </section>
  );
};

export { ProSettings };