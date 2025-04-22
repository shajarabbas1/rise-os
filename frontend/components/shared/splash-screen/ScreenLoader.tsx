'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import SplashScreen from '.';

export function LoadingHandler() {
  const [loading, setLoading] = useState<boolean>(false);
  const pathname = usePathname();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 500);

    return () => {
      clearTimeout(timer);
    };
  }, [pathname]);

  if (loading) {
    return <SplashScreen />;
  }

  return null;
}
