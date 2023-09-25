import options from './options';
import { UserSearchFail, UserSearchResult } from '@/lib/api/userSearch.types';

export const searchUsers = async (
  query: string,
  signal?: AbortSignal
): Promise<UserSearchResult> => {
  const response = await fetch(
    `https://api.github.com/search/users?q=${query}`,
    {
      ...options,
      signal,
    }
  );
  return response.json();
};

export const isFailure = (
  response: UserSearchResult
): response is UserSearchFail => {
  return !!response.message;
};
