export type ServiceKey = "ppf" | "insulfilm" | "polimento" | "estetica" | "coating" | "vidros";

export interface QuizAnswerRecord {
  questionId: string;
  answerId: string;
  answerLabel: string;
}

interface ServiceDef {
  name: string;
  subtitle: string;
  tagline: string;
  description: string;
  benefits: string[];
  guarantee: string | null;
  urgency: string;
}

interface QuizAnswer {
  id: string;
  label: string;
  icon?: string;
  scores: Partial<Record<ServiceKey, number>>;
  nextQuestion?: string;
}

interface QuizQuestion {
  question: string;
  subtitle?: string;
  category: string;
  answers: QuizAnswer[];
  defaultNext?: string;
}

export const TOTAL_QUIZ_STEPS = 6;

export const SERVICES: Record<ServiceKey, ServiceDef> = {
  ppf: {
    name: "PPF",
    subtitle: "Proteção de Pintura",
    tagline: "A armadura invisível do seu veículo",
    description:
      "Film transparente de alta resistência aplicado diretamente na pintura, protegendo contra riscos, pedradas, insetos e raios UV. Preserva o valor do veículo e mantém a pintura como nova por anos.",
    benefits: [
      "Protege contra arranhados e pedradas",
      "Garantia de 10 anos contra amarelamento",
      "Preserva o valor de revenda",
      "Autocurativo em temperatura ambiente",
      "Aplicação por técnicos certificados",
    ],
    guarantee: "10 ANOS",
    urgency:
      "Disponibilidade limitada — a agenda de aplicação de PPF tem poucas vagas abertas este mês.",
  },
  insulfilm: {
    name: "INSULFILM",
    subtitle: "Película de Segurança",
    tagline: "Conforto, privacidade e proteção",
    description:
      "Película profissional aplicada nos vidros para bloquear calor, raios UV e reduzir o ofuscamento. Aumenta a privacidade e a segurança do veículo com películas certificadas ABNT.",
    benefits: [
      "Bloqueia até 99% dos raios UV",
      "Reduz o calor interno em até 60%",
      "Aumenta a privacidade no veículo",
      "Retém os cacos em caso de quebra",
      "Películas com certificação ABNT",
    ],
    guarantee: "5 ANOS",
    urgency: "Alta demanda por insulfilm na temporada de calor. Agende com antecedência.",
  },
  polimento: {
    name: "POLIMENTO",
    subtitle: "Correção de Pintura",
    tagline: "De volta ao brilho original",
    description:
      "Processo técnico de correção que remove oxidação, marcas de lavagem automática, pequenos riscos e hologramas da pintura. Devolve o brilho profundo e a cor original do veículo.",
    benefits: [
      "Remove riscos superficiais e oxidação",
      "Elimina marcas de lavagem automática",
      "Recupera o brilho e profundidade da cor",
      "Executado por técnicos especializados",
      "Resultado visível e imediato",
    ],
    guarantee: null,
    urgency: "Polimento com alta demanda este mês. Reserve seu horário antes que a agenda feche.",
  },
  estetica: {
    name: "ESTÉTICA",
    subtitle: "Estética Completa",
    tagline: "Renovação total do seu veículo",
    description:
      "Higienização completa interna e externa, revitalização de plásticos, limpeza de estofados, descontaminação de pintura e finalização premium. Seu carro transformado em um único dia.",
    benefits: [
      "Higienização completa interna",
      "Lavagem técnica com descontaminação",
      "Revitalização de plásticos externos",
      "Limpeza de estofados e couro",
      "Resultado transformador em um dia",
    ],
    guarantee: null,
    urgency: "Estética completa com poucos horários disponíveis esta semana.",
  },
  coating: {
    name: "COATING",
    subtitle: "Proteção Cerâmica",
    tagline: "Durabilidade que dura anos",
    description:
      "Camada de nanocerâmica aplicada sobre a pintura proporcionando dureza extrema, brilho intenso e proteção química. Facilita a manutenção e protege o veículo por anos.",
    benefits: [
      "Dureza 9H na escala de lápis",
      "Brilho intenso e profundo",
      "Proteção química contra chuva ácida e insetos",
      "Facilita a lavagem do veículo",
      "Duração de 2 a 5 anos",
    ],
    guarantee: "5 ANOS",
    urgency: "Alta procura por coating este mês. Agende agora para garantir sua vaga.",
  },
  vidros: {
    name: "VIDROS",
    subtitle: "Tratamento de Vidros",
    tagline: "Visibilidade máxima em qualquer condição",
    description:
      "Tratamento hidrofóbico dos vidros que repele água, lama e sujeira. Melhora a visibilidade em chuvas intensas e aumenta significativamente a segurança na estrada.",
    benefits: [
      "Repele água (efeito lótus)",
      "Reduz necessidade do limpador de para-brisa",
      "Melhora visibilidade na chuva",
      "Proteção contra manchas minerais",
      "Restauração de arranhados superficiais",
    ],
    guarantee: "1 ANO",
    urgency: "Tratamento de vidros recomendado antes das chuvas. Reserve agora.",
  },
};

