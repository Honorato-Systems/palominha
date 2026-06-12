import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Heart, Delete } from "lucide-react";

const SECRET = "0606"; // ← altere aqui a senha de 4 dígitos

function MiniHearts() {
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;
  const hearts = Array.from({ length: 18 });
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {hearts.map((_, i) => {
        const size = 6 + Math.random() * 16;
        const left = Math.random() * 100;
        const duration = 10 + Math.random() * 14;
        const delay = Math.random() * 10;
        const opacity = 0.18 + Math.random() * 0.45;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${left}%`, bottom: -30, opacity }}
            initial={{ y: 0 }}
            animate={{ y: -900, x: [0, 18, -12, 8, 0], rotate: [0, 15, -8, 12, 0] }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
          >
            <Heart size={size} className="text-passion heart-glow" fill="currentColor" strokeWidth={0} />
          </motion.div>
        );
      })}
    </div>
  );
}

export default function PasswordGate({ onUnlock }: { onUnlock: () => void }) {
  const [pin, setPin] = useState("");
  const [error, setError] = useState(false);
  const [success, setSuccess] = useState(false);
  const [shake, setShake] = useState(0);
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const submit = (value: string) => {
    if (value === SECRET) {
      setSuccess(true);
      setTimeout(onUnlock, 1200);
    } else {
      setError(true);
      setShake((s) => s + 1);
      setTimeout(() => {
        setPin("");
        setError(false);
      }, 900);
    }
  };

  const append = (d: string) => {
    if (success) return;
    setError(false);
    setPin((p) => {
      if (p.length >= 4) return p;
      const next = p + d;
      if (next.length === 4) setTimeout(() => submit(next), 150);
      return next;
    });
  };
  const backspace = () => {
    if (success) return;
    setError(false);
    setPin((p) => p.slice(0, -1));
  };

  const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const v = e.target.value.replace(/\D/g, "").slice(0, 4);
    setError(false);
    setPin(v);
    if (v.length === 4) setTimeout(() => submit(v), 150);
  };

  return (
    <AnimatePresence>
      <motion.div
        key="gate"
        initial={{ opacity: 1 }}
        animate={{ opacity: success ? 0 : 1, scale: success ? 1.05 : 1 }}
        transition={{ duration: 0.9, ease: "easeInOut" }}
        className="fixed inset-0 z-[100] flex items-center justify-center px-4 py-8"
        style={{
          background:
            "radial-gradient(ellipse at top, oklch(0.24 0.09 15) 0%, oklch(0.12 0.04 15) 60%, oklch(0.07 0.03 15) 100%)",
        }}
      >
        <MiniHearts />

        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: success ? 1.04 : 1 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="glass-strong relative w-full max-w-sm rounded-3xl p-7 sm:p-9 text-center"
          style={{ boxShadow: "var(--shadow-glow), var(--shadow-soft)" }}
        >
          {/* Hearts around title */}
          <motion.div
            className="pointer-events-none absolute -top-3 left-6"
            animate={{ y: [0, -8, 0], rotate: [0, 8, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
          >
            <Heart size={18} className="text-passion heart-glow" fill="currentColor" strokeWidth={0} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute -top-1 right-8"
            animate={{ y: [0, -6, 0], rotate: [0, -10, 0] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
          >
            <Heart size={14} className="text-blush heart-glow" fill="currentColor" strokeWidth={0} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute top-10 -left-2"
            animate={{ y: [0, -10, 0], rotate: [0, 12, 0] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1.2 }}
          >
            <Heart size={12} className="text-passion heart-glow" fill="currentColor" strokeWidth={0} />
          </motion.div>
          <motion.div
            className="pointer-events-none absolute top-6 -right-2"
            animate={{ y: [0, -8, 0], rotate: [0, -8, 0] }}
            transition={{ duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 0.3 }}
          >
            <Heart size={16} className="text-gold heart-glow" fill="currentColor" strokeWidth={0} />
          </motion.div>

          <h1
            className="text-gradient text-3xl sm:text-4xl font-semibold leading-tight"
            style={{ fontFamily: "var(--font-script)" }}
          >
            ❤️ Paloma &amp; Honorato ❤️
          </h1>
          <p
            className="mt-3 text-sm sm:text-base text-muted-foreground italic"
            style={{ fontFamily: "var(--font-display)" }}
          >
            Somente quem possui a chave do nosso coração pode entrar. ❤️
          </p>

          {/* PIN display */}
          <motion.div
            key={shake}
            animate={error ? { x: [0, -10, 10, -8, 8, -4, 4, 0] } : { x: 0 }}
            transition={{ duration: 0.5 }}
            className="mt-7 flex justify-center gap-3 sm:gap-4"
          >
            {[0, 1, 2, 3].map((i) => {
              const filled = i < pin.length;
              return (
                <motion.div
                  key={i}
                  animate={{
                    scale: filled ? 1 : 0.9,
                    backgroundColor: error
                      ? "oklch(0.55 0.22 18 / 0.35)"
                      : filled
                      ? "oklch(0.62 0.22 20 / 0.85)"
                      : "oklch(1 0 0 / 0.06)",
                  }}
                  transition={{ duration: 0.2 }}
                  className="h-12 w-12 sm:h-14 sm:w-14 rounded-2xl border flex items-center justify-center text-2xl"
                  style={{
                    borderColor: "oklch(1 0 0 / 0.18)",
                    boxShadow: filled ? "0 0 18px oklch(0.62 0.22 20 / 0.55)" : "none",
                  }}
                >
                  {filled && (
                    <motion.span
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-3 w-3 rounded-full bg-white"
                    />
                  )}
                </motion.div>
              );
            })}
          </motion.div>

          {/* Hidden input for hardware keyboard */}
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            pattern="[0-9]*"
            value={pin}
            onChange={handleInput}
            maxLength={4}
            aria-label="Senha de 4 dígitos"
            className="sr-only"
            autoComplete="off"
          />

          {/* Error message */}
          <div className="mt-4 h-5 text-sm">
            <AnimatePresence>
              {error && (
                <motion.p
                  initial={{ opacity: 0, y: -4 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0 }}
                  className="text-blush"
                >
                  Ops... essa não é a nossa senha secreta. ❤️
                </motion.p>
              )}
            </AnimatePresence>
          </div>

          {/* On-screen numpad */}
          <div className="mt-4 grid grid-cols-3 gap-2 sm:gap-3">
            {["1", "2", "3", "4", "5", "6", "7", "8", "9"].map((d) => (
              <motion.button
                key={d}
                whileTap={{ scale: 0.92 }}
                onClick={() => append(d)}
                className="glass h-12 sm:h-14 rounded-2xl text-lg font-medium text-foreground hover:bg-white/10 transition-colors"
                type="button"
              >
                {d}
              </motion.button>
            ))}
            <div />
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={() => append("0")}
              className="glass h-12 sm:h-14 rounded-2xl text-lg font-medium text-foreground hover:bg-white/10 transition-colors"
              type="button"
            >
              0
            </motion.button>
            <motion.button
              whileTap={{ scale: 0.92 }}
              onClick={backspace}
              className="glass h-12 sm:h-14 rounded-2xl flex items-center justify-center text-foreground hover:bg-white/10 transition-colors"
              type="button"
              aria-label="Apagar"
            >
              <Delete className="h-5 w-5" />
            </motion.button>
          </div>

          {/* Enter button */}
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            onClick={() => pin.length === 4 && submit(pin)}
            disabled={pin.length !== 4}
            className="mt-6 w-full rounded-2xl py-3 text-base font-medium text-primary-foreground disabled:opacity-40 disabled:cursor-not-allowed animate-pulse-glow"
            style={{ background: "var(--gradient-romance)" }}
            type="button"
          >
            ❤️ Entrar ❤️
          </motion.button>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
}
