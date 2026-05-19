import { Link } from "react-router-dom";
import { Logo } from "./logo";

export const PublicFooter = () => {
  return (
    <footer className="border-t border-border/60 bg-card/40 mt-16">
      <div className="px-12 py-10 grid gap-8 md:grid-cols-4">
        <div className="space-y-3">
          <Logo />
          <p className="text-sm text-zinc-400 max-w-xs">
            Profissionais de confiança para o teu dia-a-dia, em minutos.
          </p>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-zinc-400 mb-3">
            Produto
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <Link to="/sobre" className="hover:text-primary">
                Como funciona
              </Link>
            </li>
            <li>
              <Link to="/profissionais" className="hover:text-primary">
                Para profissionais
              </Link>
            </li>
            <li>
              <Link to="/login" className="hover:text-primary">
                Entrar
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-zinc-400 mb-3">
            Empresa
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-primary cursor-pointer">Sobre nós</a>
            </li>
            <li>
              <a className="hover:text-primary cursor-pointer">Contacto</a>
            </li>
          </ul>
        </div>
        <div>
          <p className="text-xs uppercase tracking-wider font-bold text-zinc-400 mb-3">
            Legal
          </p>
          <ul className="space-y-2 text-sm">
            <li>
              <a className="hover:text-primary cursor-pointer">Termos</a>
            </li>
            <li>
              <a className="hover:text-primary cursor-pointer">Privacidade</a>
            </li>
          </ul>
        </div>
      </div>
      <div className="border-t border-border/60 py-4 text-center text-xs text-muted-foreground">
        © {new Date().getFullYear()} NEMA · Luanda, Angola
      </div>
    </footer>
  );
};
