import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import ConditionalPublicLayout from "@/components/ConditionalPublicLayout";
import { HospitalJsonLd } from "@/components/JsonLd";
import { hospitalInfo } from "@/data/hospital";

const poppins = Poppins({
  weight: ["300", "400", "500", "600", "700", "800"],
  subsets: ["latin"],
  variable: "--font-poppins",
  display: "swap"
});

export const metadata: Metadata = {
  metadataBase: new URL("https://www.malikmedicalcomplex.com"),
  title: {
    default: "Malik Medical Complex | Multi-Specialty Hospital in Hujra Shah Muqeem",
    template: "%s | Malik Medical Complex"
  },
  description:
    "Malik Medical Complex is a leading hospital at Malik Hospital Chowk, Hujra Shah Muqeem. 24/7 Emergency, Expert Specialists, Digital X-Ray, Lab, Ultrasound, Labor Room, Nursery, and Aesthetic Center.",
  keywords: [
    "Malik Medical Complex",
    "Malik Hospital Hujra Shah Muqeem",
    "Hospital in Hujra Shah Muqeem",
    "Hospital Depalpur Okara",
    "Emergency hospital Hujra Shah Muqeem",
    "Dr Faraz Aslam",
    "Dr Abdul Qayyum Spine Surgeon",
    "Dr Muneeb Babar Pediatrician",
    "Dr Pari Iman Gul Gynaecologist",
    "Dr Aftab Anwar Cardiologist",
    "Prof Dr Faisal Rasheed Gastro",
    "Digital X-Ray Hujra Shah Muqeem",
    "Ultrasound Okara",
    "24/7 Delivery Hospital"
  ],
  authors: [{ name: "Malik Medical Complex", url: "https://www.malikmedicalcomplex.com" }],
  creator: "Malik Medical Complex",
  publisher: "Malik Medical Complex",
  formatDetection: {
    telephone: true,
    address: true,
    email: true
  },
  openGraph: {
    type: "website",
    locale: "en_PK",
    url: "https://www.malikmedicalcomplex.com",
    title: "Malik Medical Complex — Premier Hospital in Hujra Shah Muqeem",
    description:
      "Comprehensive healthcare, 24/7 emergency, expert medical specialists, modern diagnostics, and advanced maternity care.",
    siteName: "Malik Medical Complex",
    images: [
      {
        url: "/images/founder.jpg",
        width: 1200,
        height: 630,
        alt: "Malik Medical Complex Hujra Shah Muqeem"
      }
    ]
  },
  twitter: {
    card: "summary_large_image",
    title: "Malik Medical Complex — Hujra Shah Muqeem",
    description: "24/7 Emergency, Top Specialist Doctors, Modern Diagnostics & Delivery Care.",
    images: ["/images/founder.jpg"]
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1
    }
  },
  icons: {
    icon: [
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    shortcut: "/favicon.svg",
    apple: "/favicon.svg",
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${poppins.variable} scroll-smooth antialiased`} data-scroll-behavior="smooth">
      <head>
        <HospitalJsonLd />
      </head>
      <body className="min-h-screen flex flex-col bg-[#F8FAFC] text-slate-900 selection:bg-[#14B8A6]/20 selection:text-[#0B3D91]">
        <ConditionalPublicLayout>{children}</ConditionalPublicLayout>
      </body>
    </html>
  );
}
