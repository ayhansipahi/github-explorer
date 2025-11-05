import { getUser } from './getUser';
import { isUserResponse, isErrorResponse } from './getUser.types';

global.fetch = jest.fn().mockResolvedValue(
  Promise.resolve({
    ok: true,
    json: () => ({ login: 'octocat', id: 1 }),
  })
);

describe('getUser', () => {
  it('should return user data for a valid username', async () => {
    const username = 'octocat';
    const response = await getUser(username);
    expect(isUserResponse(response)).toBe(true);
    if (isUserResponse(response)) {
      expect(response.login).toEqual(username);
    }
  });

  it('should return error response for an invalid username', async () => {
    global.fetch = jest.fn().mockResolvedValue(
      Promise.resolve({
        ok: false,
        json: () => ({ message: 'Not Found' }),
      })
    );
    const username = 'invalid_username';
    const response = await getUser(username);
    expect(isErrorResponse(response)).toBe(true);
    if (isErrorResponse(response)) {
      expect(response.message).toEqual('Not Found');
    }
  });
});
