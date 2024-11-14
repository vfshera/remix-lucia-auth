import { db } from "..";
import { users } from "../schema";
import type { InsertUser } from "../types";

export function createNewUser(data: Omit<InsertUser, "id">) {
  return db.insert(users).values(data);
}
