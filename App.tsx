
import React, { useState, useEffect } from 'react';
import Layout from './components/Layout';
import Onboarding from './components/Onboarding';
import Dashboard from './components/Dashboard';
import AutomationHub from './components/AutomationHub';
import { AppState, UserProfile, JobApplication } from './types';
import { Calendar, Briefcase, Bell, MessageSquare, Info, Download, Smartphone, FileDown, LogOut } from 'lucide-react';

const App: React.FC = () => {
  const [activeTab, setActiveTab] = useState('dashboard');
  const [deferredPrompt, setDeferredPrompt] = useState<any>(null);
  const [state, setState] = useState<AppState>({
    onboarded: false,
    profile: null,
    applications: [],
    interviews: [
      {
        id: '1',
        companyName: 'Stripe',
        role: 'Frontend Engineer',
        date: 'Oct 15, 2024',
        time: '10:00 AM',
        type: 'Technical',
        tips: ['Focus on React performance', 'Explain state management patterns', 'Review CSS architecture']
      }
    ],
    isAutoApplying: false
  });

  useEffect(() => {
    // Check for existing session
    const savedProfile = localStorage.getItem('hirebot_profile');
    if (savedProfile) {
      try {
        const profile = JSON.parse(savedProfile);
        setState(prev => ({ ...prev, profile, onboarded: true }));
      } catch (e) {
        console.error("Failed to load saved profile");
      }
    }

    const handler = (e: any) => {
      e.preventDefault();
      setDeferredPrompt(e);
    };
    window.addEventListener('beforeinstallprompt', handler);
    return () => window.removeEventListener('beforeinstallprompt', handler);
  }, []);

  const handleInstallClick = async () => {
    if (!deferredPrompt) {
      alert("Please use your browser's menu to 'Add to Home Screen'.");
      return;
    }
    deferredPrompt.prompt();
    const { outcome } = await deferredPrompt.userChoice;
    if (outcome === 'accepted') {
      setDeferredPrompt(null);
    }
  };

  const handleExportData = () => {
    if (state.applications.length === 0) {
      alert("No application data to export.");
      return;
    }
    const headers = ["Company", "Role", "Platform", "Status", "Date", "Match Score"];
    const rows = state.applications.map(app => [
      app.companyName,
      app.role,
      app.platform,
      app.status,
      app.appliedDate,
      app.matchScore
    ]);
    const csvContent = "data:text/csv;charset=utf-8," 
      + headers.join(",") + "\n"
      + rows.map(e => e.join(",")).join("\n");
    
    const encodedUri = encodeURI(csvContent);
    const link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "hirebot_applications.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const handleOnboardingComplete = (profile: UserProfile) => {
    localStorage.setItem('hirebot_profile', JSON.stringify(profile));
    setState(prev => ({ ...prev, onboarded: true, profile }));
  };

  const handleToggleAutoApply = (active: boolean) => {
    setState(prev => ({ ...prev, isAutoApplying: active }));
  };

  const handleNewApplication = (app: JobApplication) => {
    setState(prev => ({
      ...prev,
      applications: [app, ...prev.applications]
    }));
  };

  // Content rendering logic
  const renderTabContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return <Dashboard state={state} />;
      case 'automation':
        return <AutomationHub state={state} onToggle={handleToggleAutoApply} onNewApplication={handleNewApplication} />;
      case 'resume':
        return (
          <div className="space-y-6 py-2">
            <h2 className="text-xl font-bold px-1">Resume</h2>
            <div className="p-6 bg-white border border-gray-100 rounded-3xl space-y-4 shadow-sm">
               <div className="flex items-center space-x-4">
                 <div className="w-12 h-12 bg-indigo-50 text-indigo-600 rounded-2xl flex items-center justify-center">
                   <Briefcase size={24} />
                 </div>
                 <div className="min-w-0 flex-1">
                   <h3 className="font-bold truncate">{state.profile?.name || 'User'}'s Resume</h3>
                   <p className="text-xs text-gray-400">PDF • 2.4 MB</p>
                 </div>
               </div>
               <div className="flex space-x-2">
                 <button className="flex-1 py-2.5 text-xs font-bold bg-indigo-50 text-indigo-600 rounded-xl hover:bg-indigo-100 transition-colors">View</button>
                 <button className="flex-1 py-2.5 text-xs font-bold bg-indigo-600 text-white rounded-xl hover:bg-indigo-700 transition-colors">Update</button>
               </div>
            </div>

            <section className="space-y-4">
              <h3 className="font-bold flex items-center text-sm px-1"><Info size={16} className="mr-2 text-indigo-500" /> AI Optimization</h3>
              <div className="p-5 bg-indigo-600 rounded-3xl text-white space-y-4">
                 <h4 className="font-bold text-sm">Opportunities Found</h4>
                 <ul className="text-[11px] space-y-3 opacity-90 list-disc pl-4 leading-relaxed">
                   <li>Include "Cloud Architecture" in professional summary.</li>
                   <li>Quantify previous achievements at {state.profile?.field || 'last company'}.</li>
                   <li>Update skills to match the {state.profile?.role || 'target'} role.</li>
                 </ul>
                 <button className="w-full py-3 bg-white text-indigo-600 rounded-xl font-bold text-xs shadow-lg">Improve Match Rate</button>
              </div>
            </section>
          </div>
        );
      case 'interviews':
        return (
          <div className="space-y-6 py-2">
            <div className="flex justify-between items-center px-1">
              <h2 className="text-xl font-bold">Interviews</h2>
              <button className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center text-gray-400 border border-gray-100">
                <Bell size={20} />
              </button>
            </div>

            <div className="space-y-4">
              {state.interviews.map(interview => (
                <div key={interview.id} className="p-6 bg-white border border-gray-100 rounded-3xl shadow-sm space-y-4 border-l-4 border-l-purple-500">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-bold text-base">{interview.companyName}</h3>
                      <p className="text-xs text-gray-500">{interview.role}</p>
                    </div>
                    <span className="px-2 py-1 bg-purple-50 text-purple-600 rounded-full text-[9px] font-bold uppercase">{interview.type}</span>
                  </div>
                  
                  <div className="flex items-center space-x-6 text-[10px] text-gray-400 font-bold">
                    <div className="flex items-center"><Calendar size={12} className="mr-2" /> {interview.date}</div>
                    <div className="flex items-center"><MessageSquare size={12} className="mr-2" /> {interview.time}</div>
                  </div>

                  <div className="pt-4 border-t border-gray-50 space-y-3">
                    <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest">AI Preparation</p>
                    <div className="space-y-2">
                      {interview.tips?.map((tip, i) => (
                        <div key={i} className="flex items-start space-x-2 text-[11px] text-gray-600 bg-gray-50/50 p-2.5 rounded-xl border border-gray-50">
                          <span className="text-indigo-500 font-bold">•</span>
                          <span>{tip}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button className="w-full py-3.5 bg-indigo-600 text-white rounded-2xl font-bold text-sm shadow-md">Start Session</button>
                </div>
              ))}
            </div>
          </div>
        );
      case 'profile':
        return (
          <div className="space-y-6 py-2">
            <div className="flex flex-col items-center py-4 space-y-3">
               <div className="w-24 h-24 rounded-full bg-indigo-100 flex items-center justify-center text-3xl font-bold text-indigo-600 border-4 border-white shadow-xl relative">
                 {state.profile?.name?.substring(0, 2).toUpperCase() || 'JD'}
                 <div className="absolute bottom-1 right-1 w-6 h-6 bg-green-500 border-2 border-white rounded-full" />
               </div>
               <div className="text-center">
                 <h2 className="text-xl font-bold">{state.profile?.name}</h2>
                 <p className="text-xs text-gray-400 font-medium">{state.profile?.role}</p>
               </div>
            </div>

            <div className="bg-white border border-gray-100 rounded-3xl p-6 space-y-5 shadow-sm">
               <div className="space-y-4">
                  {[
                    { label: 'Field', value: state.profile?.field },
                    { label: 'Experience', value: `${state.profile?.experience} Years` },
                    { label: 'Mode', value: state.profile?.location },
                    { label: 'Email', value: state.profile?.email }
                  ].map((item, idx) => (
                    <div key={idx} className="flex justify-between items-center border-b border-gray-50 pb-3 last:border-0 last:pb-0">
                      <span className="text-[10px] font-bold text-gray-400 uppercase">{item.label}</span>
                      <span className="text-xs font-bold text-gray-900">{item.value}</span>
                    </div>
                  ))}
               </div>
            </div>

            <div className="space-y-4">
               <h3 className="text-[10px] font-bold text-gray-400 uppercase tracking-widest px-1">Settings</h3>
               <div className="space-y-2">
                  <button onClick={handleInstallClick} className="w-full flex items-center justify-between p-4 bg-indigo-50 hover:bg-indigo-100 transition rounded-2xl group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-indigo-600 text-white rounded-xl flex items-center justify-center mr-4"><Smartphone size={20} /></div>
                      <div className="text-left"><p className="text-xs font-bold text-indigo-900">Install HireBot</p><p className="text-[9px] text-indigo-600">Add to home screen</p></div>
                    </div>
                    <Download size={18} className="text-indigo-400" />
                  </button>

                  <button onClick={handleExportData} className="w-full flex items-center justify-between p-4 bg-gray-50 hover:bg-gray-100 transition rounded-2xl group">
                    <div className="flex items-center">
                      <div className="w-10 h-10 bg-gray-200 text-gray-600 rounded-xl flex items-center justify-center mr-4"><FileDown size={20} /></div>
                      <div className="text-left"><p className="text-xs font-bold text-gray-900">Export History</p><p className="text-[9px] text-gray-400">CSV Spreadsheet</p></div>
                    </div>
                    <Download size={18} className="text-gray-400" />
                  </button>
               </div>
            </div>

            <button 
              onClick={() => { localStorage.removeItem('hirebot_profile'); window.location.reload(); }}
              className="w-full py-4 border border-red-50 rounded-2xl font-bold text-xs text-red-500 bg-red-50/20 flex items-center justify-center"
            >
              <LogOut size={16} className="mr-2" /> Reset Profile
            </button>
          </div>
        );
      default:
        return <Dashboard state={state} />;
    }
  };

  if (!state.onboarded) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  const tabTitle = activeTab === 'dashboard' ? 'HireBot AI' : activeTab.charAt(0).toUpperCase() + activeTab.slice(1);

  return (
    <Layout 
      activeTab={activeTab} 
      setActiveTab={setActiveTab} 
      title={tabTitle}
    >
      {renderTabContent()}
    </Layout>
  );
};

export default App;
