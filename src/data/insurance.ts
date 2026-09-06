export interface InsurancePartner {
  id: string;
  name: string;
  type: "Government Health Program" | "Corporate Insurance" | "TPA (Third Party Administrator)";
  description: string;
  coverageDetails: string;
  claimProcess: string;
  supportPhone: string;
}

export const insurancePartners: InsurancePartner[] = [
  {
    id: "sehat-sahulat-card",
    name: "State Life Sehat Sahulat Card (Qaumi Sehat Card)",
    type: "Government Health Program",
    description: "Universal healthcare financial protection program by the Government of Pakistan / Punjab for empaneled inpatient procedures.",
    coverageDetails: "Covers inpatient admissions, emergency surgical trauma, C-Sections, and critical intensive care up to annual designated family limits.",
    claimProcess: "Present original CNIC of the patient at the admission desk. Our dedicated Sehat Card coordinator will verify eligibility and initiate the cashless pre-authorization.",
    supportPhone: "0300-6972295"
  },
  {
    id: "jubilee-life",
    name: "Jubilee Life Insurance (Health Shield)",
    type: "Corporate Insurance",
    description: "One of Pakistan's leading private health insurance providers for corporate employees and private policyholders.",
    coverageDetails: "Direct cashless hospitalization, maternity benefits, surgical procedures, and post-discharge medications as per individual policy tier.",
    claimProcess: "Show your Jubilee Health Card and CNIC. Cashless claim approval is processed through the digital portal within 30 minutes.",
    supportPhone: "0370-6972295"
  },
  {
    id: "efu-general",
    name: "EFU General Health Insurance",
    type: "Corporate Insurance",
    description: "Trusted corporate panel coverage catering to banks, multinationals, and educational institutions across Punjab.",
    coverageDetails: "Inpatient room and board, Operation Theater charges, surgeon and anesthetist fees, emergency room treatments.",
    claimProcess: "Pre-authorization form submitted directly by our billing office to EFU claims department.",
    supportPhone: "0444-860465"
  },
  {
    id: "adamjee-insurance",
    name: "Adamjee Insurance (Health Care)",
    type: "Corporate Insurance",
    description: "Comprehensive corporate medical coverage network offering streamlined hospital admissions.",
    coverageDetails: "Accidental trauma emergency, specialized diagnostics, surgical operations, and ICU care.",
    claimProcess: "Swipe/verify Adamjee digital health card at registration counter.",
    supportPhone: "0300-6972295"
  },
  {
    id: "pak-qatar-takaful",
    name: "Pak-Qatar Family Takaful",
    type: "Corporate Insurance",
    description: "Shariah-compliant health takaful coverage for corporate groups and family health protection.",
    coverageDetails: "Hospitalization, maternity packages, accidental trauma, and specialized diagnostic investigations.",
    claimProcess: "Instant coordination with Pak Qatar Takaful medical desk.",
    supportPhone: "0300-6972295"
  },
  {
    id: "askari-health",
    name: "Askari General Insurance (Health Takaful)",
    type: "Corporate Insurance",
    description: "Preferred medical partner for armed forces welfare organizations and corporate clients.",
    coverageDetails: "Cashless emergency admissions, major surgeries, and diagnostic scans.",
    claimProcess: "Direct verification via Askari corporate panel portal.",
    supportPhone: "0300-6972295"
  }
];
