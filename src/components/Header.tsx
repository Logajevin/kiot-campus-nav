import React from 'react';
import { 
  Compass, 
  Search, 
  Accessibility, 
  QrCode, 
  PhoneCall, 
  MapPin
} from 'lucide-react';

interface HeaderProps {
  onOpenSearch: () => void;
  onOpenQR: () => void;
  onOpenEmergency: () => void;
  accessibleOnly: boolean;
  onToggleAccessible: () => void;
  activeBuildingName?: string;
  onResetToCampus: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenSearch,
  onOpenQR,
  onOpenEmergency,
  accessibleOnly,
  onToggleAccessible,
  activeBuildingName,
  onResetToCampus,
}) => {
  return (
    <header className="absolute top-0 left-0 right-0 z-20 px-3 py-2.5 sm:px-6 sm:py-3 bg-white/90 backdrop-blur-md border-b border-slate-200/80 shadow-xs flex items-center justify-between transition-all">
      {/* Brand & Campus Title */}
      <div className="flex items-center gap-3">
        <button 
          onClick={onResetToCampus}
          className="flex items-center gap-2.5 text-left group focus:outline-hidden"
          title="Back to Campus Overview"
        >
          <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-700 via-indigo-600 to-sky-500 flex items-center justify-center text-white shadow-md shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Compass className="w-5 h-5 text-white" />
          </div>
          <div>
            <div className="flex items-center gap-1.5">
              <span className="font-bold text-slate-900 tracking-tight text-base sm:text-lg">
                KIOT Nav
              </span>
              <span className="text-[10px] font-semibold tracking-wider uppercase px-1.5 py-0.5 rounded-full bg-blue-100 text-blue-700">
                Salem
              </span>
            </div>
            <p className="text-[11px] text-slate-500 hidden sm:block truncate max-w-[220px]">
              {activeBuildingName ? `Inside: ${activeBuildingName}` : 'Knowledge Institute of Technology'}
            </p>
          </div>
        </button>

        {activeBuildingName && (
          <button
            onClick={onResetToCampus}
            className="hidden md:flex items-center gap-1.5 text-xs font-medium px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors"
          >
            <MapPin className="w-3.5 h-3.5 text-blue-600" />
            <span>Campus Map</span>
          </button>
        )}
      </div>

      {/* Action Buttons */}
      <div className="flex items-center gap-1.5 sm:gap-2">
        {/* Search trigger */}
        <button
          onClick={onOpenSearch}
          className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100/90 hover:bg-slate-200/80 text-slate-700 text-xs sm:text-sm font-medium border border-slate-200 transition-all hover:shadow-xs active:scale-95"
          title="Search labs, faculties, rooms (Press /)"
        >
          <Search className="w-4 h-4 text-blue-600" />
          <span className="hidden sm:inline">Search Campus...</span>
          <kbd className="hidden lg:inline-block px-1.5 py-0.5 text-[10px] font-semibold bg-white border border-slate-300 rounded text-slate-500">
            /
          </kbd>
        </button>

        {/* QR Scanner trigger */}
        <button
          onClick={onOpenQR}
          className="flex items-center gap-1.5 px-2.5 py-2 sm:px-3 rounded-xl bg-indigo-50 hover:bg-indigo-100 text-indigo-700 text-xs sm:text-sm font-medium border border-indigo-200/60 transition-colors active:scale-95"
          title="Scan Campus QR Code to find current location"
        >
          <QrCode className="w-4 h-4 text-indigo-600" />
          <span className="hidden md:inline">Scan QR</span>
        </button>

        {/* Accessible Mode Toggle */}
        <button
          onClick={onToggleAccessible}
          className={`flex items-center gap-1.5 px-2.5 py-2 sm:px-3 rounded-xl text-xs sm:text-sm font-medium border transition-all active:scale-95 ${
            accessibleOnly
              ? 'bg-emerald-600 text-white border-emerald-600 shadow-sm shadow-emerald-600/30'
              : 'bg-slate-50 hover:bg-slate-100 text-slate-600 border-slate-200'
          }`}
          title="Toggle Wheelchair / Step-Free Accessible Routing"
        >
          <Accessibility className="w-4 h-4" />
          <span className="hidden lg:inline">{accessibleOnly ? 'Step-Free: ON' : 'Step-Free'}</span>
        </button>

        {/* Emergency Modal trigger */}
        <button
          onClick={onOpenEmergency}
          className="p-2 sm:px-2.5 sm:py-2 rounded-xl bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 text-xs sm:text-sm font-medium transition-colors"
          title="Emergency Help & Contacts"
        >
          <PhoneCall className="w-4 h-4" />
        </button>

        {/* GitHub link with clean inline SVG */}
        <a
          href="https://github.com"
          target="_blank"
          rel="noopener noreferrer"
          className="p-2 rounded-xl bg-slate-100 hover:bg-slate-200 text-slate-700 transition-colors hidden sm:flex"
          title="View on GitHub"
        >
          <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
            <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.53 1.032 1.53 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
          </svg>
        </a>
      </div>
    </header>
  );
};
