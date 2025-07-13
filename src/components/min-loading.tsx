import React from 'react';

import { Loader2 } from 'lucide-react';

export default function MinLoading() {
  return (
    <div className="mx-auto flex h-screen w-full items-center justify-center border-gray-300 md:max-w-md md:border">
      <Loader2 className="h-9 w-9 animate-spin text-gray-700" />
    </div>
  );
}
