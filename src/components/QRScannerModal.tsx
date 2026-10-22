import React, { useState } from 'react';
import type { CampusNode } from '../types/navigation';
import { QrCode, X, Camera, CheckCircle2, MapPin, Sparkles } from 'lucide-react';

interface QRScannerModalProps {
  isOpen: boolean;
  onClose: () => void;
  allNodes: Record<string, CampusNode>;
  onNodeIdentified: (nodeId: string) => void;
}

export const QRScannerModal: React.FC<QRScannerModalProps> = ({
  isOpen,
  onClose,
  allNodes,
  onNodeIdentified,
}) => {
  const [scannedNode, setScannedNode] = useState<CampusNode | null>(null);

  if (!isOpen) return null;

  // Nodes with QR codes for simulated testing
  const sampleQRList = Object.values(allNodes).filter((n) => n.qrCodeId);

  const handleSimulateScan = (node: CampusNode) => {
    setScannedNode(node);
    setTimeout(() => {
      onNodeIdentified(node.id);
      onClose();
      setScannedNode(null);
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-indigo-50/70">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-indigo-600 text-white flex items-center justify-center shadow-xs">
              <QrCode className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">Scan Campus QR Code</h3>
              <p className="text-[11px] text-slate-500">Instantly sets "You Are Here"</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Scanner Viewfinder Area */}
        <div className="p-6 flex flex-col items-center justify-center text-center bg-slate-950 text-white relative">
          <div className="relative w-48 h-48 border-2 border-indigo-400 rounded-2xl overflow-hidden flex items-center justify-center bg-slate-900 shadow-inner">
            {/* Viewfinder corner guides */}
            <div className="absolute top-2 left-2 w-4 h-4 border-t-2 border-l-2 border-indigo-400" />
            <div className="absolute top-2 right-2 w-4 h-4 border-t-2 border-r-2 border-indigo-400" />
            <div className="absolute bottom-2 left-2 w-4 h-4 border-b-2 border-l-2 border-indigo-400" />
            <div className="absolute bottom-2 right-2 w-4 h-4 border-b-2 border-r-2 border-indigo-400" />

            {/* Scanning line animation */}
            <div className="absolute inset-x-0 h-0.5 bg-gradient-to-r from-transparent via-cyan-400 to-transparent animate-pulse shadow-cyan-400 shadow-sm" />

            <div className="flex flex-col items-center gap-2 text-slate-400">
              <Camera className="w-8 h-8 text-indigo-400 animate-pulse" />
              <span className="text-[11px] font-medium">Align physical QR sticker inside frame</span>
            </div>
          </div>

          {scannedNode && (
            <div className="absolute inset-0 bg-emerald-950/90 flex flex-col items-center justify-center text-emerald-300 p-4 animate-in fade-in">
              <CheckCircle2 className="w-12 h-12 text-emerald-400 mb-2 animate-bounce" />
              <div className="font-bold text-white text-base">Location Verified!</div>
              <p className="text-xs text-emerald-200 mt-1">{scannedNode.name}</p>
            </div>
          )}
        </div>

        {/* Quick Simulation Options */}
        <div className="p-4 bg-slate-50 border-t border-slate-200">
          <div className="flex items-center gap-1.5 text-xs font-semibold text-slate-700 mb-2">
            <Sparkles className="w-3.5 h-3.5 text-indigo-600" />
            <span>Interactive Demo - Click to Simulate Location:</span>
          </div>

          <div className="grid grid-cols-1 gap-1.5 max-h-48 overflow-y-auto pr-1">
            {sampleQRList.slice(0, 6).map((node) => (
              <button
                key={node.id}
                onClick={() => handleSimulateScan(node)}
                className="flex items-center justify-between p-2 rounded-xl bg-white hover:bg-indigo-50 border border-slate-200 hover:border-indigo-300 text-left transition-all text-xs group"
              >
                <div className="flex items-center gap-2 truncate">
                  <MapPin className="w-3.5 h-3.5 text-slate-400 group-hover:text-indigo-600 shrink-0" />
                  <span className="font-medium text-slate-800 truncate">{node.name}</span>
                </div>
                <span className="text-[10px] font-mono text-slate-400 bg-slate-100 group-hover:bg-indigo-100 group-hover:text-indigo-700 px-1.5 py-0.5 rounded-sm shrink-0">
                  {node.qrCodeId}
                </span>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
