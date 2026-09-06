export interface PricingItem {
  name: string;
  urduName?: string;
  category: "Consultations" | "Diagnostics & Imaging" | "Laboratory Tests" | "Surgery & Procedures" | "Aesthetic Treatments" | "Maternity Packages";
  price: string;
  durationOrFrequency?: string;
  note: string;
  popular?: boolean;
}

export const pricingCategories = [
  "All",
  "Consultations",
  "Diagnostics & Imaging",
  "Laboratory Tests",
  "Surgery & Procedures",
  "Aesthetic Treatments",
  "Maternity Packages"
] as const;

export const pricingList: PricingItem[] = [
  // Consultations
  {
    name: "General Physician OPD Consultation (Dr. Faraz Aslam / Dr. Talha)",
    urduName: "جنرل فزیشن چیک اپ فیس",
    category: "Consultations",
    price: "Rs. 550",
    durationOrFrequency: "Per Visit",
    note: "Confirmed standard hospital checkup fee. Includes BP, Sugar & oxygen check.",
    popular: true
  },
  {
    name: "Child Specialist / Pediatrician Consultation (Dr. Muneeb Babar)",
    urduName: "ماہر امراض اطفال (بچوں کے ڈاکٹر) فیس",
    category: "Consultations",
    price: "Rs. 800",
    durationOrFrequency: "Per Visit",
    note: "UK / Saudi Arabia & Children's Hospital Lahore trained consultant.",
    popular: true
  },
  {
    name: "Senior Orthopedic & Spine Surgeon Consultation (Prof. Dr. Abdul Qayyum)",
    urduName: "ماہر ہڈی، جوڑ و مہرہ سرجن فیس",
    category: "Consultations",
    price: "Rs. 1,500",
    durationOrFrequency: "Every Sunday",
    note: "USA-trained Professor of Orthopedic Surgery Punjab.",
    popular: true
  },
  {
    name: "Consultant Cardiologist / Heart Specialist (Dr. Aftab Anwar)",
    urduName: "ماہر امراض قلب فیس",
    category: "Consultations",
    price: "Rs. 1,000",
    durationOrFrequency: "Per Visit",
    note: "Consultant Benazir Bhutto Hospital Islamabad."
  },
  {
    name: "Senior Gastroenterologist & Liver Specialist (Prof. Dr. Faisal Rasheed)",
    urduName: "ماہر معدہ و جگر فیس",
    category: "Consultations",
    price: "Rs. 1,500",
    durationOrFrequency: "Every Sunday",
    note: "Professor from Lahore. Saves travel cost to Lahore.",
    popular: true
  },
  {
    name: "Consultant Gynaecologist & Obstetrician (Dr. Pari Iman Gul / Dr. Ayesha Fatima)",
    urduName: "ماہر امراض نسواں و زچگی فیس",
    category: "Consultations",
    price: "Rs. 1,000 – Rs. 1,200",
    durationOrFrequency: "Per Visit",
    note: "FCPS, ECFMG (USA) & MRCOG (UK) credentialed specialists."
  },
  {
    name: "Consultant Eye Specialist & Laser Surgeon (Dr. Numan Ahmed)",
    urduName: "ماہر امراض چشم فیس",
    category: "Consultations",
    price: "Rs. 1,000",
    durationOrFrequency: "Every Sunday",
    note: "Mayo Hospital & Lahore General Hospital trained."
  },
  {
    name: "Dermatologist & Skin Specialist Consultation (Dr. Iqra / Dr. Mehak / Dr. Ayesha)",
    urduName: "ماہر امراض جلد و حسن فیس",
    category: "Consultations",
    price: "Rs. 1,000",
    durationOrFrequency: "Per Visit",
    note: "Specialized clinical diagnosis and aesthetic plan."
  },

  // Diagnostics & Imaging
  {
    name: "Digital High-Frequency X-Ray (Single View)",
    urduName: "ڈیجیٹل ایکسرے (سنگل ویو)",
    category: "Diagnostics & Imaging",
    price: "Rs. 600",
    durationOrFrequency: "Instant Report",
    note: "Chest, Extremity, or Joint with HD film."
  },
  {
    name: "Digital X-Ray (Both Views / Bilateral)",
    urduName: "ڈیجیٹل ایکسرے (ڈبل ویو)",
    category: "Diagnostics & Imaging",
    price: "Rs. 1,100",
    durationOrFrequency: "Instant Report",
    note: "AP and Lateral views for accurate orthopedic diagnosis."
  },
  {
    name: "12-Lead Digital ECG",
    urduName: "ای سی جی",
    category: "Diagnostics & Imaging",
    price: "Rs. 500",
    durationOrFrequency: "Immediate",
    note: "Computerized printout with medical officer interpretation."
  },
  {
    name: "2D Color Doppler Echocardiography (Echo)",
    urduName: "ایکو کارڈیوگرافی (دل کا الٹراساؤنڈ)",
    category: "Diagnostics & Imaging",
    price: "Starting from Rs. 2,500",
    durationOrFrequency: "Same Day",
    note: "Full cardiac chamber and valve assessment by Cardiologist."
  },
  {
    name: "Abdominal & Pelvic Ultrasound",
    urduName: "پیٹ کا الٹراساؤنڈ",
    category: "Diagnostics & Imaging",
    price: "Rs. 1,200",
    durationOrFrequency: "Same Day",
    note: "Liver, Gallbladder, Spleen, Kidneys, Bladder and Pelvis."
  },
  {
    name: "Obstetric Anomaly Ultrasound Scan",
    urduName: "حمل کا الٹراساؤنڈ",
    category: "Diagnostics & Imaging",
    price: "Rs. 1,500",
    durationOrFrequency: "Same Day",
    note: "Comprehensive fetal growth and congenital screening."
  },
  {
    name: "Transvaginal Ultrasound (TVS)",
    urduName: "ٹی وی ایس الٹراساؤنڈ",
    category: "Diagnostics & Imaging",
    price: "Rs. 1,800",
    durationOrFrequency: "Same Day",
    note: "Conducted by experienced female gynaecologist."
  },
  {
    name: "Hysterosalpingography (HSG) & Lap and Dye Test",
    urduName: "رحم و ٹیوب ٹیسٹ (ایچ ایس جی)",
    category: "Diagnostics & Imaging",
    price: "Starting from Rs. 4,500",
    durationOrFrequency: "Special Procedure",
    note: "Evaluation of fallopian tube blockages for infertility."
  },

  // Laboratory Tests
  {
    name: "Complete Blood Count (CBC) with ESR",
    category: "Laboratory Tests",
    price: "Rs. 500",
    durationOrFrequency: "1 Hour",
    note: "Automated 5-part analyzer with differential count."
  },
  {
    name: "Blood Sugar (Random / Fasting)",
    category: "Laboratory Tests",
    price: "Rs. 150",
    durationOrFrequency: "15 Minutes",
    note: "Laboratory precision glucose measurement."
  },
  {
    name: "HbA1c (3-Month Average Sugar)",
    category: "Laboratory Tests",
    price: "Rs. 1,200",
    durationOrFrequency: "Same Day",
    note: "Gold standard for diabetic tracking."
  },
  {
    name: "Liver Function Tests (LFTs)",
    category: "Laboratory Tests",
    price: "Rs. 1,100",
    durationOrFrequency: "Same Day",
    note: "Bilirubin, SGPT, SGOT, Alk Phos, Total Protein."
  },
  {
    name: "Renal Function Tests (RFTs / Kidney Profile)",
    category: "Laboratory Tests",
    price: "Rs. 900",
    durationOrFrequency: "Same Day",
    note: "Serum Creatinine, Blood Urea, Electrolytes."
  },
  {
    name: "Lipid Profile (Full Cholesterol Panel)",
    category: "Laboratory Tests",
    price: "Rs. 1,200",
    durationOrFrequency: "Same Day",
    note: "Total Cholesterol, HDL, LDL, Triglycerides."
  },
  {
    name: "Hepatitis B & C Screening (ICT Rapid)",
    category: "Laboratory Tests",
    price: "Rs. 800",
    durationOrFrequency: "30 Minutes",
    note: "Rapid confidential viral marker testing."
  },
  {
    name: "Hepatitis PCR Qualitative / Quantitative",
    category: "Laboratory Tests",
    price: "Starting from Rs. 3,500",
    durationOrFrequency: "2–3 Days",
    note: "High-sensitivity viral load nucleic acid test."
  },
  {
    name: "Thyroid Profile (TSH, Free T3, Free T4)",
    category: "Laboratory Tests",
    price: "Rs. 2,200",
    durationOrFrequency: "Same Day",
    note: "Automated chemiluminescence hormone platform."
  },

  // Surgery & Procedures
  {
    name: "24/7 Emergency Bone Plaster (Minor / Forearm)",
    category: "Surgery & Procedures",
    price: "Starting from Rs. 1,500",
    durationOrFrequency: "Emergency 24/7",
    note: "Includes immobilization, padding, and POP application."
  },
  {
    name: "24/7 Emergency Bone Plaster (Major / Full Leg / Hip Spica)",
    category: "Surgery & Procedures",
    price: "Starting from Rs. 3,000",
    durationOrFrequency: "Emergency 24/7",
    note: "Long leg cast / complex reduction with X-ray review."
  },
  {
    name: "Video Gastroscopy / Endoscopy",
    category: "Surgery & Procedures",
    price: "Starting from Rs. 8,000",
    durationOrFrequency: "Specialist Slot",
    note: "Includes sedation and rapid urease biopsy for H. Pylori."
  },
  {
    name: "Diagnostic & Screening Colonoscopy",
    category: "Surgery & Procedures",
    price: "Starting from Rs. 14,000",
    durationOrFrequency: "Specialist Slot",
    note: "Painless conscious sedation with high-definition optical scope."
  },
  {
    name: "Sutureless Laser Cataract Surgery (Phaco)",
    category: "Surgery & Procedures",
    price: "Starting from Rs. 25,000",
    durationOrFrequency: "Day Care Procedure",
    note: "Includes foldable intraocular lens, zero injection, no stitches."
  },
  {
    name: "Minor Surgical Suturing & Wound Debridement",
    category: "Surgery & Procedures",
    price: "Rs. 800 – Rs. 2,000",
    durationOrFrequency: "Emergency 24/7",
    note: "Sterile dressing, local anesthesia, and tetanus coverage."
  },

  // Aesthetic Treatments
  {
    name: "Medical Grade Hydrafacial MD (Deep Pore Cleansing)",
    category: "Aesthetic Treatments",
    price: "Starting from Rs. 3,000",
    durationOrFrequency: "45–60 Minutes",
    note: "Extraction, exfoliation, hydration, and antioxidant infusion.",
    popular: true
  },
  {
    name: "Autologous Platelet-Rich Plasma (Face PRP Glow)",
    category: "Aesthetic Treatments",
    price: "Starting from Rs. 4,500",
    durationOrFrequency: "Session",
    note: "Stimulates collagen, fades wrinkles, and restores vitality.",
    popular: true
  },
  {
    name: "Hair Restoration PRP Therapy (Scalp Injections)",
    category: "Aesthetic Treatments",
    price: "Starting from Rs. 5,000",
    durationOrFrequency: "Session",
    note: "Autologous growth factors to stop hair fall and trigger regrowth."
  },
  {
    name: "Triple-Wave Laser Hair Removal (Full Face)",
    category: "Aesthetic Treatments",
    price: "Starting from Rs. 2,000",
    durationOrFrequency: "Per Session",
    note: "Painless cooling diode laser suitable for Asian skin tones."
  },
  {
    name: "BB Glow Semi-Permanent Foundation Treatment",
    category: "Aesthetic Treatments",
    price: "Starting from Rs. 3,500",
    durationOrFrequency: "Session",
    note: "Even skin tone, reduces pigmentation and dark spots."
  },
  {
    name: "Acne Scar Microneedling with Serum Infusion",
    category: "Aesthetic Treatments",
    price: "Starting from Rs. 3,500",
    durationOrFrequency: "Session",
    note: "Derma pen treatment for open pores and post-acne pitting."
  },

  // Maternity Packages
  {
    name: "Normal Delivery Package (Standard Labor & Care)",
    urduName: "نارمل ڈلیوری پیکج",
    category: "Maternity Packages",
    price: "Starting from Rs. 20,000",
    durationOrFrequency: "24/7 Service",
    note: "Includes labor room charges, gynaecologist fee, nursing care, and baby observation.",
    popular: true
  },
  {
    name: "Cesarean Section (C-Section) Surgical Package",
    urduName: "سی سیکشن (بڑا آپریشن) پیکج",
    category: "Maternity Packages",
    price: "Starting from Rs. 45,000",
    durationOrFrequency: "Elective or Emergency",
    note: "Includes Operation Theater, Consultant Surgeon, Anesthetist, Medicines, and 2-Day Private Ward Stay.",
    popular: true
  },
  {
    name: "Neonatal Nursery Incubator & Phototherapy Care",
    urduName: "بچوں کی نرسری و فوٹو تھراپی",
    category: "Maternity Packages",
    price: "Starting from Rs. 3,500 / day",
    durationOrFrequency: "24/7 Nursery Care",
    note: "Microprocessor incubator, phototherapy unit, and specialized pediatric nursing."
  },
  {
    name: "IUI (Intrauterine Insemination) Fertility Cycle",
    urduName: "آئی یو آئی فرٹیلیٹی سائیکل",
    category: "Maternity Packages",
    price: "Starting from Rs. 18,000",
    durationOrFrequency: "Per Cycle",
    note: "Includes follicular tracking ultrasounds, semen preparation, and catheter placement."
  }
];
