import React from 'react';

import { SLIDE_DATA } from '@/types/types';

export default function Slide({ title, className, ...props }: SLIDE_DATA) {
  return (
    <div className={`w-full bg-purple-500 ${className}`}>
      <p>{title}</p>
    </div>
  );
}
