
import React from 'react';
import { NAVIGATION } from '../constants';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  setActiveTab: (id: string) => void;
  title: string;
}

const Layout: React.FC<LayoutProps> = ({ children, activeTab, setActiveTab, title }) => {
  return (
    <div className="flex flex-col h-screen max-w-md mx-auto bg-white shadow-2xl relative overflow-hidden border-x border-gray-100">
      {/* Header */}
      <header className="px-6 pt-8 pb-4 flex justify-between items-center bg-white z-10 sticky top-0">
        <h1 className="text-xl font-bold text-gray-900 tracking-tight whitespace-nowrap overflow-hidden text-ellipsis mr-2">
          {title}
        </h1>
        <div className="flex-shrink-0 w-10 h-10 rounded-full bg-indigo-100 flex items-center justify-center text-indigo-600 font-bold border-2 border-white shadow-sm">
          JD
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 overflow-y-auto px-6 pb-24 no-scrollbar bg-white">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="absolute bottom-0 left-0 right-0 bg-white border-t border-gray-100 px-4 py-3 flex justify-between items-center z-20 shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
        {NAVIGATION.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            className={`flex flex-col items-center space-y-1 flex-1 transition-all ${
              activeTab === item.id ? 'text-indigo-600' : 'text-gray-400 hover:text-gray-500'
            }`}
          >
            <div className={`p-1.5 rounded-xl transition-colors ${activeTab === item.id ? 'bg-indigo-50' : 'bg-transparent'}`}>
              {item.icon}
            </div>
            <span className="text-[9px] font-bold uppercase tracking-tighter">{item.label}</span>
          </button>
        ))}
      </nav>
    </div>
  );
};

export default Layout;
