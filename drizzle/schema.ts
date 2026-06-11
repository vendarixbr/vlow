import {
  int,
  json,
  mysqlEnum,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from "drizzle-orm/mysql-core";

export const users = mysqlTable("users", {
  id: int("id").autoincrement().primaryKey(),
  openId: varchar("openId", { length: 64 }).notNull().unique(),
  name: text("name"),
  email: varchar("email", { length: 320 }),
  loginMethod: varchar("loginMethod", { length: 64 }),
  role: mysqlEnum("role", ["user", "admin"]).default("user").notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
  updatedAt: timestamp("updatedAt").defaultNow().onUpdateNow().notNull(),
  lastSignedIn: timestamp("lastSignedIn").defaultNow().notNull(),
});

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;

// Leads capturados pelo quiz
export const quizLeads = mysqlTable("quiz_leads", {
  id: int("id").autoincrement().primaryKey(),
  name: varchar("name", { length: 255 }).notNull(),
  whatsapp: varchar("whatsapp", { length: 20 }).notNull(),
  createdAt: timestamp("createdAt").defaultNow().notNull(),
});

export type QuizLead = typeof quizLeads.$inferSelect;
export type InsertQuizLead = typeof quizLeads.$inferInsert;

// Sessões completas do quiz com respostas e recomendação
export const quizSessions = mysqlTable("quiz_sessions", {
  id: int("id").autoincrement().primaryKey(),
  leadId: int("leadId").notNull(),
  answers: json("answers").notNull(), // { questionId: answerId }[]
  recommendedService: varchar("recommendedService", { length: 100 }).notNull(),
  recommendedServices: json("recommendedServices"), // array de serviços recomendados
  score: json("score"), // pontuação por serviço
  whatsappMessage: text("whatsappMessage"),
  completedAt: timestamp("completedAt").defaultNow().notNull(),
});

export type QuizSession = typeof quizSessions.$inferSelect;
export type InsertQuizSession = typeof quizSessions.$inferInsert;
