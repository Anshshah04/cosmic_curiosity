import React from 'react';

// SPACE
export const VenusOrbitSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes orbit { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      @keyframes spinBack { from { transform: rotate(360deg); } to { transform: rotate(0deg); } }
    `}</style>
        <circle cx="150" cy="100" r="24" fill={color} opacity="0.3" />
        <circle cx="150" cy="100" r="14" fill={color} opacity="0.9" />
        <g style={{ transformOrigin: '150px 100px', animation: 'orbit 20s linear infinite' }}>
            <circle cx="150" cy="100" r="70" fill="none" stroke={color} strokeWidth="1" strokeDasharray="4 4" opacity="0.5" />
            <circle cx="220" cy="100" r="8" fill={color} opacity="0.8" style={{ transformOrigin: '220px 100px', animation: 'spinBack 4s linear infinite' }} />
        </g>
    </svg>
);

export const StarFieldSVG = ({ color }) => {
    const stars = Array.from({ length: 55 }).map((_, i) => ({
        cx: Math.random() * 300, cy: Math.random() * 200, r: Math.random() * 1.5 + 0.5,
        delay: Math.random() * 5, dur: Math.random() * 3 + 2
    }));
    return (
        <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
            <style>{`@keyframes twinkle { 0%, 100% { opacity: 0.2; } 50% { opacity: 1; transform: scale(1.5); } }`}</style>
            <rect width="100%" height="100%" fill="#0F172A" />
            {stars.map((s, i) => (
                <circle key={i} cx={s.cx} cy={s.cy} r={s.r} fill={color}
                    style={{ transformOrigin: `${s.cx}px ${s.cy}px`, animation: `twinkle ${s.dur}s ease-in-out ${s.delay}s infinite` }} />
            ))}
        </svg>
    );
};

export const BlackHoleSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes spinDisk { 100% { transform: rotate(360deg) scaleY(0.4); } }
      @keyframes ripple { 0% { r: 30; opacity: 0.8; stroke-width: 4; } 100% { r: 140; opacity: 0; stroke-width: 0.5; } }
    `}</style>
        <defs>
            <radialGradient id="bhGlow">
                <stop offset="0%" stopColor="#000" />
                <stop offset="30%" stopColor="#000" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </radialGradient>
        </defs>
        <rect width="100%" height="100%" fill="#0A0A0F" />
        <circle cx="150" cy="100" r="100" fill="url(#bhGlow)" />
        <g style={{ transformOrigin: '150px 100px', transform: 'scaleY(0.4)', animation: 'spinDisk 12s linear infinite' }}>
            <circle cx="150" cy="100" r="80" fill="none" stroke={color} strokeWidth="8" opacity="0.4" />
            <circle cx="150" cy="100" r="95" fill="none" stroke={color} strokeWidth="2" strokeDasharray="10 20" opacity="0.6" />
        </g>
        <circle cx="150" cy="100" r="30" fill="none" stroke={color} style={{ transformOrigin: '150px 100px', animation: 'ripple 3s ease-out infinite' }} />
        <circle cx="150" cy="100" r="30" fill="none" stroke={color} style={{ transformOrigin: '150px 100px', animation: 'ripple 3s ease-out 1.5s infinite' }} />
        <circle cx="150" cy="100" r="28" fill="#000" />
    </svg>
);

