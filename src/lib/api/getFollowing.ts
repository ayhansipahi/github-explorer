import options from './options';
import { FollowingResponse } from './followers.types';

export const getFollowing = async (
  username: string,
  page: number = 1,
  per_page: number = 30,
  signal?: AbortSignal
): Promise<FollowingResponse> => {
  const url = new URL(`https://api.github.com/users/${username}/following`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', per_page.toString());

  const response = await fetch(url.toString(), {
    ...options,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch following: ${response.statusText}`);
  }

  return response.json();
};
