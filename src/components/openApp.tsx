import React from 'react';

import { Button } from './ui/button';

export default function OpenApp() {
  return (
    <div className="from fixed bottom-0 flex w-full items-center justify-between border bg-gradient-to-bl px-1 py-2">
      <p className="">
        For the smoothest experience, install GOAT to your home screen.
      </p>
      <Button>Open in App</Button>
    </div>
  );
}
