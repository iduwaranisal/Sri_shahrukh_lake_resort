/**
 * WhatsApp and phone helper utilities for Sri Shahrukh Lake Resort.
 * Standardizes Sri Lankan phone numbers to international E.164 without '+'
 * format required by the WhatsApp API (https://wa.me/<number>).
 */

export const DEFAULT_WHATSAPP_NUMBER = "94757273416";
export const DEFAULT_PHONE_NUMBER = "+94776219245";

/**
 * Cleans any raw phone string into a valid WhatsApp recipient ID.
 * Examples:
 * - "0757273416" -> "94757273416"
 * - "+94 75 727 3416" -> "94757273416"
 * - "757273416" -> "94757273416"
 * - "94757273416" -> "94757273416"
 */
export function getCleanWhatsAppNumber(rawNumber?: string | null): string {
  if (!rawNumber) return DEFAULT_WHATSAPP_NUMBER;
  const digits = rawNumber.replace(/[^0-9]/g, "");
  if (!digits) return DEFAULT_WHATSAPP_NUMBER;

  if (digits.startsWith("0")) {
    return "94" + digits.slice(1);
  }
  if (!digits.startsWith("94") && digits.length === 9) {
    return "94" + digits;
  }
  return digits;
}

/**
 * Generates an official wa.me direct chat link with properly encoded message.
 */
export function getWhatsAppUrl(
  rawNumber?: string | null,
  message?: string
): string {
  const clean = getCleanWhatsAppNumber(rawNumber);
  if (!message) {
    return `https://wa.me/${clean}`;
  }
  return `https://wa.me/${clean}?text=${encodeURIComponent(message)}`;
}

/**
 * Formats a phone string into a valid tel: protocol URI.
 */
export function getTelUrl(rawNumber?: string | null): string {
  if (!rawNumber) return `tel:${DEFAULT_PHONE_NUMBER}`;
  const trimmed = rawNumber.trim();
  if (trimmed.startsWith("+")) {
    return `tel:${trimmed.replace(/[^0-9+]/g, "")}`;
  }
  const digits = trimmed.replace(/[^0-9]/g, "");
  if (digits.startsWith("0")) {
    return `tel:+94${digits.slice(1)}`;
  }
  if (!digits.startsWith("94")) {
    return `tel:+94${digits}`;
  }
  return `tel:+${digits}`;
}
