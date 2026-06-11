import { useState, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  QUIZ_QUESTIONS,
  TOTAL_QUIZ_STEPS,
  SERVICES,
  calculateRecommendation,
  buildWhatsAppUrl,
  type QuizAnswerRecord,
  type ServiceKey,
} from "@/data/quizData";
import { trpc } from "@/lib/trpc";
import { toast } from "sonner";

// ─── Types ────────────────────────────────────────────────────────────────────
type QuizStage = "quiz" | "capture" | "result";

interface LeadData {
  name: string;
  whatsapp: string;
}

// ─── Progress Bar ─────────────────────────────────────────────────────────────
function ProgressBar({ current, total }: { current: number; total: number }) {
  const pct = Math.min(100, Math.round((current / total) * 100));
  return (
    <div className="w-full mb-8">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-bold tracking-widest text-neon uppercase">
          ETAPA {current} DE {total}
        </span>
        <span className="text-xs font-bold tracking-widest text-neon">{pct}%</span>
      </div>
      <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
        <motion.div
          className="h-full bg-neon rounded-full"
          initial={{ width: 0 }}
          animate={{ width: `${pct}%` }}
          transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
        />
      </div>
    </div>
  );
}

// ─── Answer Option ────────────────────────────────────────────────────────────
function AnswerOption({
  answer,
  selected,
  onClick,
  index,
}: {
  answer: { id: string; label: string; icon?: string };
  selected: boolean;
  onClick: () => void;
  index: number;
}) {
  return (
    <motion.button
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.07, duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className={`w-full text-left p-4 md:p-5 border transition-all duration-200 rounded-sm group
        ${
          selected
            ? "border-neon bg-neon/10 text-neon"
            : "border-white/20 bg-white/5 text-white hover:border-neon/60 hover:bg-white/10"
        }`}
    >
      <div className="flex items-center gap-4">
        {answer.icon && (
          <span className="text-2xl flex-shrink-0 w-8 text-center">{answer.icon}</span>
        )}
        <span className="font-bold text-sm md:text-base uppercase tracking-wide leading-snug">
          {answer.label}
        </span>
        <motion.div
          className="ml-auto flex-shrink-0"
          animate={{ opacity: selected ? 1 : 0, scale: selected ? 1 : 0.5 }}
          transition={{ duration: 0.2 }}
        >
          <div className="w-5 h-5 rounded-full border-2 border-neon bg-neon flex items-center justify-center">
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M1 4L3.5 6.5L9 1" stroke="#000" strokeWidth="2" strokeLinecap="round" />
            </svg>
          </div>
        </motion.div>
      </div>
    </motion.button>
  );
}

// ─── Quiz Question Screen ─────────────────────────────────────────────────────
function QuestionScreen({
  questionId,
  currentStep,
  onAnswer,
}: {
  questionId: string;
  currentStep: number;
  onAnswer: (answerId: string, answerLabel: string, nextQuestion?: string) => void;
}) {
  const [selected, setSelected] = useState<string | null>(null);
  const question = QUIZ_QUESTIONS[questionId];
  if (!question) return null;

  const handleSelect = (answerId: string, answerLabel: string, nextQ?: string) => {
    setSelected(answerId);
    setTimeout(() => {
      onAnswer(answerId, answerLabel, nextQ);
    }, 350);
  };

  return (
    <motion.div
      key={questionId}
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="w-full"
    >
      <ProgressBar current={currentStep} total={TOTAL_QUIZ_STEPS} />

      <div className="mb-2">
        <span className="text-xs font-bold tracking-[0.3em] text-neon/70 uppercase">
          {question.category}
        </span>
      </div>

      <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase leading-tight text-white mb-3">
        {question.question}
      </h2>

      {question.subtitle && (
        <p className="text-sm text-white/50 mb-6 font-medium tracking-wide">
          {question.subtitle}
        </p>
      )}

      <div className="flex flex-col gap-3">
        {question.answers.map((answer, i) => (
          <AnswerOption
            key={answer.id}
            answer={answer}
            selected={selected === answer.id}
            onClick={() => handleSelect(answer.id, answer.label, answer.nextQuestion)}
            index={i}
          />
        ))}
      </div>
    </motion.div>
  );
}

