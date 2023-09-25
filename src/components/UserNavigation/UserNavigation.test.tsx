import { render, screen } from '@testing-library/react';
import { UserNavigationMenu } from './UserNavigation';

describe('UserNavigationMenu', () => {
  it('renders all navigation links', () => {
    const user = 'testuser';
    render(<UserNavigationMenu user={user} />);
    const repositoriesLink = screen.getByText('Repositories');
    const followersLink = screen.getByText('Followers');
    const followingLink = screen.getByText('Following');
    expect(repositoriesLink).toBeInTheDocument();
    expect(followersLink).toBeInTheDocument();
    expect(followingLink).toBeInTheDocument();
  });
});
