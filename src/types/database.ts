export type StaffRole = "admin" | "staff";

export interface StaffProfile {
  id: string;
  full_name: string;
  role: StaffRole;
  phone: string | null;
  avatar_url: string | null;
  is_active: boolean;
  email?: string | null;
  can_delete: boolean;
  totp_secret?: string | null;
  backup_codes?: string[];
  created_at: string;
  updated_at: string;
}

export interface RetentionPolicy {
  unconfirmed_days: number;
  confirmed_days: number;
  messages_days: number;
}

export type AppointmentStatus = "pending" | "confirmed" | "completed" | "cancelled";

export interface Appointment {
  id: string;
  token: string;
  patient_name: string;
  phone: string;
  gender: string | null;
  age: string | null;
  patient_type: string | null;
  visit_type: string | null;
  department: string | null;
  doctor: string | null;
  date: string;
  time_slot: string;
  symptoms: string | null;
  status: AppointmentStatus;
  notes: string | null;
  booked_by_name?: string | null;
  booked_by_id?: string | null;
  booked_by_role?: string | null;
  updated_by_name?: string | null;
  updated_by_id?: string | null;
  updated_by_role?: string | null;
  created_at: string;
  updated_at: string;
}

export type MessageStatus = "unread" | "read" | "replied" | "archived";

export interface ContactMessage {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  subject: string | null;
  message: string;
  department: string | null;
  status: MessageStatus;
  admin_notes: string | null;
  created_at: string;
  updated_at: string;
}