export const MoonDriftSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes drift { 0% { cx: 150; opacity: 1; } 80% { cx: 280; opacity: 0; } 100% { cx: 150; opacity: 0; } }
      @keyframes trail { 0% { width: 0; opacity: 0.5; } 80% { width: 130; opacity: 0; } 100% { width: 0; opacity: 0; } }
    `}</style>
        <circle cx="80" cy="100" r="40" fill={color} opacity="0.9" />
        <path d="M 100 20 Q 150 100 100 180" fill="none" stroke={color} strokeWidth="2" opacity="0.2" strokeDasharray="4 4" />
        <circle cy="100" r="12" fill={color} opacity="0.6" style={{ animation: 'drift 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite' }} />
        <rect x="80" y="99" height="2" fill={color} style={{ animation: 'trail 6s cubic-bezier(0.2, 0.8, 0.2, 1) infinite' }} />
    </svg>
);

export const SaturnHexagonSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes spinFast { 100% { transform: rotate(360deg); } }
      @keyframes spinSlow { 100% { transform: rotate(-360deg) scaleY(0.3); } }
    `}</style>
        <g style={{ transformOrigin: '150px 100px', transform: 'scaleY(0.3)', animation: 'spinSlow 20s linear infinite' }}>
            <circle cx="150" cy="100" r="120" fill="none" stroke={color} strokeWidth="15" opacity="0.2" />
            <circle cx="150" cy="100" r="90" fill="none" stroke={color} strokeWidth="5" opacity="0.4" strokeDasharray="20 10" />
        </g>
        <circle cx="150" cy="100" r="50" fill={color} opacity="0.8" />
        <polygon points="150,60 184.6,80 184.6,120 150,140 115.4,120 115.4,80" fill="none" stroke="#fff" strokeWidth="3" opacity="0.9"
            style={{ transformOrigin: '150px 100px', animation: 'spinFast 8s linear infinite' }} />
        <polygon points="150,70 176,85 176,115 150,130 124,115 124,85" fill="none" stroke="#fff" strokeWidth="1" opacity="0.5"
            style={{ transformOrigin: '150px 100px', animation: 'spinFast 12s linear infinite reverse' }} />
    </svg>
);

export const NeutronStarSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes lighthouse { 0%, 100% { transform: rotate(-30deg); opacity: 0.3; } 50% { transform: rotate(30deg); opacity: 1; } }
      @keyframes crush { 0%, 100% { r: 14; } 50% { r: 12; } }
      @keyframes radiate { 0% { r: 14; opacity: 1; } 100% { r: 80; opacity: 0; stroke-width: 0; } }
    `}</style>
        <rect width="100%" height="100%" fill="#0A0A0F" />
        <circle cx="150" cy="100" r="14" fill="#fff" style={{ animation: 'crush 0.1s infinite' }} />
        <g style={{ transformOrigin: '150px 100px', animation: 'lighthouse 1s ease-in-out infinite' }}>
            <polygon points="150,100 50,0 250,0" fill={`url(#beam-${color})`} opacity="0.6" />
            <polygon points="150,100 50,200 250,200" fill={`url(#beam-${color})`} opacity="0.6" />
        </g>
        <defs>
            <linearGradient id={`beam-${color}`} x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="100%" stopColor={color} stopOpacity="1" />
            </linearGradient>
        </defs>
        <circle cx="150" cy="100" fill="none" stroke={color} strokeWidth="4" style={{ animation: 'radiate 1.5s infinite linear' }} />
    </svg>
);

