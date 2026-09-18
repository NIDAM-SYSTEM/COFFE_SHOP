import React from 'react';
import { HeroSection } from '../components/HeroSection';
import { FeaturedRoasts } from '../components/home/FeaturedRoasts';
import { FeatureDishes } from '../components/FeatureDishes';
import { PopularMenu } from '../components/PopularMenu';
import { Testimonials } from '../components/Testimonials';
import { MenuItem } from '../types/coffeeHouse';
import type { CoffeeProduct, GrindOption } from '../types';

interface LandingPageProps {
  onAddToCart: (item: MenuItem) => void;
  onOrderNowClick: () => void;
  onAddToCartSpecialty?: (product: CoffeeProduct, grind: GrindOption) => void;
}

export const LandingPage: React.FC<LandingPageProps> = ({
  onAddToCart,
  onOrderNowClick,
  onAddToCartSpecialty,
}) => {
  return (
    <>
      {/* 1. Hero Section (Dual-Tone with Concave Arch Transition) */}
      <HeroSection onOrderNowClick={onOrderNowClick} />

      {/* 3. Feature Dishes & Food Pairing Section (#121421) */}
      <FeatureDishes onMoreMenuClick={onOrderNowClick} />

      {/* 2. Featured Specialty Micro-Lots with Direct PDP Navigation (#121421) */}
      <FeaturedRoasts onAddToCartSpecialty={onAddToCartSpecialty} />

      

      {/* 4. Popular Menu Section (#FFFFFF Pure White Background) */}
      <PopularMenu onAddToCart={onAddToCart} />

      {/* 5. Testimonials & Social Proof (#121421) */}
      <Testimonials />
    </>
  );
};