// ─── Lead Capture Screen ──────────────────────────────────────────────────────
function CaptureScreen({
  onSubmit,
  isLoading,
}: {
  onSubmit: (data: LeadData) => void;
  isLoading: boolean;
}) {
  const [name, setName] = useState("");
  const [whatsapp, setWhatsapp] = useState("");
  const [errors, setErrors] = useState<{ name?: string; whatsapp?: string }>({});

  const formatWhatsapp = (value: string) => {
    const digits = value.replace(/\D/g, "").slice(0, 11);
    if (digits.length <= 2) return digits;
    if (digits.length <= 7) return `(${digits.slice(0, 2)}) ${digits.slice(2)}`;
    return `(${digits.slice(0, 2)}) ${digits.slice(2, 7)}-${digits.slice(7)}`;
  };

  const validate = () => {
    const errs: typeof errors = {};
    if (!name.trim() || name.trim().length < 2) errs.name = "Informe seu nome completo.";
    const digits = whatsapp.replace(/\D/g, "");
    if (digits.length < 10) errs.whatsapp = "Informe um WhatsApp válido com DDD.";
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!validate()) return;
    onSubmit({ name: name.trim(), whatsapp: whatsapp.replace(/\D/g, "") });
  };

  return (
    <motion.div
      key="capture"
      initial={{ opacity: 0, x: 40 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -40 }}
      transition={{ duration: 0.35, ease: [0.23, 1, 0.32, 1] }}
      className="w-full"
    >
      <ProgressBar current={TOTAL_QUIZ_STEPS} total={TOTAL_QUIZ_STEPS} />

      {/* Urgency badge */}
      <div className="flex items-center gap-2 border border-neon/30 bg-neon/5 px-3 py-2 mb-5 w-fit">
        <span className="text-neon text-[11px] font-black uppercase tracking-widest">
          ✓ Análise concluída — apenas 1 passo para ver o resultado
        </span>
      </div>

      <div className="mb-2">
        <span className="text-xs font-bold tracking-[0.3em] text-neon/70 uppercase">
          QUASE LÁ
        </span>
      </div>

      <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase leading-tight text-white mb-2">
        SEU DIAGNÓSTICO ESTÁ PRONTO.
      </h2>
      <p className="text-sm text-white/50 mb-8 font-medium tracking-wide">
        Informe seus dados para receber a recomendação personalizada e entrar em contato direto com a equipe.
      </p>

      <form onSubmit={handleSubmit} className="flex flex-col gap-5">
        <div>
          <label className="block text-xs font-bold tracking-widest text-white/60 uppercase mb-2">
            SEU NOME
          </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Ex: João Silva"
            className={`w-full bg-white/5 border px-4 py-3 text-white placeholder-white/30 font-medium text-sm focus:outline-none focus:border-neon transition-colors
              ${errors.name ? "border-red-500" : "border-white/20 focus:border-neon"}`}
          />
          {errors.name && (
            <p className="text-red-400 text-xs mt-1 font-medium">{errors.name}</p>
          )}
        </div>

        <div>
          <label className="block text-xs font-bold tracking-widest text-white/60 uppercase mb-2">
            SEU WHATSAPP
          </label>
          <input
            type="tel"
            value={whatsapp}
            onChange={(e) => setWhatsapp(formatWhatsapp(e.target.value))}
            placeholder="(14) 99999-9999"
            className={`w-full bg-white/5 border px-4 py-3 text-white placeholder-white/30 font-medium text-sm focus:outline-none transition-colors
              ${errors.whatsapp ? "border-red-500" : "border-white/20 focus:border-neon"}`}
          />
          {errors.whatsapp && (
            <p className="text-red-400 text-xs mt-1 font-medium">{errors.whatsapp}</p>
          )}
        </div>

        <p className="text-xs text-white/30 -mt-1">
          🔒 Seus dados são confidenciais e usados apenas para enviar sua recomendação.
        </p>

        <motion.button
          type="submit"
          disabled={isLoading}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.97 }}
          className="w-full bg-neon text-black font-black uppercase tracking-widest py-4 text-sm
            hover:bg-neon/90 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "PROCESSANDO..." : "VER MINHA RECOMENDAÇÃO →"}
        </motion.button>
      </form>
    </motion.div>
  );
}

