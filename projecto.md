# BiscaTech / Nema — Estado do Projecto (Frontend)

> Documento alinhado ao **Levantamento de Requisitos — BiscaTech** (PRD) e ao código actual de `nemma_frontend`.  
> Foco principal: **o que já existe na UI** vs **o que ainda falta implementar**.

---

## 1. Contexto

**BiscaTech** é uma plataforma de intermediação tecnológica entre **clientes** e **prestadores de serviços técnicos** em Angola. O frontend (`nemma_frontend`) é a interface web da marca **Nema**, actualmente em fase de **protótipo visual funcional** — a maior parte dos fluxos existe como UI com dados mock, sem integração com backend.

### Objectivos do sistema (PRD §2)

| Objectivo | Reflectido no frontend? |
|---|---|
| Conectar prestadores a clientes | Parcial — fluxo visual existe, sem matching real |
| Clientes: pesquisar, solicitar, acompanhar, avaliar, reclamar | Parcial — falta reclamações e persistência |
| Prestadores: ver, aceitar, gerir solicitações, reclamar | Parcial — aceitar/cancelar/concluir sem efeito real |
| Agilidade, confiança, qualidade, transparência | UI de marketing e badges “verificado” (mock) |
| Catálogo diversificado de soluções | Parcial — catálogo estático implementado |

### Perfis de utilizador (PRD §3)

| Perfil PRD | No frontend | Estado |
|---|---|---|
| **Visitante** | Rotas públicas (`/`, `/services-catalog`, etc.) | UI pronta |
| **Cliente** | `role: "client"` | UI parcial, lógica mock |
| **Prestador** | `role: "pro"` | UI parcial, lógica mock |
| **Administrador** | — | **Não existe** — zero páginas ou rotas admin |

---

## 2. Stack e estrutura actual

### Tecnologias

React 19 · TypeScript · Vite 8 · React Router 7 · Tailwind 4 · shadcn/Radix · React Hook Form + Zod · Recharts · Framer Motion · Sonner · Deploy Vercel (SPA).

### Estrutura de código

```
src/
├── pages/
│   ├── public/          # Landing, auth, catálogo
│   └── auth/
│       ├── client/      # Dashboard, pedidos, criar pedido, status, avaliações
│       └── pro/           # Agenda, ganhos, histórico, definições
├── routes/              # publicRoutes, authRoutes
├── context/             # AuthProvider (localStorage)
├── layout/              # PrivateAppLayout (sidebar + header)
├── components/ui/       # Primitivos shadcn
└── components/custom/   # Sidebar, Header, Charts, etc.
```

### Rotas activas hoje

**Públicas:** `/` · `/sobre` · `/profissionais` · `/login` · `/auth/login` · `/auth/register` · `/auth/forgot-password` · `/verify` · `/services-catalog`

**Cliente:** `/client/dashboard` · `/client/history` · `/client/settings` · `/app/request/create` · `/app/request/:id` · `/app/rate/:id` · `/app/avaliacoes`

**Prestador:** `/pro/dashboard` · `/pro/balance` · `/pro/history` · `/pro/settings`

**Páginas existentes mas sem rota:** `orders.tsx`, `profile.tsx` (não registadas em `authRoutes.tsx`)

---

## 3. Estados do serviço — PRD vs Frontend

### Modelo oficial (PRD §4)

| Estado PRD | Descrição |
|---|---|
| **Pendente** | Aguarda aceitação por prestador |
| **Aceite** | Prestador aceitou; já não disponível para outros |
| **Concluído** | Finalizado pelo prestador **e confirmado pelo cliente** |
| **Cancelado** | Cancelado por cliente ou prestador |
| **Expirado** | Não aceite no prazo; cliente pode reactivar → Pendente |

### Modelo actual no código

