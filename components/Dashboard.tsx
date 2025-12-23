
import React from 'react';
import { AppState } from '../types';
import { STATUS_COLORS, PLATFORM_ICONS } from '../constants';
import { TrendingUp, Plus, Briefcase } from 'lucide-react';

interface DashboardProps {
  state: AppState;
}

const Dashboard: React.FC<DashboardProps> = ({ state }) => {
  const applications = state?.applications || [];
  const interviews = state?.interviews || [];

  const stats = {
    total: applications.length,
    shortlisted: applications.filter(a => a.status === 'Shortlisted').length,
    inReview: applications.filter(a => a.status === 'In Review').length,
    rejected: applications.filter(a => a.status === 'Rejected').length,
    interviews: interviews.length
  };

  return (
    <div className="space-y-8 py-2">
      {/* Stats Grid */}
      <section className="grid grid-cols-2 gap-4">
        <div className="bg-indigo-600 rounded-3xl p-5 text-white shadow-lg shadow-indigo-100 flex flex-col justify-between aspect-square">
          <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center mb-2">
            <TrendingUp size={20} />
          </div>
          <div>
            <p className="text-3xl font-bold">{stats.total}</p>
            <p className="text-xs font-medium text-white/80">Total Apps</p>
          </div>
        </div>

        <div className="grid grid-rows-2 gap-4">
          <div className="bg-green-50 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
              <Plus size={16} />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">{stats.shortlisted}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Shortlisted</p>
            </div>
          </div>
          <div className="bg-purple-50 rounded-2xl p-4 flex items-center space-x-3">
            <div className="w-8 h-8 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
              <Briefcase size={16} />
            </div>
            <div>
              <p className="font-bold text-gray-900 leading-tight">{stats.interviews}</p>
              <p className="text-[10px] uppercase font-bold text-gray-400">Interviews</p>
            </div>
          </div>
        </div>
      </section>

      {/* Recent Applications */}
      <section className="space-y-4">
        <div className="flex justify-between items-end px-1">
          <h2 className="text-lg font-bold">Activity</h2>
          <button className="text-[10px] font-bold text-indigo-600 uppercase tracking-widest">View All</button>
        </div>
        
        <div className="space-y-3">
          {applications.slice(0, 5).map((app) => (
            <div key={app.id} className="p-4 bg-white border border-gray-100 rounded-2xl flex items-center justify-between shadow-sm hover:border-indigo-100 transition-colors">
              <div className="flex items-center space-x-4">
                <div className="w-10 h-10 bg-gray-50 rounded-xl flex items-center justify-center flex-shrink-0">
                   {app.platform ? PLATFORM_ICONS[app.platform] : <Briefcase size={14} />}
                </div>
                <div className="min-w-0">
                  <h3 className="font-bold text-sm leading-tight truncate">{app.companyName}</h3>
                  <p className="text-[11px] text-gray-500 truncate">{app.role}</p>
                </div>
              </div>
              <div className="text-right flex-shrink-0 ml-2">
                <span className={`px-2 py-0.5 rounded-full text-[9px] font-bold uppercase ${app.status ? STATUS_COLORS[app.status] : 'bg-gray-100'}`}>
                  {app.status}
                </span>
                <p className="text-[9px] text-gray-300 mt-1">{app.appliedDate}</p>
              </div>
            </div>
          ))}

          {applications.length === 0 && (
            <div className="py-10 text-center space-y-2">
               <div className="mx-auto w-14 h-14 bg-gray-50 rounded-full flex items-center justify-center text-gray-300">
                  <Briefcase size={24} />
               </div>
               <p className="text-gray-400 text-sm font-medium">No applications found.</p>
               <p className="text-xs text-gray-300">Your bot is waiting to start.</p>
            </div>
          )}
        </div>
      </section>

      {/* Promotion Card */}
      <div className="bg-orange-50 rounded-3xl p-6 relative overflow-hidden border border-orange-100">
        <div className="relative z-10 space-y-2">
          <h3 className="text-orange-900 font-bold text-sm">Resume Boost AI</h3>
          <p className="text-orange-800 text-[11px] leading-relaxed opacity-80">Optimize your profile for higher match scores.</p>
          <button className="mt-2 text-[10px] font-bold text-orange-600 bg-white px-3 py-2 rounded-lg shadow-sm border border-orange-100">Get Analyzed</button>
        </div>
        <div className="absolute -right-4 -bottom-4 w-24 h-24 bg-orange-200/50 rounded-full blur-2xl" />
      </div>
    </div>
  );
};

export default Dashboard;
