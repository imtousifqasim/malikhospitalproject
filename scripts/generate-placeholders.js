const fs = require('fs');
const path = require('path');

function createDoctorAvatarSvg() {
  return `<svg width="600" height="600" viewBox="0 0 600 600" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="bgGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#F8FAFC;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#E2E8F0;stop-opacity:1" />
    </linearGradient>
    <filter id="softGlow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="10" flood-color="#0B3D91" flood-opacity="0.07"/>
    </filter>
    <clipPath id="circleClip">
      <circle cx="300" cy="225" r="135" />
    </clipPath>
  </defs>

  <!-- Background Canvas -->
  <rect width="100%" height="100%" fill="url(#bgGrad)" />

  <!-- Centered Circular Frame -->
  <circle cx="300" cy="225" r="148" fill="none" stroke="#CBD5E1" stroke-width="2" stroke-dasharray="6 6" opacity="0.6"/>
  <circle cx="300" cy="225" r="135" fill="#FFFFFF" filter="url(#softGlow)" stroke="#E2E8F0" stroke-width="2"/>

  <!-- Professional Doctor Bust Silhouette (Clipped to inner circle) -->
  <g clip-path="url(#circleClip)">
    <!-- Solid Muted Slate Silhouette -->
    <!-- Head -->
    <circle cx="300" cy="180" r="48" fill="#64748B" />
    
    <!-- Neck & Shoulders -->
    <path d="M 282 225 L 318 225 L 318 245 C 318 245 365 252 405 305 L 195 305 C 235 252 282 245 282 245 Z" fill="#64748B" />
    
    <!-- Minimalist Stethoscope Accent in Hospital Teal -->
    <path d="M 252 250 Q 245 315 288 335 Q 300 340 312 335 Q 355 315 348 250" fill="none" stroke="#0D9488" stroke-width="5" stroke-linecap="round"/>
    <circle cx="300" cy="340" r="9" fill="#0D9488" stroke="#FFFFFF" stroke-width="2"/>
  </g>
</svg>`;
}

function createFacilitySvg(title, subtitle, iconType = 'hospital') {
  return `<svg width="800" height="500" viewBox="0 0 800 500" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="facGrad" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0B3D91;stop-opacity:1" />
      <stop offset="60%" style="stop-color:#071E4A;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0F172A;stop-opacity:1" />
    </linearGradient>
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#FFFFFF" stroke-width="0.5" opacity="0.07"/>
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#facGrad)" />
  <rect width="100%" height="100%" fill="url(#grid)" />

  <!-- Soft Accent Circle -->
  <circle cx="680" cy="120" r="160" fill="#0D9488" opacity="0.15" />
  <circle cx="100" cy="400" r="140" fill="#0284C7" opacity="0.12" />

  <!-- Center Card -->
  <g transform="translate(100, 100)">
    <rect width="600" height="300" rx="24" fill="#FFFFFF" fill-opacity="0.05" stroke="#FFFFFF" stroke-opacity="0.15" stroke-width="1.5"/>
    <circle cx="300" cy="95" r="46" fill="#0D9488" fill-opacity="0.2" stroke="#14B8A6" stroke-width="2"/>
    <path d="M 300 70 L 300 120 M 275 95 L 325 95" stroke="#14B8A6" stroke-width="6" stroke-linecap="round"/>

    <text x="300" y="180" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="26" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.5">${title}</text>
    <text x="300" y="212" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#94A3B8" text-anchor="middle">${subtitle}</text>

    <rect x="210" y="235" width="180" height="28" rx="14" fill="#14B8A6" fill-opacity="0.2" stroke="#14B8A6" stroke-width="1"/>
    <text x="300" y="253" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#5EEAD4" text-anchor="middle" letter-spacing="1.2">MALIK MEDICAL COMPLEX</text>
  </g>
</svg>`;
}