// NATURE
export const ForestNetworkSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes flow { to { stroke-dashoffset: -40; } }
      @keyframes nodePulse { 0%, 100% { opacity: 0.6; r: 4; } 50% { opacity: 1; r: 8; box-shadow: 0 0 10px; } }
    `}</style>
        <path d="M 50 150 Q 100 180 150 140 T 250 160" fill="none" stroke={color} strokeWidth="3" strokeDasharray="8 8" style={{ animation: 'flow 2s linear infinite' }} />
        <path d="M 100 120 Q 150 160 200 110 T 280 130" fill="none" stroke={color} strokeWidth="2" strokeDasharray="6 6" opacity="0.6" style={{ animation: 'flow 3s linear infinite reverse' }} />

        <circle cx="50" cy="150" fill={color} style={{ animation: 'nodePulse 3s infinite' }} />
        <circle cx="150" cy="140" fill={color} style={{ animation: 'nodePulse 3s infinite 1s' }} />
        <circle cx="250" cy="160" fill={color} style={{ animation: 'nodePulse 3s infinite 2s' }} />
        <circle cx="100" cy="120" fill={color} style={{ animation: 'nodePulse 2s infinite' }} />
        <circle cx="200" cy="110" fill={color} style={{ animation: 'nodePulse 2s infinite 1s' }} />

        <rect x="45" y="60" width="10" height="90" fill={color} opacity="0.3" rx="2" />
        <rect x="145" y="40" width="10" height="100" fill={color} opacity="0.3" rx="2" />
        <rect x="245" y="70" width="10" height="90" fill={color} opacity="0.3" rx="2" />
        <path d="M 20 80 Q 50 20 80 80 Z" fill={color} opacity="0.4" />
        <path d="M 100 60 Q 150 0 200 60 Z" fill={color} opacity="0.4" />
        <path d="M 210 90 Q 250 30 290 90 Z" fill={color} opacity="0.4" />
    </svg>
);

export const OctopusHeartsSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes beat1 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.3); } }
      @keyframes beat2 { 0%, 100% { transform: scale(1); } 50% { transform: scale(1.4); } }
      @keyframes pump { to { stroke-dashoffset: -30; } }
    `}</style>
        <path d="M 150 100 Q 100 50 150 170 Q 200 50 150 100" fill="none" stroke={color} strokeWidth="4" strokeDasharray="10 5" opacity="0.4" style={{ animation: 'pump 1s linear infinite' }} />
        <path d="M 100 130 Q 50 80 100 170 Q 150 80 100 130" fill="none" stroke={color} strokeWidth="3" strokeDasharray="8 4" opacity="0.3" style={{ animation: 'pump 1.5s linear infinite reverse' }} />
        <path d="M 200 130 Q 150 80 200 170 Q 250 80 200 130" fill="none" stroke={color} strokeWidth="3" strokeDasharray="8 4" opacity="0.3" style={{ animation: 'pump 1.5s linear infinite' }} />

        <g style={{ transformOrigin: '150px 100px', animation: 'beat1 1s infinite' }}>
            <path d="M 150 115 C 150 115 130 90 150 75 C 170 90 150 115 150 115" fill={color} opacity="0.9" />
        </g>
        <g style={{ transformOrigin: '100px 130px', animation: 'beat2 0.8s infinite 0.2s' }}>
            <path d="M 100 142 C 100 142 85 120 100 110 C 115 120 100 142 100 142" fill={color} opacity="0.7" />
        </g>
        <g style={{ transformOrigin: '200px 130px', animation: 'beat2 0.8s infinite 0.4s' }}>
            <path d="M 200 142 C 200 142 185 120 200 110 C 215 120 200 142 200 142" fill={color} opacity="0.7" />
        </g>
    </svg>
);

