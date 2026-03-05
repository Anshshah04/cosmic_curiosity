import React, { useState, useEffect, useRef, useCallback } from 'react';
import {
  VenusOrbitSVG, StarFieldSVG, BlackHoleSVG, MoonDriftSVG, SaturnHexagonSVG, NeutronStarSVG,
  ForestNetworkSVG, OctopusHeartsSVG, FungusRingsSVG, TriplePointSVG, MonarchMigrationSVG, LightningSVG,
  DnaHelixSVG, ProteinFoldSVG, QuantumQubitsSVG, BrainBciSVG, InternetWeightSVG, BatteryChargeSVG
} from './Illustrations';
// --- UTILS ---
const clamp = (v, lo, hi) => Math.max(lo, Math.min(v, hi));
const inv = (start, end, v) => clamp((v - start) / (end - start), 0, 1);
const lerp = (a, b, t) => a + (b - a) * t;

const useWindowScroll = () => {
  const [scrollY, setScrollY] = useState(0);
  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY);
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);
  return scrollY;
};

const useScrollProgress = (ref) => {
  const [progress, setProgress] = useState(0);
  useEffect(() => {
    const handleScroll = () => {
      if (!ref.current) return;
      const rect = ref.current.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const totalScrollable = rect.height - viewportHeight;
      if (totalScrollable <= 0) return;
      const scrolled = viewportHeight - rect.top - viewportHeight;
      setProgress(clamp(scrolled / totalScrollable, 0, 1));
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('resize', handleScroll);
    handleScroll();
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleScroll);
    };
  }, [ref]);
  return progress;
};

// --- DATA ---
const PALETTES = [
  { id: 0, bg: '#F0F4FF', accent: '#4F46E5', text: '#0F172A', sub: '#64748B', muted: '#E2E8F0', glow: 'rgba(79,70,229,0.15)' },
  { id: 1, bg: '#FFF7ED', accent: '#EA580C', text: '#1C0A00', sub: '#7C2D12', muted: '#FFEDD5', glow: 'rgba(234,88,12,0.15)' },
  { id: 2, bg: '#F0FDF4', accent: '#16A34A', text: '#052E16', sub: '#14532D', muted: '#DCFCE7', glow: 'rgba(22,163,74,0.15)' },
  { id: 3, bg: '#FDF4FF', accent: '#9333EA', text: '#1A001E', sub: '#581C87', muted: '#FAE8FF', glow: 'rgba(147,51,234,0.15)' },
  { id: 4, bg: '#FFFBEB', accent: '#D97706', text: '#1C1100', sub: '#78350F', muted: '#FEF3C7', glow: 'rgba(217,119,6,0.15)' },
  { id: 5, bg: '#EFF6FF', accent: '#2563EB', text: '#0A1628', sub: '#1E3A8A', muted: '#DBEAFE', glow: 'rgba(37,99,235,0.15)' },
];

// Helper to convert hex to RGB array for interpolation
const hexToRgb = (hex) => {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? [parseInt(result[1], 16), parseInt(result[2], 16), parseInt(result[3], 16)] : [255, 255, 255];
};

