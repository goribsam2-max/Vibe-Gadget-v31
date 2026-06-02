import React, { createContext, useContext, useState, useEffect } from 'react';

type Region = 'BD' | 'IN' | 'PK';

interface RegionContextType {
  region: Region;
  setRegion: (region: Region) => void;
  formatPrice: (priceBdt: number) => string;
}

const RegionContext = createContext<RegionContextType>({
  region: 'BD',
  setRegion: () => {},
  formatPrice: (priceBdt) => `৳${priceBdt.toLocaleString()}`
});

export const RegionProvider = ({ children }: { children: React.ReactNode }) => {
  const [region, setRegion] = useState<Region>('BD');

  useEffect(() => {
    const saved = localStorage.getItem('user_region') as Region;
    if (saved) {
      setRegion(saved);
    }
  }, []);

  const handleSetRegion = (newRegion: Region) => {
    setRegion(newRegion);
    localStorage.setItem('user_region', newRegion);
    // If user is logged in, we could also update it in Firebase,
    // but doing it locally is faster and works for guests.
  };

  const formatPrice = (priceBdt: number) => {
    if (region === 'IN') {
      const inr = Math.round(priceBdt * 0.71);
      return `₹${inr.toLocaleString()}`;
    } else if (region === 'PK') {
      const pkr = Math.round(priceBdt * 2.40);
      return `Rs ${pkr.toLocaleString()}`;
    }
    return `৳${priceBdt.toLocaleString()}`;
  };

  return (
    <RegionContext.Provider value={{ region, setRegion: handleSetRegion, formatPrice }}>
      {children}
    </RegionContext.Provider>
  );
};

export const useRegion = () => useContext(RegionContext);
