import { render, screen } from '@testing-library/react';
import UserProfile from './UserProfile';

const mockProfile = {
  avatar_url: 'https://avatars.githubusercontent.com/u/123456?v=4',
  name: 'John Doe',
  login: 'johndoe',
  bio: 'Software Engineer',
  followers: 10,
  following: 20,
  company: 'Acme Inc.',
  location: 'San Francisco, CA',
  email: 'johndoe@example.com',
  blog: 'https://johndoe.com',
  twitter_username: 'johndoe',
};

describe('UserProfile', () => {
  it('renders the user profile information', () => {
    render(<UserProfile profile={mockProfile} />);

    expect(screen.getByText('John Doe')).toBeInTheDocument();
    expect(screen.getByText('johndoe')).toBeInTheDocument();
    expect(screen.getByText('Software Engineer')).toBeInTheDocument();
    expect(screen.getByText('10 followers')).toBeInTheDocument();
    expect(screen.getByText('20 following')).toBeInTheDocument();
    expect(screen.getByText('Acme Inc.')).toBeInTheDocument();
    expect(screen.getByText('San Francisco, CA')).toBeInTheDocument();
    expect(screen.getByText('johndoe@example.com')).toBeInTheDocument();
    expect(screen.getByText('https://johndoe.com')).toBeInTheDocument();
    expect(screen.getByText('@johndoe')).toBeInTheDocument();
  });

  it('renders the user avatar', () => {
    render(<UserProfile profile={mockProfile} />);

    const avatar = screen.getByAltText('John Doe');
    expect(avatar).toBeInTheDocument();
    expect(avatar).toHaveAttribute('src', 'https://avatars.githubusercontent.com/u/123456?v=4');
  });
});