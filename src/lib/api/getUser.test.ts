import { getUser } from './getUser';

global.fetch = jest.fn().mockResolvedValue(
  Promise.resolve({
    ok: true,
    json: () => ({ login: 'octocat' }),
  })
);

describe('getUser', () => {
  it('should return user data for a valid username', async () => {
    const username = 'octocat';
    const user = await getUser(username);
    expect(user.login).toEqual(username);
  });

  it('should throw an error for an invalid username', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: false,
        json: () => ({ message: 'Not Found' }),
      })
    );
    const username = 'invalid_username';
    const user = await getUser(username);
    expect(user.login).not.toEqual(username);
    expect(user?.message).toEqual('Not Found');
  });
});
