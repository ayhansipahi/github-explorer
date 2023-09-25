import searchRepos, { isSuccess, isFailure } from './repoSearch';
import { RepoSortOptions } from '@/lib/api/repoSearch.types';

describe('searchRepos', () => {
  beforeEach(() => {
    global.fetch = jest.fn().mockImplementation(() =>
      Promise.resolve({
        ok: true,
        json: () => ({ total_count: 1, items: [] }),
      })
    );
  });
  it('should return a successful response', async () => {
    const response = await searchRepos({
      q: 'react',
      sort: 'stars',
      order: 'desc',
      page: '1',
      per_page: '10',
    });

    expect(isSuccess(response)).toBe(true);
    expect(isFailure(response)).toBe(false);
    expect('items' in response).toBeTruthy();
  });

  it('should return a failed response', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: false,
        json: () => ({ message: 'Not Found' }),
      })
    );
    const response = await searchRepos({
      q: 'invalid search query',
      sort: 'stars',
      order: 'desc',
      page: '1',
      per_page: '10',
    });

    expect(isSuccess(response)).toBe(false);
    expect(isFailure(response)).toBe(true);
    expect(response.message).toBeDefined();
  });
  // test for invalid sort options
  // test for invalid sort direction
  // test for invalid page
  // test for invalid per_page

  it('should return filter out invalid sort options', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: true,
        json: () => ({ total_count: 1, items: [] }),
      })
    );
    await searchRepos({
      q: 'react',
      sort: 'invalid sort option' as RepoSortOptions,
      order: 'desc',
      page: '1',
      per_page: '10',
    });
    expect(global.fetch).not.toBeCalledWith(expect.stringContaining('sort='));
  });
});
