
import React, { useState, useEffect } from 'react';
import { Zap, Play, Square, Settings, ShieldCheck, Search, Filter } from 'lucide-react';
import { AppState, JobApplication } from '../types';

interface AutomationHubProps {
  state: AppState;
  onToggle: (active: boolean) => void;
  onNewApplication: (app: JobApplication) => void;
}

const AutomationHub: React.FC<AutomationHubProps> = ({ state, onToggle, onNewApplication }) => {
  const [speed, setSpeed] = useState(50);
  const [isSearching, setIsSearching] = useState(false);
  
  // Simulated automation logic
  useEffect(() => {
    let interval: any;
    if (state.isAutoApplying) {
      interval = setInterval(() => {
        const platforms: any[] = ['LinkedIn', 'Indeed', 'Naukri', 'Foundit', 'CareerPage'];
        const companies = ['Google', 'Meta', 'Amazon', 'Stripe', 'Vercel', 'Uber', 'Airbnb', 'Netflix'];
        const roles = ['Software Engineer', 'Data Scientist', 'Frontend Developer', 'Backend Dev', 'Fullstack'];
        
        const newApp: JobApplication = {
          id: Math.random().toString(36).substr(2, 9),
          companyName: companies[Math.floor(Math.random() * companies.length)],
          role: state.profile?.role || roles[Math.floor(Math.random() * roles.length)],
          platform: platforms[Math.floor(Math.random() * platforms.length)],
          status: 'Applied',
          appliedDate: 'Just now',
          matchScore: Math.floor(Math.random() * 30) + 70
        };
        
        onNewApplication(newApp);
      }, 5000); // Apply every 5 seconds when active
    }
    return () => clearInterval(interval);
  }, [state.isAutoApplying, state.profile, onNewApplication]);

  return (
    <div className="space-y-6">
      {/* Bot Control */}
      <div className={`p-8 rounded-[2rem] text-center transition-all duration-700 relative overflow-hidden ${state.isAutoApplying ? 'bg-indigo-600 text-white shadow-2xl shadow-indigo-300' : 'bg-gray-50 border-2 border-dashed border-gray-200'}`}>
        {state.isAutoApplying && (
          <div className="absolute inset-0 opacity-10 pointer-events-none overflow-hidden">
             {[...Array(5)].map((_, i) => (
               <div key={i} className="absolute bg-white rounded-full animate-pulse" style={{
                 width: `${Math.random() * 100 + 50}px`,
                 height: `${Math.random() * 100 + 50}px`,
                 top: `${Math.random() * 100}%`,
                 left: `${Math.random() * 100}%`,
                 animationDelay: `${i * 0.5}s`
               }} />
             ))}
          </div>
        )}

        <div className="relative z-10 space-y-6">
          <div className={`w-20 h-20 mx-auto rounded-3xl flex items-center justify-center transition-all duration-500 shadow-lg ${state.isAutoApplying ? 'bg-white text-indigo-600 animate-bounce' : 'bg-gray-100 text-gray-400'}`}>
            <Zap size={40} fill={state.isAutoApplying ? 'currentColor' : 'none'} />
          </div>
          
          <div>
            <h2 className="text-xl font-bold">{state.isAutoApplying ? 'Applying in Bulk...' : 'Ready to Start?'}</h2>
            <p className={`text-sm mt-1 px-4 opacity-80 ${state.isAutoApplying ? 'text-white' : 'text-gray-500'}`}>
              {state.isAutoApplying 
                ? 'Bot is scanning LinkedIn, Indeed, and more to match your profile.' 
                : 'Click play to start the AI automation bot and apply to 50+ jobs per hour.'}
            </p>
          </div>

          <button
            onClick={() => onToggle(!state.isAutoApplying)}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center transition-all ${state.isAutoApplying ? 'bg-white text-indigo-600' : 'bg-indigo-600 text-white shadow-xl shadow-indigo-100'}`}
          >
            {state.isAutoApplying ? (
              <><Square size={20} className="mr-2" /> Stop Bot</>
            ) : (
              <><Play size={20} className="mr-2" /> Start Auto-Apply</>
            )}
          </button>
        </div>
      </div>

      {/* Configuration */}
      <section className="space-y-4">
        <div className="flex justify-between items-center">
          <h3 className="font-bold flex items-center"><Settings size={16} className="mr-2 text-indigo-500" /> Advanced Settings</h3>
        </div>

        <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-6">
          <div className="space-y-3">
            <div className="flex justify-between text-xs font-bold uppercase text-gray-400">
              <span>Application Speed</span>
              <span>{speed}%</span>
            </div>
            <input 
              type="range" 
              className="w-full h-2 bg-gray-100 rounded-lg appearance-none cursor-pointer accent-indigo-600"
              value={speed}
              onChange={(e) => setSpeed(parseInt(e.target.value))}
            />
          </div>

          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <ShieldCheck size={18} className="text-green-500 mr-3" />
                <span className="text-sm font-medium">Duplicate Filter</span>
              </div>
              <div className="w-10 h-5 bg-green-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
            
            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center">
                <Search size={18} className="text-gray-400 mr-3" />
                <span className="text-sm font-medium">AI Keyword Match</span>
              </div>
              <div className="w-10 h-5 bg-indigo-500 rounded-full relative">
                <div className="absolute right-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>

            <div className="flex items-center justify-between opacity-50">
              <div className="flex items-center">
                <Filter size={18} className="text-gray-400 mr-3" />
                <span className="text-sm font-medium">Smart Salary Filter</span>
              </div>
              <div className="w-10 h-5 bg-gray-200 rounded-full relative">
                <div className="absolute left-1 top-1 w-3 h-3 bg-white rounded-full" />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Safety Note */}
      <div className="p-4 bg-gray-50 rounded-2xl text-[10px] text-gray-400 leading-relaxed text-center italic">
        "Your data is encrypted. We pause the bot automatically if we detect security verification requests from job portals to protect your account."
      </div>
    </div>
  );
};

export default AutomationHub;
