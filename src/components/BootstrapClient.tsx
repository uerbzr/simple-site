'use client';

import { useEffect } from 'react';

export default function BootstrapClient() {
  useEffect(() => {
    // @ts-expect-error: bootstrap might not have types installed
    import('bootstrap/dist/js/bootstrap.bundle.min.js');
  }, []);

  return null;
}