const FACTS = [
  // SPACE
  {
    id: 's1', category: 'SPACE', headline: 'A day on Venus is longer than its year', detail: 'It takes Venus 243 Earth days to rotate once on its axis, but only 225 Earth days to orbit the Sun.', palette: 0, illustration: VenusOrbitSVG,
    learnMore: { description: 'Venus rotates backwards compared to most other planets. This slow, retrograde rotation means the Sun rises in the west and sets in the east.', facts: ['243 Earth days for one rotation', '225 Earth days for one solar orbit', 'Surface temp: 462°C', 'Atmosphere: 96% Carbon Dioxide'], reference: 'NASA Solar System Exploration', refLink: '#', tags: ['PLANETARY', 'TIME', 'ASTRONOMY'] }
  },
  {
    id: 's2', category: 'SPACE', headline: "More stars exist than Earth's sand grains", detail: 'There are roughly 10 sextillion stars in the observable universe, far outnumbering every grain of sand on all of Earth\'s beaches.', palette: 3, illustration: StarFieldSVG,
    learnMore: { description: 'Astronomers estimate there are about 200 billion trillion stars. This is a conservative estimate based only on the observable universe.', facts: ['10^24 estimated stars', '7.5 x 10^18 grains of sand', '200 billion galaxies', 'Observable universe is 93B light-years wide'], reference: 'European Space Agency', refLink: '#', tags: ['UNIVERSE', 'SCALE', 'STARS'] }
  },
  {
    id: 's3', category: 'SPACE', headline: 'Black holes can sing in B-flat', detail: 'Astronomers detected acoustic waves propagating through the gas surrounding the supermassive black hole in the Perseus cluster.', palette: 5, illustration: BlackHoleSVG,
    learnMore: { description: 'The sound wave is a B-flat, but it is 57 octaves lower than middle C, making it completely inaudible to human ears without being artificially shifted.', facts: ['Perseus cluster black hole', '57 octaves below middle C', 'Sound travels through hot gas', 'Detected by Chandra X-ray Observatory'], reference: 'NASA Chandra', refLink: '#', tags: ['ACOUSTICS', 'BLACK HOLES', 'PHYSICS'] }
  },
  {
    id: 's4', category: 'SPACE', headline: 'The Moon drifts 3.8 cm farther away each year', detail: 'Due to tidal forces transferring energy, the Moon is slowly spiraling away from Earth.', palette: 1, illustration: MoonDriftSVG,
    learnMore: { description: 'This drift means that eventually, total solar eclipses will no longer be possible because the Moon will appear too small to cover the Sun entirely.', facts: ['Drift rate: 3.8 cm/year', 'Caused by tidal friction', 'Earth\'s rotation is slowing down', 'Measured via Apollo laser reflectors'], reference: 'Lunar and Planetary Institute', refLink: '#', tags: ['LUNAR', 'GRAVITY', 'ORBITS'] }
  },
  {
    id: 's5', category: 'SPACE', headline: "Saturn's hexagonal storm is wider than 2 Earths", detail: 'A massive, persistent six-sided jet stream pattern encircles the north pole of Saturn.', palette: 4, illustration: SaturnHexagonSVG,
    learnMore: { description: 'This bizarre geometric storm is created by atmospheric waves interacting with the jet stream. It extends deep into the atmosphere.', facts: ['30,000 km across', 'Winds at 320 km/h', 'Rotates every 10h 39m', 'Changes color from blue to gold'], reference: 'Cassini Imaging Diary', refLink: '#', tags: ['PLANETARY', 'ATMOSPHERE', 'WEATHER'] }
  },
  {
    id: 's6', category: 'SPACE', headline: 'A teaspoon of neutron star weighs 10 million tons', detail: 'The highly compressed core of a collapsed star is incredibly dense.', palette: 3, illustration: NeutronStarSVG,
    learnMore: { description: 'Neutron stars are so dense that protons and electrons are crushed together to form neutrons. A sugar-cube-sized amount weighs about as much as a mountain.', facts: ['Density: 10^17 kg/m³', 'Radius: Only ~10 km', 'Mass: 1.4x the Sun', 'Formed in supernova explosions'], reference: 'Astrophysical Journal', refLink: '#', tags: ['STARS', 'DENSITY', 'PHYSICS'] }
  },

  // NATURE
  {
    id: 'n1', category: 'NATURE', headline: 'Trees communicate via underground fungal internet', detail: 'Mycorrhizal networks allow trees to share nutrients and send warning signals about drought or disease.', palette: 2, illustration: ForestNetworkSVG,
    learnMore: { description: 'Coined the "Wood Wide Web," this subterranean network of fungi connects the roots of plants, creating a cooperative ecosystem.', facts: ['Fungi provide phosphorus/nitrogen', 'Trees provide carbon/sugar', 'Older "hub trees" nourish saplings', 'Chemical signals warn of pests'], reference: 'Nature Ecology', refLink: '#', tags: ['FUNGI', 'BOTANY', 'SYMBIOSIS'] }
  },
  {
    id: 'n2', category: 'NATURE', headline: 'Octopuses have 3 hearts, blue blood & edit their RNA', detail: 'Their unique physiology includes copper-based blood, and the ability to proactively alter their genetic instructions.', palette: 3, illustration: OctopusHeartsSVG,
    learnMore: { description: 'Unlike most animals that adapt through slow DNA mutation, cephalopods can rapidly edit their RNA to adapt to changing temperatures and environments.', facts: ['2 branchial hearts, 1 systemic heart', 'Hemocyanin transports oxygen', 'Extensive RNA editing', 'Pops out arms independently'], reference: 'Cell Press', refLink: '#', tags: ['MARINE BIOLOGY', 'GENETICS', 'ANATOMY'] }
  },
  {
    id: 'n3', category: 'NATURE', headline: "Earth's largest organism is a 965-hectare fungus", detail: 'A single, continuously growing colony of Armillaria ostoyae spans an entire forest in Oregon.', palette: 1, illustration: FungusRingsSVG,
    learnaMore: { description: 'Known as the Humongous Fungus, this ancient organism is mostly hidden underground in the form of black, shoestring-like rhizomorphs.', facts: ['Area: 9.6 square kilometers', 'Estimated age: 2,400 to 8,650 years', 'Weight: Hundreds of tons', 'Pathogenic to certain trees'], reference: 'USDA Forest Service', refLink: '#', tags: ['MYCOLOGY', 'RECORD BREAKERS', 'FUNGI'] }
  },
  {
    id: 'n4', category: 'NATURE', headline: 'Water can be solid, liquid & gas simultaneously', detail: 'At the "triple point," specific temperature and pressure conditions allow all three phases of water to coexist in thermodynamic equilibrium.', palette: 5, illustration: TriplePointSVG,
    learnMore: { description: 'For water, the triple point occurs at precisely 0.01 °C and 611.657 pascals. It\'s used everywhere to define the kelvin temperature scale.', facts: ['Temperature: 0.01 °C', 'Pressure: 0.006 atm', 'Used for thermometer calibration', 'All phases boil and freeze at once'], reference: 'International Bureau of Weights and Measures', refLink: '#', tags: ['CHEMISTRY', 'WATER', 'PHYSICS'] }
  },
  {
    id: 'n5', category: 'NATURE', headline: 'Monarchs navigate 4,500 km via quantum mechanics', detail: 'The cryptochrome protein in their eyes uses quantum entanglement to sense Earth\'s magnetic field.', palette: 1, illustration: MonarchMigrationSVG,
    learnMore: { description: 'This radical intersection of quantum physics and macroscopic biology explains how multiple generations of butterflies can navigate to the exact same Mexican forest without having been there before.', facts: ['Navigates from Canada to Mexico', 'Cryptochrome reacts to blue light', 'Radical-pair quantum mechanism', 'Multi-generational migration'], reference: 'Journal of the Royal Society Interface', refLink: '#', tags: ['QUANTUM BIOLOGY', 'ENTOMOLOGY', 'MIGRATION'] }
  },
  {
    id: 'n6', category: 'NATURE', headline: 'Lightning strikes Earth 100 times every second', detail: 'That equates to over 8 million lightning strikes per day, primarily clustered over tropical landmasses.', palette: 4, illustration: LightningSVG,
    learnMore: { description: 'Lake Maracaibo in Venezuela is the most lightning-prone spot on Earth, receiving strikes 300 days a year due to unique wind and mountain topography.', facts: ['8.6 million strikes daily', 'Temperature: Up to 30,000 °C', 'Global electrical circuit driver', 'Most strikes are intra-cloud'], reference: 'NASA Earth Observatory', refLink: '#', tags: ['METEOROLOGY', 'WEATHER', 'ATMOSPHERE'] }
  },

  // TECH
  {
    id: 't1', category: 'TECH', headline: "DNA could store all of humanity's data twice over", detail: 'One gram of DNA can theoretically hold 215 petabytes of data, making it an incredibly dense, long-lasting storage medium.', palette: 2, illustration: DnaHelixSVG,
    learnMore: { description: 'Since DNA has a half-life of 520 years in less-than-ideal conditions, information encoded into A, C, T, and G base pairs could be retrieved centuries later.', facts: ['Density: 215 PB per gram', 'Requires synthesizing and sequencing', 'Power-free storage', 'Can last thousands of years'], reference: 'Science Magazine', refLink: '#', tags: ['BIOTECH', 'DATA', 'STORAGE'] }
  },
  {
    id: 't2', category: 'TECH', headline: 'AI solved a 50-year biology challenge in 2020', detail: 'DeepMind\'s AlphaFold 2 successfully predicted the 3D structures of proteins based solely on their amino acid sequences.', palette: 5, illustration: ProteinFoldSVG,
    learnMore: { description: 'Understanding protein folding is critical to drug discovery and understanding diseases. AlphaFold provided atomic-level accuracy that previously took decades of lab work.', facts: ['Solved the "Protein Folding Problem"', 'Predicted 200M+ structures', 'Uses deep learning neural networks', 'Accelerates drug development'], reference: 'DeepMind / Nature', refLink: '#', tags: ['AI', 'COMPUTATIONAL BIOLOGY', 'MEDICINE'] }
  },
  {
    id: 't3', category: 'TECH', headline: '300 qubits hold more states than atoms in the universe', detail: 'Quantum computers use superposition and entanglement to represent an exponentially vast number of possibilities simultaneously.', palette: 0, illustration: QuantumQubitsSVG,
    learnMore: { description: 'While a classical bit is 0 or 1, a qubit exists in a probability cloud of both. When 300 qubits are perfectly entangled, they represent 2^300 possible states.', facts: ['2^300 states represented', 'Requires near absolute zero temps', 'Breaks classical encryption models', 'Uses superposition and entanglement'], reference: 'MIT Technology Review', refLink: '#', tags: ['QUANTUM', 'COMPUTING', 'PHYSICS'] }
  },
  {
    id: 't4', category: 'TECH', headline: 'Brain implants restore speech at 80 words per minute', detail: 'New brain-computer interfaces decode neural signals into text on a screen with high speed and accuracy.', palette: 3, illustration: BrainBciSVG,
    learnMore: { description: 'Using microelectrode arrays placed on the brain\'s speech center, patients who have lost the ability to speak can communicate using a digital avatar.', facts: ['Decodes intended phonemes', '90%+ accuracy rate', 'Uses deep learning models', 'Surpasses previous 15 wpm limits'], reference: 'UCSF / Nature', refLink: '#', tags: ['BCI', 'NEUROSCIENCE', 'PROSTHETICS'] }
  },
  {
    id: 't5', category: 'TECH', headline: 'The entire internet weighs about one strawberry', detail: 'When you calculate the mass of all the electrons moving to power digital information, the entire web weighs roughly 50 grams.', palette: 2, illustration: InternetWeightSVG,
    learnMore: { description: 'Although massive data centers require physical infrastructure, the actual data—represented by trapped electrons—is nearly weightless.', facts: ['Weight: ~50 grams', 'Calculated by Vsauce (Michael Stevens)', '5 million terabytes of information', 'Energy runs through billions of servers'], reference: 'Discover Magazine', refLink: '#', tags: ['INTERNET', 'PHYSICS', 'INFORMATION'] }
  },
  {
    id: 't6', category: 'TECH', headline: 'Solid-state batteries could charge your phone in 5 minutes', detail: 'By replacing liquid electrolytes with solid material, next-gen batteries drastically improve charging speed and energy density.', palette: 2, illustration: BatteryChargeSVG,
    learnMore: { description: 'Solid-state batteries are safer because they are less prone to fires, and they can pack far more energy into the same physical space than current lithium-ion models.', facts: ['Eliminates flammable liquid core', 'Higher energy density', 'Performs better in cold weather', 'Key for future EVs'], reference: 'CleanTechnica', refLink: '#', tags: ['ENERGY', 'BATTERIES', 'MATERIAL SCIENCE'] }
  },
];

