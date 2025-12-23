
import React, { useState } from 'react';
import { UserProfile, JobField } from '../types';
import { JOB_FIELDS, EXPERIENCE_LEVELS, LOCATIONS, JOB_TYPES } from '../constants';
import { ArrowRight, ArrowLeft, Upload, Check } from 'lucide-react';

interface OnboardingProps {
  onComplete: (profile: UserProfile) => void;
}

const Onboarding: React.FC<OnboardingProps> = ({ onComplete }) => {
  const [step, setStep] = useState(1);
  const [profile, setProfile] = useState<Partial<UserProfile>>({
    field: 'Software Developer',
    experience: 'Fresher',
    location: 'Remote',
    jobType: 'Full-time'
  });

  const nextStep = () => setStep(prev => prev + 1);
  const prevStep = () => setStep(prev => prev - 1);

  const handleFinish = () => {
    onComplete(profile as UserProfile);
  };

  const renderStep = () => {
    switch(step) {
      case 1:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">What's your field?</h2>
            <div className="grid grid-cols-1 gap-3">
              {JOB_FIELDS.map(field => (
                <button
                  key={field}
                  onClick={() => setProfile({ ...profile, field })}
                  className={`p-4 rounded-xl border-2 text-left transition-all ${
                    profile.field === field ? 'border-indigo-600 bg-indigo-50 shadow-sm' : 'border-gray-100 hover:border-gray-200'
                  }`}
                >
                  <span className="font-semibold">{field}</span>
                </button>
              ))}
            </div>
          </div>
        );
      case 2:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Preferences</h2>
            <div className="space-y-4">
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">Preferred Job Title</label>
                <input 
                  type="text" 
                  className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                  placeholder="e.g. Senior Frontend Engineer"
                  onChange={(e) => setProfile({ ...profile, role: e.target.value })}
                  value={profile.role || ''}
                />
              </div>
              
              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">Experience Level</label>
                <div className="flex flex-wrap gap-2">
                  {EXPERIENCE_LEVELS.map(lvl => (
                    <button
                      key={lvl}
                      onClick={() => setProfile({ ...profile, experience: lvl as any })}
                      className={`px-4 py-2 rounded-full border ${profile.experience === lvl ? 'bg-indigo-600 text-white' : 'border-gray-200'}`}
                    >
                      {lvl}
                    </button>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-gray-500 mb-1 block">Work Mode</label>
                <div className="flex flex-wrap gap-2">
                  {LOCATIONS.map(loc => (
                    <button
                      key={loc}
                      onClick={() => setProfile({ ...profile, location: loc as any })}
                      className={`px-4 py-2 rounded-full border ${profile.location === loc ? 'bg-indigo-600 text-white' : 'border-gray-200'}`}
                    >
                      {loc}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>
        );
      case 3:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Contact Details</h2>
            <div className="space-y-4">
              <input 
                type="text" 
                placeholder="Full Name"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                onChange={(e) => setProfile({ ...profile, name: e.target.value })}
                value={profile.name || ''}
              />
              <input 
                type="email" 
                placeholder="Email Address"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                value={profile.email || ''}
              />
              <input 
                type="tel" 
                placeholder="Phone Number"
                className="w-full p-3 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500"
                onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                value={profile.phone || ''}
              />
            </div>
          </div>
        );
      case 4:
        return (
          <div className="space-y-6">
            <h2 className="text-xl font-bold">Resume & Portfolio</h2>
            <div className="space-y-4">
              <div className="border-2 border-dashed border-gray-200 rounded-2xl p-8 flex flex-col items-center justify-center text-center space-y-3">
                <div className="w-12 h-12 bg-indigo-100 text-indigo-600 rounded-full flex items-center justify-center">
                  <Upload size={24} />
                </div>
                <div>
                  <p className="font-semibold">Upload PDF Resume</p>
                  <p className="text-xs text-gray-400">Max size 5MB</p>
                </div>
                <input type="file" className="hidden" id="resume-upload" accept=".pdf,.doc,.docx" />
                <label htmlFor="resume-upload" className="px-4 py-2 bg-indigo-600 text-white rounded-lg text-sm cursor-pointer hover:bg-indigo-700 transition">Select File</label>
              </div>
              
              <div className="space-y-2">
                <p className="text-sm font-medium text-gray-500">Or Paste Resume Text (for AI analysis)</p>
                <textarea 
                  className="w-full p-3 h-32 bg-gray-50 border border-gray-200 rounded-xl outline-none focus:border-indigo-500 text-sm"
                  placeholder="Paste your experience and skills here..."
                  onChange={(e) => setProfile({ ...profile, resumeText: e.target.value })}
                  value={profile.resumeText || ''}
                />
              </div>
            </div>
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col h-full max-w-md mx-auto bg-white p-6 justify-between">
      <div className="space-y-8">
        <div className="flex justify-between items-center">
          <div className="flex space-x-1">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className={`h-1 w-8 rounded-full ${step >= i ? 'bg-indigo-600' : 'bg-gray-100'}`} />
            ))}
          </div>
          <span className="text-xs font-bold text-gray-400 uppercase">Step {step} of 4</span>
        </div>
        
        {renderStep()}
      </div>

      <div className="flex space-x-4 pb-4">
        {step > 1 && (
          <button 
            onClick={prevStep}
            className="flex-1 py-4 rounded-2xl border border-gray-200 flex items-center justify-center text-gray-600 font-bold"
          >
            <ArrowLeft size={20} className="mr-2" /> Back
          </button>
        )}
        <button 
          onClick={step === 4 ? handleFinish : nextStep}
          className="flex-[2] py-4 rounded-2xl bg-indigo-600 text-white flex items-center justify-center font-bold shadow-lg shadow-indigo-100"
        >
          {step === 4 ? (
            <>Get Started <Check size={20} className="ml-2" /></>
          ) : (
            <>Continue <ArrowRight size={20} className="ml-2" /></>
          )}
        </button>
      </div>
    </div>
  );
};

export default Onboarding;