function createFounderHeroSvg() {
  return `<svg width="700" height="850" viewBox="0 0 700 850" xmlns="http://www.w3.org/2000/svg">
  <defs>
    <linearGradient id="founderBg" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0B3D91;stop-opacity:1" />
      <stop offset="50%" style="stop-color:#07265C;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#03132E;stop-opacity:1" />
    </linearGradient>
    <pattern id="founderPattern" width="30" height="30" patternUnits="userSpaceOnUse">
      <circle cx="15" cy="15" r="1" fill="#FFFFFF" opacity="0.08" />
    </pattern>
  </defs>

  <rect width="100%" height="100%" fill="url(#founderBg)" />
  <rect width="100%" height="100%" fill="url(#founderPattern)" />

  <circle cx="350" cy="340" r="230" fill="#0D9488" opacity="0.12" />
  <circle cx="350" cy="340" r="180" fill="#FFFFFF" opacity="0.04" />

  <!-- Distinguished Medical Leader Silhouette -->
  <g transform="translate(0, 50)">
    <!-- Coat -->
    <path d="M 180 580 C 180 440, 260 410, 350 410 C 440 410, 520 440, 520 580 L 520 700 L 180 700 Z" fill="#FFFFFF" opacity="0.95"/>
    <path d="M 290 410 L 350 490 L 410 410 Z" fill="#0B3D91"/>
    <!-- Tie -->
    <polygon points="344,480 356,480 359,570 350,585 341,570" fill="#0D9488"/>
    <!-- Head -->
    <circle cx="350" cy="285" r="85" fill="#F1F5F9"/>
    <!-- Stethoscope -->
    <path d="M 280 430 Q 270 540 330 570 Q 350 580 370 570 Q 430 540 420 430" fill="none" stroke="#334155" stroke-width="7" stroke-linecap="round"/>
    <circle cx="350" cy="580" r="16" fill="#0D9488" stroke="#FFFFFF" stroke-width="3"/>
  </g>

  <!-- Editorial Info Banner at Bottom -->
  <g transform="translate(50, 680)">
    <rect width="600" height="120" rx="20" fill="#FFFFFF" fill-opacity="0.1" stroke="#FFFFFF" stroke-opacity="0.2" stroke-width="1.5"/>
    <text x="300" y="45" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="22" font-weight="800" fill="#FFFFFF" text-anchor="middle" letter-spacing="-0.3">Executive Medical Leadership</text>
    <text x="300" y="75" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="14" font-weight="500" fill="#5EEAD4" text-anchor="middle">Founder &amp; Senior Medical Directorate</text>
    <text x="300" y="100" font-family="-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif" font-size="11" font-weight="700" fill="#94A3B8" text-anchor="middle" letter-spacing="1.5">MALIK MEDICAL COMPLEX • HUJRA SHAH MUQEEM</text>
  </g>
</svg>`;
}

const publicDir = path.join(__dirname, '..', 'public');

// Doctors
const doctors = [
  { name: 'Dr. Faraz Aslam', file: 'dr-faraz-aslam.jpg', specialty: 'General Physician & Diabetologist', gender: 'male' },
  { name: 'Dr. Talha', file: 'dr-talha.jpg', specialty: 'General Physician (Night Shift)', gender: 'male' },
  { name: 'Dr. Muneeb Babar', file: 'dr-muneeb-babar.jpg', specialty: 'Consultant Pediatrician (UK/Saudi)', gender: 'male' },
  { name: 'Dr. Abdul Qayyum', file: 'dr-abdul-qayyum.jpg', specialty: 'Consultant Spine & Ortho Surgeon', gender: 'male' },
  { name: 'Dr. Aftab Anwar', file: 'dr-aftab-anwar.jpg', specialty: 'Consultant Cardiologist', gender: 'male' },
  { name: 'Prof. Dr. Faisal Rasheed', file: 'prof-dr-faisal-rasheed.jpg', specialty: 'Gastroenterologist & Hepatologist', gender: 'male' },
  { name: 'Dr. Ayesha', file: 'dr-ayesha.jpg', specialty: 'Aesthetic & Laser Physician', gender: 'female' },
  { name: 'Dr. Iqra Naseem', file: 'dr-iqra-naseem.jpg', specialty: 'Consultant Dermatologist', gender: 'female' },
  { name: 'Dr. Mehak Saleem', file: 'dr-mehak-saleem.jpg', specialty: 'Consultant Skin Specialist', gender: 'female' },
  { name: 'Dr. Pari Iman Gul', file: 'dr-pari-iman-gul.jpg', specialty: 'Consultant Gynaecologist (FCPS, UK)', gender: 'female' },
  { name: 'Dr. Ayesha Fatima', file: 'dr-ayesha-fatima.jpg', specialty: 'Consultant Gynaecologist (FCPS)', gender: 'female' },
  { name: 'Dr. Numan Ahmed', file: 'dr-numan-ahmed.jpg', specialty: 'Consultant Eye Specialist & Surgeon', gender: 'male' },
  { name: 'Specialist Doctor', file: 'placeholder.jpg', specialty: 'Medical Consultant', gender: 'male' },
];

doctors.forEach(d => {
  const svg = createDoctorAvatarSvg(d.name, d.specialty, d.gender);
  fs.writeFileSync(path.join(publicDir, 'images', 'doctors', d.file), svg);
});