export const FungusRingsSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes growRing { 0% { r: 10; opacity: 0.8; stroke-width: 8; } 100% { r: 120; opacity: 0; stroke-width: 1; } }
      @keyframes sporeFloat { 0%, 100% { transform: translateY(0); opacity: 0.2; } 50% { transform: translateY(-20px); opacity: 0.8; } }
    `}</style>
        <circle cx="150" cy="120" fill="none" stroke={color} style={{ animation: 'growRing 4s linear infinite' }} />
        <circle cx="150" cy="120" fill="none" stroke={color} style={{ animation: 'growRing 4s linear infinite 1.3s' }} />
        <circle cx="150" cy="120" fill="none" stroke={color} style={{ animation: 'growRing 4s linear infinite 2.6s' }} />

        <circle cx="150" cy="120" r="15" fill={color} opacity="0.9" />
        <path d="M 130 140 Q 150 130 170 140" fill="none" stroke={color} strokeWidth="4" opacity="0.5" />

        {Array.from({ length: 12 }).map((_, i) => (
            <circle key={i} cx={Math.random() * 200 + 50} cy={Math.random() * 100 + 50} r={Math.random() * 3 + 1} fill={color}
                style={{ animation: `sporeFloat ${Math.random() * 3 + 2}s infinite ${Math.random() * 2}s` }} />
        ))}
    </svg>
);

export const TriplePointSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes stateShift { 0%, 100% { opacity: 0.3; transform: scale(0.9); } 33% { opacity: 1; transform: scale(1.1); box-shadow: 0 0 20px; } }
      @keyframes vaporRise { 0% { transform: translateY(0) scale(1); opacity: 0.8; } 100% { transform: translateY(-40px) scale(1.5); opacity: 0; } }
      @keyframes liquidRipple { 0% { r: 30; opacity: 0.6; } 100% { r: 50; opacity: 0; } }
    `}</style>
        {/* Ice (Solid) */}
        <g style={{ transformOrigin: '80px 100px', animation: 'stateShift 6s infinite' }}>
            <polygon points="80,70 110,85 110,115 80,130 50,115 50,85" fill={color} opacity="0.8" />
            <polygon points="80,70 110,85 80,105 50,85" fill="#fff" opacity="0.4" />
        </g>

        {/* Liquid */}
        <g style={{ transformOrigin: '150px 140px', animation: 'stateShift 6s infinite 2s' }}>
            <path d="M 120 130 Q 150 150 180 130 Q 150 170 120 130" fill={color} opacity="0.8" />
            <circle cx="150" cy="140" fill="none" stroke={color} strokeWidth="2" style={{ animation: 'liquidRipple 2s infinite' }} />
        </g>

        {/* Vapor (Gas) */}
        <g style={{ transformOrigin: '220px 80px', animation: 'stateShift 6s infinite 4s' }}>
            <circle cx="210" cy="100" r="10" fill={color} style={{ animation: 'vaporRise 2s infinite' }} />
            <circle cx="230" cy="110" r="15" fill={color} style={{ animation: 'vaporRise 2.5s infinite 0.5s' }} />
            <circle cx="220" cy="120" r="12" fill={color} style={{ animation: 'vaporRise 2s infinite 1.2s' }} />
        </g>

        {/* Connection lines */}
        <path d="M 100 100 L 130 130 M 170 130 L 200 100 M 100 80 L 200 80" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" opacity="0.3" />
        <circle cx="150" cy="100" r="4" fill={color} />
    </svg>
);

export const MonarchMigrationSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes flap { 0%, 100% { transform: scaleY(1); } 50% { transform: scaleY(0.2); } }
      @keyframes migrate1 { 0% { offset-distance: 0%; opacity: 0; } 10% { opacity: 1; } 90% { opacity: 1; } 100% { offset-distance: 100%; opacity: 0; } }
      .path-line { fill: none; stroke: ${color}; stroke-width: 2; stroke-dasharray: 5 10; opacity: 0.3; }
      .flyer { offset-path: path("M 20 180 C 100 20 200 20 280 180"); animation: migrate1 8s linear infinite; }
    `}</style>
        <path id="migPath" d="M 20 180 C 100 20 200 20 280 180" className="path-line" />

        <g className="flyer" style={{ animationDelay: '0s' }}>
            <path d="M -10 -10 Q 0 0 10 -10 Q 0 0 -10 -10" fill={color} style={{ transformOrigin: 'center', animation: 'flap 0.2s infinite' }} />
        </g>
        <g className="flyer" style={{ animationDelay: '2.5s' }}>
            <path d="M -8 -8 Q 0 0 8 -8 Q 0 0 -8 -8" fill={color} opacity="0.8" style={{ transformOrigin: 'center', animation: 'flap 0.25s infinite' }} />
        </g>
        <g className="flyer" style={{ animationDelay: '5s' }}>
            <path d="M -12 -12 Q 0 0 12 -12 Q 0 0 -12 -12" fill={color} opacity="0.6" style={{ transformOrigin: 'center', animation: 'flap 0.18s infinite' }} />
        </g>

        <circle cx="280" cy="180" r="10" fill="none" stroke={color} strokeWidth="3" opacity="0.5" />
        <circle cx="280" cy="180" r="4" fill={color} />
    </svg>
);

export const LightningSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes strike { 0%, 10%, 100% { opacity: 0; } 5%, 8% { opacity: 1; stroke-width: 6; } }
      @keyframes strikeInner { 0%, 10%, 100% { opacity: 0; } 5%, 8% { opacity: 1; } }
      @keyframes floatCloud { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-5px); } }
    `}</style>
        <g style={{ animation: 'floatCloud 4s ease-in-out infinite' }}>
            <path d="M 90 80 Q 90 50 120 50 Q 150 20 180 50 Q 220 50 210 80 Z" fill={color} opacity="0.4" />
            <path d="M 120 90 Q 120 60 150 60 Q 180 30 210 60 Q 250 60 240 90 Z" fill={color} opacity="0.6" />
        </g>

        <polyline points="150,70 130,120 155,120 120,190" fill="none" stroke={color} strokeLinejoin="round" opacity="0"
            style={{ animation: 'strike 3s infinite' }} />
        <polyline points="150,70 130,120 155,120 120,190" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" opacity="0"
            style={{ animation: 'strikeInner 3s infinite' }} />

        <polyline points="190,80 175,130 195,130 160,180" fill="none" stroke={color} strokeLinejoin="round" opacity="0"
            style={{ animation: 'strike 4s infinite 1.5s' }} />
        <polyline points="190,80 175,130 195,130 160,180" fill="none" stroke="#fff" strokeWidth="2" strokeLinejoin="round" opacity="0"
            style={{ animation: 'strikeInner 4s infinite 1.5s' }} />
    </svg>
);

