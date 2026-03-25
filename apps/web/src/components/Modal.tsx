import React, { useEffect, useRef, useId } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { X } from 'lucide-react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  size?: 'md' | 'full';
}

const FOCUSABLE_SELECTORS =
  'a[href], button:not([disabled]), input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])';

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, title, children, size = 'md' }) => {
  const isFull = size === 'full';
  const modalRef = useRef<HTMLDivElement>(null);
  const titleId = useId();

  // Focus trap, Escape key, body scroll lock, focus restoration
  useEffect(() => {
    if (!isOpen) return;

    const previouslyFocused = document.activeElement as HTMLElement;

    // Lock body scroll
    document.body.style.overflow = 'hidden';

    // Move focus into modal after animation frame
    requestAnimationFrame(() => {
      const el = modalRef.current as HTMLElement | null;
      const firstFocusable = el?.querySelector<HTMLElement>(FOCUSABLE_SELECTORS);
      const target = firstFocusable ?? el;
      target?.focus();
    });

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onClose();
        return;
      }

      if (e.key === 'Tab') {
        const el = modalRef.current as HTMLElement | null;
        const focusable = Array.from(
          el?.querySelectorAll<HTMLElement>(FOCUSABLE_SELECTORS) ?? [],
        );
        if (focusable.length === 0) return;

        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first || document.activeElement === (modalRef.current as HTMLElement | null)) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };

    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('keydown', handleKeyDown);
      document.body.style.overflow = '';
      // Restore focus to the element that triggered the modal
      previouslyFocused?.focus();
    };
  }, [isOpen, onClose]);

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop — decorative, click to close */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
            className="fixed inset-0 z-[60] bg-slate-900/40 backdrop-blur-sm"
          />

          {/* Modal positioner — pointer-events-none so backdrop click works */}
          <div
            className={`fixed inset-0 z-[70] flex items-center justify-center pointer-events-none ${isFull ? 'p-0' : 'p-4'}`}
          >
            <motion.div
              ref={modalRef}
              role="dialog"
              aria-modal="true"
              aria-labelledby={titleId}
              tabIndex={-1}
              initial={isFull ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
              animate={isFull ? { opacity: 1, y: 0 } : { opacity: 1, scale: 1, y: 0 }}
              exit={isFull ? { opacity: 0, y: '100%' } : { opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 200 }}
              className={`
                bg-white/90 backdrop-blur-2xl shadow-2xl border border-white/20 pointer-events-auto relative overflow-hidden flex flex-col
                ${isFull ? 'w-full h-full rounded-none' : 'w-full max-w-md rounded-[32px] p-8'}
              `}
            >
              {/* Header */}
              <div className={`${isFull ? 'p-8 border-b border-slate-100' : 'mb-6'}`}>
                <div className={`${isFull ? 'max-w-7xl mx-auto' : ''} flex items-center justify-between`}>
                  <h2
                    id={titleId}
                    className={`${isFull ? 'text-3xl font-black' : 'text-xl font-bold'} text-slate-900`}
                  >
                    {title}
                  </h2>
                  <button
                    onClick={onClose}
                    aria-label="Fechar"
                    className="p-3 rounded-full hover:bg-slate-100 transition-colors text-slate-400 hover:text-slate-900"
                  >
                    <X className={isFull ? 'w-8 h-8' : 'w-5 h-5'} aria-hidden="true" />
                  </button>
                </div>
              </div>

              {/* Body */}
              <div className={`${isFull ? 'flex-1 overflow-y-auto p-8' : ''}`}>
                {children}
              </div>

              {/* Decorative background glows */}
              <div aria-hidden="true" className="absolute -top-24 -right-24 w-48 h-48 bg-primary/5 rounded-full blur-3xl pointer-events-none" />
              <div aria-hidden="true" className="absolute -bottom-24 -left-24 w-48 h-48 bg-secondary/5 rounded-full blur-3xl pointer-events-none" />
            </motion.div>
          </div>
        </>
      )}
    </AnimatePresence>
  );
};

export default Modal;
