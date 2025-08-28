import React, { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// Animation variants
const flyIn = {
  hidden: { opacity: 0, y: 40 },
  visible: (i = 1) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: "easeOut",
    },
  }),
};

// Background video source
const VIDEO_SRC =
  "/orange-splash.mp4";

export default function OrangeJuiceLanding() {
  const videoRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);
  const [isMuted, setIsMuted] = useState(true);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia?.("(prefers-reduced-motion: reduce)");
    const handleChange = () => setPrefersReducedMotion(Boolean(mq && mq.matches));
    handleChange();
    mq?.addEventListener?.("change", handleChange);
    return () => mq?.removeEventListener?.("change", handleChange);
  }, []);

  useEffect(() => {
    const vid = videoRef.current;
    if (!vid) return;

    if (prefersReducedMotion) {
      vid.pause();
      setIsPlaying(false);
      return;
    }

    const tryPlay = async () => {
      try {
        vid.muted = isMuted;
        await vid.play();
        setIsPlaying(!vid.paused);
      } catch {
        setIsPlaying(false);
      }
    };

    tryPlay();
  }, [prefersReducedMotion, isMuted]);

  function togglePlay() {
    const vid = videoRef.current;
    if (!vid) return;
    if (vid.paused) {
      vid.play();
      setIsPlaying(true);
    } else {
      vid.pause();
      setIsPlaying(false);
    }
  }

  function toggleMute() {
    const vid = videoRef.current;
    if (!vid) return;
    vid.muted = !vid.muted;
    setIsMuted(vid.muted);
  }

  return (
    <div className="min-h-screen bg-neutral-50 text-slate-900">
      {/* Top nav */}
      <header className="fixed inset-x-0 top-4 z-40 flex justify-center pointer-events-none">
        <div className="container mx-auto px-4 max-w-5xl pointer-events-auto">
          <nav className="backdrop-blur-sm bg-white/30 dark:bg-slate-900/30 border border-white/10 dark:border-slate-700/40 rounded-full px-4 py-2 flex items-center gap-4 shadow-sm">
            <div className="flex items-center gap-3 font-extrabold text-orange-500">
              <span className="w-3 h-3 rounded-full bg-orange-500 inline-block shadow-[0_0_0_6px_rgba(255,165,0,0.12)]" />
              Sunny Sips
            </div>
            <div className="ml-auto flex gap-2 text-sm">
              <a href="#menu" className="px-3 py-1 rounded-full hover:bg-white/40">
                Menu
              </a>
              <a href="#about" className="px-3 py-1 rounded-full hover:bg-white/40">
                Why Us
              </a>
              <a href="#subscribe" className="px-3 py-1 rounded-full hover:bg-white/40">
                Subscribe
              </a>
            </div>
          </nav>
        </div>
      </header>

      {/* Hero */}
      <section className="relative h-screen md:h-[92vh] overflow-hidden flex items-center">
        {/* Background video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          src={VIDEO_SRC}
          autoPlay
          muted
          loop
          playsInline
          poster="https://images.unsplash.com/photo-1502741126161-b048400d9c21?q=80&w=1600&auto=format&fit=crop"
        />

        {/* Overlay */}
        <div className="absolute inset-0 z-10 pointer-events-none" aria-hidden>
          <div className="absolute inset-0 bg-gradient-to-t from-black/55 via-transparent to-black/10" />
          <div className="absolute inset-0 bg-[radial-gradient(800px_300px_at_10%_10%,rgba(255,165,0,0.18),transparent_30%)] mix-blend-screen" />
        </div>

        {/* Hero content with fly-in */}
        <div className="relative z-20 container mx-auto px-6 max-w-4xl text-center text-white">
          <motion.span
            className="inline-flex items-center gap-2 bg-white/10 backdrop-blur px-3 py-1 rounded-full text-sm font-semibold"
            variants={flyIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            🍊 Cold-Pressed • 100% Natural
          </motion.span>

          <motion.h1
            className="mt-6 text-4xl sm:text-5xl md:text-6xl font-extrabold leading-tight drop-shadow-lg"
            variants={flyIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
          >
            Sip Sunshine — Fresh in Every Bottle
          </motion.h1>

          <motion.p
            className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto"
            variants={flyIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={2}
          >
            Hand-pressed orange blends, made daily. Sustainably sourced fruit,
            no added sugar — just juice.
          </motion.p>

          <motion.div
            className="mt-8 flex items-center justify-center gap-4 flex-wrap"
            variants={flyIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.5 }}
            custom={3}
          >
            <a
              href="#menu"
              className="inline-flex items-center gap-3 bg-orange-500 hover:bg-orange-600 text-black font-bold px-5 py-3 rounded-full shadow-lg"
            >
              Shop the Menu
            </a>
            <a
              href="#store"
              className="inline-flex items-center gap-3 bg-white/10 hover:bg-white/20 px-4 py-3 rounded-full"
            >
              Find a Store
            </a>
          </motion.div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-24 md:h-36 bg-gradient-to-b from-transparent to-neutral-50 dark:to-slate-900 pointer-events-none" />
      </section>

      {/* Main */}
      <main className="container mx-auto px-6 py-16 max-w-5xl">
        {/* Menu */}
        <section id="menu" className="space-y-6">
          <motion.h2
            className="text-2xl font-bold"
            variants={flyIn}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            This week's menu
          </motion.h2>
          <p className="text-slate-600">
            Small-batch blends rotate with the seasons.
          </p>

          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              {
                title: "Sunburst",
                price: "$6.50",
                desc: "Navel orange · pineapple · lime",
                video: "orange.mp4",
              },
              {
                title: "Citrus Fizz",
                price: "$6.00",
                desc: "Orange · sparkling water · mint",
                video: "lime.mp4",
              },
              {
                title: "Morning Press",
                price: "$6.75",
                desc: "Orange · carrot · ginger",
                video: "carrot.mp4",
              },
            ].map((p, i) => (
              <motion.article
                key={p.title}
                className="rounded-2xl bg-white shadow p-4 border"
                variants={flyIn}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.3 }}
                custom={i + 1}
              >
                {/* Video header */}
                <div className="relative h-40 rounded-lg overflow-hidden flex items-center justify-center">
                  <video
                    className="absolute inset-0 w-full h-full object-cover"
                    src={p.video}
                    autoPlay
                    loop
                    muted
                    playsInline
                  />
                  <div className="absolute inset-0 bg-black/30"></div>
                  <span className="relative z-10 text-2xl font-bold text-white">
                    {p.title}
                  </span>
                </div>

                {/* Card body */}
                <div className="mt-3">
                  <div className="flex items-baseline justify-between">
                    <h3 className="text-lg font-semibold">{p.title}</h3>
                    <div className="font-extrabold">{p.price}</div>
                  </div>
                  <p className="text-sm text-slate-600">{p.desc}</p>
                  <div className="mt-3 flex gap-2">
                    <button className="px-3 py-2 rounded-full bg-orange-500 text-black font-bold">
                      Add
                    </button>
                    <button className="px-3 py-2 rounded-full border">
                      Details
                    </button>
                  </div>
                </div>
              </motion.article>
            ))}
          </div>
        </section>

        {/* Subscribe */}
        <motion.section
          id="subscribe"
          className="mt-16 rounded-2xl p-6 bg-gradient-to-r from-orange-50 to-orange-100 border"
          variants={flyIn}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          <h3 className="text-xl font-bold">Join the juice club</h3>
          <p className="text-slate-600">
            Get weekly menus and 10% off your first order.
          </p>
          <form
            className="mt-4 flex gap-3 flex-wrap"
            onSubmit={(e) => {
              e.preventDefault();
              alert("Thanks for subscribing!");
            }}
          >
            <input
              aria-label="Email"
              type="email"
              required
              placeholder="you@freshmail.com"
              className="flex-1 min-w-[220px] rounded-full px-4 py-2 border"
            />
            <button className="rounded-full bg-orange-500 px-6 py-2 font-bold">
              Subscribe
            </button>
          </form>
        </motion.section>

        {/* Footer */}
        <footer className="mt-16 py-10 text-sm text-slate-500">
          © {new Date().getFullYear()} Sunny Sips — Made with real fruit
        </footer>
      </main>
    </div>
  );
}
