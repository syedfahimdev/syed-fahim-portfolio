import { ArrowUpRight, Bot, BriefcaseBusiness, Code2, GitBranch, Mail, Network, Radar, ShieldCheck, Sparkles, Workflow, Zap } from "lucide-react";
import { CommandCenterScene } from "./components/command-center-scene";

const metrics = [
  { value: "50+", label: "technical accounts owned" },
  { value: "95%", label: "customer satisfaction" },
  { value: "15%", label: "revenue expansion" },
  { value: "30%", label: "fewer support escalations" },
];

const commandLayers = [
  {
    icon: BriefcaseBusiness,
    title: "Customer Success Leadership",
    body: "Owns onboarding, renewals, QBRs, executive conversations, health scoring, churn prevention, and expansion across technical SaaS accounts.",
  },
  {
    icon: Bot,
    title: "AI Customer Operations",
    body: "Builds LLM-powered reporting, ticket triage, follow-up generation, and knowledge retrieval systems that remove repetitive CS work.",
  },
  {
    icon: Code2,
    title: "Full-Stack Technical Fluency",
    body: "Comfortable in APIs, data flows, integrations, Python, TypeScript, React, Next.js, cloud infrastructure, Docker, Linux, and Vercel.",
  },
];

const projects = [
  {
    name: "MAWA",
    eyebrow: "AI Customer Success Assistant",
    result: "40+ integrations / 1,000+ daily API requests",
    body: "Daily-use AI assistant for account reporting, ticket triage, knowledge retrieval, and customer follow-up generation.",
    stack: ["Python", "TypeScript", "React", "REST", "WebSocket"],
  },
  {
    name: "CornerRush",
    eyebrow: "Early-Stage SaaS Platform",
    result: "90+ Lighthouse / sub-2s voice agent",
    body: "Built AI audit wizard, quote calculator, and lead-qualification voice agent while owning pricing, onboarding, and discovery.",
    stack: ["Next.js", "Vercel", "AI", "Voice"],
  },
  {
    name: "ToolsDNS",
    eyebrow: "REST API Discovery Service",
    result: "5,000+ tools / <200ms JSON responses",
    body: "Developer-facing discovery layer that reduces tool-selection overhead and cuts token consumption in multi-tool AI environments.",
    stack: ["Python", "REST APIs", "JSON", "Search"],
  },
  {
    name: "Everi CS Automation",
    eyebrow: "Customer Health + Reporting Engine",
    result: "4 hours → 5 minutes per account",
    body: "Built health scoring and reporting workflows that surfaced churn risk early and reduced monthly support ticket volume by 30%.",
    stack: ["CS Ops", "n8n", "Python", "LLMs"],
  },
];

const timeline = [
  {
    role: "Customer Success Manager / Customer Engineer Advocate",
    company: "Everi Holdings Inc",
    years: "2020 — Present",
    detail: "Owns 50+ technical accounts, C-level QBRs, renewals, integrations, adoption, health scoring, and expansion conversations.",
  },
  {
    role: "DevOps Engineer",
    company: "Thermo Fisher Scientific",
    years: "2019 — 2021",
    detail: "Built CI/CD pipelines and cloud infrastructure for 50+ microservices across AWS, Azure, GCP, Docker, Kubernetes, and Terraform.",
  },
  {
    role: "System Administrator",
    company: "Persona",
    years: "2016 — 2019",
    detail: "Maintained 100+ production systems at 99.9% uptime and automated monitoring workflows to reduce manual operations by 50%.",
  },
];

const skills = [
  "Customer Success Management",
  "Enterprise Account Ownership",
  "QBRs + Renewals",
  "Technical Onboarding",
  "API Integrations",
  "Customer Health Scoring",
  "AI Workflow Automation",
  "Python / FastAPI",
  "TypeScript / React / Next.js",
  "PostgreSQL",
  "Docker / Linux / Cloud",
  "Vercel Deployment",
];

