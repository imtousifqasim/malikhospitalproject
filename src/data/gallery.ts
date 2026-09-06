export interface GalleryImage {
  id: string;
  title: string;
  category: "Facilities & Infrastructure" | "Operation Theaters" | "Diagnostics & Lab" | "Nursery & Wards" | "Aesthetic Lounge";
  description: string;
  image: string;
  alt: string;
}

export const galleryCategories = [
  "All",
  "Facilities & Infrastructure",
  "Operation Theaters",
  "Diagnostics & Lab",
  "Nursery & Wards",
  "Aesthetic Lounge"
] as const;

export const galleryImages: GalleryImage[] = [
  {
    id: "gal-1",
    title: "Hospital Main Entrance & Reception",
    category: "Facilities & Infrastructure",
    description: "Modern, spacious reception and triage desk at Malik Hospital Chowk, Hujra Shah Muqeem.",
    image: "/images/gallery/reception.jpg",
    alt: "Malik Medical Complex Reception and Patient Triage Desk"
  },
  {
    id: "gal-2",
    title: "24/7 Emergency & Trauma Room",
    category: "Facilities & Infrastructure",
    description: "Fully equipped emergency bay with oxygen therapy, patient monitors, and trauma beds.",
    image: "/images/gallery/emergency.jpg",
    alt: "Emergency Room with 24/7 patient resuscitation setup"
  },
  {
    id: "gal-3",
    title: "Sterile Laminar Flow Operation Theater",
    category: "Operation Theaters",
    description: "State-of-the-art sterile surgical theater with C-Arm fluoroscopy for spine and orthopedic surgeries.",
    image: "/images/gallery/operation-theater.jpg",
    alt: "Sterile Operation Theater for Orthopedic and Gynae Surgeries"
  },
  {
    id: "gal-4",
    title: "Modern Delivery & Labor Suite",
    category: "Operation Theaters",
    description: "Private, hygienic delivery room equipped with cardiotocography (CTG) and newborn warmer.",
    image: "/images/gallery/delivery-suite.jpg",
    alt: "Maternity and Delivery Suite at Malik Medical Complex"
  },
  {
    id: "gal-5",
    title: "Children's Nursery & Incubator Center",
    category: "Nursery & Wards",
    description: "Specialized neonatal unit with microprocessor-controlled incubators and double-surface phototherapy.",
    image: "/images/gallery/nursery.jpg",
    alt: "Neonatal Nursery Incubators for premature infants"
  },
  {
    id: "gal-6",
    title: "Private Inpatient Patient Rooms",
    category: "Nursery & Wards",
    description: "Comfortable air-conditioned private rooms for post-surgical recovery and patient dignity.",
    image: "/images/gallery/patient-rooms.jpg",
    alt: "Executive and Private Patient Rooms"
  },
  {
    id: "gal-7",
    title: "Digital High-Frequency X-Ray Suite",
    category: "Diagnostics & Lab",
    description: "Ultra-low radiation digital radiography unit delivering rapid HD bone and chest films.",
    image: "/images/gallery/digital-xray.jpg",
    alt: "Digital X-Ray machine at Malik Medical Complex"
  },
  {
    id: "gal-8",
    title: "Automated Clinical Pathology Laboratory",
    category: "Diagnostics & Lab",
    description: "Automated 5-part hematology and chemistry analyzers with stringent quality assurance.",
    image: "/images/gallery/lab.jpg",
    alt: "Automated Pathology Laboratory"
  },
  {
    id: "gal-9",
    title: "High-Resolution Color Doppler Ultrasound Suite",
    category: "Diagnostics & Lab",
    description: "Advanced ultrasound imaging room ensuring utmost privacy for female patients.",
    image: "/images/gallery/ultrasound.jpg",
    alt: "Ultrasound and Color Doppler Suite"
  },
  {
    id: "gal-10",
    title: "Medical Aesthetics Lounge",
    category: "Aesthetic Lounge",
    description: "Modern laser skin and PRP suite equipped with triple-wavelength diode lasers and Hydrafacial MD.",
    image: "/images/gallery/aesthetic-lounge.jpg",
    alt: "Aesthetic and Skin Care Treatment Lounge"
  }
];
