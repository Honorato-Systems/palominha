import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence, useScroll, useTransform } from "framer-motion";
import { Heart, Play, Pause, Volume2, ChevronDown, Sparkles, X, ChevronLeft, ChevronRight } from "lucide-react";

// ============ FLOATING HEARTS BACKGROUND ============
function FloatingHearts() {
  const hearts = Array.from({ length: 28 });
  return (
    <div className="pointer-events-none fixed inset-0 z-0 overflow-hidden">
      {hearts.map((_, i) => {
        const size = 8 + Math.random() * 24;
        const left = Math.random() * 100;
        const duration = 14 + Math.random() * 18;
        const delay = Math.random() * 12;
        const opacity = 0.15 + Math.random() * 0.5;
        return (
          <motion.div
            key={i}
            className="absolute"
            style={{ left: `${left}%`, bottom: -40, opacity }}
            initial={{ y: 0 }}
            animate={{ y: -1400, x: [0, 30, -20, 10, 0], rotate: [0, 20, -10, 15, 0] }}
            transition={{ duration, repeat: Infinity, delay, ease: "linear" }}
          >
            <Heart
              size={size}
              className="text-passion heart-glow"
              fill="currentColor"
              strokeWidth={0}
            />
          </motion.div>
        );
      })}
    </div>
  );
}

// ============ TAP PARTICLES ============
function TapParticles() {
  const [bursts, setBursts] = useState<{ id: number; x: number; y: number }[]>([]);
  useEffect(() => {
    const handler = (e: PointerEvent) => {
      const id = Date.now() + Math.random();
      setBursts((b) => [...b, { id, x: e.clientX, y: e.clientY }]);
      setTimeout(() => setBursts((b) => b.filter((p) => p.id !== id)), 1200);
    };
    window.addEventListener("pointerdown", handler);
    return () => window.removeEventListener("pointerdown", handler);
  }, []);
  return (
    <div className="pointer-events-none fixed inset-0 z-50">
      <AnimatePresence>
        {bursts.map((b) => (
          <div key={b.id} className="absolute" style={{ left: b.x, top: b.y }}>
            {Array.from({ length: 8 }).map((_, i) => {
              const angle = (i / 8) * Math.PI * 2;
              const dist = 40 + Math.random() * 30;
              return (
                <motion.div
                  key={i}
                  className="absolute"
                  initial={{ x: 0, y: 0, opacity: 1, scale: 0.6 }}
                  animate={{
                    x: Math.cos(angle) * dist,
                    y: Math.sin(angle) * dist,
                    opacity: 0,
                    scale: 1.2,
                  }}
                  transition={{ duration: 0.9, ease: "easeOut" }}
                >
                  <Heart size={10} className="text-blush" fill="currentColor" strokeWidth={0} />
                </motion.div>
              );
            })}
          </div>
        ))}
      </AnimatePresence>
    </div>
  );
}

// ============ HERO ============
function Hero({ heroImg }: { heroImg: string }) {
  const { scrollY } = useScroll();
  const y = useTransform(scrollY, [0, 600], [0, 200]);
  const scale = useTransform(scrollY, [0, 600], [1, 1.2]);
  const opacity = useTransform(scrollY, [0, 500], [1, 0]);

  return (
    <section className="relative h-[100svh] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Nosso amor"
          className="h-full w-full object-cover ken-burns"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/40 via-black/20 to-background" />
      </motion.div>

      <motion.div
        style={{ opacity }}
        className="relative z-10 flex h-full flex-col items-center justify-end px-6 pb-20 text-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2 }}
          className="font-script text-2xl text-gold/90"
        >
          para você, meu amor
        </motion.p>
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.7, duration: 1.4 }}
          className="font-display mt-2 text-5xl leading-tight text-gradient sm:text-6xl"
        >
          Feliz Dia dos<br />Namorados <Heart className="inline h-10 w-10 text-passion heart-glow" fill="currentColor" strokeWidth={0} />
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.1, duration: 1.2 }}
          className="mt-5 max-w-md font-display italic text-lg text-blush/90"
        >
          Cada momento ao seu lado transformou minha vida em algo muito mais bonito.
        </motion.p>
        <motion.a
          href="#contador"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="glass-strong mt-8 inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-sm font-medium text-foreground animate-pulse-glow"
        >
          Ver Nossa História
          <ChevronDown className="h-4 w-4" />
        </motion.a>
      </motion.div>
    </section>
  );
}

