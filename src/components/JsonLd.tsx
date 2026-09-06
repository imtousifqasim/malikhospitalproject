import React from "react";
import { hospitalInfo } from "@/data/hospital";
import { Doctor } from "@/data/doctors";

export function HospitalJsonLd() {
  const schema = {
    "@context": "https://schema.org",
    "@type": "MedicalOrganization",
    "name": hospitalInfo.name,
    "alternateName": hospitalInfo.urduName,
    "url": hospitalInfo.website,
    "logo": `${hospitalInfo.website}/images/logo.png`,
    "description": "Multi-specialty hospital located at Malik Hospital Chowk, Hujra Shah Muqeem, providing 24/7 emergency, general medicine, surgery, pediatrics, cardiology, gynecology, and diagnostics.",
    "telephone": hospitalInfo.emergencyPhone,
    "emergencyTelephone": hospitalInfo.emergencyPhone,
    "address": {
      "@type": "PostalAddress",
      "streetAddress": hospitalInfo.address,
      "addressLocality": "Hujra Shah Muqeem",
      "addressRegion": "Punjab",
      "postalCode": "56160",
      "addressCountry": "PK"
    },
    "geo": {
      "@type": "GeoCoordinates",
      "latitude": hospitalInfo.mapCoordinates.lat,
      "longitude": hospitalInfo.mapCoordinates.lng
    },
    "openingHoursSpecification": [
      {
        "@type": "OpeningHoursSpecification",
        "dayOfWeek": [
          "Monday",
          "Tuesday",
          "Wednesday",
          "Thursday",
          "Friday",
          "Saturday",
          "Sunday"
        ],
        "opens": "00:00",
        "closes": "23:59"
      }
    ],
    "medicalSpecialty": [
      "GeneralMedicine",
      "Pediatric",
      "Orthopedic",
      "Cardiovascular",
      "Gastroenterology",
      "Dermatology",
      "Gynecologic",
      "Ophthalmic"
    ]
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}

export function PhysicianJsonLd({ doctor }: { doctor: Doctor }) {
  const schema = {
    "@context": "https://schema.org",
    "@type": "Physician",
    "name": doctor.name,
    "alternateName": doctor.urduName,
    "description": doctor.about,
    "medicalSpecialty": doctor.specialty,
    "jobTitle": doctor.title,
    "alumniOf": doctor.degrees,
    "knowsLanguage": doctor.languages,
    "worksFor": {
      "@type": "MedicalOrganization",
      "name": hospitalInfo.name,
      "address": hospitalInfo.address
    },
    "priceRange": doctor.feeRange
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
