import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ShieldAlert, ShieldCheck, X, AlertTriangle } from 'lucide-react';

interface AgeGateModalProps {
  isOpen: boolean;
  onConfirm: () => void;
  onDeny: () => void;
}

export function AgeGateModal({ isOpen, onConfirm, onDeny }: AgeGateModalProps) {
  const [shaking, setShaking] = useState(false);

  const handleDeny = () => {
    setShaking(true);
    setTimeout(() => setShaking(false), 600);
    setTimeout(() => onDeny(), 400);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/60 backdrop-blur-md z-50"
          />

          {/* Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.85, y: 40 }}
            animate={{
              opacity: 1,
              scale: 1,
              y: 0,
              x: shaking ? [0, -14, 14, -10, 10, -6, 6, 0] : 0,
            }}
            exit={{ opacity: 0, scale: 0.85, y: 40 }}
            transition={{ type: 'spring', damping: 22, stiffness: 280 }}
            className="fixed inset-x-4 top-1/2 -translate-y-1/2 md:inset-auto md:left-1/2 md:-translate-x-1/2 md:w-full md:max-w-md z-50"
          >
            <div className="bg-white dark:bg-gray-900 rounded-3xl shadow-2xl overflow-hidden border-2 border-red-200 dark:border-red-900">
              {/* Top gradient stripe */}
              <div className="h-1.5 bg-gradient-to-r from-red-500 via-orange-500 to-rose-500" />

              <div className="p-7 text-center">
                {/* Icon */}
                <motion.div
                  initial={{ scale: 0.5, rotate: -10 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ type: 'spring', damping: 14, stiffness: 200, delay: 0.1 }}
                  className="w-24 h-24 mx-auto mb-5 bg-gradient-to-br from-red-100 to-orange-100 dark:from-red-950 dark:to-orange-950 rounded-full flex items-center justify-center border-4 border-red-200 dark:border-red-800"
                >
                  <span className="text-5xl">🔞</span>
                </motion.div>

                <h2 className="text-gray-900 dark:text-gray-50 mb-2" style={{ fontWeight: 700, fontSize: '1.5rem' }}>
                  Conteúdo para Adultos
                </h2>
                <p className="text-gray-500 dark:text-gray-400 text-sm mb-1">
                  Esta secção contém piadas sobre
                </p>
                <div className="flex flex-wrap justify-center gap-2 mb-5 mt-3">
                  {['Sexualidade', 'Religião', 'Humor Explícito'].map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 rounded-full bg-red-50 dark:bg-red-950/60 text-red-600 dark:text-red-400 border border-red-200 dark:border-red-800 text-xs"
                      style={{ fontWeight: 600 }}
                    >
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Warning box */}
                <div className="flex items-start gap-3 bg-amber-50 dark:bg-amber-950/40 border border-amber-200 dark:border-amber-800 rounded-2xl p-4 mb-6 text-left">
                  <AlertTriangle className="w-5 h-5 text-amber-500 flex-shrink-0 mt-0.5" />
                  <p className="text-amber-700 dark:text-amber-400 text-sm">
                    Este conteúdo é destinado a maiores de <strong>18 anos</strong>. Ao continuar, confirmas que tens idade suficiente e consentes em visualizar este tipo de humor.
                  </p>
                </div>

                <p className="text-gray-700 dark:text-gray-200 mb-6" style={{ fontWeight: 600, fontSize: '1.05rem' }}>
                  Tens 18 ou mais anos?
                </p>

                {/* Buttons */}
                <div className="flex flex-col gap-3">
                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    whileHover={{ scale: 1.02 }}
                    onClick={onConfirm}
                    className="w-full py-4 px-6 rounded-2xl bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg shadow-orange-200 dark:shadow-orange-950 flex items-center justify-center gap-3 transition-all"
                    style={{ fontWeight: 700 }}
                  >
                    <ShieldCheck className="w-5 h-5" />
                    Sim, tenho 18+ anos — Entrar
                  </motion.button>

                  <motion.button
                    whileTap={{ scale: 0.96 }}
                    onClick={handleDeny}
                    className="w-full py-3 px-6 rounded-2xl border-2 border-gray-200 dark:border-gray-700 text-gray-600 dark:text-gray-400 hover:bg-gray-50 dark:hover:bg-gray-800 transition-all flex items-center justify-center gap-2"
                    style={{ fontWeight: 500 }}
                  >
                    <X className="w-4 h-4" />
                    Não, sair
                  </motion.button>
                </div>

                <p className="text-xs text-gray-400 dark:text-gray-600 mt-4">
                  A preferência é guardada localmente no teu dispositivo.
                </p>
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
