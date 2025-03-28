
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';

interface AnimatedLinkProps {
  to: string;
  className?: string;
  children: React.ReactNode;
}

const AnimatedLink: React.FC<AnimatedLinkProps> = ({ to, className = '', children }) => {
  const navigate = useNavigate();

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    const btn = e.currentTarget;
    
    btn.classList.add('scale-95', 'opacity-70');
    setTimeout(() => {
      btn.classList.add('scale-105');
      setTimeout(() => {
        navigate(to);
      }, 200);
    }, 150);
  };

  return (
    <Link
      to={to}
      onClick={handleClick}
      className={`transition-all duration-200 inline-block ${className}`}
    >
      {children}
    </Link>
  );
};

export default AnimatedLink;
