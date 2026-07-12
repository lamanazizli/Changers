'use client';
import { createContext, useContext, useState, useEffect } from 'react';

const DeviceContext = createContext({ isMobile: null, isTablet: null });

export function DeviceProvider({ children }) {
  const [device, setDevice] = useState({ isMobile: null, isTablet: null });

  useEffect(() => {
    const check = () => {
      const w = window.innerWidth;
      setDevice({
        isMobile: w < 768,
        isTablet: w >= 768 && w < 1100,
      });
    };
    check();
    window.addEventListener('resize', check);
    return () => window.removeEventListener('resize', check);
  }, []);

  return (
    <DeviceContext.Provider value={device}>
      {children}
    </DeviceContext.Provider>
  );
}

export function useDevice() {
  return useContext(DeviceContext);
}
