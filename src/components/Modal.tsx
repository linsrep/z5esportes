import React from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'full';
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const isFull = size === 'full';

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />
          
          {/* Modal Content */}
          <div className={`fixed inset-0 z-[70] flex items-center justify-center pointer-events-none ${isFull ? 'p-0' : 'p-4'}`}>
            <motion.div
              initial={isFull ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={isFull ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isFull ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`
                bg-white/90 backdrop-blur-2xl shadow-2xl border border-white/20 pointer-events-auto relative overflow-hidden flex flex-col
                ${isFull ? 'w-full h-full rounded-0' : 'w-full max-w-md rounded-[32px] p-8'}
              `}
            >
              {/* Header */}
              <div className={`${isFull ? 'p-8 border-b border-slate-100' : 'mb-6'}`}>
                <div className={`${isFull ? 'max-w-7xl mx-auto' : ''} flex items-center justify-between`}>
                  <h3 className={`${isFull ? 'text-3xl font-black' : 'text-xl font-bold'} text-slate-900`}>{title}</h3>
                  <button 
                    onClick={onClose}
                    className="p-3 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900"
                  >
                    <X className={isFull ? 'w-8 h-8' : 'w-5 h-5'} />
                  </button>
                </div>
              </div>
              
              {/* Body */}
              <div className={`${isFull ? 'flex-1 overflow-y-auto p-8' : ''}`}>
                {children}
              </div>
              
              {/* Subtle background glow inside modal */}
              <div className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none"></div>
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
