import { useState } from "react";
import {
  GearIcon,
  MoonIcon,
  GlobeIcon,
  SignOutIcon,
  QuestionIcon,
  WhatsappLogoIcon,
  FileTextIcon,
  EnvelopeIcon,
  PlusIcon,
  UserIcon,
  BellIcon,
  MapPinIcon,
  HouseIcon,
  TrashIcon,
  BriefcaseIcon
} from "@phosphor-icons/react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
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
import { HeadsetIcon, PhoneIcon } from "lucide-react";

interface Address {
  id: string;
  label: string;
  full: string;
}

const ClientSettings = () => {
  const [addresses, setAddresses] = useState<Address[]>([
    { id: "1", label: "Casa", full: "Rua Comandante Gika 12, Maianga, Luanda" },
    { id: "2", label: "Trabalho", full: "Edifício Escom, Talatona, Luanda" },
  ]);
  const [newAddr, setNewAddr] = useState("");

  const addAddress = () => {
    if (!newAddr.trim()) return;
    setAddresses((a) => [
      ...a,
      { id: Date.now().toString(), label: "Outro", full: newAddr.trim() },
    ]);
    setNewAddr("");
  };

  const removeAddress = (id: string) =>
    setAddresses((a) => a.filter((x) => x.id !== id));

  return (
    <section className="w-full grid grid-cols-10 gap-10 px-10 pb-20 pt-8 bg-background">
      {/* COLUNA PRINCIPAL — 7/10 */}
      <main className="col-span-10 lg:col-span-7 flex flex-col gap-5">
        <Accordion
          type="single"
          collapsible
          defaultValue="profile"
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
                <span className="text-sm text-muted-foreground font-normal">Nome, foto, telefone e email</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-5">
              <div className="flex items-center gap-4">
                <div className="h-16 w-16 rounded-full bg-primary-gradient flex items-center justify-center text-xl font-extrabold text-primary-foreground">
                  EF
                </div>
                <Button type="button" variant="outline" size="sm" className="rounded-xl">
                  Alterar foto
                </Button>
              </div>
              <div className="grid sm:grid-cols-2 gap-5">
                <div className="space-y-2">
                  <Label htmlFor="name">Nome completo</Label>
                  <Input id="name" defaultValue="Enzo Fernández" className="rounded-xl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Telefone</Label>
                  <Input id="phone" defaultValue="+244 923 456 789" className="rounded-xl" />
                </div>
                <div className="space-y-2 sm:col-span-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" type="email" defaultValue="celso@nema.app" className="rounded-xl" />
                </div>
              </div>
              <div className="flex justify-end pt-2">
                <Button className="rounded-xl">Guardar alterações</Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 2. ENDEREÇOS GUARDADOS */}
          <AccordionItem
            value="addresses"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
              <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                <MapPinIcon weight="fill" className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center text-left h-full">
                <span className="text-foreground text-sm font-bold">Endereços Guardados</span>
                <span className="text-sm text-muted-foreground font-normal">Gerencie os seus locais de atendimento</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-4">
              <ul className="space-y-3">
                {addresses.map((addr) => (
                  <li
                    key={addr.id}
                    className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white"
                  >
                    <div className="flex items-center gap-3 min-w-0">
                      <div className="h-10 w-10 rounded-lg bg-primary/10 text-primary flex items-center justify-center shrink-0">
                        {addr.label === "Casa" ? (
                          <HouseIcon weight="duotone" className="h-5 w-5" />
                        ) : (
                          <BriefcaseIcon weight="duotone" className="h-5 w-5" />
                        )}
                      </div>
                      <div className="min-w-0">
                        <p className="font-semibold text-sm text-[#091B3D]">{addr.label}</p>
                        <p className="text-xs text-muted-foreground truncate">{addr.full}</p>
                      </div>
                    </div>
                    <Button
                      onClick={() => removeAddress(addr.id)}
                      variant="ghost"
                      className="text-destructive hover:bg-destructive/10 h-9 w-9 p-0 rounded-lg shrink-0"
                      aria-label="Remover endereço"
                    >
                      <TrashIcon className="h-4 w-4" />
                    </Button>
                  </li>
                ))}
              </ul>

              <div className="mt-2 flex gap-2">
                <Input
                  value={newAddr}
                  onChange={(e) => setNewAddr(e.target.value)}
                  placeholder="Adicionar novo endereço…"
                  className="rounded-xl"
                />
                <Button onClick={addAddress} className="rounded-xl shrink-0 gap-1">
                  <PlusIcon className="h-4 w-4" /> Adicionar
                </Button>
              </div>
            </AccordionContent>
          </AccordionItem>

          {/* 3. SISTEMA */}
          <AccordionItem
            value="system"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
              <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                <GearIcon weight="fill" className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center text-left h-full">
                <span className="text-foreground text-sm font-bold">Sistema</span>
                <span className="text-sm text-muted-foreground font-normal">Tema, idioma e gestão de conta</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-3">
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <MoonIcon weight="duotone" className="h-5 w-5 text-primary" />
                  <div>
                    <p className="font-semibold text-sm text-[#091B3D]">Modo escuro</p>
                    <p className="text-xs text-muted-foreground">Reduz o brilho do ecrã</p>
                  </div>
                </div>
                <Switch />
              </div>
              <div className="flex items-center justify-between p-4 rounded-xl border border-slate-200 bg-white">
                <div className="flex items-center gap-3">
                  <GlobeIcon weight="duotone" className="h-5 w-5 text-primary" />
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

          {/* 4. NOTIFICAÇÕES */}
          <AccordionItem
            value="notifications"
            className="bg-card border border-primary/20 shadow-sm shadow-primary/20 rounded-xl overflow-hidden data-[state=open]:shadow-md transition-shadow"
          >
            <AccordionTrigger className="bg-card flex items-center gap-2.5 p-5 hover:no-underline">
              <div className="bg-primary-gradient rounded-full flex items-center justify-center hover:bg-primary/15 transition-colors w-12 aspect-square">
                <BellIcon weight="fill" className="text-primary-foreground h-5 w-5" />
              </div>
              <div className="flex flex-col justify-center text-left h-full">
                <span className="text-foreground text-sm font-bold">Notificações</span>
                <span className="text-sm text-muted-foreground font-normal">Alertas de estado de pedidos e mensagens</span>
              </div>
            </AccordionTrigger>
            <AccordionContent className="border-t border-primary/15 flex flex-col justify-center p-5 space-y-3">
              {[
                { t: "Atualizações de Pedidos", d: "Alertas sobre o andamento dos seus serviços solicitados", on: true },
                { t: "Mensagens do Chat", d: "Notificações de novas mensagens enviadas pelos profissionais", on: true },
                { t: "Avisos do sistema", d: "Atualizações e manutenções da plataforma", on: true },
                { t: "Promoções e Descontos", d: "Campanhas e novidades exclusivas do Nema", on: false },
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

          {/* 5. AJUDA E SUPORTE */}
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
                  { i: HeadsetIcon, t: "Fale Conosco", d: "Suporte ao cliente" },
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
            className="bg-destructive/15 text-destructive border-destructive/40 hover:bg-destructive hover:text-primary-foreground rounded-xl gap-2"
          >
            <SignOutIcon size={18} weight="bold" /> Terminar Sessão
          </Button>
        </div>
      </main>

      {/* COLUNA LATERAL DIREITA — 3/10 (Mantendo Contexto do Cliente) */}
      <aside className="col-span-10 lg:col-span-3 flex flex-col gap-5">
        <Card className="relative overflow-hidden rounded-2xl bg-primary-gradient shadow-sm text-primary-foreground p-6 text-center border-none">
          <CardContent className="relative p-0">
            <div className="mx-auto w-20 aspect-square rounded-full bg-white/20 backdrop-blur border-2 border-white/30 flex items-center justify-center text-3xl font-extrabold">
              <span className="text-xl">EF</span>
            </div>
            <h2 className="mt-4 text-base font-extrabold">Enzo Fernández</h2>
            <p className="text-sm opacity-90">Cliente</p>
          </CardContent>
        </Card>

        <Card className="rounded-2xl bg-white border border-slate-200 shadow-sm p-5 *:p-0">
          <CardHeader>
            <CardTitle>Dados de Contacto</CardTitle>
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
                  <p className="text-[11px] uppercase font-bold text-muted-foreground">Endereço Principal</p>
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

export { ClientSettings };