// Founder
fs.writeFileSync(path.join(publicDir, 'images', 'founder.jpg'), createFounderHeroSvg());

// Departments
const departments = [
  { file: 'general-medicine.jpg', title: 'Internal Medicine', sub: 'Primary Care, Diabetes & Chronic Disease' },
  { file: 'pediatrics.jpg', title: 'Pediatrics & Child Health', sub: 'Neonatal Nursery, Growth & Immunization' },
  { file: 'orthopedics.jpg', title: 'Orthopedic & Spine Surgery', sub: 'Joint Replacements & 24/7 Bone Plaster' },
  { file: 'cardiology.jpg', title: 'Cardiology & Heart Center', sub: '2D Echocardiography & ECG Monitoring' },
  { file: 'gastroenterology.jpg', title: 'Gastroenterology & Liver', sub: 'Upper GI Endoscopy, Colonoscopy & ERCP' },
  { file: 'dermatology.jpg', title: 'Dermatology & Aesthetics', sub: 'Diode Laser, PRP, Hydrafacial & Skin Care' },
  { file: 'gynecology.jpg', title: 'Gynecology & Obstetrics', sub: '24/7 Delivery Suite, C-Section & Fertility' },
  { file: 'eye-care.jpg', title: 'Ophthalmology & Laser Eye', sub: 'Sutureless Phaco Cataract & Vision Laser' },
  { file: 'radiology.jpg', title: 'Radiology & Modern Lab', sub: 'Digital X-Ray, Color Doppler & 24/7 Pathology' },
];

departments.forEach(d => {
  const svg = createFacilitySvg(d.title, d.sub);
  fs.writeFileSync(path.join(publicDir, 'images', 'departments', d.file), svg);
});

// Gallery
const gallery = [
  { file: 'reception.jpg', title: 'Hospital Reception & Triage', sub: 'Malik Hospital Chowk, Hujra Shah Muqeem' },
  { file: 'emergency.jpg', title: '24/7 Emergency & Trauma Bay', sub: 'Continuous Oxygen, Monitors & Resuscitation' },
  { file: 'operation-theater.jpg', title: 'Sterile Laminar Flow OT', sub: 'HEPA Filtration & C-Arm Guided Surgery' },
  { file: 'delivery-suite.jpg', title: 'Private Maternity Labor Room', sub: '24/7 Normal Deliveries & Emergency C-Section' },
  { file: 'nursery.jpg', title: 'Neonatal Nursery & Incubators', sub: 'Microprocessor Warmers & Jaundice Phototherapy' },
  { file: 'patient-rooms.jpg', title: 'Executive Inpatient Rooms', sub: 'Private Air-Conditioned Post-Surgical Care' },
  { file: 'digital-xray.jpg', title: 'Digital Radiography Suite', sub: 'High-Frequency Low-Dose Digital X-Ray' },
  { file: 'lab.jpg', title: 'Automated Pathology Laboratory', sub: '5-Part Hematology & Automated Clinical Chemistry' },
  { file: 'ultrasound.jpg', title: 'Color Doppler Ultrasound Room', sub: 'Dedicated Private Female Sonography Suite' },
  { file: 'aesthetic-lounge.jpg', title: 'Medical Aesthetics Lounge', sub: 'Certified Diode Laser & Hydrafacial MD' },
];

gallery.forEach(g => {
  const svg = createFacilitySvg(g.title, g.sub);
  fs.writeFileSync(path.join(publicDir, 'images', 'gallery', g.file), svg);
});

// Articles
const articles = [
  { file: 'diabetes.jpg', title: 'Diabetes & Hypertension Control', sub: 'Clinical Metabolic Health Guide' },
  { file: 'heart.jpg', title: 'Recognizing Cardiac Chest Pain', sub: 'Angina Warning Signs & Immediate Triage' },
  { file: 'child-health.jpg', title: 'Seasonal Fevers in Children', sub: 'Pediatric Temperature Management' },
  { file: 'spine.jpg', title: 'Preventing Back Pain & Disc Strain', sub: 'Ergonomics & Spinal Posture' },
  { file: 'pregnancy.jpg', title: 'Antenatal Checkups & Nutrition', sub: 'Safe Motherhood & Trimester Guidelines' },
];

articles.forEach(a => {
  const svg = createFacilitySvg(a.title, a.sub);
  fs.writeFileSync(path.join(publicDir, 'images', 'articles', a.file), svg);
});

console.log('High-end medical SVG placeholders generated successfully!');
