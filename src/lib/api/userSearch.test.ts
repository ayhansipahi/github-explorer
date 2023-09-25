import { searchUsers } from '@/lib/api/userSearch';

describe('searchUsers', () => {
  it('returns a successful search result', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: true,
        json: () => ({ total_count: 1, items: [] }),
      })
    );
    const result = await searchUsers('john');
    expect(result.total_count).toBeGreaterThan(0);
    expect(result.items).toBeDefined();
  });

  it('returns a failed search result', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: true,
        json: () => ({ message: 'Not Found' }),
      })
    );
    const result = await searchUsers('invalidquery');
    expect(result.total_count).toBeUndefined();
    expect(result.message).toBeDefined();
  });
});
