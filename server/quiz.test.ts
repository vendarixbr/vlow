import { describe, expect, it, vi, beforeEach } from "vitest";
import { appRouter } from "./routers";
import type { TrpcContext } from "./_core/context";

// Mock do módulo de banco de dados
vi.mock("./db", () => ({
  createQuizLead: vi.fn().mockResolvedValue(1),
  createQuizSession: vi.fn().mockResolvedValue(1),
  getAllLeads: vi.fn().mockResolvedValue([]),
  getAllSessions: vi.fn().mockResolvedValue([]),
  upsertUser: vi.fn(),
  getUserByOpenId: vi.fn(),
}));

// Mock de notificação
vi.mock("./_core/notification", () => ({
  notifyOwner: vi.fn().mockResolvedValue(true),
}));

function createPublicContext(): TrpcContext {
  return {
    user: null,
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: {
      clearCookie: vi.fn(),
    } as unknown as TrpcContext["res"],
  };
}

function createAdminContext(): TrpcContext {
  return {
    user: {
      id: 1,
      openId: "admin-open-id",
      email: "admin@nettorazze.com",
      name: "Admin",
      loginMethod: "manus",
      role: "admin",
      createdAt: new Date(),
      updatedAt: new Date(),
      lastSignedIn: new Date(),
    },
    req: { protocol: "https", headers: {} } as TrpcContext["req"],
    res: { clearCookie: vi.fn() } as unknown as TrpcContext["res"],
  };
}

describe("quiz.saveLead", () => {
  it("salva um lead válido e retorna o leadId", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.saveLead({
      name: "João Silva",
      whatsapp: "14999990000",
    });

    expect(result).toHaveProperty("leadId");
    expect(result.leadId).toBe(1);
  });

  it("rejeita nome muito curto", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.saveLead({ name: "J", whatsapp: "14999990000" })
    ).rejects.toThrow();
  });

  it("rejeita whatsapp muito curto", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    await expect(
      caller.quiz.saveLead({ name: "João Silva", whatsapp: "123" })
    ).rejects.toThrow();
  });
});

describe("quiz.saveSession", () => {
  it("salva uma sessão completa e retorna o sessionId", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);

    const result = await caller.quiz.saveSession({
      leadId: 1,
      answers: [
        { questionId: "q1", answerId: "q1_proteger", answerLabel: "Proteger a pintura" },
        { questionId: "q3", answerId: "q3_novo", answerLabel: "Carro novo" },
      ],
      recommendedService: "ppf",
      recommendedServices: ["ppf", "coating"],
      score: { ppf: 9, coating: 6, insulfilm: 0, polimento: 0, estetica: 0, vidros: 0 },
      whatsappMessage: "Olá! Fiz o quiz e recebi a recomendação de PPF.",
      leadName: "João Silva",
    });

    expect(result).toHaveProperty("sessionId");
    expect(result.sessionId).toBe(1);
  });
});

describe("quiz.getLeads (admin only)", () => {
  it("retorna leads para admin", async () => {
    const ctx = createAdminContext();
    const caller = appRouter.createCaller(ctx);
    const result = await caller.quiz.getLeads();
    expect(Array.isArray(result)).toBe(true);
  });

  it("rejeita acesso de usuário comum", async () => {
    const ctx = createPublicContext();
    const caller = appRouter.createCaller(ctx);
    await expect(caller.quiz.getLeads()).rejects.toThrow();
  });
});