| Estado no código | Onde | Alinhado ao PRD? |
|---|---|---|
| `pending` | `requestStatus.tsx` | Sim → Pendente |
| `accepted` | `requestStatus.tsx` | Sim → Aceite |
| `in_progress` | `requestStatus.tsx`, listagens | **Extra** — PRD não define; RF012 menciona “Em Andamento” |
| `completed` | `requestStatus.tsx` | Parcial — falta confirmação explícita do cliente |
| `cancelled` | `requestStatus.tsx` | Sim → Cancelado |
| `expired` | — | **Não implementado** |

**Gap crítico:** não há fluxo de expiração nem re-solicitação (RF024). Conclusão exige acção dupla (prestador marca + cliente confirma — RF013/RF014), mas a UI salta directamente para avaliação.

---

## 4. Mapa de requisitos funcionais

Legenda: ✅ Implementado · 🟡 UI/mock (sem backend/lógica real) · ❌ Por implementar

### 5.1 Contas e Autenticação

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF001 | Criação de contas (cliente e prestador) | 🟡 | `register.tsx` — formulário + validação Zod; registo simulado com `setTimeout` → `localStorage` |
| RF002 | Login por utilizador e palavra-passe | 🟡 | `login.tsx` — UI pronta; submit faz apenas `console.log`, **não autentica** |
| RF003 | Recuperação de palavra-passe (email/SMS) | 🟡 | `forgotPassword.tsx` — UI + toast; sem envio real |
| RF004 | Códigos de verificação de identidade | 🟡 | `verify.tsx` — OTP 6 dígitos simulado; sem SMS/email real |
| RF005 | Visitante vê landing e catálogo | ✅ | `home.tsx`, `servicesCatalog.tsx` — acessíveis sem auth |

**Por implementar (auth):**
- Integrar login/registo/recuperação/OTP com API
- JWT/sessão em vez de objecto em `localStorage`
- Google OAuth (botão presente, sem handler)
- `AppSidebar` e `AppHeader` usam `mockUser` — ignoram `useAuth()`
- Montar `<Toaster />` em `App.tsx` (Sonner usado mas não renderizado)
- Guards consistentes em todas as rotas privadas (`/client/*` hoje **sem** `RequireAuth`)

---

### 5.2 Solicitação de Serviços

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF006 | Solicitação predefinida ou personalizada | 🟡 | Catálogo navega para `requestCreate`; card “Serviço Personalizado” em `servicesCatalog.tsx`; distinção não persistida |
| RF007 | Campos: título, descrição, data, localização, categoria, tipo, preço | 🟡 | `requestCreate.tsx` tem título, descrição, data, localização, categoria; **falta tipo explícito e preço estipulado** |
| RF008 | Localização actual ou pesquisa | ❌ | Só campo texto livre; sem GPS, mapa ou autocomplete |
| RF009 | Predefinidas com campos pré-preenchidos editáveis | 🟡 | `state.service` pré-selecciona categoria; título/descrição/preço **não** vêm do catálogo |
| RF010 | Personalizadas criadas pelo utilizador | 🟡 | Formulário genérico; flag `custom: true` no navigate mas **não tratada** em `requestCreate` |
| RF011 | Guardar e exibir para prestadores | ❌ | Submit simulado; dados hardcoded em `proDashboard.tsx` |
| RF012 | Actualização automática de estado | ❌ | Estados mudam só em state local (`requestStatus.tsx`); sem eventos reais |
| RF013 | Prestador marca como concluído | ❌ | Botão “Aceitar” sem acção; **não existe** “Marcar concluído” |
| RF014 | Cliente confirma conclusão | ❌ | Não há passo de confirmação; vai directo para avaliação quando `completed` |

**Por implementar (solicitações):**
- Formulário completo: **tipo** (reparo/manutenção/instalação/emergência) + **preço estipulado**
- Pré-preenchimento a partir do serviço predefinido seleccionado (RF009)
- Upload de fotos (botão UI-only em `requestCreate.tsx`)
- Fluxo prestador: aceitar → em execução → marcar concluído
- Fluxo cliente: confirmar conclusão → avaliar
- Estado **Expirado** + botão **Re-solicitar** (RF024)
- Integração API + notificações de mudança de estado

