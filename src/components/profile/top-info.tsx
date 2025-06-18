import React from 'react';

import { IconLogout } from '@tabler/icons-react';

import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';

import { Button } from '../ui/button';

export default function TopInfo() {
  return (
    <div className="flex w-full items-center justify-between border-b p-3">
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>

        <p className="text-lg font-semibold">Kabugu</p>
      </div>
      <Button size={'icon'} variant={'secondary'}>
        <IconLogout />
      </Button>
    </div>
  );
}
