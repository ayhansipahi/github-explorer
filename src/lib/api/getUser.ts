import options from './options';
import { UserResponse, GitHubErrorResponse } from '@/lib/api/getUser.types';

export const getUser = async (
  username: string,
  signal?: AbortSignal
): Promise<UserResponse | GitHubErrorResponse> => {
  const response = await fetch(`https://api.github.com/users/${username}`, {
    ...options,
    signal,
  });
  return response.json();
};
