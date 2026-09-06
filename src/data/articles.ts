export interface HealthArticle {
  id: string;
  slug: string;
  title: string;
  urduTitle?: string;
  category: "Heart & BP" | "Diabetes & Metabolism" | "Child Health" | "Bone & Spine" | "Women's Health" | "Skin & Aesthetics";
  summary: string;
  readTime: string;
  date: string;
  author: string;
  image: string;
  content: string[];
}

export const healthArticles: HealthArticle[] = [
  {
    id: "art-1",
    slug: "managing-diabetes-and-high-blood-pressure",
    title: "Silent Killers: Proven Ways to Control Sugar & Blood Pressure Without Complications",
    urduTitle: "شوگر اور ہائی بلڈ پریشر پر قابو پانے کے آزمودہ طریقے",
    category: "Diabetes & Metabolism",
    summary: "Diabetes and hypertension often advance without visible symptoms until organ damage begins. Learn essential lifestyle modifications, dietary habits, and diagnostic checks.",
    readTime: "4 min read",
    date: "September 2026",
    author: "Dr. Faraz Aslam (General Physician)",
    image: "/images/articles/diabetes.jpg",
    content: [
      "Diabetes Mellitus and Hypertension are twin chronic conditions that frequently co-exist. When blood sugar remains chronically elevated above 180 mg/dL, it damages the delicate micro-vasculature of the kidneys, eyes, and heart.",
      "Key Steps for Daily Management: 1. Monitor fasting glucose and bedtime readings twice a week. 2. Restrict dietary sodium (salt) to under 1 teaspoon per day to prevent sudden spikes in arterial blood pressure. 3. Engage in at least 30 minutes of brisk walking every day.",
      "Quarterly Checks: Always perform an HbA1c test every 3 months. At Malik Medical Complex, our point-of-care lab provides instant HbA1c results and immediate dosage titrations by Dr. Faraz Aslam."
    ]
  },
  {
    id: "art-2",
    slug: "early-warning-signs-of-heart-attack",
    title: "Recognizing Chest Pain: Is It Acidity or a Cardiac Emergency?",
    urduTitle: "سینے کا درد: کیا یہ تیزابیت ہے یا دل کا دورہ؟",
    category: "Heart & BP",
    summary: "Differentiating between harmless gastrointestinal heartburn and life-threatening coronary ischemia can save a life. Here are the cardinal signs you must never ignore.",
    readTime: "5 min read",
    date: "August 2026",
    author: "Dr. Aftab Anwar (Consultant Cardiologist)",
    image: "/images/articles/heart.jpg",
    content: [
      "Many patients mistakenly dismiss the first signs of a myocardial infarction (heart attack) as simple gas or stomach heartburn. This delay in seeking medical attention can lead to permanent damage to heart muscle.",
      "Warning Signs of Cardiac Angina: A crushing, squeezing sensation in the center or left side of the chest that radiates to the left shoulder, neck, jaw, or down the arm, accompanied by unexplained cold sweats, nausea, and shortness of breath.",
      "When in doubt, immediately visit the 24/7 Emergency at Malik Medical Complex for an instant 12-lead ECG and Troponin test."
    ]
  },
  {
    id: "art-3",
    slug: "protecting-your-child-from-seasonal-infections",
    title: "Seasonal Fevers & Immunity: A Pediatric Guide for Mothers",
    urduTitle: "موسمی بخار اور بچوں کی قوتِ مدافعت: ماؤں کے لیے اہم رہنمائی",
    category: "Child Health",
    summary: "From dengue and typhoid to viral bronchiolitis, how to manage pediatric fevers safely at home and when to seek urgent hospital admission.",
    readTime: "4 min read",
    date: "August 2026",
    author: "Dr. Muneeb Babar (Pediatrician)",
    image: "/images/articles/child-health.jpg",
    content: [
      "Fever is the body's natural defense against invading pathogens. However, rapid spikes in temperature in infants can trigger febrile seizures.",
      "Never withhold hydration. Offer small, frequent sips of clean boiled water, ORS, and breastmilk. Use lukewarm sponge baths on the forehead and neck instead of ice-cold water.",
      "Red Flags Requiring Immediate Hospital Care: Extreme drowsiness, refusal to feed, difficulty breathing, persistent vomiting, or petechial rash on the skin. Dr. Muneeb Babar provides daily consultations and 24/7 nursery admission."
    ]
  },
  {
    id: "art-4",
    slug: "back-pain-and-slip-disc-prevention",
    title: "Preventing Back Pain: Posture, Core Strength & Spine Health",
    urduTitle: "کمر درد اور مہرے کی تکلیف سے بچاؤ کے طریقے",
    category: "Bone & Spine",
    summary: "Prolonged sitting, faulty lifting techniques, and lack of exercise lead to debilitating sciatica and disc herniations. Insights from a senior spine surgeon.",
    readTime: "5 min read",
    date: "July 2026",
    author: "Prof. Dr. Abdul Qayyum (Spine Surgeon)",
    image: "/images/articles/spine.jpg",
    content: [
      "Over 80% of adults experience severe low back pain at least once in their lives. The most common trigger is mechanical disc strain caused by bending forward with straight legs while lifting heavy weights.",
      "Ergonomic Advice: Always bend your knees and keep the weight close to your body when lifting. Avoid slouching on soft couches for hours. Sleep on a medium-firm orthopedic mattress that supports the natural curvature of the spine.",
      "If you experience numbness, tingling, or radiating pain shooting down the back of your leg to the foot, get evaluated immediately by our Orthopedic & Spine department."
    ]
  },
  {
    id: "art-5",
    slug: "essential-care-during-pregnancy-and-high-risk-signs",
    title: "Safe Motherhood: Routine Antenatal Care & Nutrition for Expectant Mothers",
    urduTitle: "دورانِ حمل احتیاطی تدابیر اور ماں و بچے کی صحت",
    category: "Women's Health",
    summary: "Proper prenatal nutrition, mandatory ultrasound checkpoints, and detecting high blood pressure during pregnancy.",
    readTime: "6 min read",
    date: "July 2026",
    author: "Dr. Pari Iman Gul (Consultant Gynaecologist)",
    image: "/images/articles/pregnancy.jpg",
    content: [
      "Every pregnancy is a precious journey that deserves meticulous medical guidance. Routine antenatal checkups significantly reduce complications such as pre-eclampsia and gestational diabetes.",
      "Critical Milestones: 1. First Trimester Ultrasound (6–8 weeks) to confirm viable intrauterine heartbeat. 2. Anomaly Scan (18–22 weeks) to screen fetal anatomy. 3. Third Trimester Doppler to monitor placental blood flow and amniotic fluid volume.",
      "Ensure daily intake of iron, calcium, and folic acid as prescribed by your lady doctor. 24/7 normal delivery and emergency C-Section facilities are always available at Malik Medical Complex."
    ]
  }
];
