import React, { useEffect } from 'react';
import { 
  MapContainer, 
  TileLayer, 
  Polygon, 
  Polyline, 
  Marker, 
  Popup, 
  Tooltip, 
  useMap 
} from 'react-leaflet';
import L from 'leaflet';
import type { CampusBuilding, CampusNode, RouteResult } from '../types/navigation';
import { CAMPUS_CENTER, DEFAULT_ZOOM } from '../data/campusData';
import { Locate, Eye } from 'lucide-react';

// Custom Map Marker Icons using Leaflet divIcon
const createCustomIcon = (type: 'start' | 'dest' | 'current', label?: string) => {
  let bgColor = 'bg-blue-600';
  let ringColor = 'ring-blue-300';
  let text = label || '';

  if (type === 'start') {
    bgColor = 'bg-emerald-600';
    ringColor = 'ring-emerald-300';
    text = text || 'A';
  } else if (type === 'dest') {
    bgColor = 'bg-rose-600';
    ringColor = 'ring-rose-300';
    text = text || 'B';
  } else if (type === 'current') {
    bgColor = 'bg-sky-500';
    ringColor = 'ring-sky-200';
  }

  return L.divIcon({
    className: 'custom-leaflet-marker',
    html: `
      <div class="relative flex items-center justify-center">
        <div class="w-8 h-8 rounded-full ${bgColor} text-white font-bold text-xs flex items-center justify-center shadow-lg ring-4 ${ringColor} transition-transform hover:scale-110">
          ${text}
        </div>
        ${type === 'current' ? '<span class="absolute w-10 h-10 rounded-full bg-sky-400 opacity-75 animate-ping"></span>' : ''}
      </div>
    `,
    iconSize: [32, 32],
    iconAnchor: [16, 16],
  });
};

// Component to handle map view movements
const MapController: React.FC<{
  targetCoords?: [number, number];
  zoom?: number;
  fitBoundsCoords?: [number, number][];
}> = ({ targetCoords, zoom, fitBoundsCoords }) => {
  const map = useMap();

  useEffect(() => {
    if (fitBoundsCoords && fitBoundsCoords.length > 1) {
      const bounds = L.latLngBounds(fitBoundsCoords);
      map.fitBounds(bounds, { padding: [50, 50], maxZoom: 19 });
    } else if (targetCoords) {
      map.flyTo(targetCoords, zoom || map.getZoom(), { duration: 1 });
    }
  }, [targetCoords, zoom, fitBoundsCoords, map]);

  return null;
};

interface CampusMapProps {
  buildings: CampusBuilding[];
  allNodes: Record<string, CampusNode>;
  activeRoute: RouteResult | null;
  startNodeId: string;
  destNodeId: string;
  currentStepIndex: number;
  onSelectBuilding: (building: CampusBuilding) => void;
  onOpenIndoorView: (buildingId: string) => void;
}

