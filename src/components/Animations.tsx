import React from 'react';

interface AnimationBubbleProps {
  size: number;
  color: string;
  duration: number;
  delay: number;
  top: string;
  left: string;
}

const AnimationBubble: React.FC<AnimationBubbleProps> = ({ size, color, duration, delay, top, left }) => {
  return (
    <div 
      className="absolute rounded-full opacity-0 animate-float pointer-events-none z-0"
      style={{
        width: `${size}px`,
        height: `${size}px`,
        backgroundColor: color,
        top,
        left,
        animationDuration: `${duration}s`,
        animationDelay: `${delay}s`,
        filter: 'blur(8px)'
      }}
    />
  );
};

const Animations: React.FC = () => {
  // Generate random bubbles with different colors, sizes, and positions
  const bubbles = [];
  const colors = [
    '#ff5a1f', // secondary-500
    '#2a5fdd', // primary-500
    '#ff8a4c', // secondary-400
    '#5b87ff', // primary-400
    '#fdba8c', // secondary-300
    '#84a5ff', // primary-300
  ];

  // Create 15 random bubbles
  for (let i = 0; i < 15; i++) {
    const size = Math.floor(Math.random() * 100) + 50; // 50-150px
    const color = colors[Math.floor(Math.random() * colors.length)];
    const duration = Math.floor(Math.random() * 20) + 15; // 15-35s
    const delay = Math.floor(Math.random() * 10); // 0-10s
    const top = `${Math.floor(Math.random() * 100)}%`;
    const left = `${Math.floor(Math.random() * 100)}%`;
    
    bubbles.push(
      <AnimationBubble 
        key={i}
        size={size}
        color={color}
        duration={duration}
        delay={delay}
        top={top}
        left={left}
      />
    );
  }

  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
      {bubbles}
    </div>
  );
};

export default Animations;
