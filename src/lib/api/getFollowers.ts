import options from './options';
import { FollowersResponse } from './followers.types';

export const getFollowers = async (
  username: string,
  page: number = 1,
  per_page: number = 30,
  signal?: AbortSignal
): Promise<FollowersResponse> => {
  const url = new URL(`https://api.github.com/users/${username}/followers`);
  url.searchParams.append('page', page.toString());
  url.searchParams.append('per_page', per_page.toString());

  const response = await fetch(url.toString(), {
    ...options,
    signal,
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch followers: ${response.statusText}`);
  }

  return response.json();
};
