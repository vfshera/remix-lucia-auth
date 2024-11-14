import type { InferInsertModel, InferSelectModel } from "drizzle-orm";
import type { users, sessions } from "./schema";

export type User = InferSelectModel<typeof users>;

export type InsertUser = InferInsertModel<typeof users>;

export type Session = InferSelectModel<typeof sessions>;

export type InsertSession = InferInsertModel<typeof sessions>;
