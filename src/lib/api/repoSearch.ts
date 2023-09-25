import options from './options';
import {
  RepoSearchFail,
  RepoSearchRequestParams,
  RepoSearchResponse,
  RepoSearchSuccess,
  RepoSortDirection,
  RepoSortOptions,
} from './repoSearch.types';
import { isConvertableNumber, isString } from '@/lib/typeGuards';

export const isSortOptions = (sort: unknown): sort is RepoSortOptions => {
  return (
    isString(sort) &&
    ['stars', 'forks', 'help-wanted-issues', 'updated'].includes(sort)
  );
};

export const isSortDirection = (
  direction: unknown
): direction is RepoSortDirection => {
  return isString(direction) && ['asc', 'desc'].includes(direction);
};

export default async function searchRepos(
  { q, sort, order, page, per_page }: RepoSearchRequestParams,
  signal?: AbortSignal
): Promise<RepoSearchResponse> {
  const requestUrl = new URL(`https://api.github.com/search/repositories`);

  requestUrl.searchParams.append('q', q);

  if (isSortOptions(sort)) {
    requestUrl.searchParams.append('sort', sort);
  }
  if (isSortDirection(order)) {
    requestUrl.searchParams.append('order', order);
  }
  if (isConvertableNumber(page)) {
    requestUrl.searchParams.append('page', page);
  }
  if (isConvertableNumber(per_page)) {
    requestUrl.searchParams.append('per_page', per_page);
  }

  const response = await fetch(requestUrl.toString(), {
    ...options,
    signal,
  });
  return response.json();
}

export const isSuccess = (
  response: RepoSearchResponse
): response is RepoSearchSuccess => {
  return !response.message;
};

export const isFailure = (
  response: RepoSearchResponse
): response is RepoSearchFail => {
  return !!response.message;
};
