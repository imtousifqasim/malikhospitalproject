import { Appointment } from "@/types/database";
import { hospitalInfo } from "@/data/hospital";

export interface PhoneValidationResult {
  isValid: boolean;
  error?: string;
  cleanPhone: string; // e.g. "03001234567" or "+971501234567"
  waPhone: string; // e.g. "923001234567" (suitable for https://wa.me/)
}

/**
 * Validates whether a phone number is a valid mobile number with WhatsApp capability.
 * Supports:
 * - Pakistani Mobile: 0300-1234567, 03XXXXXXXXX, +923XXXXXXXXX, 923XXXXXXXXX
 *   Must start with 03 / +923 / 923, have 10 mobile digits after country code, and not be all repeating.
 * - International Mobile: Starts with +, has 10-15 digits.
 * Rejects landlines (e.g. 051, 042, 021) and fake repeating sequences (e.g. 03000000000).
 */
export function validateAndFormatWhatsApp(rawPhone: string): PhoneValidationResult {
  if (!rawPhone || !rawPhone.trim()) {
    return {
      isValid: false,
      error: "WhatsApp contact number is required.",
      cleanPhone: "",
      waPhone: "",
    };
  }

  // Remove spaces, hyphens, parentheses, and dots
  const stripped = rawPhone.trim().replace(/[\s\-\(\)\.]/g, "");

  // Check Pakistani mobile patterns:
  // (?:\\+92|92|0)? followed by (3[0-4][0-9]{8})
  const pkMobileRegex = /^(?:\+92|92|0)?(3[0-4][0-9]{8})$/;
  const pkMatch = stripped.match(pkMobileRegex);

  if (pkMatch) {
    const mobile10 = pkMatch[1]; // 3XXXXXXXXX (10 digits)

    // Check for fake repeating digits (e.g., 3000000000, 3111111111)
    const afterPrefix = mobile10.slice(2); // last 8 digits
    const isAllSame = afterPrefix.split("").every((c) => c === afterPrefix[0]);
    if (isAllSame) {
      return {
        isValid: false,
        error: "Please enter a valid active WhatsApp number (repeating test numbers are not allowed).",
        cleanPhone: stripped,
        waPhone: "",
      };
    }

    return {
      isValid: true,
      cleanPhone: `0${mobile10}`,
      waPhone: `92${mobile10}`,
    };
  }

  // Check valid international numbers (must start with + and have 10 to 15 digits)
  const intlRegex = /^\+([1-9][0-9]{9,14})$/;
  const intlMatch = stripped.match(intlRegex);
  if (intlMatch) {
    const intlDigits = intlMatch[1];
    return {
      isValid: true,
      cleanPhone: `+${intlDigits}`,
      waPhone: intlDigits,
    };
  }

  // If it's a Pakistani landline (starts with 051, 042, 021, etc.)
  if (/^0[1-9][0-9]{7,9}$/.test(stripped) && !stripped.startsWith("03")) {
    return {
      isValid: false,
      error: "Landline numbers do not support WhatsApp. Please enter a valid mobile number (e.g. 0300-1234567).",
      cleanPhone: stripped,
      waPhone: "",
    };
  }

  return {
    isValid: false,
    error: "Invalid WhatsApp number format. Enter a Pakistani mobile (e.g. 0300-1234567) or international number with country code (+92...).",
    cleanPhone: stripped,
    waPhone: "",
  };
}

/**
 * Format any stored phone string into a valid wa.me recipient
 */
export function getWhatsAppRecipient(phone: string): string {
  const { waPhone } = validateAndFormatWhatsApp(phone);
  if (waPhone) return waPhone;
  // Fallback cleanup
  return phone.replace(/[^0-9]/g, "");
}

/**
 * Generates an appropriate bilingual WhatsApp message for patient updates
 */
export function generateWhatsAppMessage(
  appointment: Appointment,
  customNote?: string
): string {
  const patient = appointment.patient_name || "Patient";
  const doctor = appointment.doctor || "Consultant Specialist";
  const dept = appointment.department || "General OPD";
  const token = appointment.token || "N/A";
  const date = appointment.date || "Scheduled Date";
  const shift = appointment.time_slot || "Shift hours";

  let statusSection = "";

  switch (appointment.status) {
    case "confirmed":
      statusSection =
        `✅ *STATUS: CONFIRMED / بکنگ تصدیق شدہ*\n\n` +
        `Assalam-o-Alaikum *${patient}*,\n` +
        `Your appointment at *Malik Medical Complex* has been verified and confirmed.\n\n` +
        `📋 *Token Number:* ${token}\n` +
        `👨‍⚕️ *Doctor:* ${doctor}\n` +
        `🏢 *Department:* ${dept}\n` +
        `📅 *Date:* ${date}\n` +
        `⏰ *Time / Shift:* ${shift}\n\n` +
        `📍 *Hospital Location:* Malik Hospital Chowk, Main GT Road\n` +
        `ℹ️ *Instructions:* Please report to the reception desk 15 minutes before your time slot and show this digital slip or token number.`;
      break;

    case "cancelled":
      statusSection =
        `❌ *STATUS: CANCELLED / منسوخ شدہ*\n\n` +
        `Assalam-o-Alaikum *${patient}*,\n` +
        `We regret to inform you that your appointment (*Token: ${token}*) with *${doctor}* on *${date}* has been cancelled.\n\n` +
        `📞 To reschedule or book an alternate slot, please reply to this WhatsApp message or call our reception at ${hospitalInfo.phones[0]}.`;
      break;

    case "completed":
      statusSection =
        `🩺 *STATUS: COMPLETED / وزٹ مکمل*\n\n` +
        `Assalam-o-Alaikum *${patient}*,\n` +
        `Thank you for visiting *Malik Medical Complex* for your consultation with *${doctor}*.\n\n` +
        `We hope you had a satisfactory experience. If you require follow-up prescriptions, reports, or inquiries, our desk is always here to assist you. Wishing you good health!`;
      break;

    case "pending":
    default:
      statusSection =
        `⏳ *STATUS: UNDER REVIEW / تصدیق زیر التوا*\n\n` +
        `Assalam-o-Alaikum *${patient}*,\n` +
        `Your appointment request (*Token: ${token}*) with *${doctor}* for *${date} (${shift})* has been received.\n\n` +
        `Our coordinator is reviewing the specialist schedule. You will receive an official confirmation shortly.`;
      break;
  }

  if (customNote && customNote.trim()) {
    statusSection += `\n\n📌 *Special Note from Hospital Desk:*\n${customNote.trim()}`;
  }

  statusSection += `\n\n— *Malik Medical Complex* | Emergency 24/7: ${hospitalInfo.emergencyPhone}`;

  return statusSection;
}

/**
 * Builds the full wa.me direct link
 */
export function buildWhatsAppLink(phone: string, message: string): string {
  const recipient = getWhatsAppRecipient(phone);
  return `https://wa.me/${recipient}?text=${encodeURIComponent(message)}`;
}
