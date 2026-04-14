export interface Resource {
  id: string;
  name: string;
  address: string;
  category: string;
  hours: string;
  fees: string;
  distance: number;
  website: string;
  phone: string;
  description: string;
  coordinates: { lat: number; lng: number };
}

export interface Category {
  id: string;
  label: string;
  icon: string;
  keyword: string;
}

export const CATEGORIES: Category[] = [
  { id: "food", label: "Food Assistance", icon: "UtensilsCrossed", keyword: "food bank EBT hungry meal" },
  { id: "healthcare", label: "Healthcare", icon: "Heart", keyword: "clinic doctor sick disease" },
  { id: "housing", label: "Housing", icon: "Home", keyword: "shelter housing assistance" },
  { id: "emergencies", label: "Emergencies", icon: "Siren", keyword: "emergency services" },
  { id: "seniors", label: "Seniors", icon: "Users", keyword: "senior center citizen veteran" },
  { id: "disability", label: "Disability", icon: "Accessibility", keyword: "disability services wheelchair accessible ramp sick" },
  { id: "financial", label: "Financial Help", icon: "DollarSign", keyword: "financial assistance money" },
  { id: "transportation", label: "Transportation", icon: "Bus", keyword: "transportation services car bus ride" },
  { id: "youth", label: "Youth", icon: "GraduationCap", keyword: "youth services club young teen teenager children caregiver" },
  { id: "legal", label: "Legal Services", icon: "Scale", keyword: "legal aid immigration spanish lawyer" },
  { id: "crisis", label: "Crisis", icon: "Phone", keyword: "crisis hotline 988 suicide drug substance abuse" },
  { id: "digital", label: "Digital Resources", icon: "Wifi", keyword: "digital access wifi hotspot computer phone printer" },
];
