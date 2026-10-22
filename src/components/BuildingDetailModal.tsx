import React from 'react';
import type { CampusBuilding } from '../types/navigation';
import { 
  X, 
  Eye, 
  Navigation, 
  Phone, 
  User, 
  Layers
} from 'lucide-react';

interface BuildingDetailModalProps {
  building: CampusBuilding | null;
  onClose: () => void;
  onOpenIndoorView: (buildingId: string) => void;
  onNavigateToBuilding: (buildingId: string) => void;
}

export const BuildingDetailModal: React.FC<BuildingDetailModalProps> = ({
  building,
  onClose,
  onOpenIndoorView,
  onNavigateToBuilding,
}) => {
  if (!building) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-lg bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col max-h-[85vh] animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header Banner */}
        <div className="p-4 sm:p-5 border-b border-slate-200 bg-gradient-to-r from-blue-600 to-indigo-700 text-white relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 p-1.5 rounded-full bg-white/20 hover:bg-white/30 text-white transition-colors"
          >
            <X className="w-4 h-4" />
          </button>
          
          <div className="flex items-center gap-2 mb-1">
            <span className="text-[11px] font-bold px-2 py-0.5 rounded-full bg-white/20 uppercase tracking-wider">
              {building.code}
            </span>
            <span className="text-xs text-blue-100 uppercase tracking-wide font-medium">
              {building.category}
            </span>
          </div>

          <h3 className="text-lg sm:text-xl font-bold tracking-tight">{building.name}</h3>
          {building.tamilName && (
            <p className="text-xs text-blue-200 font-medium mt-0.5">{building.tamilName}</p>
          )}
        </div>

        {/* Content Body */}
        <div className="p-4 sm:p-5 space-y-4 overflow-y-auto flex-1">
          {/* Description */}
          <p className="text-xs sm:text-sm text-slate-600 leading-relaxed">
            {building.description}
          </p>

          {/* Department tags */}
          {building.departments.length > 0 && (
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1.5">
                Departments & Units
              </span>
              <div className="flex flex-wrap gap-1.5">
                {building.departments.map((dept, idx) => (
                  <span
                    key={idx}
                    className="text-xs font-semibold px-2.5 py-1 rounded-lg bg-blue-50 text-blue-700 border border-blue-200/60"
                  >
                    {dept}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* Key personnel & phone */}
          <div className="p-3 rounded-xl bg-slate-50 border border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs">
            <div className="flex items-center gap-2 text-slate-700">
              <User className="w-4 h-4 text-blue-600 shrink-0" />
              <span className="font-semibold">{building.head}</span>
            </div>
            {building.contact && (
              <a
                href={`tel:${building.contact}`}
                className="flex items-center gap-1.5 font-semibold text-blue-600 hover:text-blue-700"
              >
                <Phone className="w-3.5 h-3.5" />
                <span>{building.contact}</span>
              </a>
            )}
          </div>

          {/* Floor Breakdown */}
          <div>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-2 flex items-center gap-1.5">
              <Layers className="w-3.5 h-3.5 text-blue-600" />
              <span>Floor Level Breakdown ({building.floorsCount} Floors)</span>
            </span>

            <div className="space-y-1.5">
              {building.floors.map((fl) => (
                <div
                  key={fl.floorNumber}
                  className="p-2.5 rounded-xl border border-slate-200 bg-white hover:bg-slate-50 transition-colors flex items-start gap-2.5"
                >
                  <span className="w-6 h-6 rounded-lg bg-slate-100 text-slate-800 font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                    {fl.floorNumber === 0 ? 'G' : fl.floorNumber}
                  </span>
                  <div>
                    <div className="font-bold text-xs text-slate-900">{fl.floorName}</div>
                    <div className="text-[11px] text-slate-500 leading-snug mt-0.5">{fl.description}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="p-3.5 sm:p-4 border-t border-slate-200 bg-slate-50 flex items-center gap-2">
          <button
            onClick={() => {
              onOpenIndoorView(building.id);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-900 text-white text-xs font-bold transition-all shadow-xs"
          >
            <Eye className="w-4 h-4 text-blue-400" />
            <span>View Floor Plan</span>
          </button>
          <button
            onClick={() => {
              onNavigateToBuilding(building.id);
              onClose();
            }}
            className="flex-1 flex items-center justify-center gap-1.5 py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold transition-all shadow-md shadow-blue-500/20 active:scale-95"
          >
            <Navigation className="w-4 h-4" />
            <span>Navigate Here</span>
          </button>
        </div>
      </div>
    </div>
  );
};