// Provide default fallback for typos in facts array above
FACTS.forEach(f => {
  if (f.learnaMore) {
    f.learnMore = f.learnaMore;
    delete f.learnaMore;
  }
});



const Navbar = ({ activeFilters, onToggleFilter }) => {
  const scrollY = useWindowScroll();
  const isScrolled = scrollY > 60;

  return (
    <nav style={{
      position: 'fixed', top: 0, left: 0, right: 0, height: 58,
      backgroundColor: isScrolled ? 'rgba(255,255,255,0.94)' : 'transparent',
      backdropFilter: isScrolled ? 'blur(20px)' : 'none',
      borderBottom: isScrolled ? '1px solid #E2E8F0' : 'none',
      zIndex: 100, transition: 'all 0.3s ease',
      display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0 40px'
    }}>
      <div className="font-display font-black text-xl tracking-tight text-[#0F172A] flex items-center gap-2">
        Cosmic Curiosity <span className="text-[#4F46E5]">✦</span>
      </div>
      <div className="flex gap-2">
        {['ALL', 'SPACE', 'NATURE', 'TECH'].map(cat => (
          <button
            key={cat}
            onClick={() => onToggleFilter(cat)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold tracking-wider transition-colors
              ${activeFilters === cat ? 'bg-[#0F172A] text-white' : 'bg-transparent text-[#64748B] hover:bg-[#F0F4FF]'}`}
          >
            {cat}
          </button>
        ))}
      </div>
      <button className="px-4 py-1.5 rounded-xl font-medium text-white transition-transform hover:scale-105"
        style={{ background: 'linear-gradient(135deg, #4F46E5, #9333EA)' }}>
        🔀 Shuffle
      </button>
    </nav>
  );
};

const Hero = () => {
  const scrollY = useWindowScroll();
  const opacity = clamp(1 - scrollY / 500, 0, 1);
  const translateY = scrollY * 0.4;

  return (
    <div className="relative w-full h-[100vh] flex flex-col items-center justify-center overflow-hidden"
      style={{ backgroundColor: '#FAFBFF' }}>

      {/* Ambient Orbs */}
      <div className="absolute w-[600px] h-[600px] rounded-full blur-[100px] bg-[#FFF0E8]/60 top-[-100px] left-[-100px] animate-pulse" style={{ animationDuration: '6s' }} />
      <div className="absolute w-[500px] h-[500px] rounded-full blur-[100px] bg-[#EFF6FF]/60 bottom-0 right-[-50px] animate-pulse" style={{ animationDuration: '8s' }} />

      <div className="z-10 text-center flex flex-col items-center" style={{ transform: `translateY(${translateY}px)`, opacity }}>
        <div className="mb-6 flex items-center gap-2 px-4 py-1.5 rounded-full bg-white border border-[#E2E8F0] shadow-sm text-sm font-medium text-[#64748B]">
          <span className="w-2 h-2 rounded-full bg-[#16A34A] animate-pulse"></span>
          18 Facts · Live Animated
        </div>

        <h1 className="font-display text-7xl md:text-[100px] leading-none mb-6 text-[#0F172A] tracking-tighter">
          Cosmic <br />
          <span style={{ background: 'linear-gradient(to right, #4F46E5, #9333EA, #EA580C)', WebkitBackgroundClip: 'text', color: 'transparent' }}>Curiosity</span>
        </h1>

        <p className="text-xl text-[#64748B] max-w-md font-body leading-relaxed mb-10">
          Scroll to discover fascinating truths about space, nature, and the technology that binds them.
        </p>
      </div>

      <div className="absolute bottom-12 flex flex-col items-center opacity-60">
        <div className="w-[1px] h-12 bg-gradient-to-b from-transparent to-[#0F172A] mb-2" />
        <span className="font-mono text-xs text-[#0F172A] tracking-widest uppercase">Scroll to begin</span>
      </div>
    </div>
  );
};

const ScrollScene = ({ fact, index, onLearnMore }) => {
  const ref = useRef(null);
  const progress = useScrollProgress(ref);
  const p = PALETTES[fact.palette];

  // Interlude handles colors, but just in case
  const bg = p.bg;

  // Animation values using inv & lerp
  const anim = {
    illustration: {
      x: lerp(60, 0, inv(0, 0.4, progress)),
      opacity: inv(0, 0.4, progress),
    },
    headline: {
      x: lerp(-60, 0, inv(0.1, 0.5, progress)),
      opacity: inv(0.1, 0.5, progress),
    },
    tags: {
      y: lerp(20, 0, inv(0.2, 0.55, progress)),
      opacity: inv(0.2, 0.55, progress),
    },
    cta: {
      y: lerp(24, 0, inv(0.35, 0.65, progress)),
      opacity: inv(0.35, 0.65, progress),
    },
    detail: {
      y: lerp(18, 0, inv(0.45, 0.75, progress)),
      opacity: inv(0.45, 0.75, progress),
    },
    exitFade: 1 - inv(0.88, 0.98, progress),
  };

  const sceneOpacity = clamp(anim.exitFade, 0, 1);

  return (
    <div ref={ref} className="relative h-[280vh] w-full" style={{ backgroundColor: bg }}>
      <div className="sticky top-0 h-[100vh] w-full overflow-hidden flex items-center justify-center" style={{ backgroundColor: bg }}>

        {/* Glow Orb */}
        <div className="absolute w-[50vw] h-[50vw] rounded-full blur-[80px] pointer-events-none"
          style={{ background: p.glow, top: '25%', left: '25%' }} />

        {/* Background Number */}
        <div className="absolute top-[10vh] left-[50%] translate-x-[-10%] font-mono font-black pointer-events-none text-[35vw]"
          style={{ color: p.accent, opacity: 0.05, mixBlendMode: 'multiply' }}>
          {(index + 1).toString().padStart(2, '0')}
        </div>

        {/* Content Layout */}
        <div className="relative z-10 w-full max-w-[1200px] flex flex-row gap-[100px] px-[60px] items-center"
          style={{ opacity: sceneOpacity }}>

          {/* Left Col: Illustration */}
          <div className="flex-[0_0_46%]">
            <div className="rounded-[24px] overflow-hidden border-2 aspect-[3/2] bg-white transition-transform duration-500 hover:scale-[1.04]"
              style={{
                borderColor: `${p.muted}99`,
                boxShadow: `0 30px 80px ${p.glow}, 0 8px 24px rgba(0,0,0,0.08)`,
                transform: `translateX(${anim.illustration.x}px)`,
                opacity: Math.max(0, Math.min(1, anim.illustration.opacity))
              }}>
              <fact.illustration color={p.accent} />
            </div>
          </div>

          {/* Right Col: Text */}
          <div className="flex-1 flex flex-col items-start">
            <div style={{ transform: `translateY(${anim.tags.y}px)`, opacity: anim.tags.opacity }}>
              <span className="px-3 py-1 rounded-full text-xs font-bold tracking-widest text-white mb-6 inline-block"
                style={{ backgroundColor: p.accent }}>
                {fact.category}
              </span>
            </div>

            <h2 className="font-display text-5xl md:text-7xl leading-none mb-6 tracking-tighter"
              style={{ color: p.text, transform: `translateX(${anim.headline.x}px)`, opacity: anim.headline.opacity }}>
              {fact.headline}
            </h2>

            <p className="font-mono text-base md:text-lg leading-relaxed mb-10 max-w-[500px]"
              style={{ color: p.sub, transform: `translateY(${anim.detail.y}px)`, opacity: anim.detail.opacity }}>
              {fact.detail}
            </p>

            <button
              onClick={() => onLearnMore(fact)}
              className="px-6 py-3 rounded-[14px] text-white font-medium transition-transform hover:scale-105 active:scale-95"
              style={{ backgroundColor: p.accent, transform: `translateY(${anim.cta.y}px)`, opacity: anim.cta.opacity }}>
              Learn More →
            </button>
          </div>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-0 left-0 h-[3px]" style={{ width: `${progress * 100}%`, backgroundColor: p.accent }} />

        {/* Hint */}
        {progress < 0.05 && (
          <div className="absolute bottom-8 text-sm font-mono tracking-widest uppercase opacity-40 animate-pulse"
            style={{ color: p.text }}>
            ↓ Keep Scrolling
          </div>
        )}

      </div>
    </div>
  );
};

const Interlude = ({ prevPalette, nextPalette }) => {
  const ref = useRef(null);
  const progress = useScrollProgress(ref);

  // Realtime RGB lerp between backgrounds
  const [r1, g1, b1] = hexToRgb(prevPalette.bg);
  const [r2, g2, b2] = hexToRgb(nextPalette.bg);
  const r = Math.round(lerp(r1, r2, progress));
  const g = Math.round(lerp(g1, g2, progress));
  const b = Math.round(lerp(b1, b2, progress));

  const accent = nextPalette.accent;

  return (
    <div ref={ref} className="h-[80vh] relative">
      <div className="sticky top-0 h-[100vh] w-full flex flex-col items-center justify-center pointer-events-auto"
        style={{ backgroundColor: `rgb(${r},${g},${b})` }}>
        <span className="font-mono text-xs uppercase tracking-widest mb-6 opacity-40">Ready for a shift?</span>
        <button className="px-8 py-4 rounded-[16px] text-white font-body font-semibold text-lg transition-transform hover:scale-[1.06] shadow-xl"
          style={{ backgroundColor: accent, boxShadow: `0 20px 40px ${nextPalette.glow}` }}>
          🔀 Discover Random Fact
        </button>
        <span className="font-mono text-xs uppercase tracking-widest mt-12 opacity-30">↓ Keep scrolling</span>
      </div>
    </div>
  );
};

const Modal = ({ fact, onClose }) => {
  if (!fact) return null;
  const p = PALETTES[fact.palette];

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 animation-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={onClose} />
      <div className="relative w-full max-w-[660px] bg-white rounded-[28px] shadow-2xl overflow-hidden translate-y-4 animation-slide-up flex flex-col max-h-[90vh]">

        <button onClick={onClose} className="absolute top-4 right-4 w-8 h-8 flex items-center justify-center rounded-full bg-black/10 hover:bg-black/20 text-[#0F172A] z-10 transition-colors">
          ✕
        </button>

        <div className="h-[160px] flex items-center justify-center p-8 shrink-0"
          style={{ background: `linear-gradient(135deg, ${p.bg} 0%, ${p.muted} 100%)` }}>
          <h3 className="font-display text-3xl leading-tight text-center" style={{ color: p.text }}>
            {fact.headline}
          </h3>
        </div>

        <div className="p-8 overflow-y-auto">
          <p className="font-body text-[#64748B] text-lg leading-relaxed mb-8">
            {fact.learnMore.description}
          </p>

          <ul className="space-y-4 mb-8">
            {fact.learnMore.facts.map((f, i) => (
              <li key={i} className="flex items-start gap-4">
                <span className="font-mono font-bold shrink-0 mt-0.5" style={{ color: p.accent }}>{(i + 1).toString().padStart(2, '0')}.</span>
                <span className="font-body text-[#0F172A] font-medium">{f}</span>
              </li>
            ))}
          </ul>

          <div className="flex gap-2 mb-8 flex-wrap">
            {fact.learnMore.tags.map(t => (
              <span key={t} className="px-3 py-1 bg-[#F0F4FF] text-[#64748B] rounded-full text-xs font-semibold tracking-wider font-mono">
                {t}
              </span>
            ))}
          </div>

          <a href={fact.learnMore.refLink} target="_blank" rel="noreferrer"
            className="w-full py-4 rounded-[14px] flex items-center justify-center gap-2 text-white font-semibold transition-transform hover:scale-[1.02]"
            style={{ backgroundColor: p.accent }}>
            Read Source: {fact.learnMore.reference} <span className="text-xl leading-none">↗</span>
          </a>
        </div>
      </div>
    </div>
  );
};

// --- MAIN APP ---
export default function App() {
  const [activeFilter, setActiveFilter] = useState('ALL');
  const [activeModalFact, setActiveModalFact] = useState(null);

  // Prevent body scroll when modal is open
  useEffect(() => {
    if (activeModalFact) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [activeModalFact]);

  const filteredFacts = activeFilter === 'ALL' ? FACTS : FACTS.filter(f => f.category === activeFilter);

  // Inject modal animations
  useEffect(() => {
    const style = document.createElement('style');
    style.innerHTML = `
      @keyframes slideUp { from { transform: translateY(40px); opacity: 0; } to { transform: translateY(0); opacity: 1; } }
      @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
      .animation-slide-up { animation: slideUp 0.4s cubic-bezier(0.16, 1, 0.3, 1) forwards; }
      .animation-fade-in { animation: fadeIn 0.3s ease forwards; }
    `;
    document.head.appendChild(style);
    return () => document.head.removeChild(style);
  }, []);

  return (
    <>
      <Navbar activeFilters={activeFilter} onToggleFilter={setActiveFilter} />

      <main>
        <Hero />

        {filteredFacts.map((fact, index) => {
          const isInterludeNext = (index + 1) % 6 === 0 && index !== filteredFacts.length - 1;
          const prevPalette = PALETTES[fact.palette];
          const nextPalette = isInterludeNext ? PALETTES[filteredFacts[index + 1].palette] : null;

          return (
            <React.Fragment key={fact.id}>
              <ScrollScene fact={fact} index={index} onLearnMore={setActiveModalFact} />
              {isInterludeNext && nextPalette && (
                <Interlude prevPalette={prevPalette} nextPalette={nextPalette} />
              )}
            </React.Fragment>
          );
        })}
      </main>

      <Modal fact={activeModalFact} onClose={() => setActiveModalFact(null)} />
    </>
  );
}
