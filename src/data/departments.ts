export interface Department {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  shortDescription: string;
  longDescription: string;
  iconName: string;
  startingFee: string;
  heroImage: string;
  features: string[];
  conditionsTreated: string[];
  diagnosticFacilities: string[];
  workingSchedule: string;
  doctorIds: string[];
}

export const departments: Department[] = [
  {
    id: "dept-general-medicine",
    slug: "general-medicine",
    name: "General Physician & Internal Medicine",
    urduName: "شعبہ میڈیکل و جنرل فزیشن",
    shortDescription: "Comprehensive primary healthcare, chronic disease management, fever, diabetes, hypertension, and internal medicine.",
    longDescription: "Our Internal Medicine and General Physician department provides compassionate and comprehensive primary medical care for adults and children. Equipped with state-of-the-art diagnostic backing, our physicians diagnose and treat acute infections, chronic metabolic illnesses, hypertension, diabetes, and systemic disorders with individualized patient care.",
    iconName: "Stethoscope",
    startingFee: "Rs. 550",
    heroImage: "/images/departments/general-medicine.jpg",
    features: [
      "Round-the-clock primary medical consultation",
      "Immediate blood sugar & BP triage",
      "Nebulization & respiratory emergency management",
      "Affordable checkup fee structure"
    ],
    conditionsTreated: [
      "Diabetes Mellitus (Sugar) & Hypertension (Blood Pressure)",
      "Stomach & Liver Disorders / Heartburn / Acidity",
      "Asthma, Bronchitis & Respiratory Allergies",
      "Ear, Throat, Neck & Chest Pain",
      "Joint Weakness, Arthritis & Fatigue",
      "Seasonal Flu, Typhoid, Malaria & Viral Fevers",
      "Kidney & Bladder Infections / Urination Difficulties",
      "Jaundice, Hepatitis & Systemic Weakness",
      "Metabolic Obesity & Lifestyle Health Management",
      "Persistent Dizziness, Headaches & Migraines"
    ],
    diagnosticFacilities: [
      "Digital X-Ray",
      "Immediate ECG",
      "Automated Pathology & Blood Tests",
      "Point-of-Care Blood Sugar & Urinalysis"
    ],
    workingSchedule: "24/7 Service (Morning, Evening & Night Shifts Available)",
    doctorIds: ["dr-faraz-aslam", "dr-talha"]
  },
  {
    id: "dept-pediatrics",
    slug: "pediatrics",
    name: "Pediatrics & Child Health",
    urduName: "شعبہ امراض اطفال (بچوں کے ماہر)",
    shortDescription: "Specialized pediatric medicine, neonatal care, growth monitoring, immunizations, and pediatric emergency care.",
    longDescription: "Under international and top Pakistani tertiary-care trained pediatricians, our Pediatrics department delivers tender, specialized clinical care from neonates to adolescents. With an attached modern Children's Nursery, phototherapy units, and sterile incubators, we guarantee the best care for your little ones.",
    iconName: "Baby",
    startingFee: "Rs. 800",
    heroImage: "/images/departments/pediatrics.jpg",
    features: [
      "Specialized Children's Nursery & Incubators",
      "Trained pediatrician with UK, Saudi Arabia & Children's Hospital Lahore background",
      "Routine & optional childhood immunization center",
      "Neonatal jaundice phototherapy"
    ],
    conditionsTreated: [
      "Measles, Chickenpox, Mumps & Rubella",
      "Malaria, Dengue, Typhoid & Pediatric Fevers",
      "Childhood Thyroid Disorders & Hormonal Issues",
      "Childhood Obesity & Severe Appetite Loss",
      "Lactose Intolerance & Milk Allergies",
      "Growth Failure, Short Stature & Weight Deficits",
      "Pediatric Memory, Attention & Learning Difficulties",
      "Childhood Hair Loss & Skin Dermatitis",
      "Physical & Mental Developmental Delays",
      "Rickets & Bone Weakness",
      "Pediatric Seizures & Neurological Conditions",
      "Severe Acute Malnutrition (SAM)",
      "Congenital Heart Disease Evaluations"
    ],
    diagnosticFacilities: [
      "Pediatric Blood & Stool Testing",
      "Pediatric Color Doppler Ultrasound",
      "Digital Chest X-Ray for Children",
      "Neonatal Bilirubin Screening"
    ],
    workingSchedule: "Daily 9:00 AM – 7:00 PM (Emergency Pediatric Triage 24/7)",
    doctorIds: ["dr-muneeb-babar"]
  },
  {
    id: "dept-orthopedic-spine",
    slug: "orthopedic-spine",
    name: "Orthopedic & Spine Surgery",
    urduName: "شعبہ آرتھوپیڈک، ہڈی، جوڑ و مہرہ سرجری",
    shortDescription: "Advanced spine surgery, joint replacement, 24/7 trauma & fracture care, sports injuries, and round-the-clock plaster facility.",
    longDescription: "Led by a Senior Consultant Orthopedic & Spine Surgeon with USA training and Karachi/Punjab professorial tenure, our department delivers surgical and non-surgical treatments for complex spine deformities, degenerative joint conditions, and acute orthopedic trauma. We provide 24/7 bone plaster and emergency fracture stabilization.",
    iconName: "Bone",
    startingFee: "Consultation upon appointment",
    heroImage: "/images/departments/orthopedics.jpg",
    features: [
      "Round-the-clock 24/7 bone plaster & trauma room",
      "Senior USA-trained Spine & Orthopedic Consultant",
      "Minimally invasive spine procedures & disc treatments",
      "State-of-the-art sterile laminar flow Operation Theater"
    ],
    conditionsTreated: [
      "Chronic Back Pain, Sciatica & Lumbar Disc Herniation",
      "Severe Knee, Hip, Shoulder & Foot/Heel Pain",
      "Shoulder Dislocation & Recurrent Instabilities",
      "Neck Pain, Cervical Spondylosis & Radiculopathy",
      "Osteoarthritis, Rheumatoid Arthritis & Gout",
      "Complex Spine Deformities (Scoliosis, Kyphosis)",
      "Congenital Hip Dislocation (DDH) & Clubfoot in children",
      "Trauma Fractures & Poly-trauma Stabilization",
      "Ligament Tears & Sports Injuries (ACL/Meniscus)",
      "Total Knee & Total Hip Joint Replacements",
      "Severe Osteoporosis & Fragility Fractures"
    ],
    diagnosticFacilities: [
      "High-Resolution Digital X-Ray",
      "Musculoskeletal Ultrasound",
      "C-Arm Guided Fluoroscopy in OT",
      "Bone Mineral Density (BMD) Profiling"
    ],
    workingSchedule: "Sunday Clinic 10:00 AM – 5:00 PM | 24/7 Emergency Orthopedic Trauma",
    doctorIds: ["dr-abdul-qayyum"]
  },
  {
    id: "dept-cardiology",
    slug: "cardiology",
    name: "Cardiology & Heart Care",
    urduName: "شعبہ امراض قلب (امراض دل)",
    shortDescription: "Non-invasive cardiac diagnostics, ECG, 2D Echocardiography, Cardiac Color Doppler, hypertension, and arrhythmia care.",
    longDescription: "Our Cardiology department offers expert cardiovascular assessment, preventive cardiology, and immediate ischemic heart disease intervention. Supervised by an experienced Consultant Cardiologist from Benazir Bhutto Hospital Islamabad, patients receive university-standard heart evaluations right here in Hujra Shah Muqeem.",
    iconName: "HeartPulse",
    startingFee: "Rs. 1,000",
    heroImage: "/images/departments/cardiology.jpg",
    features: [
      "Immediate digital 12-lead ECG",
      "Advanced 2D/Color Doppler Echocardiography",
      "Expert consultant from Benazir Bhutto Hospital Islamabad",
      "Emergency cardiac monitoring and stabilization"
    ],
    conditionsTreated: [
      "Coronary Artery Disease & Angina Pectoris",
      "Acute Chest Pain Triage & Heart Attack Prevention",
      "Refractory Hypertension (High Blood Pressure)",
      "Heart Rhythm Abnormalities & Arrhythmias",
      "Congestive Heart Failure & Leg Swelling (Edema)",
      "Exertional Shortness of Breath & Orthopnea",
      "Cardiac Asthma & Pulmonary Congestion",
      "Dyslipidemia / Severe Cholesterol Imbalances",
      "Deep Vein Thrombosis (DVT) & Peripheral Vascular Disease",
      "Cardiovascular Complications of Thyroid & Diabetes"
    ],
    diagnosticFacilities: [
      "12-Lead Digital ECG",
      "Color Doppler 2D Echocardiography",
      "Cardiac Biomarkers (Troponin-I, CK-MB)",
      "Lipid Profile & Serum Electrolytes"
    ],
    workingSchedule: "Tue/Thu/Fri 3:00–7:00 PM | Mon/Wed/Sat 12:00–3:00 PM",
    doctorIds: ["dr-aftab-anwar"]
  },
  {
    id: "dept-gastroenterology-liver",
    slug: "gastroenterology-liver",
    name: "Gastroenterology, Liver & Digestive Diseases",
    urduName: "شعبہ امراض معدہ، جگر و آنتیں",
    shortDescription: "Diagnostic & therapeutic Upper GI Endoscopy, Colonoscopy, ERCP, Hepatitis B/C, fatty liver, and liver cirrhosis management.",
    longDescription: "Led by a senior Consultant Professor from Lahore, this department brings top-tier tertiary digestive care to Depalpur & Okara district. Patients no longer need to travel to Lahore for advanced diagnostic procedures like Endoscopy, Colonoscopy, and ERCP.",
    iconName: "Activity",
    startingFee: "Rs. 1,200",
    heroImage: "/images/departments/gastroenterology.jpg",
    features: [
      "Modern Video Endoscopy & Colonoscopy Suite",
      "ERCP consultation & advanced hepatobiliary care",
      "Specialized Hepatitis B & C viral eradication protocols",
      "Affordable procedure packages with painless sedation"
    ],
    conditionsTreated: [
      "Chronic Liver Disease, Cirrhosis & Portal Hypertension",
      "Hepatitis B, C, & Fatty Liver (NAFLD/NASH)",
      "Peptic Ulcer Disease, Gastritis & H. Pylori Infection",
      "Gastrointestinal Bleeding (Hematemesis / Blood in Stool)",
      "Gallstones, Bile Duct Obstructions & Jaundice",
      "Splenomegaly & Ascites (Abdominal fluid buildup)",
      "Severe Chronic Constipation & Irritable Bowel Syndrome (IBS)",
      "Hemorrhoids / Piles & Anal Fissures",
      "Intestinal Tuberculosis & Crohn's / Ulcerative Colitis",
      "Liver Cancer Screening & Tumor Profiling"
    ],
    diagnosticFacilities: [
      "High-Definition Video Endoscopy",
      "Diagnostic & Therapeutic Colonoscopy",
      "ERCP (Endoscopic Retrograde Cholangiopancreatography)",
      "Liver Function Tests (LFTs) & Viral Load PCR",
      "Abdominal Color Doppler Ultrasound"
    ],
    workingSchedule: "Every Sunday 10:00 AM – 3:00 PM",
    doctorIds: ["prof-dr-muhammad-faisal-rasheed"]
  },
  {
    id: "dept-dermatology-aesthetics",
    slug: "dermatology-aesthetics",
    name: "Dermatology & Aesthetic Medicine",
    urduName: "شعبہ امراض جلد، بال و حسن کاری (اسٹیٹک کلینک)",
    shortDescription: "Clinical skin disease treatments, Laser Hair Removal, Face & Hair PRP, Hydrafacial, BB Glow, Microneedling, and anti-aging care.",
    longDescription: "Our specialized Dermatology and Medical Aesthetics center provides both clinical curative care for troublesome skin, hair, and nail conditions, as well as state-of-the-art non-surgical cosmetic dermatology. Equipped with certified medical laser systems, hydrafacial machines, and sterile PRP centrifugation.",
    iconName: "Sparkles",
    startingFee: "Rs. 1,000",
    heroImage: "/images/departments/dermatology.jpg",
    features: [
      "Triple-wavelength Laser Hair Removal System",
      "Medical Grade Hydrafacial & BB Glow",
      "Autologous PRP for hair restoration and skin glow",
      "Team of 3 specialized aesthetic physicians & dermatologists"
    ],
    conditionsTreated: [
      "Severe Acne, Pimples & Post-Acne Scarring",
      "Psoriasis, Eczema & Chronic Skin Allergies",
      "Alopecia, Androgenetic Hair Loss & Scalp Thinning",
      "Nail Fungal Infections & Hair Folliculitis",
      "Melasma, Pigmentation, Sun Damage & Dark Spots",
      "Dark Eye Circles & Under-eye Puffiness",
      "Hyperhidrosis (Excessive Sweating)",
      "Dark Lip Discoloration & Fine Wrinkles",
      "Unwanted Facial & Body Hair",
      "Unwanted Tattoos & Permanent Pigments"
    ],
    diagnosticFacilities: [
      "Dermoscopy Examination",
      "Skin Biopsy & Histopathology",
      "Sterile PRP Centrifugation Lab",
      "Certified Diode / Nd:YAG Aesthetic Laser"
    ],
    workingSchedule: "Mon–Sat 10:00 AM – 8:00 PM (Rotating Expert Shifts)",
    doctorIds: ["dr-ayesha", "dr-iqra-naseem", "dr-mehak-saleem"]
  },
  {
    id: "dept-gynecology-obstetrics",
    slug: "gynecology-obstetrics",
    name: "Gynecology & Obstetrics",
    urduName: "شعبہ امراض نسواں و زچگی (لیڈی ڈاکٹرز)",
    shortDescription: "24/7 normal delivery, C-Section, infertility treatments (IUI/IVF guidance), TVS, HSG, Lap & Dye, PCOS, and high-risk pregnancy care.",
    longDescription: "Offering respectful, compassionate, and expert care for women at every stage of life. Our team includes FCPS, MRCOG (UK), and ECFMG (USA) credentialed Consultant Gynaecologists. Supported by a 24/7 delivery suite, neonatal nursery, and specialized fertility testing.",
    iconName: "Users",
    startingFee: "Rs. 1,000",
    heroImage: "/images/departments/gynecology.jpg",
    features: [
      "24/7 Normal Delivery & Emergency Cesarean (C-Section)",
      "Advanced Fertility Workup: TVS, HSG, Lap & Dye, IUI / IVF setup",
      "FCPS & UK/USA credentialed Lady Doctors",
      "Immediate newborn resuscitation & nursery incubator attachment"
    ],
    conditionsTreated: [
      "Antenatal Pregnancy Care & High-Risk Monitoring",
      "Primary & Secondary Infertility Investigation",
      "Repeated Miscarriage & Habitual Pregnancy Loss",
      "Polycystic Ovarian Syndrome (PCOS) & Hormonal Imbalances",
      "Irregular, Painful or Heavy Menstrual Bleeding",
      "Fibroids, Ovarian Cysts & Endometriosis",
      "Leucorrhea & Chronic Pelvic Infections (PID)",
      "Ectopic Pregnancy Emergency Management",
      "Gestational Diabetes & Pre-eclampsia (High BP in pregnancy)",
      "D&C, Retained Products of Conception (RPOC) Removal",
      "Minor & Major Gynecological Surgeries / Hysterectomy"
    ],
    diagnosticFacilities: [
      "Transvaginal Ultrasound (TVS)",
      "Hysterosalpingography (HSG) & Lap & Dye Test",
      "Continuous Cardiotocography (CTG) Fetal Monitoring",
      "Complete Hormonal Fertility Profile (FSH, LH, AMH, Prolactin)"
    ],
    workingSchedule: "Daily 10:00 AM – 6:30 PM | 24/7 Emergency Labor Room & Delivery",
    doctorIds: ["dr-pari-iman-gul", "dr-ayesha-fatima"]
  },
  {
    id: "dept-eye-care-ophthalmology",
    slug: "eye-care-ophthalmology",
    name: "Eye Care & Ophthalmology",
    urduName: "شعبہ امراض چشم (آنکھوں کے امراض و لیزر سرجری)",
    shortDescription: "Computerized vision testing, sutureless laser cataract surgery, diabetic retinopathy, pterygium, and tear duct laser treatment.",
    longDescription: "Headed by a senior Consultant Eye Surgeon trained at Lahore General Hospital, Mayo Hospital, and Lateef Hospital Lahore. We feature cutting-edge laser and microsurgical technologies — ensuring cataract and vision correction procedures are completely painless, sutureless, injection-free, and require zero hospital stay.",
    iconName: "Eye",
    startingFee: "Rs. 1,000",
    heroImage: "/images/departments/eye-care.jpg",
    features: [
      "Painless laser cataract surgery with zero stitches & no injection",
      "Computerized eye testing for glasses and accurate refraction",
      "Senior eye surgeon from Lahore's prestigious hospitals",
      "Same-day walk-in walk-out ophthalmic procedures"
    ],
    conditionsTreated: [
      "Cataract (White & Black Motia) Sutureless Extraction",
      "Refractive Vision Weakness (Shortsightedness, Astigmatism)",
      "Blocked Tear Ducts (Nasolacrimal Duct Obstruction)",
      "Ptosis (Eyelid Drooping) Correction",
      "Pterygium (Eye Flesh Growth) Laser Excision",
      "Diabetic & Hypertensive Retinopathy",
      "Glaucoma (Kala Motia) Pressure Management",
      "Corneal Ulcers & Severe Eye Allergies / Conjunctivitis",
      "Retinal Laser Photocoagulation & Premium Intraocular Lenses (IOL)"
    ],
    diagnosticFacilities: [
      "Computerized Autorefractometer",
      "Slit Lamp Biomicroscopy",
      "Non-contact Tonometer for Eye Pressure",
      "Direct & Indirect Ophthalmoscopy"
    ],
    workingSchedule: "Every Sunday 4:00 PM – 7:00 PM",
    doctorIds: ["dr-numan-ahmed"]
  },
  {
    id: "dept-radiology-diagnostics",
    slug: "radiology-diagnostics",
    name: "Radiology, Diagnostics & Modern Lab",
    urduName: "شعبہ ریڈیالوجی، جدید لیب و تشخیصی ٹیسٹ",
    shortDescription: "24/7 High Frequency Digital X-Ray, Color Doppler Ultrasound, TVS, ECG & 2D Echo, and fully automated diagnostic pathology laboratory.",
    longDescription: "Accurate treatment begins with immaculate diagnosis. Malik Medical Complex houses an all-in-one diagnostic wing featuring digital high-frequency radiography, high-resolution Color Doppler ultrasonography, specialized women's imaging (TVS, HSG), and automated hematology and biochemistry pathology.",
    iconName: "Microscope",
    startingFee: "Starting from Rs. 400",
    heroImage: "/images/departments/radiology.jpg",
    features: [
      "24/7 on-site emergency laboratory services",
      "Digital instant report generation with QR code validation",
      "Japanese & European automated clinical analyzers",
      "Comfortable, private ultrasound and imaging suites"
    ],
    conditionsTreated: [
      "General Diagnostic Imaging",
      "Internal Trauma & Fracture Radiography",
      "Abdominal & Pelvic Organ Assessment",
      "Vascular Blood Flow & Thrombosis Screening",
      "Obstetric & Fetal Growth Monitoring",
      "Hormone, Tumor Marker & Infection Verification"
    ],
    diagnosticFacilities: [
      "High-Frequency Digital X-Ray",
      "Color Doppler Ultrasound System",
      "Transvaginal Ultrasound (TVS)",
      "Echocardiography Machine",
      "Automated 5-Part Hematology Analyzer",
      "Automated Clinical Chemistry Analyzer",
      "Electrolyte & Coagulation Profilers"
    ],
    workingSchedule: "Open 24 Hours / 7 Days a Week",
    doctorIds: ["dr-aftab-anwar", "dr-pari-iman-gul"]
  }
];