// ─── Result Screen ────────────────────────────────────────────────────────────
function ResultScreen({
  leadName,
  primaryService,
  secondaryServices,
  whatsappMessage,
  onRestart,
}: {
  leadName: string;
  primaryService: ServiceKey;
  secondaryServices: ServiceKey[];
  whatsappMessage: string;
  onRestart: () => void;
}) {
  const service = SERVICES[primaryService];
  const whatsappUrl = buildWhatsAppUrl(whatsappMessage);

  return (
    <motion.div
      key="result"
      initial={{ opacity: 0, scale: 0.97 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, ease: [0.23, 1, 0.32, 1] }}
      className="w-full"
    >
      {/* Header do resultado */}
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
        className="mb-6"
      >
        <span className="text-xs font-bold tracking-[0.3em] text-neon/70 uppercase">
          DIAGNÓSTICO CONCLUÍDO
        </span>
        <h2 className="text-xl md:text-2xl lg:text-3xl font-black uppercase leading-tight text-white mt-1">
          {leadName.split(" ")[0].toUpperCase()}, O SERVIÇO IDEAL PARA VOCÊ É:
        </h2>
      </motion.div>

      {/* Card do serviço principal */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2, duration: 0.4 }}
        className="border border-neon bg-neon/5 p-6 mb-5"
      >
        <div className="flex items-start justify-between mb-4">
          <div>
            <div className="text-xs font-bold tracking-[0.3em] text-neon/70 uppercase mb-1">
              {service.subtitle}
            </div>
            <h3 className="text-3xl md:text-4xl font-black uppercase text-neon">
              {service.name}
            </h3>
            <p className="text-xs font-bold tracking-widest text-white/50 uppercase mt-1">
              {service.tagline}
            </p>
          </div>
          {service.guarantee && (
            <div className="border border-neon/40 px-3 py-2 text-center flex-shrink-0">
              <div className="text-neon font-black text-xs uppercase tracking-wider">
                {service.guarantee}
              </div>
            </div>
          )}
        </div>

        <p className="text-sm text-white/70 leading-relaxed mb-5">{service.description}</p>

        <div className="space-y-2">
          {service.benefits.map((b, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.3 + i * 0.07 }}
              className="flex items-center gap-3 text-sm text-white/80"
            >
              <span className="text-neon font-bold flex-shrink-0">✓</span>
              <span className="font-medium">{b}</span>
            </motion.div>
          ))}
        </div>
      </motion.div>

      {/* Urgência */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 0.6 }}
        className="border border-neon/30 bg-neon/5 px-4 py-3 mb-5"
      >
        <p className="text-xs text-neon/80 font-bold uppercase tracking-wide">⚡ {service.urgency}</p>
      </motion.div>

      {/* Serviços secundários */}
      {secondaryServices.length > 0 && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.7 }}
          className="mb-6"
        >
          <p className="text-xs font-bold tracking-widest text-white/40 uppercase mb-3">
            TAMBÉM RECOMENDADO PARA O SEU PERFIL:
          </p>
          <div className="flex flex-wrap gap-2">
            {secondaryServices.map((s) => (
              <div
                key={s}
                className="border border-white/20 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-white/60"
              >
                {SERVICES[s].name}
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* CTA WhatsApp */}
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.8 }}
        className="flex flex-col gap-3"
      >
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full block"
        >
          <motion.div
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.97 }}
            className="w-full bg-neon text-black font-black uppercase tracking-widest py-4 text-sm text-center
              hover:bg-neon/90 transition-colors cursor-pointer"
          >
            💬 FALAR COM A NETTO RAZZÉ AGORA
          </motion.div>
        </a>

        <button
          onClick={onRestart}
          className="text-xs text-white/30 hover:text-white/60 transition-colors font-medium uppercase tracking-widest text-center py-2"
        >
          Refazer o quiz
        </button>
      </motion.div>
    </motion.div>
  );
}