export const CampusMap: React.FC<CampusMapProps> = ({
  buildings,
  allNodes,
  activeRoute,
  startNodeId,
  destNodeId,
  currentStepIndex,
  onSelectBuilding,
  onOpenIndoorView,
}) => {
  const startNode = allNodes[startNodeId];
  const destNode = allNodes[destNodeId];

  // Coordinates for polyline
  const routePolylineCoords: [number, number][] = activeRoute
    ? activeRoute.nodes.map((n) => n.coordinates)
    : [];

  const currentNode = activeRoute && activeRoute.steps[currentStepIndex]
    ? allNodes[activeRoute.steps[currentStepIndex].nodeId]
    : null;

  const getBuildingColor = (category: string) => {
    switch (category) {
      case 'admin':
        return { color: '#6366f1', fill: '#818cf8', fillOpacity: 0.28 };
      case 'academic':
        return { color: '#2563eb', fill: '#3b82f6', fillOpacity: 0.28 };
      case 'canteen':
        return { color: '#d97706', fill: '#f59e0b', fillOpacity: 0.32 };
      case 'hostel':
        return { color: '#0f766e', fill: '#14b8a6', fillOpacity: 0.28 };
      case 'sports':
        return { color: '#15803d', fill: '#22c55e', fillOpacity: 0.25 };
      case 'transport':
        return { color: '#0369a1', fill: '#0ea5e9', fillOpacity: 0.28 };
      default:
        return { color: '#475569', fill: '#94a3b8', fillOpacity: 0.25 };
    }
  };

  return (
    <div className="relative w-full h-full">
      <MapContainer
        center={CAMPUS_CENTER}
        zoom={DEFAULT_ZOOM}
        minZoom={15}
        maxZoom={20}
        zoomControl={false}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Map Center controller */}
        <MapController
          fitBoundsCoords={routePolylineCoords.length > 1 ? routePolylineCoords : undefined}
          targetCoords={!activeRoute && destNode ? destNode.coordinates : undefined}
        />

        {/* Building Polygons */}
        {buildings.map((b) => {
          const style = getBuildingColor(b.category);
          return (
            <Polygon
              key={b.id}
              positions={b.polygon}
              pathOptions={{
                color: style.color,
                fillColor: style.fill,
                fillOpacity: style.fillOpacity,
                weight: 2,
              }}
              eventHandlers={{
                click: () => onSelectBuilding(b),
              }}
            >
              <Tooltip sticky direction="top" className="font-sans text-xs">
                <div className="font-semibold text-slate-900">{b.name}</div>
                <div className="text-[10px] text-slate-500 font-normal">
                  {b.code} • {b.floorsCount} Floors • Click for details
                </div>
              </Tooltip>

              <Popup>
                <div className="p-1 max-w-[240px]">
                  <div className="flex items-center justify-between gap-2 mb-1">
                    <span className="font-bold text-slate-900 text-sm">{b.name}</span>
                    <span className="text-[10px] uppercase font-bold px-1.5 py-0.5 rounded-sm bg-blue-100 text-blue-700">
                      {b.code}
                    </span>
                  </div>
                  {b.tamilName && (
                    <p className="text-[11px] text-slate-500 mb-1 font-medium">{b.tamilName}</p>
                  )}
                  <p className="text-xs text-slate-600 line-clamp-2 mb-2">{b.description}</p>
                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => onOpenIndoorView(b.id)}
                      className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 px-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                    >
                      <Eye className="w-3.5 h-3.5" />
                      <span>Floor Plan</span>
                    </button>
                    <button
                      onClick={() => onSelectBuilding(b)}
                      className="flex-1 flex items-center justify-center gap-1 text-[11px] font-semibold py-1.5 px-2 bg-slate-100 hover:bg-slate-200 text-slate-800 rounded-lg transition-colors"
                    >
                      <span>Info</span>
                    </button>
                  </div>
                </div>
              </Popup>
            </Polygon>
          );
        })}

        {/* Route Polyline */}
        {routePolylineCoords.length > 1 && (
          <>
            {/* Outline glow */}
            <Polyline
              positions={routePolylineCoords}
              pathOptions={{
                color: '#1d4ed8',
                weight: 7,
                opacity: 0.5,
              }}
            />
            {/* Main vibrant path */}
            <Polyline
              positions={routePolylineCoords}
              pathOptions={{
                color: '#38bdf8',
                weight: 4,
                opacity: 0.95,
                dashArray: '1, 8',
              }}
            />
          </>
        )}

        {/* Start Marker */}
        {startNode && (
          <Marker
            position={startNode.coordinates}
            icon={createCustomIcon('start', 'A')}
          >
            <Popup>
              <div className="text-xs font-medium">
                <div className="font-bold text-emerald-700">Starting Point (A)</div>
                <div>{startNode.name}</div>
                <div className="text-[10px] text-slate-500">{startNode.buildingName} • Floor {startNode.floor}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Destination Marker */}
        {destNode && (
          <Marker
            position={destNode.coordinates}
            icon={createCustomIcon('dest', 'B')}
          >
            <Popup>
              <div className="text-xs font-medium">
                <div className="font-bold text-rose-700">Destination (B)</div>
                <div>{destNode.name}</div>
                <div className="text-[10px] text-slate-500">{destNode.buildingName} • Floor {destNode.floor}</div>
              </div>
            </Popup>
          </Marker>
        )}

        {/* Simulated Current Step Marker */}
        {currentNode && activeRoute && (
          <Marker
            position={currentNode.coordinates}
            icon={createCustomIcon('current', '🚶')}
          >
            <Popup>
              <div className="text-xs font-semibold text-sky-800">
                Current Position: {currentNode.name}
              </div>
            </Popup>
          </Marker>
        )}
      </MapContainer>

      {/* Floating Recenter & Quick Filter Badges */}
      <div className="absolute right-4 top-20 z-10 flex flex-col gap-2">
        <button
          onClick={() => {
            const mapContainer = document.querySelector('.leaflet-container');
            if (mapContainer) {
              const resetEvent = new CustomEvent('recenter-campus');
              window.dispatchEvent(resetEvent);
            }
          }}
          className="p-2.5 rounded-xl bg-white/95 text-slate-700 hover:text-blue-600 shadow-md border border-slate-200 hover:bg-slate-50 transition-all active:scale-95"
          title="Recenter Map on KIOT"
        >
          <Locate className="w-5 h-5" />
        </button>
      </div>

      {/* Legend at bottom left */}
      <div className="hidden sm:flex absolute left-4 bottom-6 z-10 bg-white/90 backdrop-blur-md rounded-xl p-2.5 shadow-md border border-slate-200/80 text-[11px] gap-3 text-slate-700">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-blue-600 inline-block"></span>
          <span>Academics</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-indigo-600 inline-block"></span>
          <span>Admin</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-500 inline-block"></span>
          <span>Canteen</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-teal-600 inline-block"></span>
          <span>Hostel</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 inline-block"></span>
          <span>Sports</span>
        </div>
      </div>
    </div>
  );
};
