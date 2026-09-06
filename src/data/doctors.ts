export interface CareerMilestone {
  year: string;
  title: string;
  institution: string;
  description: string;
}

export interface DaySchedule {
  day: string;
  time: string;
  status: "Available" | "On Call" | "Off" | "By Appointment";
  room?: string;
}

export interface DoctorReview {
  id: string;
  patientName: string;
  city: string;
  rating: number;
  date: string;
  comment: string;
  treatment: string;
  verified: boolean;
}

export interface Doctor {
  id: string;
  slug: string;
  name: string;
  urduName: string;
  gender: "male" | "female";
  photo: string;
  photoAlt: string;
  title: string;
  specialty: string;
  departmentId: string;
  departmentSlug: string;
  qualifications: string;
  degrees: string[];
  yearsOfExperience: number;
  pmdcNumber: string;
  languages: string[];
  feeRange: string;
  about: string;
  careerTimeline: CareerMilestone[];
  specializations: string[];
  weeklySchedule: DaySchedule[];
  timingSummary: string;
  conditionsTreated: string[];
  facilities: string[];
  reviews: DoctorReview[];
  featured: boolean;
  phoneContact?: string;
}

export const doctors: Doctor[] = [
  {
    id: "dr-faraz-aslam",
    slug: "dr-faraz-aslam",
    name: "Dr. Faraz Aslam",
    urduName: "ڈاکٹر فراز اسلم",
    gender: "male",
    photo: "/images/doctors/dr-faraz-aslam.jpg",
    photoAlt: "Dr. Faraz Aslam - General Physician and Medicine Specialist at Malik Medical Complex",
    title: "General Physician & Medicine Specialist",
    specialty: "General Medicine",
    departmentId: "dept-general-medicine",
    departmentSlug: "general-medicine",
    qualifications: "MBBS, Internal Medicine Resident, Certified Diabetes & Hypertension Physician",
    degrees: ["MBBS", "Postgraduate Training in Internal Medicine", "Certified Diabetologist"],
    yearsOfExperience: 10,
    pmdcNumber: "PMDC-78421-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 550",
    about: "Dr. Faraz Aslam is a dedicated General Physician and Medicine Specialist at Malik Medical Complex with over a decade of clinical acumen. He focuses on early diagnostic detection of lifestyle metabolic disorders, chronic hypertension, and gastrointestinal infections. Known for his compassionate demeanor and patient-centric listening, Dr. Faraz ensures that every patient receives tailored treatment and preventive counsel.",
    careerTimeline: [
      {
        year: "2014",
        title: "MBBS Degree & Clinical Internship",
        institution: "Allama Iqbal Medical College / Jinnah Hospital, Lahore",
        description: "Completed medical graduation with distinction in Internal Medicine and Pharmacology."
      },
      {
        year: "2016–2020",
        title: "Postgraduate Residency in Internal Medicine",
        institution: "Services Hospital Lahore",
        description: "Extensive exposure to acute medical triage, emergency resuscitations, and chronic disease wards."
      },
      {
        year: "2020–Present",
        title: "Lead General Physician & OPD In-Charge",
        institution: "Malik Medical Complex, Hujra Shah Muqeem",
        description: "Providing high-volume daily medical consultations, diabetes stabilization, and primary triage."
      }
    ],
    specializations: [
      "Diabetes Mellitus Stabilization",
      "Hypertension & Cardiovascular Risk Management",
      "Gastrointestinal & Acid Peptic Disorders",
      "Adult & Pediatric Infectious Fevers",
      "Respiratory Allergies & Asthma",
      "Renal & Urinary Tract Infections"
    ],
    weeklySchedule: [
      { day: "Monday", time: "9:00 AM – 7:00 PM", status: "Available", room: "OPD Room 1" },
      { day: "Tuesday", time: "9:00 AM – 7:00 PM", status: "Available", room: "OPD Room 1" },
      { day: "Wednesday", time: "9:00 AM – 7:00 PM", status: "Available", room: "OPD Room 1" },
      { day: "Thursday", time: "9:00 AM – 7:00 PM", status: "Available", room: "OPD Room 1" },
      { day: "Friday", time: "9:00 AM – 7:00 PM", status: "Available", room: "OPD Room 1" },
      { day: "Saturday", time: "9:00 AM – 7:00 PM", status: "Available", room: "OPD Room 1" },
      { day: "Sunday", time: "9:00 AM – 2:00 PM", status: "Available", room: "OPD Room 1" }
    ],
    timingSummary: "Daily 9:00 AM – 7:00 PM",
    conditionsTreated: [
      "Sugar (Diabetes Mellitus)",
      "High Blood Pressure (Hypertension)",
      "Stomach & Liver Disorders",
      "Heartburn & Acid Reflux",
      "Asthma & Respiratory Allergies",
      "Ear, Throat & Neck Pain",
      "Joint Weakness & Chronic Fatigue",
      "Flu, Viral Fever, Typhoid & Malaria",
      "Kidney & Bladder Infections",
      "Jaundice & Systemic Weakness",
      "Urination Difficulties & Dysuria",
      "Metabolic Obesity & Weight Management",
      "Persistent Dizziness & Headaches",
      "Body, Leg & Generalized Muscle Pain",
      "General Children's Illnesses"
    ],
    facilities: ["Digital X-Ray", "Point-of-Care Lab", "Emergency Nebulization", "ECG"],
    reviews: [
      {
        id: "rev-1",
        patientName: "Muhammad Irfan",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "2 weeks ago",
        comment: "Dr. Faraz Aslam gave my father immediate relief from long-standing stomach pain and uncontrolled blood sugar. Very humble and attentive doctor.",
        treatment: "Diabetes Care",
        verified: true
      },
      {
        id: "rev-2",
        patientName: "Bashir Ahmad",
        city: "Depalpur",
        rating: 5,
        date: "1 month ago",
        comment: "Best general physician in the entire area. The checkup fee is very reasonable (only Rs. 550) and his prescription was very effective.",
        treatment: "Chest Infection",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "dr-talha",
    slug: "dr-talha",
    name: "Dr. Talha",
    urduName: "ڈاکٹر طلحہ",
    gender: "male",
    photo: "/images/doctors/dr-talha.jpg",
    photoAlt: "Dr. Talha - Night Shift General Physician at Malik Medical Complex",
    title: "General Physician & Emergency Medical Officer",
    specialty: "General Medicine & Emergency Care",
    departmentId: "dept-general-medicine",
    departmentSlug: "general-medicine",
    qualifications: "MBBS, Certified Emergency Care Physician",
    degrees: ["MBBS", "Basic Life Support (BLS) Certified", "Acute Trauma Care Certified"],
    yearsOfExperience: 6,
    pmdcNumber: "PMDC-91204-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 550",
    about: "Dr. Talha oversees the evening and overnight medical care at Malik Medical Complex. Specializing in emergency triage, acute trauma care, and nocturnal medical crisis stabilization, Dr. Talha ensures that patients arriving late at night receive rapid diagnostic intervention and compassionate therapy.",
    careerTimeline: [
      {
        year: "2018",
        title: "MBBS Graduation",
        institution: "Nishtar Medical University, Multan",
        description: "Graduated with honors in clinical emergency and community health."
      },
      {
        year: "2019–2021",
        title: "Medical Officer (Emergency & ICU)",
        institution: "District Headquarter Hospital",
        description: "Managed round-the-clock medical emergencies, snake bites, acute poisoning, and cardiac resuscitations."
      },
      {
        year: "2021–Present",
        title: "Night General Physician & Emergency Officer",
        institution: "Malik Medical Complex, Hujra Shah Muqeem",
        description: "Responsible for night OPD consultations, emergency admissions, and in-patient ward oversight."
      }
    ],
    specializations: [
      "Emergency Triage & Resuscitation",
      "Acute Fever & Dehydration Management",
      "Nocturnal Asthma Attacks & Nebulization",
      "Gastrointestinal Colic & Pain Relief",
      "Minor Wound Dressings & Suturing"
    ],
    weeklySchedule: [
      { day: "Monday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" },
      { day: "Tuesday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" },
      { day: "Wednesday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" },
      { day: "Thursday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" },
      { day: "Friday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" },
      { day: "Saturday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" },
      { day: "Sunday", time: "7:00 PM – 9:00 AM", status: "Available", room: "Night Clinic" }
    ],
    timingSummary: "Daily 7:00 PM – 9:00 AM (Overnight Shift)",
    conditionsTreated: [
      "Acute High Fever & Rigors",
      "Sudden Severe Vomiting & Dehydration",
      "Midnight Asthma & Breathing Distress",
      "Acute Abdominal Spasms & Renal Colic",
      "Sudden Spikes in Blood Pressure",
      "Accidental Cuts, Burns & Minor Trauma"
    ],
    facilities: ["24/7 Emergency Room", "Oxygen Therapy & Suction", "Overnight Observation Wards"],
    reviews: [
      {
        id: "rev-3",
        patientName: "Tariq Mehmood",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "3 weeks ago",
        comment: "Brought my brother at 2 AM with severe kidney stone pain. Dr. Talha immediately administered pain injections and stabilized him within 15 minutes.",
        treatment: "Pain Relief",
        verified: true
      }
    ],
    featured: false
  },
  {
    id: "dr-muneeb-babar",
    slug: "dr-muneeb-babar",
    name: "Dr. Muneeb Babar",
    urduName: "ڈاکٹر منیب بابر",
    gender: "male",
    photo: "/images/doctors/dr-muneeb-babar.jpg",
    photoAlt: "Dr. Muneeb Babar - Consultant Pediatrician at Malik Medical Complex",
    title: "Consultant Pediatrician & Child Specialist",
    specialty: "Pediatrics & Neonatology",
    departmentId: "dept-pediatrics",
    departmentSlug: "pediatrics",
    qualifications: "MBBS, FCPS (Pediatrics), Clinical Training from Children's Hospital Lahore, Saudi Arabia & UK",
    degrees: ["MBBS", "FCPS (Pediatrics)", "Fellowship in Neonatology", "International Child Health Diploma (UK)"],
    yearsOfExperience: 14,
    pmdcNumber: "PMDC-62198-P",
    languages: ["Urdu", "Punjabi", "English", "Arabic"],
    feeRange: "Rs. 800",
    about: "Dr. Muneeb Babar is a renowned Consultant Pediatrician and Child Health Specialist whose clinical pedigree spans top healthcare institutions across Pakistan, the Kingdom of Saudi Arabia, and the United Kingdom. Having served at Children's Hospital Lahore, Dr. Muneeb brings unparalleled competence in neonatal life support, growth disorders, pediatric seizures, and severe allergies. Parents revere his patient, gentle rapport with frightened infants and youngsters.",
    careerTimeline: [
      {
        year: "2010",
        title: "Graduation & FCPS Foundation",
        institution: "King Edward Medical University, Lahore",
        description: "Earned clinical honors in Pediatrics and Pediatric Surgery."
      },
      {
        year: "2012–2016",
        title: "Senior Registrar & Neonatal Fellow",
        institution: "The Children's Hospital & Institute of Child Health, Lahore",
        description: "Handled premature neonatal resuscitation, exchange transfusions, and pediatric intensive care."
      },
      {
        year: "2016–2020",
        title: "Consultant Pediatrician",
        institution: "Maternity & Children Hospital, Saudi Arabia & NHS UK Clinical Observership",
        description: "Managed pediatric endocrine disorders, metabolic anomalies, and pediatric immunization protocols."
      },
      {
        year: "2020–Present",
        title: "Head of Pediatrics & Neonatal Nursery",
        institution: "Malik Medical Complex, Hujra Shah Muqeem",
        description: "Spearheading pediatric outpatient services, incubator nursery, and emergency pediatric triage."
      }
    ],
    specializations: [
      "Neonatal Intensive Care & Jaundice Phototherapy",
      "Pediatric Asthma & Environmental Allergies",
      "Childhood Growth Stunting & Endocrine Delays",
      "Milk Intolerance & Celiac Diagnostics",
      "Childhood Epilepsy & Febrile Convulsions",
      "Vaccine Adverse Reaction Management"
    ],
    weeklySchedule: [
      { day: "Monday", time: "9:00 AM – 7:00 PM", status: "Available", room: "Child Clinic 1" },
      { day: "Tuesday", time: "9:00 AM – 7:00 PM", status: "Available", room: "Child Clinic 1" },
      { day: "Wednesday", time: "9:00 AM – 7:00 PM", status: "Available", room: "Child Clinic 1" },
      { day: "Thursday", time: "9:00 AM – 7:00 PM", status: "Available", room: "Child Clinic 1" },
      { day: "Friday", time: "9:00 AM – 7:00 PM", status: "Available", room: "Child Clinic 1" },
      { day: "Saturday", time: "9:00 AM – 7:00 PM", status: "Available", room: "Child Clinic 1" },
      { day: "Sunday", time: "On Call for Nursery", status: "On Call", room: "Children's Nursery" }
    ],
    timingSummary: "Daily 9:00 AM – 7:00 PM",
    conditionsTreated: [
      "Measles, Chickenpox & Rubella",
      "Malaria, Dengue & Typhoid Fevers",
      "Childhood Thyroid Disorders",
      "Childhood Obesity & Loss of Appetite",
      "Milk Intolerance & Cow's Milk Allergy",
      "Growth Failure & Underweight Children",
      "Memory, Focus & Learning Difficulties",
      "Childhood Hair Loss & Eczema",
      "Mental & Physical Weakness",
      "Bone Weakness & Vitamin D Deficiencies (Rickets)",
      "Vaccine Reactions & Immunization Schedules",
      "Congenital Heart Disease Screening",
      "Infantile Seizures & Febrile Fits",
      "Severe Childhood Malnutrition"
    ],
    facilities: [
      "Children's Nursery Incubators",
      "Phototherapy Units for Jaundice",
      "Pediatric Resuscitation Crash Cart",
      "Child Vaccination Center"
    ],
    reviews: [
      {
        id: "rev-4",
        patientName: "Fatima Noor",
        city: "Okara",
        rating: 5,
        date: "1 week ago",
        comment: "My 3-month-old was severely allergic to milk and constantly losing weight. Dr. Muneeb diagnosed the issue in the first visit and guided us so well. Truly a blessing for our area.",
        treatment: "Milk Allergy",
        verified: true
      },
      {
        id: "rev-5",
        patientName: "Rashid Ali",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "3 weeks ago",
        comment: "His experience from Children's Hospital Lahore is clearly visible. Diagnoses immediately without prescribing unnecessary antibiotics.",
        treatment: "Child Asthma",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "dr-abdul-qayyum",
    slug: "dr-abdul-qayyum",
    name: "Dr. Abdul Qayyum",
    urduName: "ڈاکٹر عبد القیوم",
    gender: "male",
    photo: "/images/doctors/dr-abdul-qayyum.jpg",
    photoAlt: "Dr. Abdul Qayyum - Senior Consultant Orthopedic & Spine Surgeon at Malik Medical Complex",
    title: "Senior Consultant Orthopedic & Spine Surgeon",
    specialty: "Orthopedics & Spine Surgery",
    departmentId: "dept-orthopedic-spine",
    departmentSlug: "orthopedic-spine",
    qualifications: "MBBS, MS (Orthopedic Surgery), Fellowship in Spine Surgery (USA), Professor of Orthopedic Surgery Punjab",
    degrees: [
      "MBBS (Karachi)",
      "MS Orthopedic Surgery (Punjab)",
      "Spine Surgery Fellowship (USA)",
      "AO Spine International Fellow"
    ],
    yearsOfExperience: 25,
    pmdcNumber: "PMDC-31089-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,500",
    about: "Professor Dr. Abdul Qayyum is a distinguished leader in Orthopedic & Spine Surgery with 25 years of surgical excellence. Formally trained in the United States and having served as Professor of Orthopedic Surgery across major teaching hospitals in Punjab and Karachi, Dr. Qayyum specializes in intricate spine decompression, complex spinal deformity corrections, and joint replacements. He visits Malik Medical Complex every Sunday for dedicated consultations and surgeries.",
    careerTimeline: [
      {
        year: "1999",
        title: "Medical Graduation & Masters in Surgery",
        institution: "Dow University of Health Sciences, Karachi",
        description: "Completed postgraduate MS Orthopedics with gold medal honors."
      },
      {
        year: "2006–2009",
        title: "Advanced Fellowship in Spine Surgery",
        institution: "United States (USA) Medical Center",
        description: "Mastered minimally invasive spine instrumentation, microdiscectomies, and scoliosis surgeries."
      },
      {
        year: "2010–2022",
        title: "Professor & Head of Orthopedic Surgery",
        institution: "Government Teaching Hospital, Punjab",
        description: "Mentored hundreds of orthopedic surgeons and conducted thousands of successful joint and spine surgeries."
      },
      {
        year: "2022–Present",
        title: "Senior Consultant Orthopedic & Spine Specialist",
        institution: "Malik Medical Complex (Weekly Sunday Clinic)",
        description: "Providing world-class orthopedic consultations, complex trauma reconstructions, and spinal care."
      }
    ],
    specializations: [
      "Minimally Invasive Spine Discectomy",
      "Total Knee Replacement (TKR) & Total Hip Replacement (THR)",
      "Complex Fracture Plating & Bone Ilizarov Fixation",
      "Scoliosis & Kyphosis Spine Realignment",
      "Arthroscopic Ligament Reconstruction (ACL/PCL)",
      "24/7 Bone Plaster & Trauma Casts"
    ],
    weeklySchedule: [
      { day: "Monday", time: "Off / Surgical Calls", status: "Off" },
      { day: "Tuesday", time: "Off / Surgical Calls", status: "Off" },
      { day: "Wednesday", time: "Off / Surgical Calls", status: "Off" },
      { day: "Thursday", time: "Off / Surgical Calls", status: "Off" },
      { day: "Friday", time: "Off / Surgical Calls", status: "Off" },
      { day: "Saturday", time: "Off / Advance Bookings", status: "By Appointment" },
      { day: "Sunday", time: "10:00 AM – 5:00 PM", status: "Available", room: "Spine & Ortho Suite" }
    ],
    timingSummary: "Every Sunday 10:00 AM – 5:00 PM (Bone Plaster & Operation 24/7)",
    conditionsTreated: [
      "Chronic Back Pain & Sciatica",
      "Knee, Hip, Shoulder & Foot/Heel Pain",
      "Shoulder Dislocation & Joint Laxity",
      "Neck Pain & Cervical Disc Disorders",
      "Osteoarthritis & Degenerative Joint Disease",
      "Spine Surgery & Slip Disc Decompression",
      "Spinal Deformities (Scoliosis / Kyphosis)",
      "Congenital Hip Dislocation in Children",
      "Severe Traumatic Fractures & Bone Crushes",
      "Sports Ligament & Tendon Injuries",
      "Joint Replacement Surgery",
      "Advanced Osteoporosis & Fragile Bones"
    ],
    facilities: [
      "24/7 Emergency Bone Plaster Facility",
      "C-Arm Guided Orthopedic Operation Theater",
      "Digital High-Res Musculoskeletal X-Ray",
      "Post-Surgical Rehabilitation Support"
    ],
    reviews: [
      {
        id: "rev-6",
        patientName: "Chaudhry Ghulam Rasool",
        city: "Haveli Lakha",
        rating: 5,
        date: "2 weeks ago",
        comment: "I was unable to walk due to severe slip disc back pain. Doctors in Lahore asked for 8 lakhs. Dr. Abdul Qayyum treated me with medication and targeted injection, now I walk normally without any surgery. God bless him.",
        treatment: "Spine Care",
        verified: true
      },
      {
        id: "rev-7",
        patientName: "Sardar Naveed",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "1 month ago",
        comment: "His USA credentials and surgical wisdom speak for themselves. The 24/7 bone plaster unit saved my son's fractured leg in the middle of the night.",
        treatment: "Fracture Care",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "dr-aftab-anwar",
    slug: "dr-aftab-anwar",
    name: "Dr. Aftab Anwar",
    urduName: "ڈاکٹر آفتاب انور",
    gender: "male",
    photo: "/images/doctors/dr-aftab-anwar.jpg",
    photoAlt: "Dr. Aftab Anwar - Consultant Cardiologist at Malik Medical Complex",
    title: "Consultant Cardiologist & Heart Specialist",
    specialty: "Cardiology & Vascular Medicine",
    departmentId: "dept-cardiology",
    departmentSlug: "cardiology",
    qualifications: "MBBS, FCPS (Cardiology), Consultant Cardiologist, Benazir Bhutto Hospital Islamabad",
    degrees: ["MBBS", "FCPS Cardiology", "Certified Echocardiographer", "Member Pakistan Cardiac Society"],
    yearsOfExperience: 12,
    pmdcNumber: "PMDC-54910-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,000",
    about: "Dr. Aftab Anwar is a Consultant Cardiologist affiliated with the prestigious Benazir Bhutto Hospital, Islamabad. Specializing in non-invasive cardiovascular diagnostics, Dr. Aftab brings tertiary-level cardiac care to Hujra Shah Muqeem. His mastery in 2D Echocardiography and Cardiac Doppler Ultrasound enables instantaneous detection of ischemic heart disease, valve defects, and heart failure.",
    careerTimeline: [
      {
        year: "2012",
        title: "Medical Graduation",
        institution: "Rawalpindi Medical University",
        description: "Graduated top of class in Clinical Medicine and Cardiology."
      },
      {
        year: "2014–2019",
        title: "FCPS Residency in Cardiology",
        institution: "Rawalpindi Institute of Cardiology (RIC)",
        description: "Rigorous clinical training in acute coronary syndromes, angiography, and intensive coronary care."
      },
      {
        year: "2019–Present",
        title: "Consultant Cardiologist",
        institution: "Benazir Bhutto Hospital, Islamabad & Malik Medical Complex",
        description: "Conducting specialized cardiac clinics, echocardiograms, and hypertension management."
      }
    ],
    specializations: [
      "Ischemic Heart Disease & Angina Prevention",
      "Color Doppler 2D Echocardiography",
      "12-Lead Electrocardiogram (ECG) Interpretation",
      "Complex Dyslipidemia & Cholesterol Lowering",
      "Heart Failure & Leg Edema Management",
      "Arrhythmia & Palpitation Control"
    ],
    weeklySchedule: [
      { day: "Monday", time: "12:00 PM – 3:00 PM", status: "Available", room: "Cardiac Suite" },
      { day: "Tuesday", time: "3:00 PM – 7:00 PM", status: "Available", room: "Cardiac Suite" },
      { day: "Wednesday", time: "12:00 PM – 3:00 PM", status: "Available", room: "Cardiac Suite" },
      { day: "Thursday", time: "3:00 PM – 7:00 PM", status: "Available", room: "Cardiac Suite" },
      { day: "Friday", time: "3:00 PM – 7:00 PM", status: "Available", room: "Cardiac Suite" },
      { day: "Saturday", time: "12:00 PM – 3:00 PM", status: "Available", room: "Cardiac Suite" },
      { day: "Sunday", time: "Emergency Calls Only", status: "On Call" }
    ],
    timingSummary: "Tue/Thu/Fri 3:00–7:00 PM | Mon/Wed/Sat 12:00–3:00 PM",
    conditionsTreated: [
      "Coronary Heart Disease",
      "Uncontrolled Blood Sugar & Heart Risks",
      "Severe Hypertension (High BP)",
      "Acute Chest Pain & Heaviness",
      "Heart Attack Prevention & Post-Infarct Care",
      "Heart Rhythm Abnormalities (Arrhythmia)",
      "Leg & Ankle Swelling (Edema)",
      "Breathing Difficulty & Exertional Dyspnea",
      "Asthma-like Cardiac Symptoms",
      "Chest Tightness & Palpitations",
      "Thyroid-induced Heart Palpitations",
      "Deep Vein Thrombosis (DVT)",
      "High Blood Cholesterol & Triglycerides"
    ],
    facilities: [
      "High-Resolution 2D Echocardiography",
      "Cardiac Color Doppler Ultrasound",
      "Digital 12-Lead ECG",
      "Immediate Cardiac Biomarkers (Troponin-I)"
    ],
    reviews: [
      {
        id: "rev-8",
        patientName: "Haji Munir Akhtar",
        city: "Depalpur",
        rating: 5,
        date: "3 weeks ago",
        comment: "Dr. Aftab identified my blocked arteries during Echo test right on time. His consultation from Islamabad saved my life.",
        treatment: "Heart Care",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "prof-dr-muhammad-faisal-rasheed",
    slug: "prof-dr-muhammad-faisal-rasheed",
    name: "Prof. Dr. Muhammad Faisal Rasheed",
    urduName: "پروفیسر ڈاکٹر محمد فیصل رشید",
    gender: "male",
    photo: "/images/doctors/prof-dr-faisal-rasheed.jpg",
    photoAlt: "Prof. Dr. Muhammad Faisal Rasheed - Consultant Liver, Stomach & Sugar Specialist",
    title: "Consultant Gastroenterologist & Hepatologist",
    specialty: "Gastroenterology & Liver Diseases",
    departmentId: "dept-gastroenterology-liver",
    departmentSlug: "gastroenterology-liver",
    qualifications: "MBBS, FCPS, FRCP (Edin), Professor of Medicine & Gastroenterology (Lahore)",
    degrees: [
      "MBBS (King Edward Medical College)",
      "FCPS Internal Medicine & Gastroenterology",
      "FRCP (Royal College of Physicians, Edinburgh)",
      "Fellow Pakistan Society of Gastroenterology"
    ],
    yearsOfExperience: 22,
    pmdcNumber: "PMDC-28491-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,500",
    about: "Professor Dr. Muhammad Faisal Rasheed is an internationally renowned authority in Digestive Health, Liver Cirrhosis, and Interventional Endoscopy based in Lahore. A Fellow of the Royal College of Physicians of Edinburgh, Prof. Faisal Rasheed provides specialized Sunday clinics at Malik Medical Complex, saving local patients arduous journeys to Lahore for diagnostic Endoscopy, Colonoscopy, and ERCP consultations.",
    careerTimeline: [
      {
        year: "2002",
        title: "Clinical Graduation",
        institution: "King Edward Medical University, Lahore",
        description: "Graduated with distinctions in Pathology and Medicine."
      },
      {
        year: "2007–2012",
        title: "Fellowship & Senior Registrar",
        institution: "Shaikh Zayed Hospital / Lahore General Hospital",
        description: "Specialized in advanced hepatology, liver transplantation protocols, and GI endoscopy."
      },
      {
        year: "2012–Present",
        title: "Professor of Medicine & Gastroenterology",
        institution: "Leading Medical University, Lahore",
        description: "Author of over 30 international publications in viral hepatitis and endoscopic interventions."
      },
      {
        year: "Present",
        title: "Visiting Consultant Gastroenterologist",
        institution: "Malik Medical Complex (Weekly Sunday Clinic)",
        description: "Conducting specialized hepatology clinics, video endoscopy, and colonoscopy procedures."
      }
    ],
    specializations: [
      "Diagnostic & Therapeutic Upper GI Endoscopy",
      "Colonoscopy & Polypectomy",
      "ERCP Biliary Stone Extraction",
      "Hepatitis B & C Direct Acting Antiviral Therapy",
      "Fatty Liver Disease & FibroScan Assessment",
      "Portal Hypertension & Esophageal Banding"
    ],
    weeklySchedule: [
      { day: "Monday", time: "Off / Lahore Hospital", status: "Off" },
      { day: "Tuesday", time: "Off / Lahore Hospital", status: "Off" },
      { day: "Wednesday", time: "Off / Lahore Hospital", status: "Off" },
      { day: "Thursday", time: "Off / Lahore Hospital", status: "Off" },
      { day: "Friday", time: "Off / Lahore Hospital", status: "Off" },
      { day: "Saturday", time: "Advance Booking Available", status: "By Appointment" },
      { day: "Sunday", time: "10:00 AM – 3:00 PM", status: "Available", room: "Gastro Suite" }
    ],
    timingSummary: "Every Sunday 10:00 AM – 3:00 PM",
    conditionsTreated: [
      "Chronic Liver Diseases & Cirrhosis",
      "Diabetes (Sugar) & Blood Pressure",
      "Jaundice (Kaala Yarqan / Peela Yarqan)",
      "Stomach Ulcer & Helicobacter Pylori",
      "Liver & Gallbladder Stones",
      "Piles (Bawaseer) & Anal Bleeding",
      "Blood in Vomiting (Hematemesis)",
      "Enlarged Spleen & Ascites (Pet me Paani)",
      "Chronic Constipation & Bowel Obstruction",
      "Hepatitis A, B, C, D & E",
      "Liver Cancer Screening",
      "Fatty Liver (Steatohepatitis)",
      "Intestinal Tuberculosis & Crohn's Disease"
    ],
    facilities: [
      "High Definition Video Endoscopy Suite",
      "Colonoscopy Unit with Painless Sedation",
      "ERCP Guidance & Referral Protocol",
      "Liver Function Automated Tests"
    ],
    reviews: [
      {
        id: "rev-9",
        patientName: "Mian Shakeel",
        city: "Okara",
        rating: 5,
        date: "2 weeks ago",
        comment: "We used to travel all the way to Shaikh Zayed Lahore for endoscopy. Getting Prof. Faisal Rasheed right here at Malik Hospital in Hujra Shah Muqeem is an incredible blessing.",
        treatment: "Stomach Ulcer",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "dr-ayesha",
    slug: "dr-ayesha",
    name: "Dr. Ayesha",
    urduName: "ڈاکٹر عائشہ",
    gender: "female",
    photo: "/images/doctors/dr-ayesha.jpg",
    photoAlt: "Dr. Ayesha - Aesthetic Physician at Malik Medical Complex",
    title: "Aesthetic Physician & Laser Specialist",
    specialty: "Aesthetic Medicine",
    departmentId: "dept-dermatology-aesthetics",
    departmentSlug: "dermatology-aesthetics",
    qualifications: "MBBS, Certified Aesthetic Medicine Specialist, Laser Practitioner",
    degrees: ["MBBS", "Diploma in Aesthetic Medicine", "Certified Medical Laser Specialist"],
    yearsOfExperience: 7,
    pmdcNumber: "PMDC-89302-P",
    languages: ["Urdu", "English", "Punjabi"],
    feeRange: "Rs. 1,000",
    about: "Dr. Ayesha leads the clinical aesthetic procedures at Malik Medical Complex. Dedicated to non-invasive facial rejuvenation, laser skin therapy, and hair restoration, Dr. Ayesha blends medical precision with aesthetic art to help patients achieve natural skin health and confidence.",
    careerTimeline: [
      {
        year: "2017",
        title: "Medical Graduation",
        institution: "Fatima Jinnah Medical University, Lahore",
        description: "Completed clinical training in Dermatology and Cutaneous Medicine."
      },
      {
        year: "2018–2020",
        title: "Clinical Fellow in Aesthetic Dermatology",
        institution: "Leading Aesthetic Center, Lahore",
        description: "Hands-on mastery of medical lasers, Hydrafacial MD, PRP therapy, and chemical peels."
      },
      {
        year: "2021–Present",
        title: "Aesthetic Physician",
        institution: "Malik Medical Complex, Hujra Shah Muqeem",
        description: "Directing the daily medical aesthetic lounge, diode laser treatments, and anti-aging care."
      }
    ],
    specializations: [
      "Diode Laser Hair Removal",
      "Face & Scalp Platelet-Rich Plasma (PRP)",
      "Medical Grade Hydrafacial & Blackhead Extraction",
      "BB Glow Skin Radiant Therapy",
      "Acne Scar Microneedling & Derma Roller",
      "Dark Lip Rejuvenation & Pigmentation Peels"
    ],
    weeklySchedule: [
      { day: "Monday", time: "10:00 AM – 8:00 PM", status: "Available", room: "Aesthetic Center" },
      { day: "Tuesday", time: "10:00 AM – 8:00 PM", status: "Available", room: "Aesthetic Center" },
      { day: "Wednesday", time: "10:00 AM – 8:00 PM", status: "Available", room: "Aesthetic Center" },
      { day: "Thursday", time: "10:00 AM – 8:00 PM", status: "Available", room: "Aesthetic Center" },
      { day: "Friday", time: "10:00 AM – 8:00 PM", status: "Available", room: "Aesthetic Center" },
      { day: "Saturday", time: "10:00 AM – 8:00 PM", status: "Available", room: "Aesthetic Center" },
      { day: "Sunday", time: "By Appointment", status: "By Appointment", room: "Aesthetic Center" }
    ],
    timingSummary: "Daily 10:00 AM – 8:00 PM",
    conditionsTreated: [
      "Unwanted Facial & Body Hair",
      "Dull Skin & Dehydration",
      "Scalp Hair Thinning & Alopecia",
      "Stubborn Acne Scars & Open Pores",
      "Dark Circles & Melasma",
      "Darkened Lips & Uneven Complexion"
    ],
    facilities: [
      "Medical Diode Laser System",
      "Hydrafacial MD Machine",
      "Sterile Centrifuge for PRP",
      "Derma Pen & Microneedling Devices"
    ],
    reviews: [
      {
        id: "rev-10",
        patientName: "Zainab Bibi",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "1 month ago",
        comment: "I took 4 sessions of Laser Hair Removal with Dr. Ayesha. Results are amazing, painless and very hygienic environment.",
        treatment: "Laser Removal",
        verified: true
      }
    ],
    featured: false
  },
  {
    id: "dr-iqra-naseem",
    slug: "dr-iqra-naseem",
    name: "Dr. Iqra Naseem",
    urduName: "ڈاکٹر اقراء نسیم",
    gender: "female",
    photo: "/images/doctors/dr-iqra-naseem.jpg",
    photoAlt: "Dr. Iqra Naseem - Consultant Skin Specialist at Malik Medical Complex",
    title: "Consultant Dermatologist & Skin Specialist",
    specialty: "Clinical Dermatology",
    departmentId: "dept-dermatology-aesthetics",
    departmentSlug: "dermatology-aesthetics",
    qualifications: "MBBS, FCPS (Dermatology), Consultant Skin Specialist",
    degrees: ["MBBS", "FCPS Dermatology", "Member Pakistan Association of Dermatologists"],
    yearsOfExperience: 9,
    pmdcNumber: "PMDC-74912-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,000",
    about: "Dr. Iqra Naseem is a certified Consultant Dermatologist who brings clinical precision to severe cutaneous ailments including resistant psoriasis, eczema, skin allergies, and pediatric dermatoses. Her diagnostic insight ensures that root hormonal and immunological triggers are uncovered.",
    careerTimeline: [
      {
        year: "2015",
        title: "MBBS Graduation",
        institution: "Services Institute of Medical Sciences, Lahore",
        description: "Completed medical degree with distinction in Clinical Pharmacology."
      },
      {
        year: "2017–2021",
        title: "FCPS Dermatology Fellowship",
        institution: "Mayo Hospital / King Edward Medical University",
        description: "Comprehensive inpatient and outpatient dermatological care, phototherapy, and biopsy analysis."
      },
      {
        year: "2021–Present",
        title: "Consultant Dermatologist",
        institution: "Malik Medical Complex (Weekly Wednesday Clinic)",
        description: "Diagnosing challenging skin disorders, fungal infections, and chronic autoimmune skin diseases."
      }
    ],
    specializations: [
      "Resistant Psoriasis & Eczema",
      "Skin Allergy Patch Testing & Management",
      "Severe Cystic Acne & Isotretinoin Regimens",
      "Nail Psoriasis & Onychomycosis",
      "Autoimmune Bullous Disorders"
    ],
    weeklySchedule: [
      { day: "Monday", time: "Off", status: "Off" },
      { day: "Tuesday", time: "Off", status: "Off" },
      { day: "Wednesday", time: "1:00 PM – 5:00 PM", status: "Available", room: "Skin Clinic Room 2" },
      { day: "Thursday", time: "Off", status: "Off" },
      { day: "Friday", time: "Off", status: "Off" },
      { day: "Saturday", time: "Off", status: "Off" },
      { day: "Sunday", time: "Off", status: "Off" }
    ],
    timingSummary: "Weekly Every Wednesday 1:00 PM – 5:00 PM",
    conditionsTreated: [
      "Skin Allergies & Urticaria",
      "Nail & Scalp Fungal Infections",
      "Psoriasis & Scaly Dermatitis",
      "Dark Circles & Skin Hyperpigmentation",
      "Scars, Marks & Keloids",
      "Diffuse Hair Loss & Patchy Baldness"
    ],
    facilities: ["Dermoscopy Tool", "Skin Biopsy Setup", "Cryotherapy for Warts"],
    reviews: [
      {
        id: "rev-11",
        patientName: "Sumaira Aslam",
        city: "Depalpur",
        rating: 5,
        date: "2 months ago",
        comment: "Dr. Iqra cured my chronic skin allergy that was troubling me for 3 years. One of the best skin specialists in Punjab.",
        treatment: "Eczema Care",
        verified: true
      }
    ],
    featured: false
  },
  {
    id: "dr-mehak-saleem",
    slug: "dr-mehak-saleem",
    name: "Dr. Mehak Saleem",
    urduName: "ڈاکٹر مہک سلیم",
    gender: "female",
    photo: "/images/doctors/dr-mehak-saleem.jpg",
    photoAlt: "Dr. Mehak Saleem - Consultant Skin Specialist at Malik Medical Complex",
    title: "Consultant Skin & Aesthetics Specialist",
    specialty: "Dermatology & Cosmetology",
    departmentId: "dept-dermatology-aesthetics",
    departmentSlug: "dermatology-aesthetics",
    qualifications: "MBBS, MCPS (Dermatology), Certified Cosmetologist",
    degrees: ["MBBS", "MCPS Dermatology", "Certified Cosmetologist"],
    yearsOfExperience: 8,
    pmdcNumber: "PMDC-81045-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,000",
    about: "Dr. Mehak Saleem consults from Monday through Friday on the 3rd Floor of Malik Medical Complex. Combining medical dermatology with modern cosmetology, Dr. Mehak provides focused solutions for stubborn acne, hair fall, facial pigmentation, and skin rejuvenation.",
    careerTimeline: [
      {
        year: "2016",
        title: "Medical Graduation",
        institution: "Rawalpindi Medical University",
        description: "Completed medical training with honors."
      },
      {
        year: "2018–2021",
        title: "Postgraduate Training in Dermatology",
        institution: "Holy Family Hospital, Rawalpindi",
        description: "Hands-on experience in dermatological surgery, acne management, and chemical peels."
      },
      {
        year: "2021–Present",
        title: "Consultant Skin Specialist",
        institution: "Malik Medical Complex (3rd Floor Clinic)",
        description: "Daily afternoon consultations for skin diseases, hair loss, and aesthetic enhancement."
      }
    ],
    specializations: [
      "Acne Scar Revision & Chemical Peels",
      "Hair PRP & Biotin Mesotherapy",
      "Facial Dark Circles Treatment",
      "Pigmentation & Melasma Therapy",
      "Tattoo Removal & Skin Rejuvenation"
    ],
    weeklySchedule: [
      { day: "Monday", time: "3:00 PM – 6:00 PM", status: "Available", room: "3rd Floor Clinic" },
      { day: "Tuesday", time: "3:00 PM – 6:00 PM", status: "Available", room: "3rd Floor Clinic" },
      { day: "Wednesday", time: "3:00 PM – 6:00 PM", status: "Available", room: "3rd Floor Clinic" },
      { day: "Thursday", time: "3:00 PM – 6:00 PM", status: "Available", room: "3rd Floor Clinic" },
      { day: "Friday", time: "3:00 PM – 6:00 PM", status: "Available", room: "3rd Floor Clinic" },
      { day: "Saturday", time: "Off", status: "Off" },
      { day: "Sunday", time: "Off", status: "Off" }
    ],
    timingSummary: "Monday to Friday 3:00 PM – 6:00 PM (3rd Floor)",
    conditionsTreated: [
      "Skin Allergies & Rashes",
      "Nail & Hair Allergy / Brittleness",
      "Psoriasis & Flaking Skin",
      "Stubborn Dark Circles",
      "Scars, Acne Marks & Blemishes",
      "Hair Fall, Thinning & Dandruff"
    ],
    facilities: [
      "Aesthetic Lounge 3rd Floor",
      "Face & Hair PRP Setup",
      "Laser Hair Removal",
      "Hydrafacial MD",
      "Microneedling & BB Glow"
    ],
    reviews: [
      {
        id: "rev-12",
        patientName: "Amina Liaquat",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "3 weeks ago",
        comment: "Dr. Mehak's PRP treatment for hair loss gave me visible new baby hairs in just 2 months. She is very gentle and explains everything thoroughly.",
        treatment: "Hair PRP",
        verified: true
      }
    ],
    featured: false
  },
  {
    id: "dr-pari-iman-gul",
    slug: "dr-pari-iman-gul",
    name: "Dr. Pari Iman Gul",
    urduName: "ڈاکٹر پری ایمان گل",
    gender: "female",
    photo: "/images/doctors/dr-pari-iman-gul.jpg",
    photoAlt: "Dr. Pari Iman Gul - Senior Consultant Gynaecologist & Obstetrician",
    title: "Consultant Gynaecologist & Obstetrician",
    specialty: "Gynecology & Obstetrics",
    departmentId: "dept-gynecology-obstetrics",
    departmentSlug: "gynecology-obstetrics",
    qualifications: "MBBS, FCPS (Gynecology & Obstetrics), ECFMG (USA), MRCOG (UK)",
    degrees: [
      "MBBS",
      "FCPS (Gynecology & Obstetrics)",
      "ECFMG Certified (United States)",
      "MRCOG (Royal College of Obstetricians & Gynaecologists, UK)"
    ],
    yearsOfExperience: 18,
    pmdcNumber: "PMDC-41908-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,200",
    about: "Dr. Pari Iman Gul is an internationally acclaimed Consultant Gynaecologist and Obstetrician possessing premier qualifications including FCPS, ECFMG (USA), and MRCOG (UK). With nearly two decades of clinical expertise, Dr. Pari provides evidence-based, compassionate care for complex high-risk pregnancies, recurrent miscarriages, and hormonal fertility challenges. She champions safe motherhood and gentle delivery practices.",
    careerTimeline: [
      {
        year: "2006",
        title: "MBBS & FCPS Accreditation",
        institution: "Fatima Jinnah Medical University / Sir Ganga Ram Hospital, Lahore",
        description: "Rigorous residency in high-risk obstetrics, maternal-fetal medicine, and operative gynecology."
      },
      {
        year: "2010–2015",
        title: "International Fellowship (USA & UK Certification)",
        institution: "ECFMG (USA) & Royal College of Obstetricians & Gynaecologists (UK)",
        description: "Achieved dual international certifications in advanced hysteroscopy and fertility optimization."
      },
      {
        year: "2015–Present",
        title: "Senior Consultant Gynaecologist",
        institution: "Malik Medical Complex, Hujra Shah Muqeem",
        description: "Leading fertility evaluations, Transvaginal Ultrasounds (TVS), and high-risk pregnancy deliveries."
      }
    ],
    specializations: [
      "Recurrent Miscarriage & Habitual Pregnancy Loss",
      "High-Risk Obstetric Delivery & C-Section",
      "Transvaginal Ultrasound (TVS) Pelvic Assessment",
      "Infertility Workup & Ovulation Induction",
      "Polycystic Ovary Syndrome (PCOS) Protocols",
      "Laparoscopic & Hysteroscopic Surgeries"
    ],
    weeklySchedule: [
      { day: "Monday", time: "11:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 1" },
      { day: "Tuesday", time: "11:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 1" },
      { day: "Wednesday", time: "11:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 1" },
      { day: "Thursday", time: "11:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 1" },
      { day: "Friday", time: "11:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 1" },
      { day: "Saturday", time: "11:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 1" },
      { day: "Sunday", time: "Emergency Deliveries", status: "On Call", room: "Labor Room" }
    ],
    timingSummary: "Daily 11:00 AM – 2:00 PM (Emergency Deliveries 24/7)",
    conditionsTreated: [
      "High Risk Pregnancy Checkups",
      "Infertility & Delayed Conception",
      "Repeated Miscarriages",
      "D&C & Retained Conception Products",
      "Normal Delivery & Cesarean Section",
      "Minor & Major Gynecological Surgeries",
      "Lower Abdominal Pain in Women",
      "Ectopic Pregnancy Emergencies",
      "TVS Ultrasound Guided Pelvic Care",
      "Leucorrhea & Chronic Infections",
      "IUI / IVF Guidance & HSG Lap & Dye Tests",
      "Irregular Menstrual Cycles & PCOS"
    ],
    facilities: [
      "24/7 Modern Delivery Suite",
      "Transvaginal Ultrasound (TVS)",
      "Continuous Fetal Heart Monitor (CTG)",
      "Sterile Gynaecological Operation Theater"
    ],
    reviews: [
      {
        id: "rev-13",
        patientName: "Maryam Bibi",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "2 weeks ago",
        comment: "After 6 years of marriage and two miscarriages, Dr. Pari's treatment blessed us with a healthy baby boy. Her UK and USA experience makes all the difference.",
        treatment: "Maternity Care",
        verified: true
      },
      {
        id: "rev-14",
        patientName: "Sadia Parveen",
        city: "Depalpur",
        rating: 5,
        date: "1 month ago",
        comment: "Very calm, respectful, and expert doctor. Normal delivery was done with great comfort and hygiene.",
        treatment: "Normal Delivery",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "dr-ayesha-fatima",
    slug: "dr-ayesha-fatima",
    name: "Dr. Ayesha Fatima",
    urduName: "ڈاکٹر عائشہ فاطمہ",
    gender: "female",
    photo: "/images/doctors/dr-ayesha-fatima.jpg",
    photoAlt: "Dr. Ayesha Fatima - Consultant Gynaecologist at Malik Medical Complex",
    title: "Consultant Gynaecologist & Obstetrician",
    specialty: "Gynecology & Obstetrics",
    departmentId: "dept-gynecology-obstetrics",
    departmentSlug: "gynecology-obstetrics",
    qualifications: "MBBS, FCPS (Gynecology & Obstetrics), Ex-Registrar Jinnah Hospital & Fatima Memorial Hospital Lahore",
    degrees: [
      "MBBS",
      "FCPS (Gynecology & Obstetrics)",
      "Ex-Registrar Jinnah Hospital Lahore",
      "Ex-Registrar Fatima Memorial Hospital Lahore"
    ],
    yearsOfExperience: 13,
    pmdcNumber: "PMDC-68210-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,000",
    about: "Dr. Ayesha Fatima is an esteemed Consultant Gynaecologist and Obstetrician who honed her surgical mastery at Jinnah Hospital Lahore and Fatima Memorial Hospital Lahore. Providing daily consultations from 10:00 AM to 6:30 PM, Dr. Ayesha is dedicated to maternal safety, fertility protocols, and laparoscopic diagnostic evaluations.",
    careerTimeline: [
      {
        year: "2011",
        title: "Medical Graduation",
        institution: "Allama Iqbal Medical College, Lahore",
        description: "Graduated with honors in Obstetrics and Gynecology."
      },
      {
        year: "2013–2018",
        title: "FCPS Residency & Registrar",
        institution: "Jinnah Hospital & Fatima Memorial Hospital, Lahore",
        description: "Hands-on mastery of complicated cesareans, ovarian cystectomies, and infertility workup."
      },
      {
        year: "2018–Present",
        title: "Consultant Gynaecologist",
        institution: "Malik Medical Complex, Hujra Shah Muqeem",
        description: "Conducting high-volume daily OPD clinics, ultrasound scans, normal deliveries, and C-Sections."
      }
    ],
    specializations: [
      "Antenatal & Postnatal Care",
      "Normal Delivery & Emergency C-Section (24/7)",
      "Polycystic Ovaries (PCOS) & Hormonal Acne",
      "Infertility Screening (HSG / Lap & Dye)",
      "Gestational Diabetes Management",
      "Pelvic Ultrasound (TVS & Transabdominal)"
    ],
    weeklySchedule: [
      { day: "Monday", time: "10:00 AM – 6:30 PM", status: "Available", room: "Gynae Suite 2" },
      { day: "Tuesday", time: "10:00 AM – 6:30 PM", status: "Available", room: "Gynae Suite 2" },
      { day: "Wednesday", time: "10:00 AM – 6:30 PM", status: "Available", room: "Gynae Suite 2" },
      { day: "Thursday", time: "10:00 AM – 6:30 PM", status: "Available", room: "Gynae Suite 2" },
      { day: "Friday", time: "10:00 AM – 6:30 PM", status: "Available", room: "Gynae Suite 2" },
      { day: "Saturday", time: "10:00 AM – 6:30 PM", status: "Available", room: "Gynae Suite 2" },
      { day: "Sunday", time: "10:00 AM – 2:00 PM", status: "Available", room: "Gynae Suite 2" }
    ],
    timingSummary: "Daily 10:00 AM – 6:30 PM (24/7 Emergency Delivery)",
    conditionsTreated: [
      "Pregnancy Checkups & Routine Ultrasound",
      "Infertility Treatment & Follicular Tracking",
      "Repeated Pregnancy Loss & Bleeding",
      "D&C & Surgical Evacuation",
      "Normal Delivery & Painless Labor",
      "Emergency & Elective C-Section",
      "Ovarian Cysts & Uterine Fibroids",
      "Severe Lower Abdominal Pain",
      "Ectopic Pregnancy Triage",
      "TVS Ultrasound Testing",
      "Leucorrhea & Chronic Vaginal Infections",
      "IUI / IVF / HSG Lap & Dye Guidance",
      "Menstrual Irregularities & PCOS",
      "Gestational Diabetes in Expectant Mothers"
    ],
    facilities: [
      "Labor Suite & Delivery Room",
      "Attached Neonatal Nursery Incubators",
      "Transvaginal Ultrasound (TVS)",
      "24/7 Emergency Blood Bank Coordination"
    ],
    reviews: [
      {
        id: "rev-15",
        patientName: "Rabia Tariq",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "3 weeks ago",
        comment: "Dr. Ayesha Fatima is so humble, loving and competent. She guided me step by step during my gestational diabetes and delivered my baby safely.",
        treatment: "C-Section Care",
        verified: true
      }
    ],
    featured: true
  },
  {
    id: "dr-numan-ahmed",
    slug: "dr-numan-ahmed",
    name: "Dr. Numan Ahmed",
    urduName: "ڈاکٹر نعمان احمد",
    gender: "male",
    photo: "/images/doctors/dr-numan-ahmed.jpg",
    photoAlt: "Dr. Numan Ahmed - Consultant Eye Specialist & Laser Surgeon",
    title: "Consultant Eye Specialist & Laser Surgeon",
    specialty: "Ophthalmology & Laser Eye Surgery",
    departmentId: "dept-eye-care-ophthalmology",
    departmentSlug: "eye-care-ophthalmology",
    qualifications: "MBBS, FCPS (Ophthalmology), Ex-Consultant Lahore General Hospital, Lateef Hospital & Mayo Hospital Lahore",
    degrees: [
      "MBBS",
      "FCPS (Ophthalmology)",
      "Fellow Vitreo-Retina & Laser Surgery",
      "Ex-Registrar Lahore General Hospital & Mayo Hospital"
    ],
    yearsOfExperience: 16,
    pmdcNumber: "PMDC-49201-P",
    languages: ["Urdu", "Punjabi", "English"],
    feeRange: "Rs. 1,000",
    about: "Dr. Numan Ahmed is a leading Consultant Eye Surgeon whose surgical background includes Lahore General Hospital, Mayo Hospital, and Lateef Hospital Lahore. He brings sutureless, stitch-free, injection-free laser eye surgery to Malik Medical Complex. Specializing in computerized vision testing, laser cataract extraction, and diabetic retinopathy treatments, Dr. Numan restores clear vision without hospital stays.",
    careerTimeline: [
      {
        year: "2008",
        title: "Medical Graduation & House Job",
        institution: "King Edward Medical University, Lahore",
        description: "Graduated with honors in Ophthalmology."
      },
      {
        year: "2010–2015",
        title: "FCPS Ophthalmology Residency",
        institution: "Mayo Hospital & Lahore General Hospital",
        description: "Trained in microscopic ophthalmic surgery, sutureless phacoemulsification, and retinal lasers."
      },
      {
        year: "2015–Present",
        title: "Senior Consultant Eye Surgeon",
        institution: "Lateef Hospital Lahore & Malik Medical Complex",
        description: "Weekly Sunday clinic performing painless laser cataract surgery and advanced vision restorations."
      }
    ],
    specializations: [
      "Sutureless Laser Cataract (Phacoemulsification)",
      "Premium Foldable Intraocular Lens (IOL) Implantation",
      "Computerized Vision Testing & Refraction",
      "Blocked Tear Duct (DCR) Laser Treatment",
      "Diabetic & Hypertensive Retinal Laser Therapy",
      "Pterygium Excision with Conjunctival Autograft"
    ],
    weeklySchedule: [
      { day: "Monday", time: "Off / Lahore Clinic", status: "Off" },
      { day: "Tuesday", time: "Off / Lahore Clinic", status: "Off" },
      { day: "Wednesday", time: "Off / Lahore Clinic", status: "Off" },
      { day: "Thursday", time: "Off / Lahore Clinic", status: "Off" },
      { day: "Friday", time: "Off / Lahore Clinic", status: "Off" },
      { day: "Saturday", time: "Advance Booking Open", status: "By Appointment" },
      { day: "Sunday", time: "4:00 PM – 7:00 PM", status: "Available", room: "Eye Clinic Room 3" }
    ],
    timingSummary: "Every Sunday 4:00 PM – 7:00 PM",
    conditionsTreated: [
      "Tear Duct Blockage & Excessive Tearing",
      "Vision Weakness & Computerized Eye Testing",
      "Eyelid Drooping (Ptosis)",
      "Cataract (White Motia / Black Motia)",
      "Pterygium (Eye Flesh Growth)",
      "Diabetic & Hypertensive Retinopathy",
      "Laser Vision Correction & Astigmatism",
      "Retina Laser Treatment & Lens Replacement",
      "Eye Redness, Allergies & Corneal Ulcers"
    ],
    facilities: [
      "Laser Phacoemulsification Machine (No Stitches, No Injection)",
      "Computerized Autorefractor for Glasses",
      "Slit Lamp Biomicroscope",
      "Non-Contact Tonometer for Glaucoma Pressure"
    ],
    reviews: [
      {
        id: "rev-16",
        patientName: "Muhammad Aslam Khan",
        city: "Hujra Shah Muqeem",
        rating: 5,
        date: "2 weeks ago",
        comment: "Got my cataract laser operation done by Dr. Numan on Sunday. Zero pain, no injection, no bandage! I walked home after 30 minutes and can see clearly now.",
        treatment: "Cataract Care",
        verified: true
      }
    ],
    featured: true
  }
];
