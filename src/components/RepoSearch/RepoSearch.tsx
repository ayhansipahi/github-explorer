'use client';
import { useEffect, useState } from 'react';
import { Input } from '@/components/ui/input';

import { usePathname, useRouter, useSearchParams } from 'next/navigation';
import { useDebounce } from '@/lib/hooks/useDebounce';
import DropdownMenuComponent from '@/components/RepoSearch/SearchDropdown';

export default function RepoSearch() {
  const [pathname, router, query] = [
    usePathname(),
    useRouter(),
    useSearchParams(),
  ];
  const [q, setQ] = useState<string | null>(query.get('q'));
  const debouncedQ = useDebounce(q?.trim(), 500);
  const [searchParams, setSearchParams] = useState({
    q: query.get('q'),
    sort: query.get('sort'),
    order: query.get('order'),
    per_page: query.get('per_page'),
    page: query.get('page'),
  });

  const setSearchParam = (key: string, value: string | null) => {
    setSearchParams((prev) => ({ ...prev, page: null, [key]: value }));
  };

  useEffect(() => {
    if (!debouncedQ) return setSearchParam('q', null);
    setSearchParam('q', debouncedQ);
  }, [debouncedQ]);
  useEffect(() => {
    const searchUrlParams = new URLSearchParams();
    Object.entries(searchParams).forEach(([key, value]) => {
      if (value) searchUrlParams.set(key, value);
    });
    const searchUrl = `${pathname}?${searchUrlParams.toString()}`;
    router.push(searchUrl);
  }, [pathname, router, searchParams]);

  return (
    <nav className='my-4 flex w-full gap-2'>
      <Input
        placeholder='Search for a repo'
        value={q || ''}
        onChange={(e) => setQ(e.target.value.trimStart())}
      />
      <DropdownMenuComponent
        title='sort'
        stateValue={searchParams.sort || ''}
        action={(value) => setSearchParam('sort', value)}
      />
      <DropdownMenuComponent
        title='order'
        stateValue={searchParams.order || ''}
        action={(value) => setSearchParam('order', value)}
      />
    </nav>
  );
}
