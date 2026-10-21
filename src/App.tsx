import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Map,
  Users,
  Eye,
  PenTool,
  Dice1,
  Music,
  Shield,
  Download,
  Github,
  ExternalLink,
  ChevronDown,
  Star,
  Code2,
  Lock,
  Globe,
  FileText,
  Layers,
  Compass,
  Sword,
  BookOpen,
  Menu,
  X,
} from 'lucide-react';

function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? 'bg-gray-900/95 backdrop-blur-md shadow-lg border-b border-amber-900/20'
          : 'bg-transparent'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-2">
            <Compass className="w-7 h-7 text-amber-400" />
            <span className="text-xl font-bold text-white">
              Atlas<span className="text-amber-400">VTT</span>
            </span>
          </div>
          <div className="hidden md:flex items-center gap-8">
            <a href="#features" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
              Features
            </a>
            <a href="#how-it-works" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
              How It Works
            </a>
            <a href="#game-systems" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
              Game Systems
            </a>
            <a href="#install" className="text-gray-300 hover:text-amber-400 transition-colors text-sm">
              Install
            </a>
            <a
              href="https://github.com/atlas-vtt/atlas-vtt"
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 text-amber-400 px-4 py-2 rounded-lg hover:bg-amber-500/20 transition-all text-sm"
            >
              <Github className="w-4 h-4" />
              GitHub
            </a>
          </div>
          <button
            className="md:hidden text-gray-300"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>
      </div>
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-gray-900/95 backdrop-blur-md border-b border-amber-900/20"
          >
            <div className="px-4 py-4 flex flex-col gap-4">
              <a href="#features" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-amber-400 transition-colors">
                Features
              </a>
              <a href="#how-it-works" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-amber-400 transition-colors">
                How It Works
              </a>
              <a href="#game-systems" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-amber-400 transition-colors">
                Game Systems
              </a>
              <a href="#install" onClick={() => setMobileOpen(false)} className="text-gray-300 hover:text-amber-400 transition-colors">
                Install
              </a>
              <a
                href="https://github.com/atlas-vtt/atlas-vtt"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-amber-400"
              >
                <Github className="w-4 h-4" />
                GitHub
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Atmospheric background */}
      <div className="absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-br from-gray-900 via-slate-900 to-gray-900" />
        {/* Grid pattern overlay */}
        <div className="absolute inset-0 opacity-[0.03]" style={{
          backgroundImage: `
            linear-gradient(rgba(245, 158, 11, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(245, 158, 11, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
        }} />
        {/* Radial glow effects */}
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-amber-500/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-purple-500/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/3 rounded-full blur-3xl" />
        {/* Vignette */}
        <div className="absolute inset-0 bg-gradient-to-b from-gray-900/50 via-transparent to-gray-900" />
        <div className="absolute inset-0 bg-gradient-to-r from-gray-900/60 via-transparent to-gray-900/60" />
      </div>

      {/* Animated particles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(20)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute w-1 h-1 bg-amber-400/30 rounded-full"
            initial={{
              x: Math.random() * (typeof window !== 'undefined' ? window.innerWidth : 1200),
              y: Math.random() * 800,
            }}
            animate={{
              y: [null, -20, 20],
              opacity: [0.2, 0.6, 0.2],
            }}
            transition={{
              duration: 3 + Math.random() * 4,
              repeat: Infinity,
              repeatType: 'reverse',
              delay: Math.random() * 3,
            }}
          />
        ))}
      </div>

      <div className="relative z-10 text-center px-4 max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <div className="inline-flex items-center gap-2 bg-amber-500/10 border border-amber-500/30 rounded-full px-4 py-1.5 mb-6">
            <Star className="w-4 h-4 text-amber-400" />
            <span className="text-amber-300 text-sm font-medium">v0.9.0 — Open Source & Free</span>
          </div>
        </motion.div>

        <motion.h1
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold text-white mb-6 leading-tight"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          Your Table,{' '}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-amber-400 via-orange-400 to-amber-500">
            Your Rules
          </span>
        </motion.h1>

        <motion.p
          className="text-lg sm:text-xl text-gray-300 max-w-3xl mx-auto mb-10 leading-relaxed"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
        >
          A game system agnostic virtual tabletop for TTRPGs that runs inside{' '}
          <span className="text-purple-400 font-semibold">Obsidian</span>. Battle maps, tokens, fog of war,
          dice, initiative — all your files stay local, all yours forever.
        </motion.p>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
        >
          <a
            href="#install"
            className="group flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-bold px-8 py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20 hover:shadow-amber-500/40"
          >
            <Download className="w-5 h-5" />
            Install Free
          </a>
          <a
            href="https://github.com/atlas-vtt/atlas-vtt"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
          >
            <Github className="w-5 h-5" />
            View Source
            <ExternalLink className="w-4 h-4 opacity-60" />
          </a>
        </motion.div>

        <motion.div
          className="mt-12 flex items-center justify-center gap-8 text-gray-400 text-sm"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 1 }}
        >
          <div className="flex items-center gap-2">
            <Github className="w-4 h-4" />
            <span>625+ Stars</span>
          </div>
          <div className="flex items-center gap-2">
            <Code2 className="w-4 h-4" />
            <span>AGPL-3.0</span>
          </div>
          <div className="flex items-center gap-2">
            <Lock className="w-4 h-4" />
            <span>No Telemetry</span>
          </div>
        </motion.div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        className="absolute bottom-8 left-1/2 -translate-x-1/2"
        animate={{ y: [0, 8, 0] }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <ChevronDown className="w-6 h-6 text-amber-400/60" />
      </motion.div>
    </section>
  );
}

const features = [
  {
    icon: Map,
    title: 'Maps & Grids',
    description: 'Build scenes from your own map images. Align square or hex grids manually or with automatic detection.',
    color: 'from-blue-500 to-cyan-500',
  },
  {
    icon: Users,
    title: 'Tokens & Encounters',
    description: 'Import characters, move and resize tokens, save groups as reusable encounters. Link creature notes with Fantasy Statblocks.',
    color: 'from-purple-500 to-pink-500',
  },
  {
    icon: Eye,
    title: 'Fog & Player View',
    description: 'Reveal the map as your players explore. Show a separate player window on a second screen while keeping GM info hidden.',
    color: 'from-green-500 to-emerald-500',
  },
  {
    icon: PenTool,
    title: 'Drawing & Notes',
    description: 'Sketch, add text, measure distances, and pin Markdown notes or other Atlas maps to locations on your map.',
    color: 'from-orange-500 to-amber-500',
  },
  {
    icon: Dice1,
    title: 'Dice & Initiative',
    description: 'Roll dice, review the roll log, track turns, and keep counters and timers close at hand during combat.',
    color: 'from-red-500 to-rose-500',
  },
  {
    icon: Music,
    title: 'Music & Controls',
    description: 'Play audio from your vault, customise map hotkeys, and undo or redo map edits with full history support.',
    color: 'from-indigo-500 to-violet-500',
  },
  {
    icon: Globe,
    title: 'Online Play',
    description: 'Host a table that players join from their web browsers. Off until you turn it on, with optional Atlas Online service.',
    color: 'from-teal-500 to-cyan-500',
  },
  {
    icon: FileText,
    title: 'Note Linking',
    description: 'Pin Obsidian markdown notes to map locations. Read and edit them in floating panels without leaving the map.',
    color: 'from-amber-500 to-yellow-500',
  },
];

function FeaturesSection() {
  return (
    <section id="features" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />
      <div className="relative max-w-7xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Everything at the Table
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A complete virtual tabletop built for how you actually play — minimal, streamlined, and native to Obsidian.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              className="group relative bg-gray-800/50 border border-gray-700/50 rounded-2xl p-6 hover:border-amber-500/30 transition-all duration-300 hover:bg-gray-800/80"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-br ${feature.color} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                <feature.icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{feature.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function HowItWorksSection() {
  const steps = [
    {
      step: '01',
      title: 'Open the Dashboard',
      description: 'Run "Atlas VTT: Open dashboard" from the Obsidian command palette to get started.',
      icon: Compass,
    },
    {
      step: '02',
      title: 'Import Your Map',
      description: 'Use the + button in the asset manager to import a map image, then create a scene using that map.',
      icon: Map,
    },
    {
      step: '03',
      title: 'Align the Grid',
      description: 'Use automatic grid detection or the manual alignment tool to set up your square or hex grid.',
      icon: Layers,
    },
    {
      step: '04',
      title: 'Place Tokens & Play',
      description: 'Import tokens and place them on your scene. Open the player view for your second screen.',
      icon: Users,
    },
  ];

  return (
    <section id="how-it-works" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Your First Scene
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            From install to your first battle map in under 5 minutes.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {steps.map((step, index) => (
            <motion.div
              key={step.step}
              className="relative"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.15 }}
            >
              <div className="text-6xl font-black text-amber-500/10 absolute -top-4 -left-2">
                {step.step}
              </div>
              <div className="relative pt-8">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/10 border border-amber-500/20 flex items-center justify-center mb-4">
                  <step.icon className="w-7 h-7 text-amber-400" />
                </div>
                <h3 className="text-white font-bold text-xl mb-2">{step.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{step.description}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function GameSystemsSection() {
  const systems = [
    {
      name: 'D&D 5E (2014)',
      description: 'Based on SRD 5.1 — the classic fifth edition statblock template.',
      icon: Sword,
    },
    {
      name: 'D&D 5E (2024)',
      description: 'Based on SRD 5.2.1 — updated statblock for the new edition.',
      icon: Shield,
    },
    {
      name: 'Cairn',
      description: 'Based on Cairn by Yochai Gal — OSR-style character templates.',
      icon: BookOpen,
    },
    {
      name: 'Fate',
      description: 'Based on Fate Core & Accelerated — aspects, stunts, and stress tracks.',
      icon: PenTool,
    },
    {
      name: 'Draw Steel',
      description: 'Independent product under the DRAW STEEL Creator License.',
      icon: Sword,
    },
  ];

  return (
    <section id="game-systems" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Game System Templates
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Statblock templates for popular TTRPG systems. Each holds fields and layout — not rules text or creatures.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {systems.map((system, index) => (
            <motion.div
              key={system.name}
              className="bg-gray-800/40 border border-gray-700/40 rounded-2xl p-6 hover:border-purple-500/30 transition-all group"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <div className="w-10 h-10 rounded-lg bg-purple-500/10 border border-purple-500/20 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                <system.icon className="w-5 h-5 text-purple-400" />
              </div>
              <h3 className="text-white font-semibold text-lg mb-2">{system.name}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{system.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.p
          className="text-center text-gray-500 text-sm mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          Atlas is game system agnostic — these templates are a starting point, not a limitation.
        </motion.p>
      </div>
    </section>
  );
}

function ShowcaseSection() {
  return (
    <section className="py-24 px-4 relative overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            At the Table
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            A minimal, streamlined interface that feels native to Obsidian.
          </p>
        </motion.div>

        {/* Stylized VTT mockup */}
        <motion.div
          className="relative bg-gray-800/50 border border-gray-700/40 rounded-2xl overflow-hidden shadow-2xl shadow-black/50"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          {/* Title bar */}
          <div className="flex items-center gap-2 px-4 py-3 bg-gray-800/80 border-b border-gray-700/40">
            <div className="flex gap-1.5">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
            </div>
            <div className="flex-1 text-center text-gray-400 text-xs font-medium">
              Atlas VTT — The Sunken Temple
            </div>
          </div>

          {/* Main content area */}
          <div className="flex">
            {/* Map area */}
            <div className="flex-1 relative aspect-[16/9] min-h-[300px] sm:min-h-[400px]">
              {/* Grid background */}
              <div className="absolute inset-0 bg-gradient-to-br from-slate-800 via-slate-900 to-gray-900">
                <div className="absolute inset-0 opacity-10" style={{
                  backgroundImage: `
                    linear-gradient(rgba(245, 158, 11, 0.6) 1px, transparent 1px),
                    linear-gradient(90deg, rgba(245, 158, 11, 0.6) 1px, transparent 1px)
                  `,
                  backgroundSize: '40px 40px',
                }} />
                {/* Map texture */}
                <div className="absolute inset-0 opacity-20" style={{
                  background: 'radial-gradient(ellipse at 30% 40%, rgba(139, 92, 42, 0.4), transparent 60%), radial-gradient(ellipse at 70% 60%, rgba(59, 130, 246, 0.2), transparent 50%)',
                }} />
              </div>

              {/* Fog of war */}
              <div className="absolute top-0 right-0 w-1/3 h-1/2 bg-gray-900/80 rounded-bl-[80px]" style={{
                clipPath: 'polygon(20% 0, 100% 0, 100% 100%, 0 80%)',
              }} />
              <div className="absolute bottom-0 left-0 w-1/4 h-1/3 bg-gray-900/70 rounded-tr-[60px]" style={{
                clipPath: 'polygon(0 20%, 80% 0, 100% 100%, 0 100%)',
              }} />

              {/* Tokens */}
              <motion.div
                className="absolute top-[30%] left-[25%] w-10 h-10 rounded-full bg-gradient-to-br from-blue-400 to-blue-600 border-2 border-blue-300 shadow-lg shadow-blue-500/30 flex items-center justify-center text-white text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                F
              </motion.div>
              <motion.div
                className="absolute top-[45%] left-[40%] w-10 h-10 rounded-full bg-gradient-to-br from-green-400 to-green-600 border-2 border-green-300 shadow-lg shadow-green-500/30 flex items-center justify-center text-white text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
              >
                R
              </motion.div>
              <motion.div
                className="absolute top-[35%] left-[55%] w-10 h-10 rounded-full bg-gradient-to-br from-purple-400 to-purple-600 border-2 border-purple-300 shadow-lg shadow-purple-500/30 flex items-center justify-center text-white text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1 }}
              >
                W
              </motion.div>
              <motion.div
                className="absolute top-[55%] left-[35%] w-10 h-10 rounded-full bg-gradient-to-br from-red-400 to-red-600 border-2 border-red-300 shadow-lg shadow-red-500/30 flex items-center justify-center text-white text-xs font-bold"
                animate={{ scale: [1, 1.05, 1] }}
                transition={{ duration: 2, repeat: Infinity, delay: 1.5 }}
              >
                C
              </motion.div>

              {/* Enemy tokens */}
              <div className="absolute top-[25%] right-[30%] w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-red-500/60 shadow-lg flex items-center justify-center">
                <span className="text-red-400 text-xs font-bold">💀</span>
              </div>
              <div className="absolute top-[60%] right-[25%] w-9 h-9 rounded-full bg-gradient-to-br from-gray-600 to-gray-800 border-2 border-red-500/60 shadow-lg flex items-center justify-center">
                <span className="text-red-400 text-xs font-bold">🐉</span>
              </div>

              {/* Measurement line */}
              <svg className="absolute inset-0 w-full h-full pointer-events-none" viewBox="0 0 100 100" preserveAspectRatio="none">
                <line x1="28" y1="33" x2="43" y2="48" stroke="rgba(245, 158, 11, 0.6)" strokeWidth="0.3" strokeDasharray="1,1" />
                <circle cx="28" cy="33" r="0.8" fill="rgba(245, 158, 11, 0.8)" />
                <circle cx="43" cy="48" r="0.8" fill="rgba(245, 158, 11, 0.8)" />
                <text x="35" y="38" fill="rgba(245, 158, 11, 0.9)" fontSize="2.5" textAnchor="middle">30ft</text>
              </svg>
            </div>

            {/* Sidebar */}
            <div className="hidden sm:flex flex-col w-56 lg:w-64 bg-gray-800/60 border-l border-gray-700/40 p-4 gap-3">
              {/* Initiative tracker */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                <div className="text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">Initiative</div>
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2 bg-blue-500/10 rounded px-2 py-1 border border-blue-500/20">
                    <div className="w-5 h-5 rounded-full bg-blue-500 flex items-center justify-center text-[10px] text-white font-bold">F</div>
                    <span className="text-xs text-gray-300 flex-1">Fighter</span>
                    <span className="text-xs text-amber-400 font-mono">18</span>
                  </div>
                  <div className="flex items-center gap-2 bg-red-500/10 rounded px-2 py-1 border border-red-500/20">
                    <span className="text-sm">💀</span>
                    <span className="text-xs text-gray-300 flex-1">Goblin</span>
                    <span className="text-xs text-amber-400 font-mono">15</span>
                  </div>
                  <div className="flex items-center gap-2 bg-green-500/10 rounded px-2 py-1 border border-green-500/20">
                    <div className="w-5 h-5 rounded-full bg-green-500 flex items-center justify-center text-[10px] text-white font-bold">R</div>
                    <span className="text-xs text-gray-300 flex-1">Ranger</span>
                    <span className="text-xs text-amber-400 font-mono">14</span>
                  </div>
                  <div className="flex items-center gap-2 bg-purple-500/10 rounded px-2 py-1 border border-purple-500/20">
                    <div className="w-5 h-5 rounded-full bg-purple-500 flex items-center justify-center text-[10px] text-white font-bold">W</div>
                    <span className="text-xs text-gray-300 flex-1">Wizard</span>
                    <span className="text-xs text-amber-400 font-mono">12</span>
                  </div>
                </div>
              </div>

              {/* Dice roller */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                <div className="text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">Dice</div>
                <div className="grid grid-cols-3 gap-1.5">
                  {['d4', 'd6', 'd8', 'd10', 'd12', 'd20'].map((die) => (
                    <div key={die} className="bg-gray-700/50 rounded px-2 py-1.5 text-center text-xs text-gray-300 hover:bg-amber-500/20 hover:text-amber-300 transition-colors cursor-pointer border border-gray-600/30">
                      {die}
                    </div>
                  ))}
                </div>
                <div className="mt-2 bg-gray-800/50 rounded px-2 py-1.5 text-center">
                  <span className="text-xs text-gray-400">2d8+2 = </span>
                  <span className="text-sm text-amber-400 font-bold">13</span>
                </div>
              </div>

              {/* Conditions */}
              <div className="bg-gray-900/50 rounded-lg p-3 border border-gray-700/30">
                <div className="text-xs text-amber-400 font-semibold mb-2 uppercase tracking-wider">Round 3</div>
                <div className="flex items-center gap-2">
                  <div className="flex-1 h-1.5 bg-gray-700 rounded-full overflow-hidden">
                    <div className="h-full w-2/3 bg-gradient-to-r from-amber-500 to-orange-500 rounded-full" />
                  </div>
                  <span className="text-xs text-gray-400">2/3</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function PrivacySection() {
  return (
    <section className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-950 to-gray-900" />
      <div className="relative max-w-5xl mx-auto">
        <motion.div
          className="bg-gradient-to-br from-gray-800/60 to-gray-900/60 border border-gray-700/40 rounded-3xl p-8 sm:p-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <div className="flex flex-col md:flex-row gap-8 items-start">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-green-500/10 border border-green-500/20 flex items-center justify-center">
                  <Lock className="w-6 h-6 text-green-400" />
                </div>
                <h2 className="text-3xl font-bold text-white">Your Data, Your Own</h2>
              </div>
              <p className="text-gray-300 text-lg leading-relaxed mb-6">
                Atlas works offline with files in your vault. No telemetry, no ads, no account needed.
                Every file Atlas creates stays yours and stays local — just like a sheet of paper would.
              </p>
              <ul className="space-y-3">
                {[
                  'Scenes saved as .atlasmap files in your vault',
                  'No account or server required for local play',
                  'No telemetry or tracking of any kind',
                  'Syncs with Obsidian Sync or any file sync',
                  'Open source — audit the code yourself',
                ].map((item) => (
                  <li key={item} className="flex items-start gap-3 text-gray-400">
                    <div className="w-5 h-5 rounded-full bg-green-500/20 flex items-center justify-center flex-shrink-0 mt-0.5">
                      <div className="w-2 h-2 rounded-full bg-green-400" />
                    </div>
                    {item}
                  </li>
                ))}
              </ul>
            </div>
            <div className="hidden md:flex flex-col items-center justify-center text-center p-6 bg-gray-800/50 rounded-2xl border border-gray-700/30">
              <div className="text-5xl mb-3">🗺️</div>
              <div className="text-amber-400 font-bold text-lg">100% Local</div>
              <div className="text-gray-500 text-sm mt-1">Your campaign stays yours</div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function InstallSection() {
  return (
    <section id="install" className="py-24 px-4 relative">
      <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/95 to-gray-900" />
      <div className="relative max-w-4xl mx-auto text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Get Started
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto mb-10">
            Atlas VTT is available through Obsidian's community plugins. Requires Obsidian 1.8.7+ on desktop.
          </p>
        </motion.div>

        <motion.div
          className="bg-gray-800/50 border border-gray-700/40 rounded-2xl p-8 text-left max-w-2xl mx-auto mb-8"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <h3 className="text-white font-semibold text-lg mb-4 flex items-center gap-2">
            <Download className="w-5 h-5 text-amber-400" />
            Installation Steps
          </h3>
          <ol className="space-y-4">
            {[
              'Open Settings → Community plugins and turn off Restricted mode',
              'Select Browse and search for "Atlas VTT"',
              'Select Install, then Enable',
              'Run "Atlas VTT: Open dashboard" from the command palette',
            ].map((step, i) => (
              <li key={i} className="flex items-start gap-3">
                <span className="w-7 h-7 rounded-full bg-amber-500/10 border border-amber-500/30 flex items-center justify-center flex-shrink-0 text-amber-400 text-sm font-bold">
                  {i + 1}
                </span>
                <span className="text-gray-300 pt-0.5">{step}</span>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <a
            href="https://atlas-vtt.dev/docs/start/install"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-gray-900 font-bold px-8 py-4 rounded-xl hover:from-amber-400 hover:to-orange-400 transition-all shadow-lg shadow-amber-500/20"
          >
            <BookOpen className="w-5 h-5" />
            Read the Guide
          </a>
          <a
            href="https://github.com/atlas-vtt/atlas-vtt/releases"
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-2 bg-white/5 border border-white/10 text-white font-semibold px-8 py-4 rounded-xl hover:bg-white/10 transition-all"
          >
            <Github className="w-5 h-5" />
            Latest Release
          </a>
        </motion.div>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="border-t border-gray-800 py-12 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          <div className="md:col-span-2">
            <div className="flex items-center gap-2 mb-4">
              <Compass className="w-6 h-6 text-amber-400" />
              <span className="text-lg font-bold text-white">
                Atlas<span className="text-amber-400">VTT</span>
              </span>
            </div>
            <p className="text-gray-400 text-sm leading-relaxed max-w-md">
              An open source virtual tabletop for TTRPGs that runs inside Obsidian.
              Built with love for the tabletop community. Your worlds, your rules, your files.
            </p>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Resources</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://atlas-vtt.dev/" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">Documentation</a></li>
              <li><a href="https://github.com/atlas-vtt/atlas-vtt" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">GitHub</a></li>
              <li><a href="https://github.com/atlas-vtt/atlas-vtt/releases" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">Releases</a></li>
              <li><a href="https://github.com/atlas-vtt/atlas-vtt/blob/main/CONTRIBUTING.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">Contributing</a></li>
            </ul>
          </div>
          <div>
            <h4 className="text-white font-semibold mb-3">Legal</h4>
            <ul className="space-y-2 text-sm">
              <li><a href="https://github.com/atlas-vtt/atlas-vtt/blob/main/LICENSE" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">License (AGPL-3.0)</a></li>
              <li><a href="https://github.com/atlas-vtt/atlas-vtt/blob/main/PRIVACY.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">Privacy Policy</a></li>
              <li><a href="https://github.com/atlas-vtt/atlas-vtt/blob/main/THIRD_PARTY_NOTICES.md" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-amber-400 transition-colors">Third Party Notices</a></li>
            </ul>
          </div>
        </div>
        <div className="border-t border-gray-800 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-gray-500 text-sm">
            © 2025–2026 Fabian Urbanek. Free software under AGPL-3.0.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="https://github.com/atlas-vtt/atlas-vtt"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://atlas-vtt.dev/"
              target="_blank"
              rel="noopener noreferrer"
              className="text-gray-400 hover:text-amber-400 transition-colors"
            >
              <ExternalLink className="w-5 h-5" />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default function App() {
  return (
    <div className="min-h-screen bg-gray-900 text-white">
      <Navbar />
      <HeroSection />
      <FeaturesSection />
      <ShowcaseSection />
      <HowItWorksSection />
      <GameSystemsSection />
      <PrivacySection />
      <InstallSection />
      <Footer />
    </div>
  );
}
