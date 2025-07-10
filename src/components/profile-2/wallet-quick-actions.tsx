import React from 'react';

import { Banknote, Download, Upload } from 'lucide-react';

import { Button } from '../ui/button';

export default function WalletQuickActions() {
  return (
    <div className="grid grid-cols-3 gap-3">
      <Button variant="outline" className="h-16 flex-col space-y-1">
        <Banknote size={20} />
        <span className="text-xs">Buy Crypto</span>
      </Button>
      <Button variant="outline" className="h-16 flex-col space-y-1">
        <Upload size={20} />
        <span className="text-xs">Send</span>
      </Button>
      <Button variant="outline" className="h-16 flex-col space-y-1">
        <Download size={20} />
        <span className="text-xs">Receive</span>
      </Button>
    </div>
  );
}
