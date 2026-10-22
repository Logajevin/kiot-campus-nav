import React from 'react';
import { PhoneCall, X, ShieldAlert, HeartPulse, Bus, AlertTriangle, Building2 } from 'lucide-react';

interface EmergencyModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export const EmergencyModal: React.FC<EmergencyModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  const contacts = [
    {
      title: 'Main Campus Security Desk (24/7)',
      number: '+91 427 2433900',
      desc: 'Main Gate & Entry Barrier Security',
      icon: <ShieldAlert className="w-5 h-5 text-red-600" />,
      bg: 'bg-red-50 text-red-900 border-red-200',
    },
    {
      title: 'Emergency Medical & First Aid Clinic',
      number: '+91 427 2433909',
      desc: 'Doctor on Campus & Ambulance Dispatch',
      icon: <HeartPulse className="w-5 h-5 text-rose-600" />,
      bg: 'bg-rose-50 text-rose-900 border-rose-200',
    },
    {
      title: 'KIOT Transport Office & Bus Bay',
      number: '+91 94427 00000',
      desc: 'Emergency bus breakdown & transit queries',
      icon: <Bus className="w-5 h-5 text-amber-600" />,
      bg: 'bg-amber-50 text-amber-900 border-amber-200',
    },
    {
      title: "Women's Grievance & Student Welfare Cell",
      number: '+91 427 2433915',
      desc: 'Confidential student support & security',
      icon: <AlertTriangle className="w-5 h-5 text-purple-600" />,
      bg: 'bg-purple-50 text-purple-900 border-purple-200',
    },
    {
      title: "Principal Secretariat & Admin Office",
      number: '+91 427 2433901',
      desc: 'Administrative inquiries & official helpdesk',
      icon: <Building2 className="w-5 h-5 text-blue-600" />,
      bg: 'bg-blue-50 text-blue-900 border-blue-200',
    },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-xs animate-in fade-in duration-150">
      <div 
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="p-4 border-b border-slate-200 flex items-center justify-between bg-red-50/80">
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-red-600 text-white flex items-center justify-center shadow-xs">
              <PhoneCall className="w-4 h-4" />
            </div>
            <div>
              <h3 className="font-bold text-slate-900 text-sm sm:text-base">KIOT Emergency Contacts</h3>
              <p className="text-[11px] text-slate-500">Kakapalayam Campus Assistance</p>
            </div>
          </div>
          <button
            onClick={onClose}
            className="p-1 rounded-lg text-slate-400 hover:text-slate-600 hover:bg-slate-200/50"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="p-4 space-y-2.5 max-h-[70vh] overflow-y-auto">
          {contacts.map((c, i) => (
            <div
              key={i}
              className={`p-3 rounded-xl border flex items-center justify-between gap-3 ${c.bg}`}
            >
              <div className="flex items-start gap-2.5">
                <div className="p-1.5 rounded-lg bg-white/80 shrink-0 mt-0.5">
                  {c.icon}
                </div>
                <div>
                  <div className="font-bold text-xs sm:text-sm text-slate-900">{c.title}</div>
                  <div className="text-[11px] text-slate-600">{c.desc}</div>
                </div>
              </div>
              <a
                href={`tel:${c.number}`}
                className="px-3 py-1.5 rounded-lg bg-white shadow-xs font-bold text-xs text-slate-900 hover:text-blue-600 border border-slate-200 hover:border-blue-300 shrink-0 transition-colors"
              >
                Call
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
