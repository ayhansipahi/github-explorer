import options from './options';
import { UserSearchFail, UserSearchResult } from '@/lib/api/userSearch.types';

export const searchUsers = async (
  query: string,
  signal?: AbortSignal
): Promise<UserSearchResult> => {
  const url = new URL('https://api.github.com/search/users');
  url.searchParams.append('q', query);
  const response = await fetch(url.toString(), {
    ...options,
    signal,
  });
  return response.json();
};

export const isFailure = (
  response: UserSearchResult
): response is UserSearchFail => {
  return !!response.message;
};