---

### 5.3 Avaliações de Serviços

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF015 | Avaliar serviço e prestador após conclusão | 🟡 | `rate.tsx` — UI funcional com toast; sem persistência |
| RF016 | Nota de 1 a **10** | ❌ | UI usa escala **1–5** estrelas (`rate.tsx`) — **diverge do PRD** |
| RF017 | Comentário sobre a experiência | 🟡 | Campo opcional em `rate.tsx`; tags extra (“Pontual”, etc.) não estão no PRD |

**Por implementar (avaliações):**
- Alterar escala para 1–10 ou validar alteração do PRD
- Bloquear avaliação só após confirmação de conclusão (RF014)
- Persistir reviews; actualizar rating do prestador
- Página `avaliacoes.tsx` ligada a dados reais

---

### 5.4 Catalogação de Serviços Predefinidos

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF018 | Pesquisa por categoria | 🟡 | `clientHome.tsx`, `servicesCatalog.tsx` — pesquisa local em arrays estáticos |
| RF019 | Lista organizada de categorias e serviços | 🟡 | `servicesCatalog.tsx` — 6 secções hardcoded |
| RF020 | Página por categoria (ex: `/canalizacao`) | ❌ | Tudo numa página; **sem rotas dedicadas por categoria** |
| RF021 | Filtro por tipo (reparo, manutenção, instalação, emergência) | 🟡 | Tabs de intenção em `servicesCatalog.tsx`; filtro **não afecta** lista de serviços (só tema visual) |
| RF022 | Dialog com detalhes ao clicar serviço predefinido | ❌ | Click navega directo para `/app/request/create`; **sem Dialog de detalhes** |

**Por implementar (catálogo):**
- Rotas `/categorias/:slug` ou `/canalizacao` (RF020)
- Dialog de detalhes antes de solicitar (RF022)
- Filtro por tipo a filtrar serviços de facto (RF021)
- Dados vindos de API (admin gere categorias — RF034)
- Centralizar catálogo (hoje duplicado em `home.tsx`, `clientHome.tsx`, `requestCreate.tsx`)

---

### 5.5 Funcionalidades de Clientes

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF023 | Visualizar e acompanhar todas as solicitações | 🟡 | `clientHistory.tsx` — lista mock; `orders.tsx` existe mas **sem rota** |
| RF024 | Cancelar ou re-solicitar expiradas | 🟡 / ❌ | Cancelar em `requestStatus.tsx` (state local); **re-solicitar expiradas: não existe** |
| RF025 | Notificar cliente em mudanças de estado | 🟡 | Drawer de notificações em `appHeader.tsx` — **mock estático**; sem push/real-time |

**Por implementar (cliente):**
- Registar rota para listagem de pedidos (`/app/pedidos` ou unificar em `/client/history`)
- Registar rota de perfil (`profile.tsx` existe, rota removida)
- Fluxo completo de cancelamento com regras (antes/depois de aceite)
- Re-solicitar pedidos expirados
- Notificações reais (in-app no MVP; email/push pós-MVP)

---

### 5.6 Funcionalidades de Prestadores

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF026 | Exibir e notificar solicitações activas | 🟡 | `proDashboard.tsx` — cards mock; toggle disponibilidade local; sem notificações reais |
| RF027 | Ver detalhes antes de decidir | 🟡 | Dialog “Ver detalhes” com fotos Unsplash e info cliente — **mock** |
| RF028 | Aceitar solicitação | 🟡 | Botões “Aceitar” / “Aceitar Serviço” — **sem persistência** |
| RF029 | Cancelar serviço aceite | ❌ | Não existe acção de cancelamento pelo prestador |
| RF030 | Estatísticas e gráficos de desempenho | 🟡 | `proBalance.tsx`, `proHistory.tsx` — charts e números hardcoded |

