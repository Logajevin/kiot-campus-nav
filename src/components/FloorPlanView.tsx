import React, { useState } from 'react';
import type { CampusBuilding, CampusNode, RouteResult } from '../types/navigation';
import { 
  ArrowLeft, 
  Layers, 
  MapPin, 
  Navigation, 
  Compass, 
  CornerUpRight,
  Accessibility
} from 'lucide-react';

interface FloorPlanViewProps {
  building: CampusBuilding;
  allNodes: Record<string, CampusNode>;
  activeRoute: RouteResult | null;
  onBackToCampus: () => void;
  onSelectNodeAsStart: (nodeId: string) => void;
  onSelectNodeAsDest: (nodeId: string) => void;
}

export const FloorPlanView: React.FC<FloorPlanViewProps> = ({
  building,
  allNodes,
  activeRoute,
  onBackToCampus,
  onSelectNodeAsStart,
  onSelectNodeAsDest,
}) => {
  const [activeFloor, setActiveFloor] = useState<number>(0);
  const [selectedRoom, setSelectedRoom] = useState<CampusNode | null>(null);

  // Filter nodes that belong to this building and selected floor
  const floorNodes = Object.values(allNodes).filter(
    (n) => n.buildingId === building.id && n.floor === activeFloor
  );

  // Active route points on this floor
  const routePointsOnFloor = activeRoute
    ? activeRoute.nodes.filter(
        (n) => n.buildingId === building.id && n.floor === activeFloor && n.indoorCoordinates
      )
    : [];

  return (
    <div className="relative w-full h-full flex flex-col bg-slate-900 text-white select-none">
      {/* Top Bar inside Indoor View */}
      <div className="z-20 px-4 py-3 bg-slate-800/90 backdrop-blur-md border-b border-slate-700/80 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <button
            onClick={onBackToCampus}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-slate-700 hover:bg-slate-600 text-slate-100 text-xs sm:text-sm font-medium transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Campus Map</span>
          </button>
          <div>
            <h2 className="font-bold text-sm sm:text-base text-white tracking-tight flex items-center gap-2">
              <span>{building.name}</span>
              <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                Floor {activeFloor}
              </span>
            </h2>
            <p className="text-[11px] text-slate-400 hidden sm:block">
              {building.floors[activeFloor]?.description || 'Departmental rooms, laboratories & corridors'}
            </p>
          </div>
        </div>

        {/* Floor Switcher Tabs */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/60 rounded-xl border border-slate-700/60">
          {building.floors.map((fl) => (
            <button
              key={fl.floorNumber}
              onClick={() => {
                setActiveFloor(fl.floorNumber);
                setSelectedRoom(null);
              }}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition-all ${
                activeFloor === fl.floorNumber
                  ? 'bg-blue-600 text-white shadow-sm shadow-blue-500/30'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800'
              }`}
            >
              {fl.floorNumber === 0 ? 'Ground' : `F${fl.floorNumber}`}
            </button>
          ))}
        </div>
      </div>

      {/* Main Floor Plan Interactive Canvas */}
      <div className="relative flex-1 w-full overflow-hidden flex items-center justify-center p-4">
        {/* Architectural Grid Background */}
        <div 
          className="absolute inset-0 opacity-15"
          style={{
            backgroundImage: 'radial-gradient(circle, #38bdf8 1px, transparent 1px)',
            backgroundSize: '24px 24px',
          }}
        />

        {/* Schematic Blueprint Layout */}
        <div className="relative w-full max-w-4xl aspect-16/10 bg-slate-850 rounded-2xl border-2 border-slate-700 shadow-2xl overflow-hidden p-6">
          {/* North Compass Indicator */}
          <div className="absolute top-4 right-4 flex items-center gap-1 text-[11px] font-mono text-slate-400 bg-slate-800/80 px-2 py-1 rounded-md border border-slate-700">
            <Compass className="w-3.5 h-3.5 text-blue-400 animate-spin-slow" />
            <span>NORTH</span>
          </div>

          {/* Central Corridor Representation */}
          <div className="absolute left-[15%] right-[15%] top-[45%] bottom-[45%] bg-slate-800/90 border border-dashed border-blue-500/40 rounded-lg flex items-center justify-center">
            <span className="text-[10px] font-mono tracking-widest text-slate-400 uppercase">
              Main Access Corridor • Floor {activeFloor}
            </span>
          </div>

          {/* Staircase & Elevator Markers on Left and Right ends */}
          <div className="absolute left-6 top-[40%] bottom-[40%] w-16 bg-indigo-950/70 border border-indigo-500/40 rounded-lg flex flex-col items-center justify-center p-1 text-center">
            <Accessibility className="w-4 h-4 text-emerald-400 mb-0.5" />
            <span className="text-[9px] font-bold text-slate-200">Elevator</span>
          </div>

          <div className="absolute right-6 top-[40%] bottom-[40%] w-16 bg-indigo-950/70 border border-indigo-500/40 rounded-lg flex flex-col items-center justify-center p-1 text-center">
            <CornerUpRight className="w-4 h-4 text-amber-400 mb-0.5" />
            <span className="text-[9px] font-bold text-slate-200">Stairs</span>
          </div>

          {/* Route path overlay if present */}
          {routePointsOnFloor.length > 1 && (
            <svg className="absolute inset-0 w-full h-full pointer-events-none z-10">
              <polyline
                points={routePointsOnFloor
                  .map((p) => `${p.indoorCoordinates?.x}%,${p.indoorCoordinates?.y}%`)
                  .join(' ')}
                fill="none"
                stroke="#38bdf8"
                strokeWidth="4"
                strokeDasharray="6,4"
                className="animate-pulse"
              />
            </svg>
          )}

          {/* Render Rooms / Nodes on this Floor */}
          {floorNodes.map((node) => {
            const coords = node.indoorCoordinates || { x: 50, y: 50 };
            const isSelected = selectedRoom?.id === node.id;
            const isOnRoute = activeRoute?.path.includes(node.id);

            return (
              <div
                key={node.id}
                onClick={() => setSelectedRoom(node)}
                style={{
                  left: `${coords.x}%`,
                  top: `${coords.y}%`,
                  transform: 'translate(-50%, -50%)',
                }}
                className={`absolute cursor-pointer transition-all duration-200 z-10 group ${
                  isSelected ? 'scale-110 z-20' : 'hover:scale-105'
                }`}
              >
                <div
                  className={`px-3 py-2 rounded-xl text-xs font-semibold flex items-center gap-1.5 border shadow-lg transition-all ${
                    isSelected
                      ? 'bg-blue-600 text-white border-blue-400 ring-4 ring-blue-500/30'
                      : isOnRoute
                      ? 'bg-sky-500 text-white border-sky-300 ring-2 ring-sky-400/40'
                      : node.type === 'lab'
                      ? 'bg-indigo-900/90 text-indigo-100 border-indigo-500/60 hover:bg-indigo-800'
                      : node.type === 'office'
                      ? 'bg-purple-900/90 text-purple-100 border-purple-500/60 hover:bg-purple-800'
                      : 'bg-slate-800/90 text-slate-200 border-slate-600 hover:bg-slate-700'
                  }`}
                >
                  <MapPin className="w-3.5 h-3.5 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-[160px]">{node.name}</span>
                </div>
              </div>
            );
          })}

          {floorNodes.length === 0 && (
            <div className="absolute inset-0 flex flex-col items-center justify-center text-slate-400">
              <Layers className="w-10 h-10 mb-2 opacity-50" />
              <p className="text-sm font-medium">Standard Lecture Halls 101 - 108</p>
              <p className="text-xs text-slate-500 mt-0.5">Equipped with smart boards and projectors</p>
            </div>
          )}
        </div>
      </div>

      {/* Selected Room Details Drawer at Bottom */}
      {selectedRoom && (
        <div className="z-20 p-4 bg-slate-800 border-t border-slate-700/80 flex flex-col sm:flex-row sm:items-center justify-between gap-3 animate-in slide-in-from-bottom duration-200">
          <div>
            <div className="flex items-center gap-2">
              <span className="font-bold text-white text-base">{selectedRoom.name}</span>
              <span className="text-[10px] uppercase font-bold px-2 py-0.5 rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                {selectedRoom.type}
              </span>
            </div>
            <p className="text-xs text-slate-300 mt-1 max-w-xl">
              {selectedRoom.description || 'Departmental facility at Knowledge Institute of Technology.'}
            </p>
            {selectedRoom.facultyIncharge && (
              <p className="text-xs text-blue-400 mt-0.5 font-medium">
                In-Charge: {selectedRoom.facultyIncharge}
              </p>
            )}
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                onSelectNodeAsStart(selectedRoom.id);
                onBackToCampus();
              }}
              className="px-3.5 py-2 rounded-xl bg-slate-700 hover:bg-slate-600 text-xs font-semibold text-white transition-colors"
            >
              Set as Start (A)
            </button>
            <button
              onClick={() => {
                onSelectNodeAsDest(selectedRoom.id);
                onBackToCampus();
              }}
              className="px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-500 text-xs font-semibold text-white shadow-md shadow-blue-500/20 transition-all flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Navigate Here (B)</span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};
