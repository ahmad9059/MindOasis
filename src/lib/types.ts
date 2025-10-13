export interface Therapist {
  id: string;
  name: string;
  profileUrl: string | null;
  gender: 'Male' | 'Female' | null;
  city: string;
  experienceYears: number | null;
  email: string | null;
  phone: string | null;
  modes: string[];
  education: string | null;
  experience: string | null;
  expertise: string | null;
  about: string | null;
  feeAmount: number | null;
  feeCurrency: string | null;
  rating?: number | null;
}

export type FilterOptions = {
  cities: { name: string; count: number }[];
  genders: { name: string; count: number }[];
};

export const experienceLevels = [
  { label: '0-5 years', min: 0, max: 5 },
  { label: '5-10 years', min: 5, max: 10 },
  { label: '10-15 years', min: 10, max: 15 },
  { label: '15+ years', min: 15, max: Infinity },
];

export const feeRanges = [
    { label: 'Under Rs.2000', min: 0, max: 1999 },
    { label: 'Rs.2000-4000', min: 2000, max: 4000 },
    { label: 'Rs.4000-6000', min: 4000, max: 6000 },
    { label: 'Above Rs.6000', min: 6001, max: Infinity },
];

export const consultationModes = ['In-person', 'Online'];
