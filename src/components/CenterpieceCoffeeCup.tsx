import React from 'react';

export const CenterpieceCoffeeCup: React.FC<{ className?: string }> = ({
  className = 'w-full max-w-[340px] h-auto',
}) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      <picture className="w-full h-full flex items-center justify-center">
        <source srcSet="/images/hero-coffee-cup.webp" type="image/webp" />
        <img
          src="/images/hero-coffee-cup.png"
          alt="NIDAM Coffee - Fresh Roast Latte Cup"
          className="w-full h-full max-h-full object-contain mx-auto drop-shadow-[0_18px_30px_rgba(0,0,0,0.35)] pointer-events-none transition-transform duration-300 hover:scale-[1.02]"
          width={471}
          height={525}
          loading="eager"
          decoding="async"
        />
      </picture>
    </div>
  );
};

