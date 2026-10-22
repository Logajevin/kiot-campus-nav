import React, { useState, useMemo, useEffect } from 'react';
import { 
  CAMPUS_BUILDINGS, 
  CAMPUS_NODES, 
  CAMPUS_EDGES 
} from './data/campusData';
import type { CampusBuilding } from './types/navigation';
import { calculateShortestRoute } from './utils/pathfinding';
import { Header } from './components/Header';
import { CampusMap } from './components/CampusMap';
import { FloorPlanView } from './components/FloorPlanView';
import { DirectionsDrawer } from './components/DirectionsDrawer';
import { SearchModal } from './components/SearchModal';
import { QRScannerModal } from './components/QRScannerModal';
import { EmergencyModal } from './components/EmergencyModal';
import { BuildingDetailModal } from './components/BuildingDetailModal';

export const App: React.FC = () => {
  // Navigation State
  const [startNodeId, setStartNodeId] = useState<string>('main_gate');
  const [destNodeId, setDestNodeId] = useState<string>('aids_lab');
  const [accessibleOnly, setAccessibleOnly] = useState<boolean>(false);
  const [currentStepIndex, setCurrentStepIndex] = useState<number>(0);

  // View & Modal State
  const [activeBuildingId, setActiveBuildingId] = useState<string | null>(null);
  const [modalBuilding, setModalBuilding] = useState<CampusBuilding | null>(null);
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [searchTargetMode, setSearchTargetMode] = useState<'start' | 'dest' | 'general'>('general');
  const [isQROpen, setIsQROpen] = useState<boolean>(false);
  const [isEmergencyOpen, setIsEmergencyOpen] = useState<boolean>(false);

  // Compute Route
  const activeRoute = useMemo(() => {
    if (!startNodeId || !destNodeId) return null;
    return calculateShortestRoute(
      CAMPUS_NODES, 
      CAMPUS_EDGES, 
      startNodeId, 
      destNodeId, 
      accessibleOnly
    );
  }, [startNodeId, destNodeId, accessibleOnly]);

  // Reset step index when route changes
  useEffect(() => {
    setCurrentStepIndex(0);
  }, [startNodeId, destNodeId, accessibleOnly]);

  // Keyboard shortcut listener ('/' for search, 'Esc' to close)
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '/' && !isSearchOpen && !isQROpen && !isEmergencyOpen) {
        e.preventDefault();
        setSearchTargetMode('general');
        setIsSearchOpen(true);
      } else if (e.key === 'Escape') {
        setIsSearchOpen(false);
        setIsQROpen(false);
        setIsEmergencyOpen(false);
        setModalBuilding(null);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isSearchOpen, isQROpen, isEmergencyOpen]);

  // Handler for Building selection
  const handleSelectBuilding = (building: CampusBuilding) => {
    setModalBuilding(building);
  };

  const handleOpenIndoorView = (buildingId: string) => {
    setActiveBuildingId(buildingId);
    setModalBuilding(null);
  };

  const handleResetToCampus = () => {
    setActiveBuildingId(null);
  };

  const handleSwapPoints = () => {
    const temp = startNodeId;
    setStartNodeId(destNodeId);
    setDestNodeId(temp);
  };

  const handleClearRoute = () => {
    setDestNodeId('');
  };

  const handleQRIdentified = (nodeId: string) => {
    setStartNodeId(nodeId);
  };

  const handleNavigateToBuilding = (buildingId: string) => {
    // Find building entrance node
    const entranceNode = Object.values(CAMPUS_NODES).find(
      (n) => n.buildingId === buildingId && n.type === 'entrance'
    );
    if (entranceNode) {
      setDestNodeId(entranceNode.id);
    }
  };

  const activeBuilding = activeBuildingId
    ? CAMPUS_BUILDINGS.find((b) => b.id === activeBuildingId)
    : null;

  return (
    <div className="relative w-screen h-screen overflow-hidden bg-slate-100 flex flex-col font-sans">
      {/* Top Header */}
      <Header
        onOpenSearch={() => {
          setSearchTargetMode('general');
          setIsSearchOpen(true);
        }}
        onOpenQR={() => setIsQROpen(true)}
        onOpenEmergency={() => setIsEmergencyOpen(true)}
        accessibleOnly={accessibleOnly}
        onToggleAccessible={() => setAccessibleOnly(!accessibleOnly)}
        activeBuildingName={activeBuilding?.name}
        onResetToCampus={handleResetToCampus}
      />

      {/* Main Viewport: Indoor Floorplan OR Campus Map */}
      <main className="relative flex-1 w-full h-full pt-[60px]">
        {activeBuilding ? (
          <FloorPlanView
            building={activeBuilding}
            allNodes={CAMPUS_NODES}
            activeRoute={activeRoute}
            onBackToCampus={handleResetToCampus}
            onSelectNodeAsStart={(nodeId) => setStartNodeId(nodeId)}
            onSelectNodeAsDest={(nodeId) => setDestNodeId(nodeId)}
          />
        ) : (
          <CampusMap
            buildings={CAMPUS_BUILDINGS}
            allNodes={CAMPUS_NODES}
            activeRoute={activeRoute}
            startNodeId={startNodeId}
            destNodeId={destNodeId}
            currentStepIndex={currentStepIndex}
            onSelectBuilding={handleSelectBuilding}
            onOpenIndoorView={handleOpenIndoorView}
          />
        )}
      </main>

      {/* Active Navigation Floating Drawer */}
      {activeRoute && destNodeId && !activeBuildingId && (
        <DirectionsDrawer
          activeRoute={activeRoute}
          allNodes={CAMPUS_NODES}
          startNodeId={startNodeId}
          destNodeId={destNodeId}
          currentStepIndex={currentStepIndex}
          accessibleOnly={accessibleOnly}
          onSwapPoints={handleSwapPoints}
          onClearRoute={handleClearRoute}
          onStepChange={(idx) => setCurrentStepIndex(idx)}
          onOpenSearchForStart={() => {
            setSearchTargetMode('start');
            setIsSearchOpen(true);
          }}
          onOpenSearchForDest={() => {
            setSearchTargetMode('dest');
            setIsSearchOpen(true);
          }}
        />
      )}

      {/* Search Modal */}
      <SearchModal
        isOpen={isSearchOpen}
        onClose={() => setIsSearchOpen(false)}
        allNodes={CAMPUS_NODES}
        onSelectStart={(nodeId) => setStartNodeId(nodeId)}
        onSelectDestination={(nodeId) => setDestNodeId(nodeId)}
        targetMode={searchTargetMode}
      />

      {/* QR Code Scanner / Simulator Modal */}
      <QRScannerModal
        isOpen={isQROpen}
        onClose={() => setIsQROpen(false)}
        allNodes={CAMPUS_NODES}
        onNodeIdentified={handleQRIdentified}
      />

      {/* Emergency Assistance Modal */}
      <EmergencyModal
        isOpen={isEmergencyOpen}
        onClose={() => setIsEmergencyOpen(false)}
      />

      {/* Building Details Deep Dive Modal */}
      <BuildingDetailModal
        building={modalBuilding}
        onClose={() => setModalBuilding(null)}
        onOpenIndoorView={handleOpenIndoorView}
        onNavigateToBuilding={handleNavigateToBuilding}
      />
    </div>
  );
};

export default App;