// TECH
export const DnaHelixSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes wave { to { stroke-dashoffset: -100; } }
      @keyframes pulsePair { 0%, 100% { opacity: 0.3; height: 2px; transform: translateY(0); } 50% { opacity: 1; height: 6px; transform: translateY(-2px); } }
    `}</style>
        <path d="M 20 100 Q 60 -0, 100 100 T 180 100 T 260 100" fill="none" stroke={color} strokeWidth="4" strokeDasharray="50 0" opacity="0.8" />
        <path d="M 20 100 Q 60 200, 100 100 T 180 100 T 260 100" fill="none" stroke={color} strokeWidth="4" strokeDasharray="50 0" opacity="0.4" />

        <g transform="translate(0, 100)">
            {Array.from({ length: 12 }).map((_, i) => (
                <rect key={i} x={30 + i * 20} y="-30" width="3" height="60" fill={color}
                    style={{ animation: `pulsePair 2s infinite ${i * 0.2}s` }} />
            ))}
        </g>
    </svg>
);

export const ProteinFoldSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes foldLine { 0% { stroke-dashoffset: 600; } 100% { stroke-dashoffset: 0; } }
      @keyframes nodePop { 0%, 100% { r: 0; } 50% { r: 8; opacity: 1; } }
      @keyframes spinFold { 0% { transform: rotate(0deg) scale(0.9); } 50% { transform: rotate(5deg) scale(1); } 100% { transform: rotate(0deg) scale(0.9); } }
    `}</style>
        <g style={{ transformOrigin: 'center', animation: 'spinFold 10s ease-in-out infinite' }}>
            <path d="M 40 100 C 60 20, 120 180, 150 100 C 180 20, 240 180, 260 100 C 280 20, 140 30, 150 100 C 160 170, 20 180, 40 100"
                fill="none" stroke={color} strokeWidth="5" strokeLinecap="round" strokeDasharray="600" opacity="0.5"
                style={{ animation: 'foldLine 8s alternate infinite' }} />
            <path d="M 40 100 C 60 20, 120 180, 150 100 C 180 20, 240 180, 260 100 C 280 20, 140 30, 150 100 C 160 170, 20 180, 40 100"
                fill="none" stroke={color} strokeWidth="8" strokeOpacity="0.2" />

            <circle cx="40" cy="100" fill={color} style={{ animation: 'nodePop 2s infinite 0.2s' }} />
            <circle cx="150" cy="100" fill={color} style={{ animation: 'nodePop 2s infinite 1.2s' }} />
            <circle cx="260" cy="100" fill={color} style={{ animation: 'nodePop 2s infinite 0.8s' }} />
        </g>
    </svg>
);

