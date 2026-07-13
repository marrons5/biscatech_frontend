import { PageHeader, Card, Badge } from "@/components/custom/primitives";
import { Camera, Star, ShieldCheck, FileText } from "lucide-react";
import { InputField } from "@/components/custom/authShell";
import { useEffect, useState, useContext } from "react";
import { AuthContext } from "@/context/authContext";
import { proService, type ProProfile } from "@/services/proService";

export default function ProProfile() {
  const { user } = useContext(AuthContext)!;
  const [profile, setProfile] = useState<ProProfile | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const res = await proService.getProfile();
        if (res.data.success) setProfile(res.data.data);
      } catch { /* ignore */ } finally { setLoading(false); }
    })();
  }, []);

  if (loading) return <div className="p-8 text-sm text-muted-foreground">A carregar...</div>;

  const name = profile?.user?.name ?? user?.name ?? "Profissional";
  const initials = profile?.user?.initials ?? user?.initials ?? "?";
  const rating = profile?.ratingAverage ? Number(profile.ratingAverage).toFixed(1) : "—";
  const completed = profile?.completedServices ?? 0;
  const skills = profile?.skills ?? [];
  const languages = profile?.languages ?? [];
  const zones = profile?.zones ?? [];
  const documents = profile?.documents ?? [];

  return (
    <>
      <PageHeader title="Perfil profissional" subtitle="Isto é o que os clientes vêem." />
      <div className="grid gap-6 lg:grid-cols-3">
        <Card className="lg:col-span-1 flex flex-col items-center text-center">
          <div className="relative">
            <div className="flex h-28 w-28 items-center justify-center rounded-full bg-primary text-3xl font-semibold text-primary-foreground">{initials}</div>
            <button className="absolute bottom-1 right-1 rounded-full border border-border bg-card p-2 shadow-sm hover:border-primary">
              <Camera className="h-4 w-4 text-ink" />
            </button>
          </div>
          <div className="mt-4 flex items-center gap-2">
            <h2 className="text-xl font-semibold text-ink">{name}</h2>
            {profile?.verified && <ShieldCheck className="h-5 w-5 text-primary" />}
          </div>
          <p className="text-sm text-muted-foreground">{zones.map((z) => z.zone).join(", ")}</p>
          <div className="mt-4 flex items-center gap-1 text-sm">
            <Star className="h-4 w-4 fill-primary text-primary" />
            <span className="font-semibold text-ink">{rating}</span>
            <span className="text-muted-foreground">· {completed} serviços</span>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-1.5">
            {profile?.verified && <Badge tone="success">Verificado</Badge>}
            {profile?.status === "ACTIVE" && <Badge tone="primary">Activo</Badge>}
            {profile?.experienceYears && profile.experienceYears > 0 && <Badge tone="warning">{profile.experienceYears} anos</Badge>}
          </div>
        </Card>

        <Card className="lg:col-span-2 space-y-6">
          <div>
            <h2 className="text-lg font-semibold text-ink">Sobre</h2>
            <textarea rows={4} defaultValue={profile?.bio ?? ""} className="mt-3 w-full rounded-xl border border-border bg-card p-3 text-sm outline-none focus:border-primary" />
          </div>
          <div className="grid gap-4 sm:grid-cols-2">
            <InputField label="Anos de experiência" defaultValue={String(profile?.experienceYears ?? "")} />
            <InputField label="Zonas cobertas" defaultValue={zones.map((z) => z.zone).join(", ")} />
            <InputField label="Idiomas" defaultValue={languages.map((l) => l.language).join(", ")} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-ink">Competências</p>
            <div className="flex flex-wrap gap-2">
              {skills.length === 0 ? <span className="text-sm text-muted-foreground">Nenhuma competência adicionada.</span>
              : skills.map((s) => (<Badge key={s.id} tone="neutral">{s.name}</Badge>))}
            </div>
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-ink">Documentos</p>
            <ul className="space-y-2 text-sm">
              {documents.length === 0 ? <span className="text-sm text-muted-foreground">Nenhum documento enviado.</span>
              : documents.map((d) => (
                <li key={d.id} className="flex items-center gap-3 rounded-xl border border-border p-3">
                  <FileText className="h-4 w-4 text-muted-foreground" />
                  <span className="flex-1 text-ink">{d.name}</span>
                  <Badge tone={d.status === "APPROVED" ? "success" : d.status === "REJECTED" ? "danger" : "warning"}>
                    {d.status === "APPROVED" ? "Aprovado" : d.status === "REJECTED" ? "Rejeitado" : "Em análise"}
                  </Badge>
                </li>
              ))}
            </ul>
          </div>
        </Card>
      </div>
    </>
  );
}
