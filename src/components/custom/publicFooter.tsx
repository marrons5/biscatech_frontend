import { Link } from "react-router-dom";

const ProductLinks = [
  { to: "/", label: "Início" },
  { to: "/sobre", label: "Como funciona" },
  { to: "/profissionais", label: "Para profissionais" },
  { to: "#", label: "FAQ" },
];

const CompanyLinks = [
  { to: "#", label: "Sobre nós" },
  { to: "#", label: "Contacto" },
  { to: "#", label: "Carreiras" },
  { to: "#", label: "Blog" },
];

const LegalLinks = [
  { to: "#", label: "Termos de Serviço" },
  { to: "#", label: "Privacidade" },
  { to: "#", label: "Cookies" },
];

export const PublicFooter = () => {
  return (
    <footer className="bg-ink text-white mt-[64px]">
      <div className="max-w-[1280px] mx-auto px-[40px] py-12 grid grid-cols-1 md:grid-cols-4 gap-[24px]">
        <div className="col-span-1 flex flex-col gap-4">
          <span className="text-[20px] leading-[28px] font-semibold text-white">
            Biscatech
          </span>
          <p className="text-[16px] leading-6 text-white/70">
            Profissionais de confian&ccedil;a para o teu dia-a-dia, em minutos. A plataforma l&iacute;der em servi&ccedil;os t&eacute;cnicos em Luanda.
          </p>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[14px] leading-5 font-semibold tracking-[0.01em] uppercase text-white/60">
            Produto
          </h4>
          <nav className="flex flex-col gap-2">
            {ProductLinks.map((l) => (
              <Link
                key={l.label}
                to={l.to}
                className="text-[16px] leading-6 text-white/70 hover:text-white transition-colors"
              >
                {l.label}
              </Link>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[14px] leading-5 font-semibold tracking-[0.01em] uppercase text-white/60">
            Empresa
          </h4>
          <nav className="flex flex-col gap-2">
            {CompanyLinks.map((l) => (
              <span
                key={l.label}
                className="text-[16px] leading-6 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {l.label}
              </span>
            ))}
          </nav>
        </div>

        <div className="flex flex-col gap-4">
          <h4 className="text-[14px] leading-5 font-semibold tracking-[0.01em] uppercase text-white/60">
            Legal
          </h4>
          <nav className="flex flex-col gap-2">
            {LegalLinks.map((l) => (
              <span
                key={l.label}
                className="text-[16px] leading-6 text-white/70 hover:text-white transition-colors cursor-pointer"
              >
                {l.label}
              </span>
            ))}
          </nav>
        </div>
      </div>

      <div className="max-w-[1280px] mx-auto px-[40px] py-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
        <p className="text-[16px] leading-6 text-white/60">
          &copy; {new Date().getFullYear()} BiscaTech Engineering Services. All rights reserved.
        </p>
      </div>
    </footer>
  );
};
