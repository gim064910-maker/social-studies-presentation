import React, { useMemo } from 'react';

interface BackgroundProps {
  theme?: 'default' | 'gold';
}

const Background: React.FC<BackgroundProps> = ({ theme = 'default' }) => {
  // Generate random stars for the background
  const stars = useMemo(() => {
    return Array.from({ length: 40 }).map((_, i) => ({
      id: i,
      left: `${Math.random() * 100}%`,
      top: `${Math.random() * 100}%`,
      size: `${Math.random() * 2 + 1}px`,
      duration: `${Math.random() * 3 + 2}s`,
      opacity: Math.random() * 0.7 + 0.3,
      delay: `${Math.random() * 5}s`
    }));
  }, []);

  const isGold = theme === 'gold';

  return (
    <div className="fixed inset-0 w-full h-full -z-10 overflow-hidden bg-[#020617] transition-colors duration-[2000ms]">
      
      {/* 
         1. Main Spotlight Gradient (The "White Top / Dark Bottom" effect)
         Using radial-gradient specifically to create a light source from the top center.
         - Default: Bright Blue-White top -> Deep Navy bottom
         - Gold: Bright Gold-White top -> Deep Brown/Black bottom
      */}
      <div 
        className={`absolute inset-0 transition-all duration-[2000ms] ease-in-out
          ${isGold 
            ? 'bg-[radial-gradient(circle_at_50%_0%,_rgba(251,191,36,0.5)_0%,_rgba(180,83,9,0.2)_40%,_rgba(0,0,0,1)_90%)]' 
            : 'bg-[radial-gradient(circle_at_50%_0%,_rgba(224,231,255,0.4)_0%,_rgba(30,58,138,0.2)_40%,_rgba(2,6,23,1)_90%)]'
          }`} 
      />

      {/* 
         2. Secondary Ambient Glow (Fills the gaps)
      */}
      <div 
        className={`absolute inset-0 opacity-60 transition-colors duration-[2000ms]
          ${isGold 
            ? 'bg-gradient-to-b from-amber-500/10 via-transparent to-black' 
            : 'bg-gradient-to-b from-indigo-300/10 via-transparent to-black'
          }`}
      />

      {/* 
        Perspective Grid (Cyber/Future Feel)
        Increased opacity slightly to be more visible against the light top
      */}
      <div className={`absolute inset-0 flex items-center justify-center pointer-events-none transition-all duration-[2000ms] ${isGold ? 'opacity-30' : 'opacity-40'}`}>
        <div 
          className="w-[150vw] h-[150vh] perspective-grid absolute top-[-20%] left-[-25%]" 
          style={{ 
             filter: isGold ? 'sepia(100%) saturate(300%) hue-rotate(10deg)' : 'drop-shadow(0 0 5px rgba(255,255,255,0.2))' 
          }} 
        />
      </div>

      {/* 
        Twinkling Stars 
      */}
      <div className="stars-container pointer-events-none">
        {stars.map((star) => (
          <div 
            key={star.id}
            className={`star transition-colors duration-[2000ms] ${isGold ? 'bg-amber-200 shadow-[0_0_8px_rgba(251,191,36,0.8)]' : 'bg-white shadow-[0_0_5px_rgba(255,255,255,0.8)]'}`}
            style={{
              left: star.left,
              top: star.top,
              width: star.size,
              height: star.size,
              '--duration': star.duration,
              '--opacity': star.opacity,
              animationDelay: star.delay
            } as React.CSSProperties}
          />
        ))}
      </div>

      {/* 
        Organic Moving Blobs 
        Made them clearer and more distinct in color
      */}
      <div 
        className={`absolute top-[-10%] left-[-10%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[100px] animate-blob transition-colors duration-[2000ms]
          ${isGold ? 'bg-amber-600/40' : 'bg-purple-500/30'}`} 
      />
      <div 
        className={`absolute top-[20%] right-[-10%] w-[500px] h-[500px] rounded-full mix-blend-screen filter blur-[100px] animate-blob animation-delay-2 transition-colors duration-[2000ms]
          ${isGold ? 'bg-yellow-500/40' : 'bg-blue-500/30'}`} 
      />
      <div 
        className={`absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] rounded-full mix-blend-screen filter blur-[120px] animate-blob animation-delay-4 transition-colors duration-[2000ms]
          ${isGold ? 'bg-orange-600/30' : 'bg-cyan-500/20'}`} 
      />

      {/* 
        The Spline iframe (3D Content)
        - Opacity adjusted: 0.5 allows the background gradients to show through better.
        - mix-blend-screen keeps the black parts of the iframe transparent.
      */}
      <div className={`relative w-full h-full transition-all duration-[2000ms] ${isGold ? 'opacity-40 sepia brightness-110 contrast-125' : 'opacity-50'}`}>
        <iframe 
          src='https://my.spline.design/boxeshover-gWwpSrB1cBHcBmaYSBONvkcF/' 
          frameBorder='0' 
          width='100%' 
          height='100%'
          title="3D Background"
          className="w-full h-full object-cover mix-blend-screen"
        ></iframe>
      </div>
      
      {/* Texture Overlays */}
      <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-15 mix-blend-overlay pointer-events-none" />
      
      {/* 
        Final Vignette 
        Ensures the bottom remains dark for text readability regardless of the top brightness
      */}
      <div className={`absolute inset-0 bg-gradient-to-t pointer-events-none transition-colors duration-[2000ms]
        ${isGold ? 'from-black/95 via-black/40 to-transparent' : 'from-[#020617] via-[#020617]/50 to-transparent'}`} 
      />
    </div>
  );
};

export default Background;