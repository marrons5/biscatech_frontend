import { PageHeader, Card } from "@/components/custom/primitives";
import { Camera, Mail, Phone } from "lucide-react";
import { InputField } from "@/components/custom/authShell";
import { AuthContext } from "@/context/authContext";
import { useContext } from "react";

export default function Profile() {
  const { user } = useContext(AuthContext)!;

  return (
    <>
      <PageHeader title="O meu perfil" subtitle="Actualiza a tua informação pessoal." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">{user?.initials ?? "?"}</div>
            <button className="absolute bottom-1 right-1 rounded-full border border-border bg-card p-2 shadow-sm hover:border-primary">
              <Camera className="h-4 w-4 text-ink" />
            </button>
          </div>
          <h2 className="mt-5 text-xl font-semibold text-ink">{user?.name ?? "Utilizador"}</h2>
          <p className="text-sm text-muted-foreground">{user?.role === "provider" ? "Prestador" : "Cliente"}</p>
          <ul className="mt-6 w-full space-y-2 text-left text-sm text-muted-foreground">
            <li className="flex items-center gap-2"><Mail className="h-4 w-4" /> {user?.email ?? "—"}</li>
            <li className="flex items-center gap-2"><Phone className="h-4 w-4" /> {user?.phone ?? "—"}</li>
          </ul>
        </Card>
        <Card className="lg:col-span-2">
          <h2 className="text-lg font-semibold text-ink">Informação pessoal</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            <InputField label="Nome" defaultValue={user?.name ?? ""} />
            <InputField label="Email" type="email" defaultValue={user?.email ?? ""} />
            <InputField label="Telemóvel" type="tel" defaultValue={user?.phone ?? ""} />
          </div>
          <div className="mt-8 flex justify-end gap-2">
            <button className="rounded-xl border border-border px-5 py-2.5 text-sm font-medium text-ink hover:bg-muted">Cancelar</button>
            <button className="rounded-xl bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground shadow-sm shadow-primary/20 transition hover:-translate-y-0.5 hover:shadow-lg">Guardar alterações</button>
          </div>
        </Card>
      </div>
    </>
  );
}
