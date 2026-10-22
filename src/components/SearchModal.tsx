import React, { useState, useMemo } from 'react';
import type { CampusNode } from '../types/navigation';
import { 
  Search, 
  X, 
  MapPin, 
  Navigation, 
  GraduationCap, 
  Utensils, 
  Home, 
  HeartPulse, 
  Briefcase 
} from 'lucide-react';

interface SearchModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNodes: Record<string, CampusNode>;
  onSelectDestination: (nodeId: string) => void;
  onSelectStart: (nodeId: string) => void;
  targetMode: 'start' | 'dest' | 'general';
}

export const SearchModal: React.FC<SearchModalProps> = ({
  isOpen,
  onClose,
  allNodes,
  onSelectDestination,
  onSelectStart,
  targetMode,
}) => {
  const [query, setQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const nodesList = useMemo(() => Object.values(allNodes), [allNodes]);

  const filteredNodes = useMemo(() => {
    return nodesList.filter((node) => {
      // Category filter
      if (selectedCategory !== 'all' && node.category !== selectedCategory) {
        return false;
      }

      if (!query.trim()) return true;

      const q = query.toLowerCase();
      const matchName = node.name.toLowerCase().includes(q);
      const matchBuilding = node.buildingName.toLowerCase().includes(q);
      const matchKeywords = node.keywords.some((kw) => kw.toLowerCase().includes(q));
      const matchFaculty = node.facultyIncharge?.toLowerCase().includes(q) || false;

      return matchName || matchBuilding || matchKeywords || matchFaculty;
    });
  }, [nodesList, query, selectedCategory]);

  if (!isOpen) return null;

  const categories: { id: string; label: string; icon: React.ReactNode }[] = [
    { id: 'all', label: 'All Places', icon: <MapPin className="w-3.5 h-3.5" /> },
    { id: 'academic', label: 'Academics & Labs', icon: <GraduationCap className="w-3.5 h-3.5" /> },
    { id: 'admin', label: 'Administrative', icon: <Briefcase className="w-3.5 h-3.5" /> },
    { id: 'canteen', label: 'Canteen & Food', icon: <Utensils className="w-3.5 h-3.5" /> },
    { id: 'hostel', label: 'Hostels', icon: <Home className="w-3.5 h-3.5" /> },
    { id: 'amenity', label: 'Amenities', icon: <HeartPulse className="w-3.5 h-3.5" /> },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-start justify-center pt-12 sm:pt-20 px-3 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-xl bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[82vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Search Input Bar */}
        <div className="p-3.5 sm:p-4 border-b border-slate-200 flex items-center gap-3 bg-slate-50">
          <Search className="w-5 h-5 text-blue-600 shrink-0" />
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={
              targetMode === 'start'
                ? 'Search starting location (e.g., Main Gate, Admin)...'
                : targetMode === 'dest'
                ? 'Search destination (e.g., AI Lab, Principal Office, Canteen)...'
                : 'Search any lab, office, department, or amenity...'
            }
            autoFocus
            className="flex-1 bg-transparent border-none text-slate-900 text-sm sm:text-base font-medium placeholder:text-slate-400 focus:outline-hidden"
          />
          {query && (
            <button
              onClick={() => setQuery('')}
              className="p-1 rounded-full hover:bg-slate-200 text-slate-400"
            >
              <X className="w-4 h-4" />
            </button>
          )}
          <button
            onClick={onClose}
            className="text-xs font-semibold px-2.5 py-1.5 rounded-lg bg-slate-200/80 hover:bg-slate-300 text-slate-700 transition-colors"
          >
            Esc
          </button>
        </div>

        {/* Category Pills */}
        <div className="p-2.5 border-b border-slate-100 flex items-center gap-1.5 overflow-x-auto no-scrollbar">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold whitespace-nowrap transition-colors ${
                selectedCategory === cat.id
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {cat.icon}
              <span>{cat.label}</span>
            </button>
          ))}
        </div>

        {/* Results List */}
        <div className="flex-1 overflow-y-auto divide-y divide-slate-100 p-1">
          {filteredNodes.length > 0 ? (
            filteredNodes.map((node) => (
              <div
                key={node.id}
                className="p-3 hover:bg-blue-50/60 rounded-xl transition-colors flex items-center justify-between gap-3 group"
              >
                <div className="flex items-start gap-2.5 truncate">
                  <div className="w-8 h-8 rounded-lg bg-slate-100 text-slate-600 flex items-center justify-center shrink-0 mt-0.5 group-hover:bg-blue-100 group-hover:text-blue-600 transition-colors">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div className="truncate">
                    <div className="font-semibold text-slate-900 text-xs sm:text-sm truncate">
                      {node.name}
                    </div>
                    <div className="text-[11px] text-slate-500 truncate flex items-center gap-1.5 mt-0.5">
                      <span className="font-medium text-slate-700">{node.buildingName}</span>
                      <span>•</span>
                      <span>Floor {node.floor === 0 ? 'Ground' : node.floor}</span>
                      {node.facultyIncharge && (
                        <>
                          <span>•</span>
                          <span className="text-blue-600 truncate">{node.facultyIncharge}</span>
                        </>
                      )}
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 shrink-0">
                  {targetMode !== 'start' && (
                    <button
                      onClick={() => {
                        onSelectDestination(node.id);
                        onClose();
                      }}
                      className="flex items-center gap-1 px-3 py-1.5 rounded-lg bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold shadow-xs transition-all active:scale-95"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      <span>Go</span>
                    </button>
                  )}
                  {targetMode !== 'dest' && (
                    <button
                      onClick={() => {
                        onSelectStart(node.id);
                        onClose();
                      }}
                      className="px-2.5 py-1.5 rounded-lg bg-slate-100 hover:bg-slate-200 text-slate-700 text-xs font-semibold transition-colors"
                    >
                      Start
                    </button>
                  )}
                </div>
              </div>
            ))
          ) : (
            <div className="py-12 text-center text-slate-400">
              <Search className="w-8 h-8 mx-auto mb-2 opacity-40" />
              <p className="text-sm font-medium">No campus locations matching "{query}"</p>
              <p className="text-xs text-slate-500 mt-1">Try searching by department name, lab code, or building.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
