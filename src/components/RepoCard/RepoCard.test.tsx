import { render } from '@testing-library/react';
import RepoCard from './RepoCard';

const repo = {
  name: 'test-repo',
  description: 'A test repository',
  html_url: 'https://github.com/test/test-repo',
  stargazers_count: 10,
  forks_count: 5,
  watchers_count: 15,
  updated_at: '2022-01-01T00:00:00Z',
};

describe('RepoCard', () => {
  it('renders the repository name and description', () => {
    const { getByText } = render(<RepoCard repo={repo} />);
    expect(getByText(repo.name)).toBeDefined();
    expect(getByText(repo.description)).toBeDefined();
  });

  it('renders the repository stargazers count', () => {
    const { getByText } = render(<RepoCard repo={repo} />);
    expect(getByText(`${repo.stargazers_count}`)).toBeDefined();
  });

  it('renders the repository forks count', () => {
    const { getByText } = render(<RepoCard repo={repo} />);
    expect(getByText(`${repo.forks_count} forks`)).toBeDefined();
  });

  it('renders the repository watchers count', () => {
    const { getByText } = render(<RepoCard repo={repo} />);
    expect(getByText(`${repo.watchers_count} watchers`)).toBeDefined();
  });

  it('renders the last updated date', () => {
    const { getByText } = render(<RepoCard repo={repo} />);
    expect(getByText('Last updated: 1 January 2022 at 01:00 am')).toBeDefined();
  });
});
