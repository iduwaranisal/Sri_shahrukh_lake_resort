import mongoose, { Schema, Document, Model } from "mongoose";
import crypto from "crypto";

export interface IAdminUser extends Document {
  username: string;
  passwordHash: string;
  salt: string;
  updatedAt: Date;
  validatePassword(password: string): boolean;
  setPassword(password: string): void;
}

const AdminUserSchema = new Schema<IAdminUser>(
  {
    username: { type: String, required: true, unique: true, default: "admin" },
    passwordHash: { type: String, required: true },
    salt: { type: String, required: true },
  },
  { timestamps: true }
);

const PBKDF2_ROUNDS = 100000;
const PBKDF2_KEYLEN = 64;
const PBKDF2_DIGEST = "sha512";

AdminUserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, PBKDF2_ROUNDS, PBKDF2_KEYLEN, PBKDF2_DIGEST)
    .toString("hex");
};

AdminUserSchema.methods.validatePassword = function (password: string): boolean {
  try {
    const hash = crypto
      .pbkdf2Sync(password, this.salt, PBKDF2_ROUNDS, PBKDF2_KEYLEN, PBKDF2_DIGEST)
      .toString("hex");

    const a = Buffer.from(this.passwordHash, "hex");
    const b = Buffer.from(hash, "hex");

    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      return true;
    }
  } catch {
    // Length mismatch or hex parse issue
  }

  // Fallback for legacy 1000 iteration hashes if any
  try {
    const legacyHash = crypto
      .pbkdf2Sync(password, this.salt, 1000, PBKDF2_KEYLEN, PBKDF2_DIGEST)
      .toString("hex");

    const a = Buffer.from(this.passwordHash, "hex");
    const b = Buffer.from(legacyHash, "hex");

    if (a.length === b.length && crypto.timingSafeEqual(a, b)) {
      // Upgrade immediately to 100,000 rounds
      this.setPassword(password);
      this.save().catch(() => {});
      return true;
    }
  } catch {
    // Ignore
  }

  return false;
};

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
