import { db } from "../db";
import {
  encodeBase32LowerCaseNoPadding,
  encodeHexLowerCase,
} from "@oslojs/encoding";
import { sha256 } from "@oslojs/crypto/sha2";
import type { User, Session } from "../db/types";
import { sessions as sessionsTable, users as usersTable } from "../db/schema";
import { eq } from "drizzle-orm";
import {
  SESSION_COOKIE_NAME,
  SESSION_MAX_DURATION_MS,
  SESSION_REFRESH_INTERVAL_MS,
} from "./consts";
import { createCookie, createCookieSessionStorage } from "@remix-run/node";

const isProd = process.env.NODE_ENV === "production";

export type SessionValidationResult =
  | { session: Session; user: User }
  | { session: null; user: null };

export function generateSessionToken(): string {
  const bytes = new Uint8Array(20);

  crypto.getRandomValues(bytes);
  const token = encodeBase32LowerCaseNoPadding(bytes);

  return token;
}

export async function createSession(
  token: string,
  userId: number
): Promise<Session> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const session: Session = {
    id: sessionId,
    userId,
    expiresAt: new Date(Date.now() + SESSION_MAX_DURATION_MS),
  };

  await db.insert(sessionsTable).values(session);

  return session;
}

export async function validateSessionToken(
  token: string
): Promise<SessionValidationResult> {
  const sessionId = encodeHexLowerCase(sha256(new TextEncoder().encode(token)));

  const result = await db
    .select({ user: usersTable, session: sessionsTable })
    .from(sessionsTable)
    .innerJoin(usersTable, eq(sessionsTable.userId, usersTable.id))
    .where(eq(sessionsTable.id, sessionId));

  if (result.length < 1) {
    return { session: null, user: null };
  }

  const { user, session } = result[0];

  if (Date.now() >= session.expiresAt.getTime()) {
    await db.delete(sessionsTable).where(eq(sessionsTable.id, session.id));

    return { session: null, user: null };
  }

  if (Date.now() >= session.expiresAt.getTime() - SESSION_REFRESH_INTERVAL_MS) {
    session.expiresAt = new Date(Date.now() + SESSION_MAX_DURATION_MS);
    await db
      .update(sessionsTable)
      .set({
        expiresAt: session.expiresAt,
      })
      .where(eq(sessionsTable.id, session.id));
  }

  return { session, user };
}

export async function invalidateSession(sessionId: string) {
  await db.delete(sessionsTable).where(eq(sessionsTable.id, sessionId));
}

export type SessionData = {
  //   userId: string;
};

export type SessionFlashData = {
  //   error: string;
};

export const {
  getSession: getAuthSession,
  commitSession: commitAuthSession,
  destroySession: destroyAuthSession,
} = createCookieSessionStorage<SessionData, SessionFlashData>({
  cookie: {
    name: SESSION_COOKIE_NAME,
    sameSite: "lax",
    path: "/",
    httpOnly: isProd,
    maxAge: SESSION_MAX_DURATION_MS,
    secure: isProd,
  },
});

export function setSessionTokenCookie(
  response: Response,
  token: string,
  expiresAt: Date
): void {
  //   response.headers.set("Set-Cookie", await commitAuthSession( ));
}

export function deleteSessionTokenCookie(response: Response): void {
  //   if (env === Env.PROD) {
  //     // When deployed over HTTPS
  //     response.headers.add(
  //       "Set-Cookie",
  //       "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/; Secure;"
  //     );
  //   } else {
  //     // When deployed over HTTP (localhost)
  //     response.headers.add(
  //       "Set-Cookie",
  //       "session=; HttpOnly; SameSite=Lax; Max-Age=0; Path=/"
  //     );
  //   }
}