// ============ COUNTER ============
const START_DATE = new Date("2025-01-19T00:00:00");
function Counter() {
  const [diff, setDiff] = useState(() => Date.now() - START_DATE.getTime());
  useEffect(() => {
    const t = setInterval(() => setDiff(Date.now() - START_DATE.getTime()), 1000);
    return () => clearInterval(t);
  }, []);
  const days = Math.floor(diff / 86400000);
  const hours = Math.floor((diff / 3600000) % 24);
  const mins = Math.floor((diff / 60000) % 60);
  const secs = Math.floor((diff / 1000) % 60);
  const cells = [
    { label: "dias", v: days },
    { label: "horas", v: hours },
    { label: "min", v: mins },
    { label: "seg", v: secs },
  ];
  return (
    <section id="contador" className="relative px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 1 }}
        className="mx-auto max-w-md text-center"
      >
        <p className="font-script text-2xl text-gold">estamos juntos há</p>
        <div className="mt-6 grid grid-cols-4 gap-2">
          {cells.map((c) => (
            <div key={c.label} className="glass rounded-2xl p-3">
              <motion.div
                key={c.v}
                initial={{ y: -8, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                className="font-display text-3xl text-gradient tabular-nums"
              >
                {String(c.v).padStart(2, "0")}
              </motion.div>
              <div className="mt-1 text-[10px] uppercase tracking-widest text-muted-foreground">
                {c.label}
              </div>
            </div>
          ))}
        </div>
        <p className="mt-6 text-sm text-muted-foreground">
          e cada segundo vale mais que o anterior.
        </p>
      </motion.div>
    </section>
  );
}

// ============ TIMELINE ============
const TIMELINE = [
  { icon: "❤️", title: "O dia em que nos conhecemos", text: "Um olhar — e o mundo mudou de cor." },
  { icon: "💬", title: "Nossa primeira conversa", text: "Horas pareciam minutos, e ainda parecem. (Menos quando você me bloqueava)" },
  { icon: "🌹", title: "Nosso primeiro encontro", text: "Lembro de cada detalhe. Você sorrindo é o detalhe favorito. A gente com vergonha um do outro" },
  { icon: "✈️", title: "Nossa primeira viagem", text: "Descobri que casa não é lugar — é você." },
  { icon: "😂", title: "Os momentos mais engraçados", text: "Rir com você é meu som preferido." },
  { icon: "💍", title: "O presente", text: "Hoje, ao seu lado, é onde eu quero estar." },
  { icon: "🌅", title: "O futuro que sonhamos juntos", text: "E todos os capítulos ainda por vir." },
];
function Timeline() {
  return (
    <section className="relative px-5 py-24">
      <div className="mx-auto max-w-md">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="font-display text-center text-4xl text-gradient"
        >
          Nossa História
        </motion.h2>
        <div className="relative mt-12 pl-8">
          <div className="absolute left-3 top-2 bottom-2 w-px bg-gradient-to-b from-transparent via-passion/60 to-transparent" />
          {TIMELINE.map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.7, delay: i * 0.05 }}
              className="relative mb-8"
            >
              <div className="absolute -left-[1.65rem] top-1.5 h-3 w-3 rounded-full bg-passion heart-glow ring-4 ring-passion/20" />
              <div className="glass rounded-2xl p-4">
                <div className="text-2xl">{item.icon}</div>
                <h3 className="font-display mt-1 text-xl text-foreground">{item.title}</h3>
                <p className="mt-1 text-sm text-muted-foreground">{item.text}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

// ============ GALLERY (premium swipeable carousel) ============
function Gallery({ photos }: { photos: string[] }) {
  const [index, setIndex] = useState(0);
  const [open, setOpen] = useState(false);
  const [direction, setDirection] = useState(1);
  const [paused, setPaused] = useState(false);
  const total = photos.length;

  const go = (dir: number) => {
    setDirection(dir);
    setIndex((i) => (i + dir + total) % total);
  };
  const goTo = (i: number) => {
    setDirection(i > index ? 1 : -1);
    setIndex((i + total) % total);
  };

  useEffect(() => {
    if (paused || open) return;
    const t = setInterval(() => {
      setDirection(1);
      setIndex((i) => (i + 1) % total);
    }, 4500);
    return () => clearInterval(t);
  }, [paused, open, total]);

  const variants = {
    enter: (d: number) => ({ opacity: 0, x: d > 0 ? 60 : -60, scale: 1.05 }),
    center: { opacity: 1, x: 0, scale: 1 },
    exit: (d: number) => ({ opacity: 0, x: d > 0 ? -60 : 60, scale: 1.05 }),
  };

  return (
    <section className="relative py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-center text-4xl text-gradient px-5"
      >
        Nossa Galeria
      </motion.h2>
      <p className="mt-2 text-center text-sm text-muted-foreground px-5">
        arraste, toque nas setas ou amplie
      </p>

      <div
        className="relative mx-auto mt-10 w-full max-w-md px-5"
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="relative h-[28rem] w-full overflow-hidden rounded-3xl glass-strong">
          <AnimatePresence custom={direction} mode="popLayout">
            <motion.div
              key={index}
              custom={direction}
              variants={variants}
              initial="enter"
              animate="center"
              exit="exit"
              transition={{ duration: 0.7, ease: [0.32, 0.72, 0.24, 1] }}
              drag="x"
              dragConstraints={{ left: 0, right: 0 }}
              dragElastic={0.2}
              onDragStart={() => setPaused(true)}
              onDragEnd={(_, info) => {
                if (info.offset.x < -60) go(1);
                else if (info.offset.x > 60) go(-1);
                setTimeout(() => setPaused(false), 3000);
              }}
              onClick={() => setOpen(true)}
              className="absolute inset-0 cursor-grab active:cursor-grabbing"
            >
              <img
                src={photos[index]}
                alt=""
                draggable={false}
                className="h-full w-full object-cover ken-burns select-none"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent pointer-events-none" />
            </motion.div>
          </AnimatePresence>

          {/* Arrows */}
          <button
            onClick={(e) => { e.stopPropagation(); go(-1); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
            className="absolute left-3 top-1/2 -translate-y-1/2 z-10 glass-strong rounded-full p-3 transition-transform active:scale-90 hover:scale-110"
            aria-label="Anterior"
          >
            <ChevronLeft className="h-6 w-6 text-foreground" />
          </button>
          <button
            onClick={(e) => { e.stopPropagation(); go(1); setPaused(true); setTimeout(() => setPaused(false), 3000); }}
            className="absolute right-3 top-1/2 -translate-y-1/2 z-10 glass-strong rounded-full p-3 transition-transform active:scale-90 hover:scale-110"
            aria-label="Próxima"
          >
            <ChevronRight className="h-6 w-6 text-foreground" />
          </button>

          {/* Counter */}
          <div className="absolute top-3 right-3 z-10 glass rounded-full px-3 py-1 text-xs tabular-nums text-foreground/90">
            {index + 1} / {total}
          </div>
        </div>

        {/* Dots */}
        <div className="mt-5 flex justify-center gap-1.5">
          {photos.map((_, i) => (
            <button
              key={i}
              onClick={() => goTo(i)}
              aria-label={`Foto ${i + 1}`}
              className={`h-1.5 rounded-full transition-all ${
                i === index ? "w-6 bg-passion" : "w-1.5 bg-white/30"
              }`}
            />
          ))}
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setOpen(false)}
            className="fixed inset-0 z-[60] bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
          >
            <button className="absolute top-5 right-5 glass rounded-full p-2 z-10">
              <X className="h-5 w-5" />
            </button>
            <motion.img
              key={index}
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              src={photos[index]}
              className="max-h-full max-w-full rounded-2xl object-contain"
              alt=""
            />
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============ MEMORY WALL ============
function MemoryWall({ photos }: { photos: string[] }) {
  const memories = [
    { img: photos[8], text: "Nosso piquenique", date: "Tarde inesquecível" },
    { img: photos[5], text: "O beijo na montanha", date: "Chapada" },
    { img: photos[9], text: "Mar e nós dois", date: "Salvador" },
    { img: photos[6], text: "Em casa, com a família", date: "Dias simples" },
  ];
  return (
    <section className="relative px-5 py-20">
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="font-display text-center text-4xl text-gradient"
      >
        Mural de Memórias
      </motion.h2>
      <div className="mx-auto mt-10 grid max-w-md grid-cols-2 gap-4">
        {memories.map((m, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30, scale: 0.95 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: i * 0.1 }}
            animate={{ y: [0, -6, 0] }}
            // floating
            style={{ animationDelay: `${i * 0.3}s` }}
            className="glass rounded-2xl overflow-hidden"
          >
            <div className="aspect-[3/4] overflow-hidden">
              <img src={m.img} alt="" loading="lazy" className="h-full w-full object-cover" />
            </div>
            <div className="p-3">
              <p className="font-display text-base text-foreground">{m.text}</p>
              <p className="text-[10px] uppercase tracking-widest text-gold/80">{m.date}</p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

// ============ LOVE LETTER (typewriter) ============
const LETTER = `Minha Paloma,

Se eu pudesse guardar um instante para sempre, seria o som da sua risada. Se eu pudesse pintar um lugar, pintaria o seu colo. Você é onde minha pressa descansa.

Obrigado por cada café, cada abraço apertado, cada "boa noite, meu amor". Obrigado por existir do meu lado.

Te amo. Hoje, amanhã, sempre.`;

function LoveLetter() {
  const [text, setText] = useState("");
  const ref = useRef<HTMLDivElement>(null);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    if (!ref.current) return;
    const io = new IntersectionObserver(
      ([e]) => e.isIntersecting && setStarted(true),
      { threshold: 0.3 }
    );
    io.observe(ref.current);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!started) return;
    let i = 0;
    const t = setInterval(() => {
      i++;
      setText(LETTER.slice(0, i));
      if (i >= LETTER.length) clearInterval(t);
    }, 28);
    return () => clearInterval(t);
  }, [started]);

  return (
    <section ref={ref} className="relative px-5 py-24">
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="glass-strong mx-auto max-w-md rounded-3xl p-7"
      >
        <p className="font-script text-3xl text-gold mb-4">Carta para você</p>
        <pre className="whitespace-pre-wrap font-display text-lg leading-relaxed text-foreground/90">
          {text}
          <span className="inline-block w-[2px] h-5 bg-passion ml-0.5 animate-pulse" />
        </pre>
      </motion.div>
    </section>
  );
}

// ============ STAR SKY OF HEARTS ============
function HeartSky() {
  const stars = Array.from({ length: 120 });
  return (
    <section className="relative h-[80vh] overflow-hidden">
      <div className="absolute inset-0">
        {stars.map((_, i) => {
          const x = Math.random() * 100;
          const y = Math.random() * 100;
          const size = 4 + Math.random() * 10;
          const delay = Math.random() * 4;
          return (
            <motion.div
              key={i}
              className="absolute"
              style={{ left: `${x}%`, top: `${y}%` }}
              animate={{ opacity: [0.2, 1, 0.2], scale: [0.8, 1.2, 0.8] }}
              transition={{ duration: 3 + Math.random() * 3, repeat: Infinity, delay }}
            >
              <Heart size={size} className="text-passion heart-glow" fill="currentColor" strokeWidth={0} />
            </motion.div>
          );
        })}
      </div>
      <div className="relative z-10 flex h-full items-center justify-center px-6 text-center">
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="font-display text-3xl text-gradient max-w-md"
        >
          Um céu inteiro de corações — e todos batem por você.
        </motion.h2>
      </div>
    </section>
  );
}

// ============ CINEMATIC MOMENT ============
function Cinematic() {
  const phrase = "Entre todos os caminhos que eu poderia seguir, o mais bonito foi aquele que me levou até você.";
  const words = phrase.split(" ");
  return (
    <section className="relative bg-black/40 px-6 py-32">
      <div className="mx-auto max-w-lg text-center">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          className="font-display text-2xl leading-relaxed sm:text-3xl"
        >
          {words.map((w, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: i * 0.08 }}
              className="inline-block mr-1.5 text-gradient"
            >
              {w}
            </motion.span>
          ))}
        </motion.p>
      </div>
    </section>
  );
}

// ============ FINAL SURPRISE ============
function FinalSurprise({ photos }: { photos: string[] }) {
  const [open, setOpen] = useState(false);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!open) return;
    setStep(0);
    const seq = [800, 1500, 2200, 2900, 3600, 4500, 5500];
    const timers = seq.map((d, i) => setTimeout(() => setStep(i + 1), d));
    return () => timers.forEach(clearTimeout);
  }, [open]);

  return (
    <section className="relative px-5 py-20 text-center">
      <motion.button
        onClick={() => setOpen(true)}
        whileTap={{ scale: 0.96 }}
        className="glass-strong inline-flex items-center gap-2 rounded-full px-8 py-4 font-display text-lg text-gradient animate-pulse-glow"
      >
        <Heart className="h-5 w-5 text-passion" fill="currentColor" strokeWidth={0} />
        Uma Última Surpresa
        <Heart className="h-5 w-5 text-passion" fill="currentColor" strokeWidth={0} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[80] bg-black flex items-center justify-center p-5 overflow-hidden"
          >
            {/* particle rain */}
            {Array.from({ length: 60 }).map((_, i) => (
              <motion.div
                key={i}
                className="absolute"
                style={{ left: `${Math.random() * 100}%`, top: -20 }}
                animate={{ y: "120vh", rotate: 360 }}
                transition={{ duration: 4 + Math.random() * 4, repeat: Infinity, delay: Math.random() * 3, ease: "linear" }}
              >
                <Heart size={8 + Math.random() * 18} className="text-passion heart-glow" fill="currentColor" strokeWidth={0} />
              </motion.div>
            ))}

            <button onClick={() => setOpen(false)} className="absolute top-5 right-5 glass rounded-full p-2 z-10">
              <X className="h-5 w-5" />
            </button>

            <div className="relative z-10 max-w-md text-center">
              <AnimatePresence mode="wait">
                {step < 4 && (
                  <motion.img
                    key={step}
                    src={photos[step % photos.length]}
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    transition={{ duration: 0.7 }}
                    className="mx-auto h-80 w-64 rounded-3xl object-cover shadow-2xl"
                  />
                )}
                {step === 4 && (
                  <motion.p
                    key="m1"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-display text-3xl text-gradient"
                  >
                    Paloma, você é a melhor parte da minha história.
                  </motion.p>
                )}
                {step === 5 && (
                  <motion.p
                    key="m2"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    className="font-display text-2xl text-blush"
                  >
                    Obrigado por transformar meus dias comuns em momentos extraordinários.
                  </motion.p>
                )}
                {step >= 6 && (
                  <motion.div
                    key="m3"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 1 }}
                  >
                    <Sparkles className="mx-auto h-10 w-10 text-gold mb-4" />
                    <p className="font-display text-3xl text-gradient">
                      Quer continuar escrevendo essa história comigo para sempre? ❤️
                    </p>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

// ============ CLOSING ============
function Closing({ img }: { img: string }) {
  return (
    <section className="relative px-5 py-24">
      <div className="relative mx-auto max-w-md">
        <motion.div
          animate={{ scale: [1, 1.05, 1] }}
          transition={{ duration: 3, repeat: Infinity }}
          className="absolute inset-0 flex items-center justify-center"
        >
          <Heart className="h-[120%] w-[120%] text-passion/10" fill="currentColor" strokeWidth={0} />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="relative glass-strong rounded-3xl overflow-hidden"
        >
          <img src={img} alt="" className="h-96 w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent" />
          <div className="absolute bottom-0 p-6 text-center">
            <p className="font-display text-2xl text-gradient">
              Eu te amo hoje, amanhã e em todos os dias que ainda virão. ❤️
            </p>
          </div>
        </motion.div>
        <p className="mt-10 text-center font-script text-2xl text-gold">com todo meu amor, sempre.</p>
      </div>
    </section>
  );
}

// ============ MUSIC PLAYER (floating) ============
function MusicPlayer() {
  const [open, setOpen] = useState(false);
  const [playing, setPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement>(null);

  const toggle = () => {
    const a = audioRef.current;
    if (!a) return;
    if (playing) { a.pause(); setPlaying(false); }
    else { a.play().catch(() => {}); setPlaying(true); }
  };

  return (
    <>
      <audio
        ref={audioRef}
        loop
        src="https://cdn.pixabay.com/download/audio/2022/05/27/audio_1808fbf07a.mp3"
      />
      <motion.button
        onClick={() => setOpen((o) => !o)}
        whileTap={{ scale: 0.9 }}
        className="fixed bottom-5 right-5 z-40 glass-strong rounded-full p-4 animate-pulse-glow"
        aria-label="Nossa música"
      >
        <Heart className={`h-6 w-6 text-passion ${playing ? "animate-pulse" : ""}`} fill="currentColor" strokeWidth={0} />
      </motion.button>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-24 right-5 z-40 glass-strong rounded-3xl p-5 w-72"
          >
            <p className="font-script text-xl text-gold">❤️ Nossa Música</p>
            <p className="text-xs text-muted-foreground mt-1">Para sonhar junto</p>
            <div className="mt-4 flex items-center gap-3">
              <button onClick={toggle} className="rounded-full bg-passion p-3 text-primary-foreground">
                {playing ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
              </button>
              <div className="flex-1 h-1 rounded-full bg-white/20 overflow-hidden">
                <motion.div
                  className="h-full bg-gradient-to-r from-passion to-gold"
                  animate={{ width: playing ? "100%" : "0%" }}
                  transition={{ duration: 180, ease: "linear" }}
                />
              </div>
              <Volume2 className="h-4 w-4 text-muted-foreground" />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}

// ============ MAIN ============
export default function ValentinePage({
  hero,
  photos,
  closingImg,
}: {
  hero: string;
  photos: string[];
  closingImg: string;
}) {
  return (
    <main className="relative">
      <FloatingHearts />
      <TapParticles />
      <div className="relative z-10">
        <Hero heroImg={hero} />
        <Counter />
        <Timeline />
        <Gallery photos={photos} />
        <MemoryWall photos={photos} />
        <LoveLetter />
        <HeartSky />
        <Cinematic />
        <FinalSurprise photos={photos} />
        <Closing img={closingImg} />
      </div>
      <MusicPlayer />
    </main>
  );
}
