'use client';
import RepoCard from '@/components/RepoCard/RepoCard';
import searchRepos, { isFailure, isSuccess } from '@/lib/api/repoSearch';
import {
  RepoSearchRequestParams,
  RepoSearchResponse,
} from '@/lib/api/repoSearch.types';
import { useSearchParams, useParams } from 'next/navigation';

import { useEffect, useState } from 'react';
import Loading from './loading';
import RepoSearch from '@/components/RepoSearch/RepoSearch';
import RepoSearchError from '@/components/RepoSearchError/RepoSearchError';
import Pagination from '@/components/Pagination/Pagination';
import { isString } from '@/lib/typeGuards';

export default function Page() {
  const { user } = useParams();
  const query = useSearchParams();

  const [isLoading, setIsLoading] = useState(true);
  const [searchResponse, setSearchResponse] =
    useState<RepoSearchResponse | null>(null);

  useEffect(() => {
    setSearchResponse(null);
    setIsLoading(true);

    const searchQ = query.get('q');
    const searchParams: RepoSearchRequestParams = Object.fromEntries(
      [
        ['q', `user:${user}${searchQ ? ` ${searchQ}` : ''}`],
        ['sort', query.get('sort') || undefined],
        ['order', query.get('order') || undefined],
        ['per_page', query.get('per_page') || undefined],
        ['page', query.get('page') || undefined],
      ].filter(([, value]) => isString(value))
    );

    const abortCtrl = new AbortController();
    const signal = abortCtrl.signal;
    searchRepos(
      {
        ...searchParams,
      },
      signal
    )
      .then(setSearchResponse)
      .finally(() => setIsLoading(false));
    return () => abortCtrl.abort();
  }, [query, user]);

  return (
    <>
      <RepoSearch />
      {isLoading && <Loading />}
      {searchResponse && isFailure(searchResponse) ? (
        <RepoSearchError error={searchResponse} />
      ) : null}
      {searchResponse && isSuccess(searchResponse) ? (
        <>
          <div className='flex flex-col gap-4' key={query.get('page')}>
            {searchResponse.items?.map((repo) => (
              <RepoCard repo={repo} key={repo.id} />
            ))}
            {searchResponse.total_count === 0 && <div>no repos found</div>}
          </div>
          <Pagination total_count={searchResponse.total_count} />
        </>
      ) : null}
    </>
  );
}
