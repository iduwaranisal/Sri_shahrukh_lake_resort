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

AdminUserSchema.methods.setPassword = function (password: string) {
  this.salt = crypto.randomBytes(16).toString("hex");
  this.passwordHash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
};

AdminUserSchema.methods.validatePassword = function (password: string): boolean {
  const hash = crypto
    .pbkdf2Sync(password, this.salt, 1000, 64, "sha512")
    .toString("hex");
  return this.passwordHash === hash;
};

export const AdminUser: Model<IAdminUser> =
  mongoose.models.AdminUser || mongoose.model<IAdminUser>("AdminUser", AdminUserSchema);
