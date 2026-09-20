"use server";

import { cookies } from "next/headers";
import { connectToDatabase } from "@/lib/mongodb";
import { AdminUser, type IAdminUser } from "@/models/AdminUser";
import crypto from "crypto";

const COOKIE_NAME = "srishahrukh_admin_session";
const SECRET = process.env.ADMIN_SECRET_KEY || "srishahrukh_admin_secret_key_tissa_2026";
const DEFAULT_ADMIN_PASSWORD = "admin";

function signToken(username: string): string {
  const timestamp = Date.now();
  const data = `${username}:${timestamp}`;
  const hmac = crypto.createHmac("sha256", SECRET).update(data).digest("hex");
  return `${Buffer.from(data).toString("base64")}.${hmac}`;
}

function verifyToken(token: string): boolean {
  try {
    const parts = token.split(".");
    if (parts.length !== 2) return false;
    const [b64Data, hmac] = parts;
    const data = Buffer.from(b64Data, "base64").toString("utf-8");
    const expectedHmac = crypto.createHmac("sha256", SECRET).update(data).digest("hex");
    if (hmac !== expectedHmac) return false;

    // Verify expiration (session valid for 7 days)
    const [, timestampStr] = data.split(":");
    const timestamp = parseInt(timestampStr, 10);
    const maxAge = 7 * 24 * 60 * 60 * 1000;
    if (Date.now() - timestamp > maxAge) return false;

    return true;
  } catch {
    return false;
  }
}

async function getOrCreateAdmin(): Promise<IAdminUser> {
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

export async function loginAdmin(password: string) {
  try {
    if (!password) {
      return { success: false, error: "Please enter your password" };
    }

    const admin = await getOrCreateAdmin();
    const isValid = admin.validatePassword(password);

    if (!isValid) {
      return { success: false, error: "Incorrect admin password" };
    }

    const token = signToken(admin.username);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60, // 7 days
      path: "/",
    });

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Admin Login Error]", error);
    return { success: false, error: error.message || "Failed to log in" };
  }
}

export async function logoutAdmin() {
  try {
    const cookieStore = await cookies();
    cookieStore.delete(COOKIE_NAME);
    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Admin Logout Error]", error);
    return { success: false, error: error.message || "Failed to log out" };
  }
}

export async function checkAdminAuth(): Promise<{ authenticated: boolean }> {
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

export async function changeAdminPassword(oldPassword: string, newPassword: string) {
  try {
    if (!newPassword || newPassword.length < 4) {
      return { success: false, error: "New password must be at least 4 characters long" };
    }

    const admin = await getOrCreateAdmin();
    const isOldValid = admin.validatePassword(oldPassword);

    if (!isOldValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    admin.setPassword(newPassword);
    await admin.save();

    // Re-issue session cookie with new timestamp
    const token = signToken(admin.username);
    const cookieStore = await cookies();
    cookieStore.set(COOKIE_NAME, token, {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 7 * 24 * 60 * 60,
      path: "/",
    });

    return { success: true };
  } catch (err: unknown) {
    const error = err as Error;
    console.error("[Change Password Error]", error);
    return { success: false, error: error.message || "Failed to change password" };
  }
}
