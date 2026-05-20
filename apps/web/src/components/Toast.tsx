import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { AlertCircle, CheckCircle2, X } from 'lucide-react';

interface ToastProps {
  message: string;
  isOpen: boolean;
  onClose: () => void;
  variant?: 'success' | 'error';
}

const Toast: React.FC<ToastProps> = ({ message, isOpen, onClose, variant = 'success' }) => {
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
          role="alert"
          aria-live="assertive"
          aria-atomic="true"
          initial={{ opacity: 0, y: -100, x: '-50%', scale: 0.9 }}
          animate={{ opacity: 1, y: 0, x: '-50%', scale: 1 }}
          exit={{ opacity: 0, y: -100, x: '-50%', scale: 0.9 }}
          className="fixed top-5 sm:top-12 left-1/2 z-[100] flex items-center gap-3 sm:gap-4 bg-white text-slate-900 px-4 sm:px-8 py-4 sm:py-5 rounded-[20px] sm:rounded-[24px] shadow-[0_20px_50px_rgba(0,0,0,0.15)] border border-slate-100 w-[92vw] max-w-[480px] min-w-[280px]"
        >
          <div
            aria-hidden="true"
            className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full flex items-center justify-center shrink-0 ${
              variant === 'error' ? 'bg-red-500/10' : 'bg-emerald-500/10'
            }`}
          >
            {variant === 'error' ? (
              <AlertCircle className="w-6 h-6 text-red-500" />
            ) : (
              <CheckCircle2 className="w-6 h-6 text-emerald-500" />
            )}
          </div>
          <div className="flex-1">
            <p className="text-sm font-black tracking-tight leading-snug">{message}</p>
          </div>
          <button
            onClick={onClose}
            aria-label="Fechar notificação"
            className="p-2 hover:bg-slate-100 rounded-xl transition-colors"
          >
            <X className="w-5 h-5 text-slate-400" aria-hidden="true" />
          </button>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Toast;