// ─── Main Quiz Component ──────────────────────────────────────────────────────
export default function Quiz() {
  const [stage, setStage] = useState<QuizStage>("quiz");
  const [currentQuestionId, setCurrentQuestionId] = useState("q1");
  const [currentStep, setCurrentStep] = useState(1);
  const [answers, setAnswers] = useState<QuizAnswerRecord[]>([]);
  const [leadData, setLeadData] = useState<LeadData | null>(null);
  const [leadId, setLeadId] = useState<number | null>(null);
  const [recommendation, setRecommendation] = useState<ReturnType<
    typeof calculateRecommendation
  > | null>(null);

  const saveLeadMutation = trpc.quiz.saveLead.useMutation();
  const saveSessionMutation = trpc.quiz.saveSession.useMutation();

  const handleAnswer = useCallback(
    (answerId: string, answerLabel: string, nextQuestion?: string) => {
      const newAnswers = [
        ...answers,
        { questionId: currentQuestionId, answerId, answerLabel },
      ];
      setAnswers(newAnswers);

      // Determinar próxima pergunta
      const question = QUIZ_QUESTIONS[currentQuestionId];
      const next = nextQuestion ?? question?.defaultNext ?? "capture";

      if (next === "capture") {
        setStage("capture");
      } else {
        setCurrentQuestionId(next);
        setCurrentStep((s) => s + 1);
      }
    },
    [answers, currentQuestionId]
  );

  const handleCapture = useCallback(
    async (data: LeadData) => {
      try {
        const { leadId: newLeadId } = await saveLeadMutation.mutateAsync({
          name: data.name,
          whatsapp: data.whatsapp,
        });
        setLeadId(newLeadId);
        setLeadData(data);

        const rec = calculateRecommendation(answers, data.name);
        setRecommendation(rec);

        // Salvar sessão completa
        await saveSessionMutation.mutateAsync({
          leadId: newLeadId,
          answers,
          recommendedService: rec.primaryService,
          recommendedServices: [rec.primaryService, ...rec.secondaryServices],
          score: rec.scores,
          whatsappMessage: rec.whatsappMessage,
          leadName: data.name,
        });

        setStage("result");
      } catch {
        toast.error("Erro ao salvar seus dados. Tente novamente.");
      }
    },
    [answers, saveLeadMutation, saveSessionMutation]
  );

  const handleRestart = useCallback(() => {
    setStage("quiz");
    setCurrentQuestionId("q1");
    setCurrentStep(1);
    setAnswers([]);
    setLeadData(null);
    setLeadId(null);
    setRecommendation(null);
  }, []);

  return (
    <div className="w-full max-w-xl mx-auto">
      <AnimatePresence mode="wait">
        {stage === "quiz" && (
          <QuestionScreen
            key={currentQuestionId}
            questionId={currentQuestionId}
            currentStep={currentStep}
            onAnswer={handleAnswer}
          />
        )}
        {stage === "capture" && (
          <CaptureScreen
            key="capture"
            onSubmit={handleCapture}
            isLoading={saveLeadMutation.isPending || saveSessionMutation.isPending}
          />
        )}
        {stage === "result" && recommendation && leadData && (
          <ResultScreen
            key="result"
            leadName={leadData.name}
            primaryService={recommendation.primaryService}
            secondaryServices={recommendation.secondaryServices}
            whatsappMessage={recommendation.whatsappMessage}
            onRestart={handleRestart}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