export const QUIZ_QUESTIONS: Record<string, QuizQuestion> = {
  q1: {
    question: "Qual é o seu veículo?",
    subtitle: "Isso nos ajuda a recomendar a proteção ideal para o seu perfil.",
    category: "SEU VEÍCULO",
    defaultNext: "q2",
    answers: [
      {
        id: "popular",
        label: "Popular / Hatch (Uno, Gol, Ônix, HB20...)",
        icon: "🚗",
        scores: { estetica: 3, polimento: 2, insulfilm: 1 },
      },
      {
        id: "intermediario",
        label: "Sedan / SUV Médio (Corolla, Compass, Renegade...)",
        icon: "🚙",
        scores: { insulfilm: 2, coating: 2, polimento: 2, estetica: 1 },
      },
      {
        id: "premium",
        label: "SUV / Pickup Premium (Hilux, S10, Sportage...)",
        icon: "🛻",
        scores: { ppf: 2, coating: 3, vidros: 2, insulfilm: 2 },
      },
      {
        id: "importado",
        label: "Importado / Esportivo / Luxo",
        icon: "🏎️",
        scores: { ppf: 5, coating: 3, polimento: 2 },
      },
    ],
  },
  q2: {
    question: "O que mais incomoda você no seu carro?",
    subtitle: "Selecione o principal problema que você quer resolver.",
    category: "SEU PROBLEMA",
    defaultNext: "q3",
    answers: [
      {
        id: "riscos",
        label: "Riscos e arranhados na lataria",
        icon: "🔧",
        scores: { polimento: 4, ppf: 3 },
      },
      {
        id: "sem_brilho",
        label: "Pintura desbotada ou sem brilho",
        icon: "💡",
        scores: { polimento: 5, coating: 2 },
      },
      {
        id: "calor",
        label: "Calor interno excessivo",
        icon: "🌡️",
        scores: { insulfilm: 5, vidros: 1 },
      },
      {
        id: "vidros",
        label: "Vidros manchados ou com baixa visibilidade",
        icon: "🪟",
        scores: { vidros: 5, insulfilm: 2 },
      },
      {
        id: "aparencia",
        label: "Aparência geral descuidada",
        icon: "✨",
        scores: { estetica: 5, polimento: 2 },
      },
      {
        id: "preventivo",
        label: "Quero proteger antes que apareçam problemas",
        icon: "🛡️",
        scores: { ppf: 4, coating: 4 },
      },
    ],
  },
  q3: {
    question: "Há quanto tempo você tem o veículo?",
    subtitle: "O tempo de uso influencia na recomendação mais adequada.",
    category: "HISTÓRICO",
    defaultNext: "q4",
    answers: [
      {
        id: "novo",
        label: "Acabei de comprar (menos de 6 meses)",
        icon: "🆕",
        scores: { ppf: 4, coating: 3 },
      },
      {
        id: "um_dois",
        label: "Entre 6 meses e 2 anos",
        icon: "📅",
        scores: { coating: 3, polimento: 2, ppf: 2 },
      },
      {
        id: "dois_cinco",
        label: "Entre 2 e 5 anos",
        icon: "🗓️",
        scores: { polimento: 3, estetica: 3, coating: 2 },
      },
      {
        id: "mais_cinco",
        label: "Mais de 5 anos",
        icon: "⏳",
        scores: { polimento: 4, estetica: 4 },
      },
    ],
  },
  q4: {
    question: "Como você usa o veículo?",
    subtitle: "O tipo de uso define a proteção mais adequada para você.",
    category: "USO DO VEÍCULO",
    defaultNext: "q5",
    answers: [
      {
        id: "diario",
        label: "Uso diário (trabalho, faculdade, rotina)",
        icon: "🏙️",
        scores: { insulfilm: 2, estetica: 2, polimento: 2 },
      },
      {
        id: "estradas",
        label: "Estradas e viagens frequentes",
        icon: "🛣️",
        scores: { vidros: 3, ppf: 2, insulfilm: 2 },
      },
      {
        id: "lazer",
        label: "Finais de semana e lazer",
        icon: "🌟",
        scores: { coating: 3, polimento: 2 },
      },
      {
        id: "colecao",
        label: "É meu bem mais precioso / coleção",
        icon: "💎",
        scores: { ppf: 5, coating: 3, polimento: 2 },
      },
    ],
  },
  q5: {
    question: "Qual é sua maior prioridade?",
    subtitle: "Isso define o serviço com melhor custo-benefício para você.",
    category: "SUA PRIORIDADE",
    defaultNext: "q6",
    answers: [
      {
        id: "protecao",
        label: "Proteção máxima da pintura",
        icon: "🛡️",
        scores: { ppf: 5, coating: 2 },
      },
      {
        id: "beleza",
        label: "Recuperar o brilho e a beleza",
        icon: "✨",
        scores: { polimento: 5, coating: 3, estetica: 2 },
      },
      {
        id: "durabilidade",
        label: "Durabilidade (proteger por anos)",
        icon: "⏱️",
        scores: { coating: 5, ppf: 3 },
      },
      {
        id: "conforto",
        label: "Conforto e privacidade",
        icon: "😎",
        scores: { insulfilm: 5, vidros: 2 },
      },
      {
        id: "custo_beneficio",
        label: "Melhor custo-benefício no geral",
        icon: "💰",
        scores: { estetica: 5, polimento: 2 },
      },
    ],
  },
  q6: {
    question: "Seu veículo tem garagem coberta?",
    subtitle: "A exposição ao ambiente afeta a durabilidade dos tratamentos.",
    category: "AMBIENTE",
    defaultNext: "capture",
    answers: [
      {
        id: "sempre",
        label: "Sim, sempre fica coberto",
        icon: "🏠",
        scores: { coating: 2 },
      },
      {
        id: "as_vezes",
        label: "Às vezes (exposição mista)",
        icon: "⛅",
        scores: { ppf: 2, insulfilm: 2 },
      },
      {
        id: "nao",
        label: "Não, fica exposto ao tempo",
        icon: "☀️",
        scores: { ppf: 3, insulfilm: 3 },
      },
    ],
  },
};

