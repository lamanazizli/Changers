'use client';
import { useState, useEffect } from 'react';

export default function useIsTablet() {
  const [isTablet, setIsTablet] = useState(null);

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setIsTablet(w >= 768 && w < 1100);
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return isTablet;
}
