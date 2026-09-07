import { createClient } from "./server";

export async function requireAuthUser() {
  const supabase = await createClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error || !user) {
    return { user: null, profile: null, error: "Unauthorized" };
  }

  const { data: profile } = await supabase
    .from("staff_profiles")
    .select("*")
    .eq("id", user.id)
    .maybeSingle();

  if (!profile || !profile.is_active) {
    return { user, profile: null, error: "Account inactive or unauthorized" };
  }

  return { user, profile, error: null };
}

export async function requireAdmin() {
  const { user, profile, error } = await requireAuthUser();

  if (error || !profile) {
    return { user: null, profile: null, error: error || "Unauthorized" };
  }

  if (profile.role !== "admin") {
    return { user, profile, error: "Forbidden: Admin access required" };
  }

  return { user, profile, error: null };
}