export const QuantumQubitsSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes superposition { 0%, 100% { transform: scale(1); opacity: 0.9; filter: blur(0px); } 50% { transform: scale(1.5); opacity: 0.3; filter: blur(8px); } }
      @keyframes entangle { 0%, 100% { stroke-opacity: 0.1; stroke-width: 1; } 50% { stroke-opacity: 0.8; stroke-width: 4; } }
    `}</style>
        <path d="M 80 120 L 150 60 L 220 120 Z" fill="none" stroke={color} style={{ animation: 'entangle 3s infinite' }} />

        <g style={{ transformOrigin: '80px 120px', animation: 'superposition 2s infinite' }}>
            <circle cx="80" cy="120" r="15" fill={color} />
            <circle cx="80" cy="120" r="25" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
        </g>

        <g style={{ transformOrigin: '150px 60px', animation: 'superposition 2.5s infinite 0.5s' }}>
            <circle cx="150" cy="60" r="20" fill={color} />
            <circle cx="150" cy="60" r="30" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
        </g>

        <g style={{ transformOrigin: '220px 120px', animation: 'superposition 1.8s infinite 1s' }}>
            <circle cx="220" cy="120" r="18" fill={color} />
            <circle cx="220" cy="120" r="28" fill="none" stroke={color} strokeWidth="2" strokeDasharray="4 4" />
        </g>
    </svg>
);

export const BrainBciSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes scanline { 0% { transform: translateX(0); } 100% { transform: translateX(300px); } }
      @keyframes brainPulsate { 0%, 100% { opacity: 0.4; } 50% { opacity: 0.8; } }
      @keyframes typeWord { 0%, 40% { opacity: 0; transform: translateY(10px); } 50%, 90% { opacity: 1; transform: translateY(0); } 100% { opacity: 0; transform: translateY(-10px); } }
    `}</style>
        <path d="M 100 150 C 40 150, 40 50, 100 50 C 130 50, 140 80, 150 80 C 160 80, 170 50, 200 50 C 260 50, 260 150, 200 150 C 170 150, 160 120, 150 120 C 140 120, 130 150, 100 150 Z"
            fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" opacity="0.3" />
        <path d="M 100 150 C 40 150, 40 50, 100 50 C 130 50, 140 80, 150 80"
            fill="none" stroke={color} strokeWidth="6" strokeLinejoin="round" style={{ animation: 'brainPulsate 2s infinite' }} />

        <path d="M 0 100 L 40 100 L 50 70 L 60 130 L 70 80 L 80 110 L 90 100 L 300 100" fill="none" stroke={color} strokeWidth="2" opacity="0.5" />

        <rect x="0" y="0" width="10" height="200" fill={`url(#scan-${color})`} style={{ animation: 'scanline 3s linear infinite' }} />
        <defs>
            <linearGradient id={`scan-${color}`} x1="0" y1="0" x2="1" y2="0">
                <stop offset="0%" stopColor={color} stopOpacity="0" />
                <stop offset="50%" stopColor={color} stopOpacity="0.8" />
                <stop offset="100%" stopColor={color} stopOpacity="0" />
            </linearGradient>
        </defs>

        <rect x="110" y="80" width="80" height="40" rx="4" fill="#0F172A" />
        <text x="150" y="105" fill="#fff" fontFamily="monospace" fontSize="16" textAnchor="middle" style={{ animation: 'typeWord 4s infinite' }}>HELLO</text>
        <text x="150" y="105" fill="#fff" fontFamily="monospace" fontSize="16" textAnchor="middle" style={{ animation: 'typeWord 4s infinite 2s' }}>WORLD</text>
    </svg>
);

