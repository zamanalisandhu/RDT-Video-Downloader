'use client';

import { useEffect, useState } from 'react';
import { trackBandwidth } from '@/lib/bandwidth-tracker';
import { Toaster } from 'sonner';

export default function ClientSideHelpers() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    if (process.env.NODE_ENV === 'development') {
      trackBandwidth();
    }
  }, []);

  if (!mounted) return null;

  return <Toaster position="top-center" richColors />;
}
