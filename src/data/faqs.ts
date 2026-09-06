export interface FAQItem {
  id: string;
  category: "Appointments" | "Emergency" | "Payments & Pricing" | "Diagnostics & Reports" | "Maternity & Surgery";
  question: string;
  urduQuestion?: string;
  answer: string;
}

export const faqs: FAQItem[] = [
  {
    id: "faq-1",
    category: "Appointments",
    question: "Do I need a prior appointment, or can I walk in directly?",
    urduQuestion: "کیا پہلے سے اپوائنٹمنٹ لینا ضروری ہے یا براہِ راست آ سکتے ہیں؟",
    answer: "Both walk-ins and pre-booked appointments are welcomed. General Physician OPD and 24/7 Emergency do not require any appointment. However, for visiting specialist consultants (e.g., Prof. Dr. Abdul Qayyum, Prof. Dr. Faisal Rasheed, Dr. Numan Ahmed), we strongly recommend booking in advance via our website form or by calling 0300-6972295 to avoid long waiting times."
  },
  {
    id: "faq-2",
    category: "Emergency",
    question: "How does the 24/7 Emergency process work at Malik Medical Complex?",
    urduQuestion: "ملک میڈیکل کمپلیکس میں 24 گھنٹے ایمرجنسی کیسے کام کرتی ہے؟",
    answer: "Our Emergency Unit is active 24 hours a day, 7 days a week, 365 days a year. When you arrive at Malik Hospital Chowk, an emergency medical officer and nursing staff immediately triage the patient. Oxygen therapy, digital X-ray, trauma suturing, fracture plaster, and emergency labor delivery are available at all times without prior notice."
  },
  {
    id: "faq-3",
    category: "Appointments",
    question: "What documents or previous records should I bring for my visit?",
    urduQuestion: "چیک اپ کے لیے آتے وقت کون سی پرانی رپورٹس ساتھ لانی چاہییں؟",
    answer: "Please bring any previous medical prescriptions, discharge summaries, laboratory test reports, X-rays, ultrasound scans, and a list of medications the patient is currently taking. Also bring the patient's CNIC or B-form for registration."
  },
  {
    id: "faq-4",
    category: "Payments & Pricing",
    question: "What payment methods do you accept at the hospital?",
    urduQuestion: "ہسپتال میں ادائیگی کے کون سے طریقے دستیاب ہیں؟",
    answer: "We accept Cash, JazzCash, EasyPaisa, and direct Bank Online Transfer. A computerized invoice with itemized breakdown is provided for every consultation, diagnostic test, and pharmacy purchase."
  },
  {
    id: "faq-5",
    category: "Diagnostics & Reports",
    question: "How soon are Digital X-Ray and Blood Test reports delivered?",
    urduQuestion: "ایکسرے اور خون کے ٹیسٹ کی رپورٹ کتنی دیر میں ملتی ہے؟",
    answer: "Digital X-Rays and routine Blood Tests (like CBC, Blood Sugar, Urine RE) are delivered within 15 to 45 minutes. Specialized hormone profiles and ultrasound reports are handed over the same day. Patients can also request soft copies of their reports directly via WhatsApp on 0300-6972295."
  },
  {
    id: "faq-6",
    category: "Maternity & Surgery",
    question: "Are female doctors and nurses available for delivery and ultrasound?",
    urduQuestion: "کیا ڈلیوری اور الٹراساؤنڈ کے لیے لیڈی ڈاکٹر اور نرسیں موجود ہوتی ہیں؟",
    answer: "Yes, absolutely. We have experienced Consultant Gynaecologists (Dr. Pari Iman Gul and Dr. Ayesha Fatima) along with trained female ultrasound technicians and certified lady health visitors (LHVs). Female patient privacy and dignity are our utmost clinical priority."
  },
  {
    id: "faq-7",
    category: "Maternity & Surgery",
    question: "Is incubator and nursery support available for premature babies?",
    urduQuestion: "کیا قبل از وقت پیدا ہونے والے بچوں کے لیے انکیوبیٹر نرسری موجود ہے؟",
    answer: "Yes. Malik Medical Complex houses a modern Children's Nursery equipped with microprocessor-controlled infant incubators, double-surface phototherapy for jaundice, and neonatal oxygen support, supervised by our Consultant Pediatrician Dr. Muneeb Babar."
  }
];
