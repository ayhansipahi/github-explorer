import options from './options';

describe('options', () => {
  it('should have the correct headers', () => {
    expect(options.headers).toEqual({
      Accept: 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    });
  });
});
