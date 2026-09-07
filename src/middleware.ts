import { NextResponse, type NextRequest } from "next/server";
import { createServerClient } from "@supabase/ssr";

export async function middleware(request: NextRequest) {
  let response = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  // If Supabase is not yet configured, allow navigation to proceed
  if (!supabaseUrl || !supabaseAnonKey) {
    return response;
  }

  const supabase = createServerClient(supabaseUrl, supabaseAnonKey, {
    cookies: {
      getAll() {
        return request.cookies.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value }) =>
          request.cookies.set(name, value)
        );
        response = NextResponse.next({
          request: {
            headers: request.headers,
          },
        });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;

  // 1. ADMIN ROUTES
  if (pathname.startsWith("/admin")) {
    const isLoginPage = pathname === "/admin/login";

    if (!user) {
      if (!isLoginPage) {
        const redirectUrl = new URL("/admin/login", request.url);
        redirectUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(redirectUrl);
      }
      return response;
    }

    // User is logged in — verify role from staff_profiles
    const { data: profile } = await supabase
      .from("staff_profiles")
      .select("role, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || !profile.is_active) {
      // Inactive or unprofiled user
      const redirectUrl = new URL("/admin/login", request.url);
      redirectUrl.searchParams.set("error", "account_deactivated");
      return NextResponse.redirect(redirectUrl);
    }

    if (profile.role !== "admin") {
      // Staff-role user attempting to access CEO/admin area -> redirect to /staff with error
      const redirectUrl = new URL("/staff", request.url);
      redirectUrl.searchParams.set("error", "admin_access_denied");
      return NextResponse.redirect(redirectUrl);
    }

    // If admin is on login page, redirect to /admin dashboard
    if (isLoginPage) {
      return NextResponse.redirect(new URL("/admin", request.url));
    }
  }

  // 2. STAFF ROUTES
  if (pathname.startsWith("/staff")) {
    const isLoginPage = pathname === "/staff/login";

    if (!user) {
      if (!isLoginPage) {
        const redirectUrl = new URL("/staff/login", request.url);
        redirectUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(redirectUrl);
      }
      return response;
    }

    // Check profile
    const { data: profile } = await supabase
      .from("staff_profiles")
      .select("role, is_active")
      .eq("id", user.id)
      .maybeSingle();

    if (!profile || !profile.is_active) {
      const redirectUrl = new URL("/staff/login", request.url);
      redirectUrl.searchParams.set("error", "account_deactivated");
      return NextResponse.redirect(redirectUrl);
    }

    if (profile.role !== "staff") {
      // CEO / Admin attempting to access staff portal -> redirect strictly to /admin
      const redirectUrl = new URL("/admin", request.url);
      redirectUrl.searchParams.set("error", "staff_area_restricted");
      return NextResponse.redirect(redirectUrl);
    }

    if (isLoginPage) {
      return NextResponse.redirect(new URL("/staff", request.url));
    }
  }

  return response;
}

export const config = {
  matcher: [
    "/admin/:path*",
    "/staff/:path*",
    "/((?!_next/static|_next/image|favicon.ico|images|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};
