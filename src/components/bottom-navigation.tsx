'use client';

import { usePathname } from 'next/navigation';

import { Home, Search, Ticket, User } from 'lucide-react';
import { Link, useTransitionRouter } from 'next-view-transitions';

import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';

export function BottomNavigation() {
  const pathname = usePathname();

  const navItems = [
    { path: '/', icon: Home, label: 'Home' },
    { path: '/explore', icon: Search, label: 'Explore' },
    { path: '/contracts', icon: Ticket, label: 'My Bets', badge: 3 },
    { path: '/profile/id', icon: User, label: 'Profile' },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-10 border-t border-gray-200 bg-white md:mx-auto md:max-w-md">
      <div className="flex items-center justify-around py-2">
        {navItems.map((item) => {
          const isActive = pathname.startsWith(item.path);
          const IconComponent = item.icon;

          return (
            <Link key={item.path} href={item.path}>
              <Button
                variant="ghost"
                className={`relative flex flex-col items-center space-y-1 px-4 py-2 ${
                  isActive
                    ? 'hover:bg-primary/5 text-primary'
                    : 'text-gray-400 hover:bg-gray-50 hover:text-gray-600'
                }`}
              >
                <IconComponent size={20} />
                <span className={`text-xs ${isActive ? 'font-medium' : ''}`}>
                  {item.label}
                </span>
                {item.badge && (
                  <Badge className="absolute -right-1 -top-1 flex h-5 w-5 min-w-0 items-center justify-center rounded-full bg-primary p-0 text-xs text-white">
                    {item.badge}
                  </Badge>
                )}
              </Button>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
