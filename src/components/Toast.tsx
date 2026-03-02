import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
}

const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose }) => {
  useEffect(() => {
    if (isOpen) {
      const timer = setTimeout(() => {
        onClose();
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, y: -100, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -100, x: '-50%', scale: 0.9 }}
          className="fixed top-12 left-1/2 z-[100] flex items-center gap-4 bg-white text-slate-900 px-8 py-5 rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 min-w-[400px] max-w-[90vw]"
        >
          <div className="w-10 h-10 bg-emerald-500/10 rounded-full flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-6 h-6 text-emerald-500" />
          </div>
          <div className="flex-1">
            <p className="text-sm font-black tracking-tight">{message}</p>
          </div>
          <button 
            onClick={onClose}
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
