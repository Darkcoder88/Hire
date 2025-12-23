
export type JobField = 
  | 'Software Developer' 
  | 'Data Analyst' 
  | 'Product Analyst' 
  | 'Cyber Security' 
  | 'Digital Marketing' 
  | 'Finance' 
  | 'Sales' 
  | 'Teaching' 
  | 'Other';

export interface UserProfile {
  name: string;
  field: JobField;
  customField?: string;
  role: string;
  experience: 'Fresher' | '1-3' | '3-5' | '5+';
  location: 'Remote' | 'On-site' | 'Hybrid';
  jobType: 'Full-time' | 'Part-time' | 'Internship' | 'Contract';
  email: string;
  phone: string;
  resumeText: string;
  linkedinUrl?: string;
  portfolioUrl?: string;
}

export interface JobApplication {
  id: string;
  companyName: string;
  role: string;
  platform: 'LinkedIn' | 'Indeed' | 'Naukri' | 'Foundit' | 'CareerPage';
  status: 'Applied' | 'Shortlisted' | 'In Review' | 'Rejected' | 'Interview Scheduled';
  appliedDate: string;
  matchScore: number;
}

export interface Interview {
  id: string;
  companyName: string;
  role: string;
  date: string;
  time: string;
  type: 'HR' | 'Technical' | 'Final';
  tips?: string[];
}

export interface AppState {
  onboarded: boolean;
  profile: UserProfile | null;
  applications: JobApplication[];
  interviews: Interview[];
  isAutoApplying: boolean;
}