export const InternetWeightSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes floatBerry { 0%, 100% { transform: translateY(0) rotate(0deg); } 50% { transform: translateY(-15px) rotate(10deg); } }
      @keyframes packetFlow { to { stroke-dashoffset: -100; } }
      @keyframes scalePulse { 0%, 100% { transform: scaleX(1); } 50% { transform: scaleX(0.9); } }
    `}</style>
        {/* Fiber optic lines */}
        <g opacity="0.3">
            <path d="M 0 140 Q 150 180 300 140" fill="none" stroke={color} strokeWidth="15" />
            <path d="M 0 160 Q 150 200 300 160" fill="none" stroke={color} strokeWidth="15" />
        </g>

        {/* Data packets */}
        <path d="M 0 140 Q 150 180 300 140" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 30" style={{ animation: 'packetFlow 1s linear infinite' }} />
        <path d="M 0 160 Q 150 200 300 160" fill="none" stroke="#fff" strokeWidth="4" strokeDasharray="10 40" style={{ animation: 'packetFlow 1.5s linear infinite reverse' }} />

        {/* Scale / Platform */}
        <g style={{ transformOrigin: '150px 100px', animation: 'scalePulse 4s ease-in-out infinite' }}>
            <ellipse cx="150" cy="110" rx="60" ry="10" fill={color} opacity="0.2" />
            <ellipse cx="150" cy="100" rx="55" ry="8" fill={color} opacity="0.6" />
        </g>

        {/* Abstract Strawberry */}
        <g style={{ transformOrigin: '150px 70px', animation: 'floatBerry 4s ease-in-out infinite' }}>
            <path d="M 130 50 C 130 20, 170 20, 170 50 C 170 80, 150 100, 150 100 C 150 100, 130 80, 130 50 Z" fill={color} />
            <path d="M 140 20 Q 150 5 160 20 Z" fill="#fff" opacity="0.6" />
            <circle cx="145" cy="50" r="2" fill="#fff" opacity="0.8" />
            <circle cx="155" cy="60" r="2" fill="#fff" opacity="0.8" />
            <circle cx="145" cy="70" r="2" fill="#fff" opacity="0.8" />
            <circle cx="155" cy="40" r="2" fill="#fff" opacity="0.8" />
        </g>
    </svg>
);

export const BatteryChargeSVG = ({ color }) => (
    <svg viewBox="0 0 300 200" xmlns="http://www.w3.org/2000/svg">
        <style>{`
      @keyframes chargeUp { 0% { height: 0; fill: #ff4444; } 30% { fill: #f59e0b; } 80%, 100% { height: 120px; fill: ${color}; } }
      @keyframes boltFlash { 0%, 80%, 100% { opacity: 0; transform: scale(0.5); } 85%, 95% { opacity: 1; transform: scale(1.2); } }
      @keyframes percentageCount { 
        0% { content: "5%"; } 20% { content: "24%"; } 40% { content: "58%"; } 60% { content: "82%"; } 80%, 100% { content: "100%"; }
      }
    `}</style>
        {/* Battery Outline */}
        <rect x="100" y="40" width="100" height="130" rx="10" fill="none" stroke={color} strokeWidth="6" opacity="0.4" />
        <path d="M 130 30 L 170 30" fill="none" stroke={color} strokeWidth="8" strokeLinecap="round" opacity="0.6" />

        {/* Fill */}
        <g transform="translate(100, 170) scale(1, -1)">
            <rect x="5" y="5" width="90" height="120" rx="6" style={{ animation: 'chargeUp 5s infinite ease-out' }} />
        </g>

        {/* Lightning Bolt Center */}
        <polygon points="150,70 135,105 152,105 145,140 165,100 148,100" fill="#fff" style={{ transformOrigin: '150px 105px', animation: 'boltFlash 5s infinite' }} />

        {/* Timer Ring */}
        <circle cx="230" cy="140" r="24" fill="none" stroke={color} strokeWidth="4" opacity="0.2" />
        <circle cx="230" cy="140" r="24" fill="none" stroke={color} strokeWidth="4" strokeDasharray="150" style={{ transformOrigin: '230px 140px', transform: 'rotate(-90deg)', animation: 'chargeUp 5s infinite ease-out' }} />
        <text x="230" y="145" fill={color} fontSize="14" fontWeight="bold" fontFamily="monospace" textAnchor="middle">5m</text>
    </svg>
);
