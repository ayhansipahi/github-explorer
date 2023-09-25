'use client';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ArrowLeftIcon, ArrowRightIcon } from '@radix-ui/react-icons';
import { useEffect, useState } from 'react';
import { usePathname, useSearchParams } from 'next/navigation';

type Props = {
  per_page?: number;
  total_count: number;
};
export default function Pagination({ per_page = 30, total_count }: Props) {
  const pathname = usePathname();
  const query = useSearchParams();

  const currentPage = parseInt(query.get('page') || '1');
  const [prevPageUrl, setPrevPageUrl] = useState<string | null>(null);
  const [nextPageUrl, setNextPageUrl] = useState<string | null>(null);

  useEffect(() => {
    const hasNext = currentPage * per_page < total_count;

    if (currentPage > 1) {
      const prevPageUrlParams = new URLSearchParams(query);
      prevPageUrlParams.set('page', (currentPage - 1).toString());
      const prevPageUrl = `${pathname}?${prevPageUrlParams.toString()}`;
      setPrevPageUrl(prevPageUrl);
    } else {
      setPrevPageUrl(null);
    }

    if (hasNext) {
      const nextPageUrlParams = new URLSearchParams(query);
      nextPageUrlParams.set('page', (currentPage + 1).toString());
      const nextPageUrl = `${pathname}?${nextPageUrlParams.toString()}`;
      setNextPageUrl(nextPageUrl);
    } else {
      setNextPageUrl(null);
    }
  }, [currentPage, pathname, query, setPrevPageUrl, setNextPageUrl, total_count, per_page]);
  
  return (
    <nav className='mt-4 flex justify-center gap-4'>
      {prevPageUrl && (
        <Button variant={'ghost'}>
          <Link className='flex gap-2 items-center' href={prevPageUrl}>
            <ArrowLeftIcon></ArrowLeftIcon>
            Previous page
          </Link>
        </Button>
      )}
      {nextPageUrl && (
        <Button variant={'ghost'}>
          <Link className='flex gap-2 items-center' href={nextPageUrl}>
            Next page <ArrowRightIcon></ArrowRightIcon>
          </Link>
        </Button>
      )}
    </nav>
  );
}
