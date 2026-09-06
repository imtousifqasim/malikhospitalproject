export interface HospitalInfo {
  name: string;
  tagline: string;
  urduName: string;
  address: string;
  city: string;
  landmark: string;
  phones: string[];
  emergencyPhone: string;
  whatsapp: string;
  whatsappMessage: string;
  email: string;
  website: string;
  workingHours: {
    emergency: string;
    opd: string;
    diagnostics: string;
    pharmacy: string;
  };
  stats: {
    yearsOfExcellence: number;
    specialistsCount: number;
    happyPatients: string;
    departmentsCount: number;
    emergencyAvailability: string;
  };
  socialLinks: {
    facebook: string;
    instagram: string;
    youtube: string;
  };
  mapCoordinates: {
    lat: number;
    lng: number;
  };
}

export const hospitalInfo: HospitalInfo = {
  name: "Malik Medical Complex",
  urduName: "ملک میڈیکل کمپلیکس",
  tagline: "Your Health, Our Sacred Priority",
  address: "Malik Hospital Chowk, Hujra Shah Muqeem, Depalpur, Okara, Punjab, Pakistan",
  city: "Hujra Shah Muqeem",
  landmark: "Malik Hospital Chowk",
  phones: [
    "0370-6972295",
    "0300-6972295",
    "0444-860465"
  ],
  emergencyPhone: "0300-6972295",
  whatsapp: "+923006972295",
  whatsappMessage: "Assalam-o-Alaikum! I want to inquire about Malik Medical Complex services / book an appointment.",
  email: "info@malikmedicalcomplex.com",
  website: "https://www.malikmedicalcomplex.com",
  workingHours: {
    emergency: "24 Hours / 7 Days a Week",
    opd: "8:00 AM – 10:00 PM (Daily)",
    diagnostics: "24 Hours for X-Ray, Lab & Ultrasound",
    pharmacy: "24 Hours Open"
  },
  stats: {
    yearsOfExcellence: 15,
    specialistsCount: 12,
    happyPatients: "50,000+",
    departmentsCount: 9,
    emergencyAvailability: "24/7 Always Open"
  },
  socialLinks: {
    facebook: "https://facebook.com",
    instagram: "https://instagram.com",
    youtube: "https://youtube.com"
  },
  mapCoordinates: {
    lat: 30.7423,
    lng: 73.8242
  }
};
