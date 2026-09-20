"use server";

import { cookies } from "next/headers";
import {
  COOKIE_NAME,
  signToken,
  getOrCreateAdmin,
  checkRateLimit,
  recordFailedAttempt,
  resetLoginAttempts,
  verifyAdminSession,
} from "@/lib/adminAuth";

/**
 * Verify whether the incoming request has a valid authenticated admin session.
 */
export async function checkAdminAuth(): Promise<{ authenticated: boolean }> {
  return verifyAdminSession();
}

/**
 * Guard function for server actions. Returns unauthorized status if not authenticated.
 */
export async function requireAdminAuth(): Promise<{ authorized: boolean; error?: string }> {
  const { authenticated } = await checkAdminAuth();
  if (!authenticated) {
    return { authorized: false, error: "Unauthorized access: Admin session required." };
  }
  return { authorized: true };
}

export async function loginAdmin(password: string) {
  try {
    // 1. Check rate limit
    const rateCheck = checkRateLimit();
    if (!rateCheck.allowed) {
      return {
        success: false,
        error: `Too many failed login attempts. Account locked for security. Please retry in ${rateCheck.waitMinutes} minutes.`,
      };
    }

    if (!password) {
      return { success: false, error: "Please enter your password" };
    }

    const admin = await getOrCreateAdmin();
    const isValid = admin.validatePassword(password);

    if (!isValid) {
      recordFailedAttempt();
      return { success: false, error: "Incorrect admin password" };
    }

    // Success: clear rate limit counter
    resetLoginAttempts();

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

export async function changeAdminPassword(oldPassword: string, newPassword: string) {
  try {
    // Password complexity requirements
    if (!newPassword || newPassword.length < 8) {
      return { success: false, error: "New password must be at least 8 characters long" };
    }

    const admin = await getOrCreateAdmin();
    const isOldValid = admin.validatePassword(oldPassword);

    if (!isOldValid) {
      return { success: false, error: "Current password is incorrect" };
    }

    admin.setPassword(newPassword);
    await admin.save();

    // Re-issue fresh session cookie
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