**Por implementar (prestador):**
- Aceitar/rejeitar com efeito real + remoção da pool de outros prestadores
- Cancelar serviço aceite (RF029)
- Marcar concluído (RF013)
- Notificações de novos pedidos na zona
- Gráficos alimentados por dados reais
- `proSettings.tsx` — accordions duplicados, conteúdo placeholder (“ajd”); forms comentados

---

### 5.7 Ajuda e Suporte

| ID | Requisito | Estado | Onde / Notas |
|---|---|---|---|
| RF031 | Contactar suporte técnico | 🟡 | Links tel/WhatsApp em `profile.tsx`; secção “Ajuda e Suporte” planeado em `proSettings` (não implementado) |
| RF032 | Denúncias/reclamações → Central de Denúncias | ❌ | **Não existe** formulário de denúncia para cliente ou prestador |

**Por implementar (suporte):**
- Página/modal “Contactar suporte” (cliente + prestador)
- Formulário de denúncia/reclamação (RF032)
- Histórico de tickets do utilizador

---

### 5.8 Gestão Administrativa

| ID | Requisito | Estado |
|---|---|---|
| RF033 | Gerir definições gerais | ❌ |
| RF034 | Gerir categorias e serviços predefinidos | ❌ |
| RF035 | Moderar Central de Denúncias | ❌ |
| RF036 | Estatísticas globais da plataforma | ❌ |
| RF037 | Gerir utilizadores (verificar, suspender, banir) | ❌ |

**Por implementar (admin):** área administrativa completa — **fora do scope actual do frontend**. Requer novo conjunto de rotas (`/admin/*`), layout e páginas.

---

## 5. Requisitos não funcionais (PRD §6)

| ID | Requisito | Estado frontend |
|---|---|---|
| RNF001 | Desempenho elevado | N/A sem backend; bundle SPA leve (Vite) |
| RNF002 | Segurança e autenticação robusta | ❌ Auth mock; sem HTTPS enforcement, CSRF, etc. |
| RNF003 | Interface intuitiva | ✅ UI moderna, PT, mobile-friendly |
| RNF004 | Estabilidade e integridade | ❌ Sem persistência; dados inconsistentes entre páginas |
| RNF005 | Responsivo, multi-browser | ✅ Tailwind responsive; grid 7/3; sidebar colapsável |
| RNF006 | Escalabilidade | ❌ Depende de backend; frontend sem cache/state management |

---

## 6. MVP vs Pós-MVP (PRD §7)

### Incluído no MVP (PRD)

| Funcionalidade MVP | Frontend hoje | Gap principal |
|---|---|---|
| Contas e autenticação | UI ~80%, lógica ~20% | API, guards, login real |
| Catalogação predefinida | UI ~70% | Páginas por categoria, dialog detalhes, API |
| Pesquisa por categoria | UI ~60% | Filtro real, dados dinâmicos |
| Solicitação de serviços | UI ~75% | Campos em falta, fluxo de estados, API |
| Sistema de notificações | UI ~30% | Mock no header; sem real-time |
| Avaliações (notas + comentários) | UI ~65% | Escala errada (1–5 vs 1–10), sem persistência |
| Dashboard por perfil | UI ~80% | Dados mock; admin inexistente |

### Previsto para versões posteriores (PRD)

| Funcionalidade | No frontend? |
|---|---|
| Geolocalização com mapa | ❌ — só texto “Luanda” / bairros |
| Pagamento integrado | 🟡 — `proBalance.tsx` simula wallet/levantamento; sem gateway |
| Notificações email/push | ❌ |
| Sistema de indicações | ❌ |
| Estatísticas avançadas | 🟡 — charts mock no pro |

---

## 7. Resumo de implementação por módulo

```
Módulo                    UI    Lógica   Dados/API   Alinhado PRD
─────────────────────────────────────────────────────────────────
Landing / Marketing       ████  —        —           ✅
Auth                      ████  █        —           🟡
Catálogo                  ███   █        —           🟡
Solicitar serviço         ████  ██       —           🟡
Acompanhar pedido         ████  ██       —           🟡
Estados (incl. expirado)  ███   █        —           ❌
Avaliações                ███   ██       —           🟡
Notificações              ██    —        —           ❌
Dashboard cliente         ████  █        —           🟡
Dashboard prestador       ████  ██       —           🟡
Perfil / Definições       ███   █        —           🟡
Suporte / Denúncias       █     —        —           ❌
Admin                     —     —        —           ❌
```

