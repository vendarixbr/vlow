import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Shield,
  Sparkles,
  Layers,
  Eye,
  Car,
  Film,
  MapPin,
  Clock,
  Zap,
  Award,
  ArrowRight,
  Star,
  CheckCircle2,
} from "lucide-react";
import Quiz from "@/components/Quiz";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

// ─── Section animation wrapper ─────────────────────────────────────────────────
function FadeIn({ children, delay = 0, className = "" }: { children: React.ReactNode; delay?: number; className?: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.55, delay, ease: [0.23, 1, 0.32, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
}

// ─── Section label ─────────────────────────────────────────────────────────────
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <div className="h-px w-8 bg-neon flex-shrink-0" />
      <span className="text-xs font-black tracking-[0.4em] text-neon uppercase">{children}</span>
    </div>
  );
}

// ─── Urgency Banner ────────────────────────────────────────────────────────────
function UrgencyBanner({ onStart }: { onStart: () => void }) {
  return (
    <div className="bg-neon text-black py-2 px-4">
      <div className="flex items-center justify-center gap-2 flex-wrap">
        <Zap className="w-3 h-3 flex-shrink-0" fill="currentColor" />
        <span className="text-[11px] font-black uppercase tracking-widest">
          Diagnóstico gratuito — descubra o serviço ideal para o seu veículo em 2 minutos
        </span>
        <button
          onClick={onStart}
          className="text-[11px] font-black uppercase tracking-widest underline hover:no-underline flex-shrink-0"
        >
          Iniciar →
        </button>
      </div>
    </div>
  );
}

