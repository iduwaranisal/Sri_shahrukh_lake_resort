import crypto from "crypto";
import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser, type IAdminUser } from "@/models/AdminUser";

export const COOKIE_NAME = "srishahrukh_admin_session";
export const SECRET = process.env.ADMIN_SECRET_KEY || "srishahrukh_admin_secret_key_tissa_2026";
export const DEFAULT_ADMIN_PASSWORD = process.env.ADMIN_INITIAL_PASSWORD || "Geethadmin#1980";

// ── In-Memory Rate Limiting for Admin Login (Brute-Force Protection) ──
interface AttemptRecord {
  count: number;
  lockedUntil: number;
}

const loginAttempts = new Map<string, AttemptRecord>();
const MAX_FAILED_ATTEMPTS = 5;
const LOCKOUT_DURATION_MS = 15 * 60 * 1000; // 15 minutes

export function checkRateLimit(key = "admin_login"): { allowed: boolean; waitMinutes?: number } {
  const record = loginAttempts.get(key);
  if (!record) return { allowed: true };

  const now = Date.now();
  if (record.lockedUntil > now) {
    const remainingMs = record.lockedUntil - now;
    const waitMinutes = Math.ceil(remainingMs / 60000);
    return { allowed: false, waitMinutes };
  }

  if (record.lockedUntil > 0 && record.lockedUntil <= now) {
    loginAttempts.delete(key);
  }

  return { allowed: true };
}

export function recordFailedAttempt(key = "admin_login") {
  const now = Date.now();
  const record = loginAttempts.get(key) || { count: 0, lockedUntil: 0 };
  record.count += 1;

  if (record.count >= MAX_FAILED_ATTEMPTS) {
    record.lockedUntil = now + LOCKOUT_DURATION_MS;
    console.warn(`[Security Alert] Admin login locked out due to ${record.count} consecutive failed attempts.`);
  }

  loginAttempts.set(key, record);
}

export function resetLoginAttempts(key = "admin_login") {
  loginAttempts.delete(key);
}

// ── Cryptographic Session Tokens with HMAC-SHA256 ──
export function signToken(username: string): string {
  const timestamp = Date.now();
  const data = `${username}:${timestamp}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64")}.${hmac}`;
}

export function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [b64Data, hmac] = parts;
    const data = Buffer.from(b64Data, "base64").toString("utf-8");
    const expectedHmac = crypto.createHmac("sha256", SECRET).update(data).digest("hex");

    // Timing-safe comparison to prevent side-channel timing attacks
    const hmacBuf = Buffer.from(hmac, "hex");
    const expectedBuf = Buffer.from(expectedHmac, "hex");
    if (hmacBuf.length !== expectedBuf.length || !crypto.timingSafeEqual(hmacBuf, expectedBuf)) {
      return false;
    }

    // Verify expiration (session valid for 7 days)
    const [, timestampStr] = data.split(":");
    const timestamp = parseInt(timestampStr, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (isNaN(timestamp) || Date.now() - timestamp > maxAge) return false;

    return true;
  } catch {
    return false;
  }
}

export async function getOrCreateAdmin(): Promise<IAdminUser> {
  await connectToDatabase();
  let admin = await AdminUser.findOne({ username: "admin" });
  if (!admin) {
    admin = new AdminUser({ username: "admin" });
    admin.setPassword(DEFAULT_ADMIN_PASSWORD);
    await admin.save();
    console.log("[Admin Initialized] Default admin user created with username 'admin'");
  }
  return admin;
}

export async function verifyAdminSession(): Promise<{ authenticated: boolean }> {
  try {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get(COOKIE_NAME);
    if (!sessionCookie || !sessionCookie.value) {
      return { authenticated: false };
    }

    const isValid = verifyToken(sessionCookie.value);
    return { authenticated: isValid };
  } catch {
    return { authenticated: false };
  }
}
