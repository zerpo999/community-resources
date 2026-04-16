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

export const CATEGORIES = [
  { label: "Food Assistance", keyword: "food bank OR food pantry OR soup kitchen OR EBT OR meals on wheels OR food drive OR free food OR food stamps OR aliments OR nonperishable OR community kitchen OR food distribution" },
  { label: "Healthcare", keyword: "free clinic OR community health center OR mental health clinic OR free testing OR vaccination OR clinic OR low cost doctor OR wellness center OR cheap doctors OR mental health OR destress OR wellbeing OR community health" },
  { label: "Housing", keyword: "homeless shelter OR emergency housing OR rental assistance OR housing authority OR realtor OR low income housing" },
  { label: "Emergencies", keyword: "hospital OR emergency room OR crisis hotline OR urgent care OR police OR fire station OR suicide prevention" },
  { label: "Seniors", keyword: "senior center OR assisted living OR home care aide OR caregiver OR senior transportation OR meals on wheels OR senior services OR CNA OR senior care OR transportation for seniors OR veteran OR veteran services" },
  { label: "Disabilities", keyword: "disability services OR wheelchair ramp OR special education OR vocational rehabilitation" },
  { label: "Financial Help", keyword: "financial advisor OR bank OR credit union OR student loan help OR child care assistance OR notary OR financial assistance OR budgeting OR financial aid" },
  { label: "Transportation", keyword: "bus stop OR shuttle service OR shuttle OR free ride program OR bike share OR paratransit OR bus pass OR bus OR bus route" },
  { label: "Youth", keyword: "youth center OR after school program OR summer camp OR free school supplies OR toy drive OR crisis hotline for teens OR suicide prevention OR drug abuse OR substance abuse OR toys for tots OR boys and girls club OR youth programs OR scholarship OR school supplies" },
  { label: "Legal Services", keyword: "farmworker OR rights OR legal aid OR pro bono lawyer OR immigration attorney OR notary public OR immigration OR legal help OR legal assistance OR legal support OR attorney" },
  { label: "Crisis", keyword: "domestic violence shelter OR substance abuse treatment OR mental health crisis OR natural disaster relief OR hurricane OR earthquake OR natural disaster OR crisis OR substance abuse OR drug abuse OR domestic violence" },
  { label: "Digital Resources", keyword: "public library OR free wifi OR computer lab OR device lending OR hotspot OR library OR internet access OR digital literacy OR online courses OR computers OR digital devices" },
];
