import React from 'react';

import { Search } from 'lucide-react';

import { Header } from '@/components/header';

export default function page() {
  return (
    <div>
      <Header />
      <div className="flex h-screen w-full items-center justify-center bg-gray-100">
        <div className="py-12 text-center">
          <div className="mx-auto mb-4 flex h-16 w-16 items-center justify-center rounded-full bg-gray-100">
            <Search className="text-gray-400" size={24} />
          </div>
          <h3 className="mb-2 text-lg font-medium text-gray-900">
            No results found
          </h3>
          <p className="text-sm text-gray-500">
            Try adjusting your search or filter to find what you&apos;re looking
            for.
          </p>
        </div>
      </div>
    </div>
  );
}
