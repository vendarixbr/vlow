import { z } from "zod";
import { COOKIE_NAME } from "@shared/const";
import { getSessionCookieOptions } from "./_core/cookies";
import { systemRouter } from "./_core/systemRouter";
import { publicProcedure, protectedProcedure, router } from "./_core/trpc";
import { createQuizLead, createQuizSession, getAllLeads, getAllSessions } from "./db";
import { notifyOwner } from "./_core/notification";

export const appRouter = router({
  system: systemRouter,
  auth: router({
    me: publicProcedure.query(opts => opts.ctx.user),
    logout: publicProcedure.mutation(({ ctx }) => {
      const cookieOptions = getSessionCookieOptions(ctx.req);
      ctx.res.clearCookie(COOKIE_NAME, { ...cookieOptions, maxAge: -1 });
      return { success: true } as const;
    }),
  }),

  quiz: router({
    // Salvar lead (nome + whatsapp) — retorna o ID do lead criado
    saveLead: publicProcedure
      .input(
        z.object({
          name: z.string().min(2).max(255),
          whatsapp: z.string().min(8).max(20),
        })
      )
      .mutation(async ({ input }) => {
        const leadId = await createQuizLead({
          name: input.name,
          whatsapp: input.whatsapp,
        });
        return { leadId };
      }),

    // Salvar sessão completa com respostas e recomendação
    saveSession: publicProcedure
      .input(
        z.object({
          leadId: z.number().int().positive(),
          answers: z.array(
            z.object({
              questionId: z.string(),
              answerId: z.string(),
              answerLabel: z.string(),
            })
          ),
          recommendedService: z.string(),
          recommendedServices: z.array(z.string()),
          score: z.record(z.string(), z.number()),
          whatsappMessage: z.string(),
          leadName: z.string().optional(),
        })
      )
      .mutation(async ({ input }) => {
        const sessionId = await createQuizSession({
          leadId: input.leadId,
          answers: input.answers,
          recommendedService: input.recommendedService,
          recommendedServices: input.recommendedServices,
          score: input.score,
          whatsappMessage: input.whatsappMessage,
        });

        // Notificar o dono do projeto sobre novo lead
        await notifyOwner({
          title: `🚗 Novo lead: ${input.leadName ?? "Anônimo"}`,
          content: `Serviço recomendado: **${input.recommendedService}**\nMensagem WhatsApp gerada com sucesso.\nID da sessão: ${sessionId}`,
        }).catch(() => {}); // silencia falha de notificação

        return { sessionId };
      }),

    // Listar todos os leads (apenas admin)
    getLeads: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Acesso negado");
      }
      return getAllLeads();
    }),

    // Listar todas as sessões (apenas admin)
    getSessions: protectedProcedure.query(async ({ ctx }) => {
      if (ctx.user.role !== "admin") {
        throw new Error("Acesso negado");
      }
      return getAllSessions();
    }),
  }),
});

export type AppRouter = typeof appRouter;
