export interface HospitalService {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  category: "Diagnostics & Imaging" | "Laboratory" | "Surgical & Emergency" | "Maternity & Fertility" | "Aesthetics & Skin" | "Pediatric Care";
  shortDescription: string;
  longDescription: string;
  iconName: string;
  price: string;
  badge?: string;
  timing: string;
  features: string[];
  preparation?: string;
  relatedDepartmentSlug: string;
}

export const services: HospitalService[] = [
  {
    id: "service-digital-xray",
    slug: "digital-x-ray",
    name: "Digital High-Frequency X-Ray",
    urduName: "ڈیجیٹل ایکسرے (جدید ہائی فریکوئنسی)",
    category: "Diagnostics & Imaging",
    shortDescription: "Digital bone & chest imaging with ultra-low radiation and immediate HD film output.",
    longDescription: "Our high-frequency digital radiography system provides immaculate detail for orthopedic trauma, chest evaluations, spinal curvatures, and abdominal radiography. With digital sensor plates, radiation exposure is reduced by 70% compared to traditional films, and reports are available within 15 minutes.",
    iconName: "ScanLine",
    price: "Starting from Rs. 600",
    badge: "24/7 Available",
    timing: "24 Hours / 7 Days a Week",
    features: [
      "Low-dose digital sensor detector",
      "Immediate film & WhatsApp reports",
      "Pediatric & trauma x-ray protocol",
      "Pre-op chest & skeletal surveys"
    ],
    preparation: "No special fasting required for skeletal x-rays. Remove metallic items and jewelry before the scan.",
    relatedDepartmentSlug: "radiology-diagnostics"
  },
  {
    id: "service-ecg-echo",
    slug: "ecg-echocardiography",
    name: "ECG & 2D Color Doppler Echocardiography",
    urduName: "ای سی جی اور 2D ایکو کارڈیوگرافی (دل کا الٹراساؤنڈ)",
    category: "Diagnostics & Imaging",
    shortDescription: "Cardiovascular ultrasound and 12-lead digital ECG supervised by Consultant Cardiologist.",
    longDescription: "Evaluates cardiac muscle function, heart chamber dimensions, valve integrity, and ejection fraction (EF). Our high-resolution 2D Echocardiography unit with Color Doppler detects congenital heart defects, ischemic heart disease, and heart failure with precision.",
    iconName: "HeartPulse",
    price: "Starting from Rs. 500",
    badge: "Specialist Supervised",
    timing: "ECG: 24/7 · Echo: Mon–Sat",
    features: [
      "Real-time 2D Echo with Color Doppler",
      "Cardiac ejection fraction (EF%) assessment",
      "Valvular stenosis & regurgitation grading",
      "Instant computerized 12-lead ECG analysis"
    ],
    preparation: "Wear comfortable, loose clothing. No fasting required unless combined with fasting blood lipid profile.",
    relatedDepartmentSlug: "cardiology"
  },
  {
    id: "service-color-doppler-ultrasound",
    slug: "color-doppler-ultrasound",
    name: "Color Doppler Ultrasound",
    urduName: "کلر ڈوپلر الٹراساؤنڈ",
    category: "Diagnostics & Imaging",
    shortDescription: "High-resolution ultrasound imaging for abdominal, obstetric, and vascular assessments.",
    longDescription: "Equipped with multi-frequency convex, linear, and transvaginal probes, our Color Doppler ultrasonography assesses blood flow in arterial and venous systems, detects Deep Vein Thrombosis (DVT), examines liver cirrhosis and gallstones, and tracks fetal well-being.",
    iconName: "Radio",
    price: "Starting from Rs. 1,200",
    badge: "High Resolution",
    timing: "Daily 9:00 AM – 9:00 PM (24/7 Emergency)",
    features: [
      "Obstetric anomaly & growth scans",
      "Abdominal & pelvic organ evaluation",
      "Vascular Doppler blood flow analysis",
      "Thyroid, breast & soft tissue scans"
    ],
    preparation: "For abdominal ultrasound: 6 to 8 hours fasting. For pelvic and obstetric ultrasound: full urinary bladder required.",
    relatedDepartmentSlug: "radiology-diagnostics"
  },
  {
    id: "service-tvs-ultrasound",
    slug: "tvs-transvaginal-ultrasound",
    name: "TVS (Transvaginal Ultrasound)",
    urduName: "ٹی وی ایس (ٹرانس ویجائنل الٹراساؤنڈ)",
    category: "Maternity & Fertility",
    shortDescription: "High-magnification internal pelvic sonography for early pregnancy and fertility tracking.",
    longDescription: "Transvaginal Sonography (TVS) provides high-magnification visualization of the uterus, ovaries, and fallopian tubes. Conducted by female ultrasound specialists and gynecologists, TVS is the gold standard for early pregnancy confirmation, ectopic pregnancy detection, and ovarian follicular tracking for fertility.",
    iconName: "CircleDot",
    price: "Starting from Rs. 1,800",
    badge: "Female Consultant",
    timing: "Daily 10:00 AM – 6:30 PM",
    features: [
      "Private suite by female sonologist",
      "Early pregnancy detection from 5 weeks",
      "Accurate follicular monitoring cycles",
      "PCOS, fibroid & uterine assessments"
    ],
    preparation: "Empty bladder required right before the procedure. Comfortable, sanitized examination setting.",
    relatedDepartmentSlug: "gynecology-obstetrics"
  },
  {
    id: "service-hsg-lap-dye",
    slug: "hsg-lap-and-dye-test",
    name: "HSG & Lap and Dye Test",
    urduName: "ایچ ایس جی اور لیپ اینڈ ڈائی ٹیسٹ (رحم و ٹیوب ٹیسٹ)",
    category: "Maternity & Fertility",
    shortDescription: "Fallopian tube patency and uterine cavity assessment for couples investigating infertility.",
    longDescription: "Hysterosalpingography (HSG) and diagnostic Lap and Dye tests determine whether the fallopian tubes are open or blocked, and assess the interior uterine cavity. Administered with gentle technique and sterile contrast under fluoroscopic digital imaging.",
    iconName: "FileSpreadsheet",
    price: "Starting from Rs. 4,500",
    badge: "Fertility Diagnostic",
    timing: "By Gynaecologist Appointment",
    features: [
      "Radiographic fallopian tube spill checks",
      "Gentle catheterization technique",
      "Identifies tubal blockages & adhesions",
      "Immediate specialist roadmap review"
    ],
    preparation: "Scheduled between Day 7 and Day 10 of the menstrual cycle. Mild pain-relief pre-medication advised.",
    relatedDepartmentSlug: "gynecology-obstetrics"
  },
  {
    id: "service-iui-ivf",
    slug: "iui-iutpi-ivf-services",
    name: "IUI / IUTPI / IVF Infertility Guidance",
    urduName: "آئی یو آئی اور آئی وی ایف (بانجھ پن کا علاج)",
    category: "Maternity & Fertility",
    shortDescription: "Fertility counseling, ovulation induction, intrauterine insemination, and IVF referral protocols.",
    longDescription: "For couples experiencing delayed conception, our specialized fertility clinic provides systematic hormonal investigations, ovulation induction, intrauterine insemination (IUI / IUTPI), and seamless coordination for In Vitro Fertilization (IVF).",
    iconName: "Sparkle",
    price: "Starting from Rs. 15,000",
    badge: "High Success Rate",
    timing: "Daily (By Prior Appointment)",
    features: [
      "Couples fertility evaluation under one roof",
      "Automated semen washing & preparation",
      "Tailored ovulation induction protocols",
      "Private & compassionate counseling"
    ],
    preparation: "Both partners should attend the initial consultation with prior medical and semen analysis reports.",
    relatedDepartmentSlug: "gynecology-obstetrics"
  },
  {
    id: "service-modern-laboratory",
    slug: "modern-laboratory",
    name: "Modern Automated Diagnostic Pathology Lab",
    urduName: "جدید خودکار پیتھالوجی لیبارٹری",
    category: "Laboratory",
    shortDescription: "24/7 automated hematology, biochemistry, viral serology, hormones, and blood cultures.",
    longDescription: "Malik Medical Complex laboratory is equipped with automated Japanese and European analyzers. With rigorous internal and external quality control, we provide rapid, dependable results for routine blood counts, diabetes HbA1c, liver and renal profiles, thyroid hormones, and viral hepatitis PCR.",
    iconName: "Microscope",
    price: "Starting from Rs. 400",
    badge: "24/7 Lab Service",
    timing: "Open 24 Hours / 7 Days a Week",
    features: [
      "5-Part automated hematology analyzer",
      "Automated clinical chemistry analyzer",
      "Chemiluminescence hormone assays",
      "Emergency STAT reports in 30–45 mins"
    ],
    preparation: "Fasting 10–12 hours for Fasting Blood Sugar, Lipid Profile, and Liver Panel. No fasting for CBC or Renal Profile.",
    relatedDepartmentSlug: "radiology-diagnostics"
  },
  {
    id: "service-childrens-nursery",
    slug: "childrens-nursery-neonatal-care",
    name: "Children's Nursery & Neonatal ICU",
    urduName: "بچوں کی نرسری اور انکیوبیٹر سنٹر",
    category: "Pediatric Care",
    shortDescription: "Sterile neonatal nursery with radiant warmers, incubators, phototherapy, and oxygen.",
    longDescription: "Our Children's Nursery provides life-saving support for premature neonates, low birth weight infants, and babies with neonatal jaundice or respiratory distress. Managed under the direct clinical leadership of Dr. Muneeb Babar (trained at Children's Hospital Lahore, Saudi Arabia & UK).",
    iconName: "Baby",
    price: "Starting from Rs. 3,500 / day",
    badge: "24/7 Nursery Care",
    timing: "24 Hours / 7 Days a Week",
    features: [
      "Microprocessor incubators & warmers",
      "Double-surface LED jaundice phototherapy",
      "Continuous vitals & pulse oximetry",
      "Specialized 1:1 neonatal nursing care"
    ],
    preparation: "Direct admission from hospital delivery suites or 24/7 emergency referral.",
    relatedDepartmentSlug: "pediatrics"
  },
  {
    id: "service-aesthetic-skin-center",
    slug: "aesthetic-and-skin-center",
    name: "Aesthetic & Medical Skin Center",
    urduName: "اسٹیٹک اینڈ سکن کیئر سنٹر",
    category: "Aesthetics & Skin",
    shortDescription: "Triple-wave laser hair removal, PRP therapy, HydraFacial MD, and skin rejuvenation.",
    longDescription: "A dedicated aesthetic lounge offering the latest non-surgical cosmetic treatments performed exclusively by certified aesthetic physicians. Featuring certified diode laser systems, medical hydrafacial protocols, and sterile autologous platelet-rich plasma (PRP) therapy.",
    iconName: "Sparkles",
    price: "Starting from Rs. 2,000",
    badge: "Medical Grade Aesthetic",
    timing: "Mon–Sat 10:00 AM – 8:00 PM",
    features: [
      "Triple-wavelength laser hair removal",
      "Autologous PRP for hair & facial glow",
      "Medical-grade HydraFacial MD treatment",
      "Microneedling for acne scars & glow"
    ],
    preparation: "Avoid direct intense sun exposure and retinoids 48 hours prior to laser or chemical peels.",
    relatedDepartmentSlug: "dermatology-aesthetics"
  },
  {
    id: "service-endoscopy-colonoscopy-ercp",
    slug: "endoscopy-colonoscopy-ercp",
    name: "Endoscopy, Colonoscopy & ERCP",
    urduName: "اینڈوسکوپی، کولونوسکوپی اور ای آر سی پی (معدہ و آنتوں کا معائنہ)",
    category: "Diagnostics & Imaging",
    shortDescription: "High-definition diagnostic and therapeutic endoscopy led by Senior Professor from Lahore.",
    longDescription: "Patients from Depalpur and Okara no longer need to travel to Lahore for complex gastrointestinal investigations. Under Prof. Dr. Muhammad Faisal Rasheed, we perform video gastroscopy, colonoscopy with polyp biopsy, and ERCP bile duct interventions in a sterile surgical setting.",
    iconName: "Eye",
    price: "Starting from Rs. 8,000",
    badge: "Lahore Professor Led",
    timing: "Every Sunday 10:00 AM – 3:00 PM",
    features: [
      "HD video endoscope with digital imaging",
      "Painless procedure with conscious sedation",
      "Rapid biopsy for H. Pylori & pathology",
      "Therapeutic ulcer clipping & banding"
    ],
    preparation: "Upper Endoscopy: 8 hours strict fasting. Colonoscopy: Special bowel cleansing prep prescribed 24 hours prior.",
    relatedDepartmentSlug: "gastroenterology-liver"
  },
  {
    id: "service-bone-plaster-ortho-surgery",
    slug: "bone-plaster-and-orthopedic-surgery",
    name: "24/7 Bone Plaster & Orthopedic Surgery",
    urduName: "24 گھنٹے ہڈی پلستر اور آرتھوپیڈک آپریشن",
    category: "Surgical & Emergency",
    shortDescription: "24/7 emergency fracture reduction, waterproof plaster casts, and elective joint surgeries.",
    longDescription: "Accidents and fractures require prompt, accurate bone alignment to prevent permanent disability. Malik Medical Complex provides a round-the-clock bone plaster facility with digital X-ray confirmation, alongside elective spine and joint replacement surgeries led by USA-trained Prof. Dr. Abdul Qayyum.",
    iconName: "Bone",
    price: "Starting from Rs. 1,500",
    badge: "24/7 Emergency Plaster",
    timing: "Plaster: 24/7 · Surgeries: Scheduled",
    features: [
      "Closed fracture reduction under sedation",
      "Lightweight fiberglass & POP casts",
      "C-Arm fluoroscopy guided surgery",
      "Dedicated post-trauma recovery plan"
    ],
    preparation: "In emergency trauma, bring the patient directly to the Emergency Room. Do not give oral food or water if surgery is imminent.",
    relatedDepartmentSlug: "orthopedic-spine"
  }
];
