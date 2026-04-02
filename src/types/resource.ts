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
  { id: "food", label: "Food Assistance", icon: "UtensilsCrossed", keyword: "food bank" },
  { id: "healthcare", label: "Healthcare", icon: "Heart", keyword: "clinic" },
  { id: "housing", label: "Housing", icon: "Home", keyword: "housing assistance" },
  { id: "emergencies", label: "Emergencies", icon: "Siren", keyword: "emergency services" },
  { id: "seniors", label: "Seniors", icon: "Users", keyword: "senior center" },
  { id: "disability", label: "Disability", icon: "Accessibility", keyword: "disability services" },
  { id: "financial", label: "Financial Help", icon: "DollarSign", keyword: "financial assistance" },
  { id: "transportation", label: "Transportation", icon: "Bus", keyword: "transportation services" },
  { id: "youth", label: "Youth", icon: "GraduationCap", keyword: "youth services" },
  { id: "legal", label: "Legal Services", icon: "Scale", keyword: "legal aid" },
  { id: "crisis", label: "Crisis", icon: "Phone", keyword: "crisis hotline" },
  { id: "digital", label: "Digital Resources", icon: "Wifi", keyword: "digital access" },
];

export const MOCK_RESOURCES: Resource[] = [
  {
    id: "1",
    name: "Community Food Bank of Central Florida",
    address: "4535 S Orange Ave, Orlando, FL 32806",
    category: "Food Assistance",
    hours: "Mon-Fri 8:00 AM - 5:00 PM",
    fees: "Free",
    distance: 2.3,
    website: "https://example.com",
    phone: "(407) 555-0101",
    description: "Provides emergency food assistance to families and individuals in need. Walk-ins welcome.",
    coordinates: { lat: 28.5108, lng: -81.3794 },
  },
  {
    id: "2",
    name: "Shepherd's Hope Health Center",
    address: "1950 Lee Rd, Winter Park, FL 32789",
    category: "Healthcare",
    hours: "Tue & Thu 6:00 PM - 9:30 PM",
    fees: "Free / Sliding Scale",
    distance: 4.7,
    website: "https://example.com",
    phone: "(407) 555-0202",
    description: "Free and charitable healthcare clinic serving the uninsured and underinsured community.",
    coordinates: { lat: 28.6069, lng: -81.3631 },
  },
  {
    id: "3",
    name: "Coalition for the Homeless",
    address: "639 W Central Blvd, Orlando, FL 32801",
    category: "Housing",
    hours: "24/7",
    fees: "Free",
    distance: 1.1,
    website: "https://example.com",
    phone: "(407) 555-0303",
    description: "Emergency shelter, transitional housing, and permanent supportive housing programs.",
    coordinates: { lat: 28.5383, lng: -81.3892 },
  },
  {
    id: "4",
    name: "Legal Aid Society of Orange County",
    address: "100 E Robinson St, Orlando, FL 32801",
    category: "Legal Services",
    hours: "Mon-Fri 9:00 AM - 5:00 PM",
    fees: "Free",
    distance: 3.5,
    website: "https://example.com",
    phone: "(407) 555-0404",
    description: "Free civil legal services for low-income residents including family law, housing, and benefits.",
    coordinates: { lat: 28.5421, lng: -81.3790 },
  },
  {
    id: "5",
    name: "Senior Resource Alliance",
    address: "3319 Maguire Blvd, Orlando, FL 32803",
    category: "Seniors",
    hours: "Mon-Fri 8:00 AM - 5:00 PM",
    fees: "Varies",
    distance: 5.2,
    website: "https://example.com",
    phone: "(407) 555-0505",
    description: "Connecting seniors and caregivers with community resources, meal programs, and support services.",
    coordinates: { lat: 28.5560, lng: -81.3500 },
  },
];
