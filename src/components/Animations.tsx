import React from 'react';

const NoiseEffect: React.FC = () => {
  return (
    <div 
      className="fixed inset-0 w-full pointer-events-none z-0 opacity-10 animate-noise"
      style={{
        backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=\'0 0 200 200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'noiseFilter\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.65\' numOctaves=\'3\' stitchTiles=\'stitch\'/%3E%3C/filter%3E%3Crect width=\'100%\' height=\'100%\' filter=\'url(%23noiseFilter)\' /%3E%3C/svg%3E")',
        mixBlendMode: 'overlay',
        // Apply clip-path to exclude the footer area
        height: 'calc(100% - 200px)',
        clipPath: 'inset(0 0 0 0)'
      }}
    />
  );
};

const Animations: React.FC = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      <NoiseEffect />
    </div>
  );
};

export default Animations;
