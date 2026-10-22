import React, { useState } from 'react';
import type { RouteResult, CampusNode } from '../types/navigation';
import { 
  Navigation, 
  Clock, 
  ArrowRight, 
  ArrowUpDown, 
  ChevronUp, 
  ChevronDown, 
  CheckCircle2, 
  X, 
  Accessibility, 
  Sparkles,
  Footprints,
  CornerUpRight
} from 'lucide-react';
import confetti from 'canvas-confetti';

interface DirectionsDrawerProps {
  activeRoute: RouteResult;
  allNodes: Record<string, CampusNode>;
  startNodeId: string;
  destNodeId: string;
  currentStepIndex: number;
  accessibleOnly: boolean;
  onSwapPoints: () => void;
  onClearRoute: () => void;
  onStepChange: (index: number) => void;
  onOpenSearchForStart: () => void;
  onOpenSearchForDest: () => void;
}

export const DirectionsDrawer: React.FC<DirectionsDrawerProps> = ({
  activeRoute,
  allNodes,
  startNodeId,
  destNodeId,
  currentStepIndex,
  accessibleOnly,
  onSwapPoints,
  onClearRoute,
  onStepChange,
  onOpenSearchForStart,
  onOpenSearchForDest,
}) => {
  const [isExpanded, setIsExpanded] = useState<boolean>(false);
  const startNode = allNodes[startNodeId];
  const destNode = allNodes[destNodeId];

  const handleNextStep = () => {
    if (currentStepIndex < activeRoute.steps.length - 1) {
      const nextIndex = currentStepIndex + 1;
      onStepChange(nextIndex);
      if (nextIndex === activeRoute.steps.length - 1) {
        // Destination reached!
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    }
  };

  const handlePrevStep = () => {
    if (currentStepIndex > 0) {
      onStepChange(currentStepIndex - 1);
    }
  };

  const currentStep = activeRoute.steps[currentStepIndex] || activeRoute.steps[0];
  const isFinished = currentStepIndex === activeRoute.steps.length - 1;

  return (
    <div className="absolute bottom-3 left-3 right-3 sm:left-6 sm:right-auto sm:w-[420px] z-20 bg-white/95 backdrop-blur-md rounded-2xl shadow-xl border border-slate-200/90 overflow-hidden transition-all duration-300">
      {/* Route Summary Header */}
      <div className="p-3.5 sm:p-4 bg-gradient-to-r from-blue-50 to-indigo-50/60 border-b border-slate-200/80">
        <div className="flex items-center justify-between gap-2 mb-3">
          <div className="flex items-center gap-2">
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-blue-600 text-white text-xs font-bold shadow-xs">
              <Footprints className="w-3.5 h-3.5" />
              <span>{activeRoute.totalDistanceMeters} m</span>
            </span>
            <span className="flex items-center gap-1 px-2.5 py-1 rounded-full bg-slate-200/80 text-slate-800 text-xs font-semibold">
              <Clock className="w-3.5 h-3.5 text-slate-600" />
              <span>~{activeRoute.estimatedMinutes} min walk</span>
            </span>
            {accessibleOnly && (
              <span className="flex items-center gap-1 px-2 py-1 rounded-full bg-emerald-100 text-emerald-800 text-[11px] font-bold">
                <Accessibility className="w-3 h-3" />
                <span>Step-Free</span>
              </span>
            )}
          </div>

          <div className="flex items-center gap-1">
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="p-1.5 rounded-lg text-slate-600 hover:text-slate-900 hover:bg-slate-200/70 transition-colors"
              title={isExpanded ? 'Collapse Steps' : 'Expand Steps'}
            >
              {isExpanded ? <ChevronDown className="w-4 h-4" /> : <ChevronUp className="w-4 h-4" />}
            </button>
            <button
              onClick={onClearRoute}
              className="p-1.5 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition-colors"
              title="Close Directions"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Start & Destination Pickers */}
        <div className="space-y-2 relative">
          {/* Start Point */}
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-emerald-500 ring-4 ring-emerald-100 shrink-0" />
            <button
              onClick={onOpenSearchForStart}
              className="flex-1 text-left px-2.5 py-1.5 rounded-lg bg-white/80 hover:bg-white text-xs font-medium text-slate-800 border border-slate-200/80 shadow-2xs truncate"
            >
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Start</span>
              <span className="truncate block font-semibold text-slate-900">
                {startNode?.name || 'Select start point'}
              </span>
            </button>
          </div>

          {/* Swap Button */}
          <button
            onClick={onSwapPoints}
            className="absolute right-2 top-1/2 -translate-y-1/2 p-1.5 rounded-full bg-white shadow-md border border-slate-200 text-slate-600 hover:text-blue-600 hover:scale-110 active:scale-95 transition-all z-10"
            title="Swap Start and Destination"
          >
            <ArrowUpDown className="w-3.5 h-3.5" />
          </button>

          {/* Destination Point */}
          <div className="flex items-center gap-2.5">
            <div className="w-3 h-3 rounded-full bg-rose-500 ring-4 ring-rose-100 shrink-0" />
            <button
              onClick={onOpenSearchForDest}
              className="flex-1 text-left px-2.5 py-1.5 rounded-lg bg-white/80 hover:bg-white text-xs font-medium text-slate-800 border border-slate-200/80 shadow-2xs truncate"
            >
              <span className="text-slate-400 text-[10px] uppercase font-bold block">Destination</span>
              <span className="truncate block font-semibold text-slate-900">
                {destNode?.name || 'Select destination'}
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Active Turn-by-Turn Card */}
      <div className="p-3.5 bg-white">
        <div className="flex items-start justify-between gap-3 mb-2.5">
          <div className="flex items-start gap-2.5">
            <div className={`p-2 rounded-xl shrink-0 ${
              isFinished 
                ? 'bg-emerald-100 text-emerald-700' 
                : currentStep.type === 'elevator' 
                ? 'bg-blue-100 text-blue-700'
                : currentStep.type === 'stairs'
                ? 'bg-amber-100 text-amber-700'
                : 'bg-indigo-100 text-indigo-700'
            }`}>
              {isFinished ? (
                <CheckCircle2 className="w-5 h-5" />
              ) : currentStep.type === 'elevator' ? (
                <Accessibility className="w-5 h-5" />
              ) : currentStep.type === 'stairs' ? (
                <CornerUpRight className="w-5 h-5" />
              ) : (
                <Navigation className="w-5 h-5" />
              )}
            </div>
            <div>
              <div className="text-[11px] font-semibold text-slate-400 uppercase tracking-wide">
                Step {currentStepIndex + 1} of {activeRoute.steps.length}
              </div>
              <p className="text-sm font-bold text-slate-900 leading-snug">
                {currentStep.instruction}
              </p>
              {currentStep.distanceMeters > 0 && (
                <span className="text-[11px] font-medium text-slate-500">
                  Walk ~{Math.round(currentStep.distanceMeters)}m
                </span>
              )}
            </div>
          </div>
        </div>

        {/* Step Navigation Controls */}
        <div className="flex items-center gap-2 pt-1">
          <button
            onClick={handlePrevStep}
            disabled={currentStepIndex === 0}
            className="px-3 py-1.5 rounded-xl border border-slate-200 text-xs font-semibold text-slate-600 disabled:opacity-40 disabled:cursor-not-allowed hover:bg-slate-50"
          >
            Prev Step
          </button>
          <button
            onClick={handleNextStep}
            disabled={isFinished}
            className={`flex-1 flex items-center justify-center gap-1.5 py-2 px-3 rounded-xl text-xs font-bold text-white transition-all shadow-md ${
              isFinished
                ? 'bg-emerald-600 shadow-emerald-500/20'
                : 'bg-blue-600 hover:bg-blue-500 shadow-blue-500/20 active:scale-95'
            }`}
          >
            {isFinished ? (
              <>
                <Sparkles className="w-4 h-4" />
                <span>Arrived at Destination!</span>
              </>
            ) : (
              <>
                <span>Next Instruction</span>
                <ArrowRight className="w-4 h-4" />
              </>
            )}
          </button>
        </div>
      </div>

      {/* Expandable All Steps List */}
      {isExpanded && (
        <div className="max-h-60 overflow-y-auto p-3.5 bg-slate-50 border-t border-slate-200 divide-y divide-slate-200/60 text-xs">
          {activeRoute.steps.map((st, idx) => (
            <div
              key={idx}
              onClick={() => onStepChange(idx)}
              className={`py-2 px-2 rounded-lg cursor-pointer flex items-center justify-between transition-colors ${
                currentStepIndex === idx
                  ? 'bg-blue-100/70 font-semibold text-blue-900'
                  : 'hover:bg-slate-100 text-slate-700'
              }`}
            >
              <div className="flex items-center gap-2 truncate pr-2">
                <span className="w-5 h-5 rounded-full bg-slate-200 text-slate-700 text-[10px] font-bold flex items-center justify-center shrink-0">
                  {idx + 1}
                </span>
                <span className="truncate">{st.instruction}</span>
              </div>
              {st.distanceMeters > 0 && (
                <span className="text-[10px] text-slate-400 font-mono shrink-0">
                  {Math.round(st.distanceMeters)}m
                </span>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