---

## 8. Prioridades — o que implementar a seguir

Ordenado por dependência e valor para fechar o **MVP do PRD**:

### Fase 1 — Fundação (bloqueia tudo)

1. **Camada API** — `src/lib/api.ts`, hooks de dados, variável `VITE_API_URL`
2. **Auth real** — login, registo, OTP, guards em todas as rotas privadas
3. **Unificar routing** — uma árvore client, uma pro; corrigir redirects `/pro`, `/app`
4. **Estados alinhados ao PRD** — Pendente → Aceite → Concluído (com confirmação) → Cancelado / Expirado
5. **Montar `<Toaster />`** e ligar sidebar/header a `useAuth()`

### Fase 2 — Core MVP (PRD)

6. **Solicitação completa** — campos em falta (tipo, preço), predefinida vs personalizada, upload fotos
7. **Fluxo prestador** — aceitar, cancelar aceite, marcar concluído
8. **Fluxo cliente** — confirmar conclusão, cancelar, re-solicitar expiradas
9. **Catálogo** — páginas por categoria (RF020), dialog de detalhes (RF022), filtro por tipo funcional
10. **Notificações in-app** — drawer com dados reais (RF025, RF026)
11. **Avaliações** — escala 1–10, persistência, pós-confirmação

### Fase 3 — Completar MVP

12. **Perfil** — reactivar rotas `profile.tsx`, completar `clientSettings` e `proSettings`
13. **Suporte** — contacto + formulário de denúncia (RF031, RF032)
14. **Registar** `orders.tsx` ou consolidar com `clientHistory`
15. **Centralizar tipos** — `src/types/` (Order, User, Review, ServiceCategory…)

### Fase 4 — Fora do MVP actual (PRD pós-MVP + Admin)

16. Painel **Administrador** (RF033–RF037)
17. Geolocalização / mapa
18. Pagamentos integrados
19. Email/push notifications
20. Referrals e analytics avançados

---

## 9. Inconsistências a resolver (código vs PRD)

| # | Problema | Impacto |
|---|---|---|
| 1 | Escala avaliação 1–5 vs PRD 1–10 | RF016 |
| 2 | Estado `in_progress` extra vs PRD §4 | RF012 — clarificar com equipa |
| 3 | Conclusão sem confirmação do cliente | RF014 |
| 4 | Estado `expired` ausente | RF024 |
| 5 | Perfil administrador inexistente | RF033–037 |
| 6 | `orders.tsx` / `profile.tsx` sem rota | RF023 |
| 7 | `/client/*` sem `RequireAuth` | RF005/RNF002 |
| 8 | Catálogo: click → create, não dialog | RF022 |
| 9 | Dois layouts (`PrivateAppLayout` vs `AppShell`) | Manutenção |
| 10 | Dados mock divergentes entre páginas | RNF004 |

---

## 10. Conclusão

O frontend BiscaTech/Nema tem **boa cobertura visual do MVP** definido no PRD — landing, catálogo, formulários, dashboards cliente/prestador e fluxo de pedidos estão desenhados. No entanto, **nenhum requisito funcional está fully implementado**: falta backend, persistência, fluxos de estado completos, notificações reais, suporte/denúncias e toda a área admin.

**Estimativa rough:** ~70% da UI do MVP · ~15% da lógica de negócio · ~0% integração de dados.

O caminho crítico para alinhar com o PRD passa por: **auth real → solicitações com estados correctos (incl. expirado) → aceitar/concluir/confirmar → avaliar (1–10) → notificações in-app → catálogo com páginas por categoria**.

---

*Documento elaborado com base no PRD BiscaTech e na análise do código de `nemma_frontend`.*