export default function Home() {
  return (
    <main className="min-h-screen overflow-hidden bg-slate-950 text-white">
      <section className="relative min-h-[100svh] border-b border-white/10">
        <CommandCenterScene />
        <div className="absolute inset-0 bg-[linear-gradient(90deg,rgba(2,6,23,0.98)_0%,rgba(2,6,23,0.86)_36%,rgba(2,6,23,0.36)_64%,rgba(2,6,23,0.78)_100%),linear-gradient(180deg,rgba(2,6,23,0.12),rgba(2,6,23,0.92)_88%)]" />
        <nav className="relative z-10 mx-auto flex w-full max-w-7xl items-center justify-between px-5 py-5 sm:px-8">
          <a href="#top" className="group flex items-center gap-3">
            <span className="grid size-10 place-items-center rounded-2xl border border-cyan-200/20 bg-cyan-200/10 text-sm font-semibold text-cyan-100 shadow-[0_0_32px_rgba(34,211,238,0.18)]">SF</span>
            <span className="hidden text-sm font-medium tracking-[0.24em] text-slate-300 sm:block">SYED FAHIM</span>
          </a>
          <div className="hidden items-center gap-7 rounded-full border border-white/10 bg-slate-950/45 px-5 py-3 text-sm text-slate-300 backdrop-blur-xl md:flex">
            <a href="#systems" className="hover:text-cyan-200">Systems</a>
            <a href="#projects" className="hover:text-cyan-200">Projects</a>
            <a href="#experience" className="hover:text-cyan-200">Experience</a>
            <a href="#contact" className="hover:text-cyan-200">Contact</a>
          </div>
          <a href="mailto:syedfahimdev@gmail.com" className="rounded-full border border-cyan-200/25 bg-cyan-200/10 px-4 py-2 text-sm font-medium text-cyan-100 backdrop-blur-xl transition hover:bg-cyan-200/20">Contact</a>
        </nav>

        <div id="top" className="relative z-10 mx-auto grid min-h-[calc(100svh-90px)] w-full max-w-7xl items-center gap-12 px-5 pb-16 pt-10 sm:px-8 lg:grid-cols-[1.02fr_0.98fr] lg:pt-0">
          <div className="max-w-3xl">
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm text-emerald-100 shadow-[0_0_32px_rgba(52,211,153,0.12)] backdrop-blur-xl">
              <Sparkles className="size-4" strokeWidth={1.5} />
              AI Customer Success Command Center
            </div>
            <h1 className="max-w-5xl text-5xl font-semibold tracking-tight text-white sm:text-6xl lg:text-7xl">
              Customer success leader building AI systems for technical teams.
            </h1>
            <p className="mt-6 max-w-2xl text-lg leading-8 text-slate-300 sm:text-xl">
              I combine SaaS account ownership, API integration fluency, and full-stack AI automation to help customers reach value faster — and help teams scale without drowning in manual work.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <a href="#projects" className="group inline-flex items-center justify-center gap-2 rounded-full bg-cyan-200 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-white">
                Explore proof of work <ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" strokeWidth={1.5} />
              </a>
              <a href="/Syed_Fahim_Resume_CSM.pdf" className="inline-flex items-center justify-center gap-2 rounded-full border border-white/15 bg-white/5 px-6 py-3 text-sm font-semibold text-white backdrop-blur-xl transition hover:bg-white/10">
                Download resume
              </a>
            </div>
          </div>

          <div className="rounded-[2rem] border border-white/10 bg-slate-950/55 p-4 shadow-2xl shadow-cyan-950/30 backdrop-blur-2xl lg:translate-y-16">
            <div className="rounded-[1.45rem] border border-white/10 bg-[radial-gradient(circle_at_top,rgba(34,211,238,0.16),rgba(15,23,42,0.72)_46%,rgba(2,6,23,0.92))] p-5">
              <div className="mb-6 flex items-center justify-between text-xs uppercase tracking-[0.28em] text-slate-400">
                <span>Live portfolio signal</span>
                <span className="inline-flex items-center gap-2 text-emerald-300"><span className="size-2 rounded-full bg-emerald-300 shadow-[0_0_16px_rgba(52,211,153,0.8)]" /> Online</span>
              </div>
              <div className="grid grid-cols-2 gap-3">
                {metrics.map((metric) => (
                  <div key={metric.label} className="rounded-3xl border border-white/10 bg-white/[0.045] p-4">
                    <div className="text-3xl font-semibold tracking-tight text-white">{metric.value}</div>
                    <div className="mt-2 text-sm leading-5 text-slate-400">{metric.label}</div>
                  </div>
                ))}
              </div>
              <div className="mt-4 rounded-3xl border border-cyan-200/15 bg-cyan-200/[0.06] p-4 text-sm leading-6 text-cyan-50">
                <span className="font-semibold text-white">Signal:</span> built AI-driven CS automations that compressed account reporting from 4 hours to 5 minutes per account.
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="systems" className="relative mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <div className="mb-12 max-w-3xl">
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Operating system</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Three layers of value in one profile.</h2>
          <p className="mt-5 text-lg leading-8 text-slate-400">The portfolio is designed like a command center because Fahim’s strongest edge is connecting customer outcomes, technical systems, and AI automation into one operating loop.</p>
        </div>
        <div className="grid gap-4 md:grid-cols-3">
          {commandLayers.map((layer) => {
            const Icon = layer.icon;
            return (
              <article key={layer.title} className="group rounded-[2rem] border border-white/10 bg-white/[0.04] p-6 transition hover:-translate-y-1 hover:border-cyan-200/30 hover:bg-white/[0.065]">
                <div className="mb-8 grid size-12 place-items-center rounded-2xl border border-cyan-200/15 bg-cyan-200/10 text-cyan-200">
                  <Icon className="size-5" strokeWidth={1.5} />
                </div>
                <h3 className="text-xl font-semibold tracking-tight">{layer.title}</h3>
                <p className="mt-4 leading-7 text-slate-400">{layer.body}</p>
              </article>
            );
          })}
        </div>
      </section>

      <section id="projects" className="border-y border-white/10 bg-white/[0.025] py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-12 flex flex-col justify-between gap-6 lg:flex-row lg:items-end">
            <div className="max-w-3xl">
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-300">Proof of work</p>
              <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Projects that prove the hybrid.</h2>
            </div>
            <p className="max-w-md leading-7 text-slate-400">Each module ties a business outcome to the technical system behind it — the exact story hiring managers remember.</p>
          </div>
          <div className="grid gap-5 lg:grid-cols-2">
            {projects.map((project) => (
              <article key={project.name} className="rounded-[2rem] border border-white/10 bg-slate-950/65 p-6 shadow-2xl shadow-black/20 transition hover:border-cyan-200/25">
                <div className="flex flex-col justify-between gap-5 sm:flex-row sm:items-start">
                  <div>
                    <p className="text-sm font-medium text-cyan-200">{project.eyebrow}</p>
                    <h3 className="mt-2 text-3xl font-semibold tracking-tight">{project.name}</h3>
                  </div>
                  <div className="rounded-full border border-emerald-300/20 bg-emerald-300/10 px-4 py-2 text-sm font-semibold text-emerald-200">{project.result}</div>
                </div>
                <p className="mt-5 text-lg leading-8 text-slate-300">{project.body}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {project.stack.map((item) => (
                    <span key={item} className="rounded-full border border-white/10 bg-white/[0.045] px-3 py-1 text-sm text-slate-300">{item}</span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="experience" className="mx-auto grid w-full max-w-7xl gap-12 px-5 py-24 sm:px-8 lg:grid-cols-[0.8fr_1.2fr]">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.3em] text-amber-300">Experience</p>
          <h2 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl">Built from the front line.</h2>
          <p className="mt-5 leading-8 text-slate-400">Fahim’s portfolio story is not theoretical. It comes from years of customer-facing ownership plus hands-on infrastructure, automation, and software delivery.</p>
        </div>
        <div className="space-y-4">
          {timeline.map((item) => (
            <article key={`${item.company}-${item.years}`} className="rounded-[2rem] border border-white/10 bg-white/[0.04] p-6">
              <div className="flex flex-col justify-between gap-2 sm:flex-row sm:items-start">
                <div>
                  <h3 className="text-xl font-semibold tracking-tight">{item.role}</h3>
                  <p className="mt-1 text-cyan-200">{item.company}</p>
                </div>
                <p className="text-sm text-slate-500">{item.years}</p>
              </div>
              <p className="mt-4 leading-7 text-slate-400">{item.detail}</p>
            </article>
          ))}
        </div>
      </section>

      <section className="border-y border-white/10 bg-[radial-gradient(circle_at_center,rgba(14,165,233,0.09),transparent_50%)] py-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8">
          <div className="mb-10 flex items-center gap-3">
            <Radar className="size-6 text-cyan-200" strokeWidth={1.5} />
            <h2 className="text-3xl font-semibold tracking-tight">Skill signal map</h2>
          </div>
          <div className="flex flex-wrap gap-3">
            {skills.map((skill) => (
              <span key={skill} className="rounded-full border border-white/10 bg-white/[0.05] px-4 py-2 text-sm text-slate-300 shadow-[0_0_24px_rgba(15,23,42,0.2)]">{skill}</span>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="mx-auto w-full max-w-7xl px-5 py-24 sm:px-8">
        <div className="overflow-hidden rounded-[2.5rem] border border-cyan-200/15 bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.18),transparent_42%),linear-gradient(135deg,rgba(15,23,42,0.92),rgba(2,6,23,0.98))] p-8 shadow-2xl shadow-cyan-950/30 sm:p-12">
          <div className="grid gap-10 lg:grid-cols-[1.1fr_0.9fr] lg:items-end">
            <div>
              <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">Ready for the next mission</p>
              <h2 className="mt-4 max-w-3xl text-4xl font-semibold tracking-tight sm:text-6xl">Let’s build customer success systems that actually scale.</h2>
              <p className="mt-5 max-w-2xl text-lg leading-8 text-slate-300">Open to technical customer success, customer engineering, AI customer operations, and full-stack automation roles where customer outcomes and systems thinking matter.</p>
            </div>
            <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-1">
              <a href="mailto:syedfahimdev@gmail.com" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-slate-100 transition hover:bg-white/[0.1]"><span className="inline-flex items-center gap-3"><Mail className="size-5 text-cyan-200" strokeWidth={1.5} /> Email Fahim</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              <a href="https://linkedin.com/in/syedfahimdev" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-slate-100 transition hover:bg-white/[0.1]"><span className="inline-flex items-center gap-3"><Network className="size-5 text-cyan-200" strokeWidth={1.5} /> LinkedIn</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
              <a href="https://github.com/syedfahimdev" target="_blank" rel="noreferrer" className="group flex items-center justify-between rounded-2xl border border-white/10 bg-white/[0.06] p-4 text-slate-100 transition hover:bg-white/[0.1]"><span className="inline-flex items-center gap-3"><GitBranch className="size-5 text-cyan-200" strokeWidth={1.5} /> GitHub</span><ArrowUpRight className="size-4 transition group-hover:translate-x-0.5 group-hover:-translate-y-0.5" /></a>
            </div>
          </div>
        </div>
      </section>

      <footer className="border-t border-white/10 px-5 py-8 text-center text-sm text-slate-500 sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 sm:flex-row">
          <p>© 2026 Syed Fahim. AI Customer Success Command Center.</p>
          <div className="flex items-center gap-4 text-slate-400">
            <span className="inline-flex items-center gap-2"><ShieldCheck className="size-4 text-emerald-300" strokeWidth={1.5} /> Customer trust</span>
            <span className="inline-flex items-center gap-2"><Workflow className="size-4 text-cyan-300" strokeWidth={1.5} /> Automation</span>
            <span className="inline-flex items-center gap-2"><Zap className="size-4 text-amber-300" strokeWidth={1.5} /> Time-to-value</span>
          </div>
        </div>
      </footer>
    </main>
  );
}