export function buildWhatsAppUrl(message: string): string {
  return `https://wa.me/5514998135198?text=${encodeURIComponent(message)}`;
}

export function calculateRecommendation(
  answers: QuizAnswerRecord[],
  leadName?: string
): {
  primaryService: ServiceKey;
  secondaryServices: ServiceKey[];
  whatsappMessage: string;
  scores: Record<string, number>;
} {
  const scores: Record<ServiceKey, number> = {
    ppf: 0,
    insulfilm: 0,
    polimento: 0,
    estetica: 0,
    coating: 0,
    vidros: 0,
  };

  for (const answer of answers) {
    const question = QUIZ_QUESTIONS[answer.questionId];
    if (!question) continue;
    const answerDef = question.answers.find((a) => a.id === answer.answerId);
    if (!answerDef) continue;
    for (const [service, points] of Object.entries(answerDef.scores)) {
      scores[service as ServiceKey] += points as number;
    }
  }

  const sorted = (Object.keys(scores) as ServiceKey[]).sort((a, b) => scores[b] - scores[a]);
  const primaryService = sorted[0];
  const maxScore = scores[primaryService];
  const threshold = maxScore * 0.6;
  const secondaryServices = sorted
    .slice(1)
    .filter((s) => scores[s] >= threshold && scores[s] > 0)
    .slice(0, 2);

  const serviceNames: Record<ServiceKey, string> = {
    ppf: "PPF (Proteção de Pintura)",
    insulfilm: "Insulfilm de Segurança",
    polimento: "Polimento Técnico",
    estetica: "Estética Completa",
    coating: "Coating Cerâmico",
    vidros: "Tratamento de Vidros",
  };

  const vehicleAnswer = answers.find((a) => a.questionId === "q1");
  const problemAnswer = answers.find((a) => a.questionId === "q2");
  const name = leadName || "você";

  const whatsappMessage = `Olá! Sou ${name}. Fiz o diagnóstico no site e recebi a recomendação de *${serviceNames[primaryService]}* para o meu veículo${vehicleAnswer ? ` (${vehicleAnswer.answerLabel})` : ""}${problemAnswer ? `. Meu principal problema: ${problemAnswer.answerLabel}` : ""}. Gostaria de saber mais sobre preços e agendamento!`;

  return { primaryService, secondaryServices, whatsappMessage, scores };
}
