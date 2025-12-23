
import React from 'react';
import { 
  LayoutDashboard, 
  Zap, 
  FileText, 
  Calendar, 
  User, 
  Briefcase,
  Linkedin,
  Globe,
  CheckCircle2,
  Clock,
  XCircle,
  HelpCircle
} from 'lucide-react';
import { JobField } from './types';

export const JOB_FIELDS: JobField[] = [
  'Software Developer',
  'Data Analyst',
  'Product Analyst',
  'Cyber Security',
  'Digital Marketing',
  'Finance',
  'Sales',
  'Teaching',
  'Other'
];

export const EXPERIENCE_LEVELS = ['Fresher', '1-3', '3-5', '5+'];
export const LOCATIONS = ['Remote', 'On-site', 'Hybrid'];
export const JOB_TYPES = ['Full-time', 'Part-time', 'Internship', 'Contract'];

export const NAVIGATION = [
  { id: 'dashboard', label: 'Home', icon: <LayoutDashboard size={20} /> },
  { id: 'automation', label: 'Apply', icon: <Zap size={20} /> },
  { id: 'resume', label: 'Resume', icon: <FileText size={20} /> },
  { id: 'interviews', label: 'Interviews', icon: <Calendar size={20} /> },
  { id: 'profile', label: 'Profile', icon: <User size={20} /> },
];

export const STATUS_COLORS = {
  'Applied': 'bg-blue-100 text-blue-700',
  'Shortlisted': 'bg-green-100 text-green-700',
  'In Review': 'bg-yellow-100 text-yellow-700',
  'Rejected': 'bg-red-100 text-red-700',
  'Interview Scheduled': 'bg-purple-100 text-purple-700'
};

export const PLATFORM_ICONS = {
  'LinkedIn': <Linkedin size={14} className="text-blue-600" />,
  'Indeed': <Briefcase size={14} className="text-blue-800" />,
  'Naukri': <CheckCircle2 size={14} className="text-orange-500" />,
  'Foundit': <HelpCircle size={14} className="text-purple-500" />,
  'CareerPage': <Globe size={14} className="text-gray-600" />
};
