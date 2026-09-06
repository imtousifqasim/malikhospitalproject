import { MetadataRoute } from "next";
import { doctors } from "@/data/doctors";
import { departments } from "@/data/departments";
import { services } from "@/data/services";

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = "https://www.malikmedicalcomplex.com";

  // Static routes
  const staticRoutes = [
    "",
    "/about",
    "/departments",
    "/doctors",
    "/services",
    "/pricing",
    "/appointment",
    "/contact",
    "/faqs",
    "/insurance",
    "/gallery",
    "/reviews",
    "/health-tips",
    "/privacy-policy",
    "/terms",
    "/careers"
  ].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: route === "" ? 1.0 : 0.8
  }));

  // Doctor dynamic routes
  const doctorRoutes = doctors.map((doc) => ({
    url: `${baseUrl}/doctors/${doc.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  // Department dynamic routes
  const departmentRoutes = departments.map((dept) => ({
    url: `${baseUrl}/departments/${dept.slug}`,
    lastModified: new Date(),
    changeFrequency: "monthly" as const,
    priority: 0.9
  }));

  return [...staticRoutes, ...doctorRoutes, ...departmentRoutes];
}