// ─── Stats Bar ─────────────────────────────────────────────────────────────────
function StatsBar() {
  const stats = [
    { value: "1.325+", label: "VEÍCULOS PROTEGIDOS" },
    { value: "5.0", label: "GOOGLE REVIEWS" },
    { value: "PREMIUM", label: "MATERIAIS TIPO A" },
    { value: "10 ANOS", label: "GARANTIA PPF" },
  ];

  return (
    <div className="border-t border-b border-white/10 py-4">
      <div className="grid grid-cols-2 md:grid-cols-4 gap-0 divide-y md:divide-y-0 md:divide-x divide-white/10">
        {stats.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 + i * 0.1 }}
            className="text-center px-4 py-3 md:py-0"
          >
            <div className="text-neon font-display font-black text-2xl md:text-3xl neon-text-glow">
              {s.value}
            </div>
            <div className="text-white/40 text-[10px] font-bold tracking-widest uppercase mt-1">
              {s.label}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

// ─── Hero Section ──────────────────────────────────────────────────────────────
function HeroSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="relative min-h-[100svh] flex flex-col overflow-hidden bg-[#080808]">
      {/* Background effects */}
      <div className="absolute inset-0 pointer-events-none">
        <div
          className="absolute top-0 right-0 w-2/3 h-full opacity-[0.04]"
          style={{
            background:
              "radial-gradient(ellipse at 80% 20%, oklch(0.88 0.25 130) 0%, transparent 65%)",
          }}
        />
        <div
          className="absolute bottom-0 left-0 w-1/2 h-1/2 opacity-[0.03]"
          style={{
            background:
              "radial-gradient(ellipse at 10% 90%, oklch(0.88 0.25 130) 0%, transparent 60%)",
          }}
        />
        <div
          className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage:
              "linear-gradient(oklch(0.88 0.25 130) 1px, transparent 1px), linear-gradient(90deg, oklch(0.88 0.25 130) 1px, transparent 1px)",
            backgroundSize: "60px 60px",
          }}
        />
      </div>

      {/* Nav */}
      <nav className="relative z-10 flex items-center justify-between px-6 md:px-12 py-5">
        <div className="flex items-center gap-3">
          <img
            src="/logotipo.png"
            alt="NETTO RAZZÉ"
            className="h-9 md:h-11 w-auto object-contain"
            onError={(e) => {
              (e.currentTarget as HTMLImageElement).style.display = "none";
              (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "flex";
            }}
          />
          <div className="hidden items-center gap-3 font-display font-black text-xl md:text-2xl text-white tracking-wider">
            NETTO<span className="text-neon">RAZZE</span>
            <div className="hidden md:block h-4 w-px bg-white/20 ml-3" />
            <div className="hidden md:block text-xs font-bold tracking-[0.3em] text-white/40 uppercase">
              CHAVANTES
            </div>
          </div>
        </div>
        <a
          href="https://wa.me/5514998135198"
          target="_blank"
          rel="noopener noreferrer"
          className="border border-neon text-neon text-[11px] font-black uppercase tracking-widest px-4 py-2
            hover:bg-neon hover:text-black transition-all duration-200"
        >
          ORÇAMENTO
        </a>
      </nav>

      {/* Hero Content */}
      <div className="relative z-10 flex-1 flex flex-col justify-center px-6 md:px-12 py-8 md:py-0">
        <div className="max-w-3xl">
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="flex items-center gap-3 mb-6"
          >
            <div className="h-px w-8 bg-neon" />
            <span className="text-xs font-black tracking-[0.4em] text-neon uppercase">
              ESTÉTICA AUTOMOTIVA PREMIUM
            </span>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1, duration: 0.65 }}
            className="font-display font-black text-[clamp(3rem,10vw,7rem)] uppercase leading-[0.92] text-white mb-6"
          >
            ESTÉTICA
            <br />
            <span className="text-neon neon-text-glow">AUTOMOTIVA</span>
            <br />
            NO LIMITE.
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="text-white/60 text-base md:text-lg font-medium max-w-xl mb-8 leading-relaxed"
          >
            Responda{" "}
            <span className="text-white font-bold">6 perguntas rápidas</span> e descubra qual
            serviço de proteção é ideal para o seu veículo — com recomendação personalizada e
            orçamento direto no WhatsApp.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.45, duration: 0.5 }}
            className="flex flex-col sm:flex-row gap-4 items-start"
          >
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-neon text-black font-black uppercase tracking-widest px-8 py-4 text-sm
                hover:bg-neon/90 transition-colors neon-glow flex items-center gap-2"
            >
              DESCOBRIR MEU SERVIÇO IDEAL
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <div className="flex items-center gap-2 text-white/40 text-xs font-medium self-center">
              <Clock className="w-3.5 h-3.5" />
              <span>Menos de 2 minutos · Diagnóstico gratuito</span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.7 }}
            className="flex items-center gap-2 mt-6"
          >
            <div className="flex">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="w-3.5 h-3.5 text-neon fill-neon" />
              ))}
            </div>
            <span className="text-white/50 text-xs font-medium">
              5.0 no Google · Mais de 1.325 veículos protegidos
            </span>
          </motion.div>
        </div>
      </div>

      {/* Stats Bar */}
      <div className="relative z-10 px-0">
        <StatsBar />
      </div>

      {/* Services strip */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.9 }}
        className="relative z-10 px-6 md:px-12 py-5 overflow-hidden"
      >
        <div className="flex gap-8 md:gap-12 overflow-x-auto pb-1 scrollbar-hide">
          {["PPF", "INSULFILM", "POLIMENTO", "ESTÉTICA", "COATING", "VIDROS"].map((s, i) => (
            <div
              key={i}
              className="flex-shrink-0 text-[10px] font-black tracking-[0.35em] text-white/20 uppercase"
            >
              {String(i + 1).padStart(2, "0")} — {s}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}

// ─── Services Section ──────────────────────────────────────────────────────────
const SERVICES_LIST = [
  {
    icon: <Shield className="w-6 h-6" />,
    name: "PPF",
    label: "Proteção de Pintura",
    description: "Film transparente que protege contra riscos, pedradas e UV com garantia de 10 anos.",
    badge: "10 ANOS",
  },
  {
    icon: <Film className="w-6 h-6" />,
    name: "INSULFILM",
    label: "Película de Segurança",
    description: "Bloqueia até 99% dos raios UV e reduz o calor interno em até 60% com películas ABNT.",
    badge: "5 ANOS",
  },
  {
    icon: <Sparkles className="w-6 h-6" />,
    name: "POLIMENTO",
    label: "Correção de Pintura",
    description: "Remove riscos, oxidação e marcas de lavagem, devolvendo o brilho original da pintura.",
  },
  {
    icon: <Car className="w-6 h-6" />,
    name: "ESTÉTICA",
    label: "Estética Completa",
    description: "Higienização completa interna e externa, revitalização e finalização premium.",
  },
  {
    icon: <Layers className="w-6 h-6" />,
    name: "COATING",
    label: "Proteção Cerâmica",
    description: "Nanocerâmica 9H aplicada sobre a pintura com brilho intenso e proteção química por anos.",
    badge: "5 ANOS",
  },
  {
    icon: <Eye className="w-6 h-6" />,
    name: "VIDROS",
    label: "Tratamento de Vidros",
    description: "Tratamento hidrofóbico que repele água e melhora a visibilidade na chuva.",
    badge: "1 ANO",
  },
];

function ServicesSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn>
          <SectionLabel>SERVIÇOS</SectionLabel>
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white leading-none">
              PROTEÇÃO E ESTÉTICA
              <br />
              <span className="text-neon">NO MAIS ALTO NÍVEL.</span>
            </h2>
            <button
              onClick={onStart}
              className="flex-shrink-0 border border-neon text-neon text-xs font-black uppercase tracking-widest px-6 py-3
                hover:bg-neon hover:text-black transition-all duration-200 self-start md:self-auto"
            >
              VER QUAL É O MEU →
            </button>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
          {SERVICES_LIST.map((svc, i) => (
            <FadeIn key={i} delay={i * 0.06}>
              <div className="bg-[#0a0a0a] p-6 md:p-8 group hover:bg-white/[0.03] transition-colors h-full">
                <div className="flex items-start justify-between mb-4">
                  <div className="text-neon/70 group-hover:text-neon transition-colors">
                    {svc.icon}
                  </div>
                  {svc.badge && (
                    <span className="text-[10px] font-black tracking-widest text-neon/60 border border-neon/30 px-2 py-0.5">
                      {svc.badge}
                    </span>
                  )}
                </div>
                <div className="text-xs font-black tracking-[0.3em] text-white/30 uppercase mb-1">
                  {svc.label}
                </div>
                <h3 className="font-display font-black text-2xl md:text-3xl uppercase text-white mb-3 group-hover:text-neon transition-colors">
                  {svc.name}
                </h3>
                <p className="text-white/50 text-sm leading-relaxed">{svc.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Trust / Differentials Section ────────────────────────────────────────────
const DIFFERENTIALS = [
  {
    num: "01",
    title: "MATERIAIS TIPO A CERTIFICADOS",
    description:
      "Trabalhamos apenas com materiais de primeira linha — PPF XPEL, películas 3M e cerâmicas de grau automotivo certificado.",
  },
  {
    num: "02",
    title: "ATENDIMENTO EXCLUSIVO AGENDADO",
    description:
      "Cada veículo recebe atenção total. Não temos filas. Seu carro é tratado como único.",
  },
  {
    num: "03",
    title: "TÉCNICOS ALTAMENTE QUALIFICADOS",
    description:
      "Equipe com mais de 5 anos de experiência em estética automotiva de alto padrão.",
  },
  {
    num: "04",
    title: "EXPERIÊNCIA COMPROVADA",
    description:
      "Mais de 1.325 veículos protegidos, nota 5.0 no Google e garantia documentada em todos os serviços.",
  },
];

function TrustSection() {
  return (
    <section className="bg-[#080808] border-t border-white/5 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-start">
          <FadeIn>
            <SectionLabel>NOSSA OBSESSÃO</SectionLabel>
            <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white leading-none mb-6">
              OBSESSÃO
              <br />
              <span className="text-neon">PELO DETALHE.</span>
            </h2>
            <p className="text-white/50 text-base leading-relaxed mb-8">
              Cada veículo que passa pela nossa box recebe o mesmo nível de atenção — seja um carro
              popular ou um superesportivo. O padrão nunca muda. A entrega é sempre premium.
            </p>
            <a
              href="https://wa.me/5514998135198"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 border border-neon text-neon text-xs font-black uppercase tracking-widest px-6 py-3
                hover:bg-neon hover:text-black transition-all duration-200"
            >
              FALAR COM A EQUIPE
              <ArrowRight className="w-3.5 h-3.5" />
            </a>
          </FadeIn>

          <div className="space-y-0 divide-y divide-white/5">
            {DIFFERENTIALS.map((d, i) => (
              <FadeIn key={i} delay={i * 0.08}>
                <div className="py-6 group">
                  <div className="flex gap-5">
                    <span className="text-neon font-display font-black text-xl md:text-2xl flex-shrink-0 group-hover:neon-text-glow transition-all">
                      {d.num}
                    </span>
                    <div>
                      <h3 className="font-display font-black text-base md:text-lg uppercase text-white mb-2 tracking-wide">
                        {d.title}
                      </h3>
                      <p className="text-white/40 text-sm leading-relaxed">{d.description}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Process Section ───────────────────────────────────────────────────────────
const PROCESS_STEPS = [
  {
    num: "01",
    title: "DIAGNÓSTICO",
    description: "Avaliação completa do veículo e recomendação do serviço ideal para o seu perfil.",
    icon: <Award className="w-5 h-5" />,
  },
  {
    num: "02",
    title: "PREPARAÇÃO",
    description: "Descontaminação e preparo técnico completo da superfície antes de qualquer aplicação.",
    icon: <Sparkles className="w-5 h-5" />,
  },
  {
    num: "03",
    title: "APLICAÇÃO",
    description: "Execução com técnica certificada e materiais premium tipo A em ambiente controlado.",
    icon: <Shield className="w-5 h-5" />,
  },
  {
    num: "04",
    title: "ENTREGA",
    description: "Vistoria final item a item, orientação completa ao cliente e garantia documentada.",
    icon: <CheckCircle2 className="w-5 h-5" />,
  },
];

function ProcessSection() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-6xl mx-auto">
        <FadeIn className="text-center mb-14">
          <SectionLabel>COMO TRABALHAMOS</SectionLabel>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white leading-none">
            QUATRO ETAPAS,
            <br />
            <span className="text-neon">ZERO MARGEM PARA ERRO.</span>
          </h2>
        </FadeIn>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-px bg-white/5">
          {PROCESS_STEPS.map((step, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-[#0a0a0a] p-6 md:p-8 h-full relative">
                {/* Connector line on desktop */}
                {i < PROCESS_STEPS.length - 1 && (
                  <div className="hidden lg:block absolute top-8 right-0 w-px h-8 bg-neon/20" />
                )}
                <div className="text-neon/60 mb-4">{step.icon}</div>
                <div className="text-neon font-display font-black text-4xl mb-3">{step.num}</div>
                <h3 className="font-display font-black text-lg uppercase text-white mb-2 tracking-wide">
                  {step.title}
                </h3>
                <p className="text-white/40 text-sm leading-relaxed">{step.description}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}

// ─── Social Proof Section ──────────────────────────────────────────────────────
const TESTIMONIALS = [
  {
    name: "Flávio Garces",
    service: "PPF",
    text: "Serviço impecável! Profissionalismo do início ao fim, prazo cumprido e resultado que superou minhas expectativas. O PPF ficou perfeito no meu Hilux.",
  },
  {
    name: "Eden Paccola",
    service: "INSULFILM",
    text: "Instalaram o insulfilm e ficou excelente. Muito profissionais, atenciosos e material de ótima qualidade. Já estou programando o PPF.",
  },
  {
    name: "Fábio Gonçalves",
    service: "COATING",
    text: "Recomendo demais. Aplicaram coating no meu Corolla e o resultado é incrível. Brilho profundo e qualidade sem igual. Top demais!",
  },
];

function SocialProofSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="bg-[#080808] border-t border-white/5 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <FadeIn className="text-center mb-12">
          <SectionLabel>CLIENTES</SectionLabel>
          <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white leading-none">
            O QUE DIZEM SOBRE
            <br />
            <span className="text-neon">NOSSO TRABALHO.</span>
          </h2>
          <div className="flex items-center justify-center gap-2 mt-4">
            {[...Array(5)].map((_, j) => (
              <Star key={j} className="w-4 h-4 text-neon fill-neon" />
            ))}
            <span className="text-white/40 text-sm ml-2 font-medium">5.0 no Google Reviews</span>
          </div>
        </FadeIn>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5 mb-12">
          {TESTIMONIALS.map((t, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-[#080808] p-6 md:p-8 h-full">
                <div className="flex items-center gap-1 mb-4">
                  {[...Array(5)].map((_, j) => (
                    <Star key={j} className="w-3.5 h-3.5 text-neon fill-neon" />
                  ))}
                </div>
                <p className="text-white/65 text-sm leading-relaxed mb-6 italic">"{t.text}"</p>
                <div>
                  <div className="text-white font-black text-sm uppercase tracking-wide">{t.name}</div>
                  <div className="text-neon/50 text-[11px] font-bold uppercase tracking-widest mt-0.5">
                    CLIENTE {t.service} · GOOGLE
                  </div>
                </div>
              </div>
            </FadeIn>
          ))}
        </div>

        <FadeIn className="text-center">
          <p className="text-white/40 text-sm font-medium mb-6">
            Descubra qual serviço é ideal para o seu veículo em menos de 2 minutos.
          </p>
          <motion.button
            onClick={onStart}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
            className="bg-neon text-black font-black uppercase tracking-widest px-8 py-4 text-sm
              hover:bg-neon/90 transition-colors neon-glow inline-flex items-center gap-2"
          >
            FAZER O DIAGNÓSTICO GRATUITO
            <ArrowRight className="w-4 h-4" />
          </motion.button>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── FAQ Section ───────────────────────────────────────────────────────────────
const FAQ_ITEMS = [
  {
    q: "Qual a diferença entre PPF e Coating?",
    a: "O PPF (Paint Protection Film) é um film físico aplicado sobre a pintura, capaz de absorver impactos de pedradas, riscos e insetos — com propriedade autocurativa. O Coating Cerâmico é uma camada química nanocerâmica que proporciona dureza 9H, brilho profundo e proteção química. Os dois se complementam: PPF protege contra danos físicos, o Coating protege contra agentes químicos e facilita a limpeza.",
  },
  {
    q: "Vale a pena fazer PPF em carros populares?",
    a: "Sim! O PPF não é exclusivo para importados. Ele protege a pintura de qualquer veículo, preservando o valor de revenda e evitando reparos caros de funilaria no futuro. Temos opções para diferentes orçamentos — desde aplicação nas áreas mais expostas até a cobertura total do veículo.",
  },
  {
    q: "Quanto tempo dura o PPF e o Coating?",
    a: "O PPF XPEL que aplicamos tem garantia de 10 anos contra amarelamento, bolhas e descolamento. O Coating Cerâmico tem durabilidade de 2 a 5 anos dependendo dos cuidados. Todos os serviços saem com garantia documentada.",
  },
  {
    q: "Quanto tempo leva para realizar o serviço?",
    a: "Varia conforme o serviço e o tamanho do veículo. Insulfilm: 1–2 horas. Polimento técnico: 6–8 horas (1 dia). PPF parcial (capô/para-choque): 1 dia. PPF total: 3–5 dias. Coating completo: 2–3 dias. Sempre agendamos com antecedência para garantir que o veículo seja tratado sem pressa.",
  },
  {
    q: "Vocês atendem além de Chavantes?",
    a: "Atendemos principalmente em Chavantes e região (Ourinhos, Bernardino de Campos, Canitar e cidades próximas). Entre em contato pelo WhatsApp para confirmar atendimento na sua cidade.",
  },
  {
    q: "O diagnóstico online é realmente gratuito?",
    a: "Sim, 100% gratuito e sem compromisso. O quiz identifica o serviço mais adequado para o seu perfil e veículo, e você recebe a recomendação personalizada. Após isso, você pode entrar em contato pelo WhatsApp para tirar dúvidas e solicitar orçamento.",
  },
];

function FaqSection() {
  return (
    <section className="bg-[#0a0a0a] border-t border-white/5 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-3xl mx-auto">
        <FadeIn className="text-center mb-12">
          <SectionLabel>FAQ</SectionLabel>
          <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-white leading-none">
            DÚVIDAS
            <br />
            <span className="text-neon">FREQUENTES.</span>
          </h2>
        </FadeIn>

        <FadeIn>
          <Accordion type="single" collapsible className="space-y-0">
            {FAQ_ITEMS.map((item, i) => (
              <AccordionItem
                key={i}
                value={`item-${i}`}
                className="border-b border-white/10 last:border-b border-t-0"
              >
                <AccordionTrigger className="text-white font-black text-sm md:text-base uppercase tracking-wide text-left py-5 hover:no-underline hover:text-neon transition-colors [&[data-state=open]]:text-neon">
                  {item.q}
                </AccordionTrigger>
                <AccordionContent className="text-white/55 text-sm leading-relaxed pb-5">
                  {item.a}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Location Section ──────────────────────────────────────────────────────────
function LocationSection() {
  return (
    <section className="bg-[#080808] border-t border-white/5 px-6 md:px-12 py-16 md:py-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          <FadeIn>
            <SectionLabel>LOCALIZAÇÃO</SectionLabel>
            <h2 className="font-display font-black text-4xl md:text-5xl uppercase text-white leading-none mb-8">
              VENHA ATÉ A
              <br />
              NOSSA BOX EM
              <br />
              <span className="text-neon">CHAVANTES.</span>
            </h2>

            <div className="space-y-5">
              <div className="flex items-start gap-3">
                <MapPin className="w-4 h-4 text-neon flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">ENDEREÇO</div>
                  <div className="text-white text-sm font-medium">Chavantes — SP</div>
                  <div className="text-white/50 text-xs mt-0.5">Região de Ourinhos / SP</div>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <Clock className="w-4 h-4 text-neon flex-shrink-0 mt-0.5" />
                <div>
                  <div className="text-xs font-bold tracking-widest text-white/40 uppercase mb-1">HORÁRIO</div>
                  <div className="text-white text-sm font-medium">Seg – Sex: 08h às 18h</div>
                  <div className="text-white/50 text-xs mt-0.5">Sábado: 08h às 12h</div>
                </div>
              </div>

              <div className="pt-2">
                <a
                  href="https://wa.me/5514998135198"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-neon text-black font-black uppercase tracking-widest px-6 py-3 text-xs
                    hover:bg-neon/90 transition-colors neon-glow"
                >
                  FALAR NO WHATSAPP
                  <ArrowRight className="w-3.5 h-3.5" />
                </a>
              </div>
            </div>
          </FadeIn>

          {/* Map visual placeholder */}
          <FadeIn delay={0.15}>
            <div className="relative border border-white/10 h-64 md:h-80 bg-white/[0.02] overflow-hidden">
              <div
                className="absolute inset-0 opacity-[0.04]"
                style={{
                  backgroundImage:
                    "linear-gradient(oklch(0.88 0.25 130) 1px, transparent 1px), linear-gradient(90deg, oklch(0.88 0.25 130) 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <MapPin className="w-8 h-8 text-neon mb-3 neon-text-glow" />
                <div className="text-white font-black text-sm uppercase tracking-widest">NETTO RAZZÉ</div>
                <div className="text-white/40 text-xs mt-1 uppercase tracking-widest">CHAVANTES — SP</div>
                <a
                  href="https://maps.google.com?q=Chavantes,SP"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="mt-4 text-neon text-xs font-bold uppercase tracking-widest underline hover:no-underline"
                >
                  Ver no Google Maps →
                </a>
              </div>
            </div>
          </FadeIn>
        </div>
      </div>
    </section>
  );
}

// ─── Final Quiz CTA Section ────────────────────────────────────────────────────
function QuizCtaSection({ onStart }: { onStart: () => void }) {
  return (
    <section className="bg-[#0a0a0a] border-t border-neon/20 px-6 md:px-12 py-16 md:py-24 relative overflow-hidden">
      {/* Background glow */}
      <div
        className="absolute inset-0 opacity-[0.04] pointer-events-none"
        style={{
          background: "radial-gradient(ellipse at 50% 50%, oklch(0.88 0.25 130) 0%, transparent 70%)",
        }}
      />

      <div className="max-w-3xl mx-auto text-center relative z-10">
        <FadeIn>
          <SectionLabel>DIAGNÓSTICO GRATUITO</SectionLabel>

          <h2 className="font-display font-black text-4xl md:text-6xl uppercase text-white leading-none mb-4">
            SEU VEÍCULO MERECE
            <br />
            <span className="text-neon neon-text-glow">O MELHOR CUIDADO.</span>
          </h2>

          <p className="text-white/50 text-base font-medium mb-8 leading-relaxed">
            Responda 6 perguntas rápidas e descubra exatamente qual serviço vai transformar o seu
            veículo — com recomendação 100% personalizada e orçamento direto no WhatsApp.
          </p>

          {/* Urgency element */}
          <div className="inline-flex items-center gap-2 border border-neon/30 bg-neon/5 px-4 py-2 mb-8">
            <Zap className="w-3.5 h-3.5 text-neon" />
            <span className="text-neon text-xs font-black uppercase tracking-widest">
              Diagnóstico gratuito · Sem compromisso · Agenda disponível agora
            </span>
          </div>

          <div>
            <motion.button
              onClick={onStart}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="bg-neon text-black font-black uppercase tracking-widest px-10 py-5 text-sm
                hover:bg-neon/90 transition-colors neon-glow inline-flex items-center gap-2"
            >
              INICIAR DIAGNÓSTICO GRATUITO
              <ArrowRight className="w-4 h-4" />
            </motion.button>
            <div className="text-white/30 text-xs font-medium mt-3">
              ⏱ Menos de 2 minutos · 🔒 Seus dados são protegidos
            </div>
          </div>
        </FadeIn>
      </div>
    </section>
  );
}

// ─── Footer ────────────────────────────────────────────────────────────────────
function Footer() {
  return (
    <footer className="bg-[#080808] border-t border-white/10 px-6 md:px-12 py-10">
      <div className="max-w-5xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          <div>
            <img
              src="/logotipo.png"
              alt="NETTO RAZZÉ"
              className="h-8 w-auto object-contain mb-3"
              onError={(e) => {
                (e.currentTarget as HTMLImageElement).style.display = "none";
                (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "block";
              }}
            />
            <div className="hidden font-display font-black text-2xl text-white tracking-wider mb-3">
              NETTO<span className="text-neon">RAZZE</span>
            </div>
            <p className="text-white/40 text-xs font-medium leading-relaxed">
              Estética automotiva premium em Chavantes e Ourinhos / SP. PPF, Coating, Polimento,
              Insulfilm e mais.
            </p>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">
              SERVIÇOS
            </div>
            <div className="space-y-2">
              {["PPF", "Insulfilm", "Polimento", "Estética Completa", "Coating Cerâmico", "Vidros"].map((s) => (
                <div key={s} className="text-xs text-white/50 font-medium">
                  {s}
                </div>
              ))}
            </div>
          </div>
          <div>
            <div className="text-xs font-bold tracking-[0.3em] text-white/40 uppercase mb-4">
              CONTATO
            </div>
            <div className="space-y-2">
              <a
                href="https://wa.me/5514998135198"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-neon font-bold uppercase tracking-wider hover:text-neon/80 transition-colors"
              >
                (14) 99813-5198
              </a>
              <a
                href="https://instagram.com/nettorazze"
                target="_blank"
                rel="noopener noreferrer"
                className="block text-xs text-white/50 font-medium hover:text-white/80 transition-colors"
              >
                @nettorazze
              </a>
              <div className="text-xs text-white/40 font-medium">Chavantes — SP</div>
              <div className="text-xs text-white/30">Seg–Sex: 08h–18h · Sáb: 08h–12h</div>
            </div>
          </div>
        </div>
        <div className="border-t border-white/10 pt-6 text-center">
          <p className="text-xs text-white/20 font-medium">
            © 2026 NETTO RAZZÉ. TODOS OS DIREITOS RESERVADOS. CHAVANTES & OURINHOS / SP
          </p>
        </div>
      </div>
    </footer>
  );
}

// ─── Quiz Section (full-screen) ────────────────────────────────────────────────
function QuizSection({ onBack }: { onBack: () => void }) {
  return (
    <section className="min-h-screen bg-[#080808] flex flex-col">
      <nav className="flex items-center justify-between px-6 md:px-12 py-5 border-b border-white/10">
        <button
          onClick={onBack}
          className="flex items-center gap-2 text-white/40 hover:text-white/80 transition-colors text-xs font-bold uppercase tracking-widest"
        >
          ← VOLTAR
        </button>
        <img
          src="/logotipo.png"
          alt="NETTO RAZZÉ"
          className="h-8 w-auto object-contain"
          onError={(e) => {
            (e.currentTarget as HTMLImageElement).style.display = "none";
            (e.currentTarget.nextElementSibling as HTMLElement)!.style.display = "block";
          }}
        />
        <div className="hidden font-display font-black text-xl text-white tracking-wider">
          NETTO<span className="text-neon">RAZZE</span>
        </div>
        <div className="text-xs font-bold tracking-[0.3em] text-white/30 uppercase hidden md:block">
          DIAGNÓSTICO
        </div>
      </nav>

      {/* Social proof badge */}
      <div className="px-6 md:px-12 pt-4">
        <div className="max-w-xl mx-auto">
          <div className="flex items-center gap-2 border border-neon/20 bg-neon/5 px-3 py-2 w-fit">
            <Zap className="w-3 h-3 text-neon" />
            <span className="text-neon/80 text-[11px] font-black uppercase tracking-widest">
              Mais de 1.325 diagnósticos realizados
            </span>
          </div>
        </div>
      </div>

      <div className="flex-1 flex items-start justify-center px-6 md:px-12 py-8 md:py-12">
        <div className="w-full max-w-xl">
          <Quiz />
        </div>
      </div>

      <div className="px-6 md:px-12 py-5 border-t border-white/5">
        <div className="flex flex-col md:flex-row items-center justify-between gap-2">
          <p className="text-xs text-white/20 font-medium">
            © 2026 NETTO RAZZÉ — CHAVANTES & OURINHOS / SP
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://wa.me/5514998135198"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-neon transition-colors font-bold uppercase tracking-widest"
            >
              WhatsApp
            </a>
            <a
              href="https://instagram.com/nettorazze"
              target="_blank"
              rel="noopener noreferrer"
              className="text-xs text-white/30 hover:text-neon transition-colors font-bold uppercase tracking-widest"
            >
              @nettorazze
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}

// ─── Main Page ─────────────────────────────────────────────────────────────────
export default function Home() {
  const [showQuiz, setShowQuiz] = useState(false);

  const handleStart = () => {
    setShowQuiz(true);
    window.scrollTo({ top: 0, behavior: "instant" });
  };

  return (
    <div className="min-h-screen bg-[#080808]">
      <AnimatePresence mode="wait">
        {showQuiz ? (
          <motion.div
            key="quiz-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <QuizSection onBack={() => setShowQuiz(false)} />
          </motion.div>
        ) : (
          <motion.div
            key="landing-page"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
          >
            <UrgencyBanner onStart={handleStart} />
            <HeroSection onStart={handleStart} />
            <ServicesSection onStart={handleStart} />
            <TrustSection />
            <ProcessSection />
            <SocialProofSection onStart={handleStart} />
            <FaqSection />
            <LocationSection />
            <QuizCtaSection onStart={handleStart} />
            <Footer />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
