'use client';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import styles from './style.module.css';
import { BookmarkIcon, PersonIcon } from '@radix-ui/react-icons';

export function UserNavigationMenu({ user }: { user: string }) {
  const pathname = usePathname();
  const Links = [
    {
      name: 'Repositories',
      url: `/${user}`,
      icon: <BookmarkIcon />,
    },
    {
      name: 'Followers',
      url: `/${user}/followers`,
      icon: <PersonIcon />,
    },
    {
      name: 'Following',
      url: `/${user}/following`,
      icon: <PersonIcon />,
    },
  ];
  return (
    <nav className={styles.menu}>
      {Links.map((link, index) => {
        return (
          <Link href={link.url} key={index}>
            <div
              className={styles.item}
              data-state={pathname === link.url ? 'active' : null}
            >
              {link.icon} {link.name}
            </div>
          </Link>
        );
      })}
    </nav>
  );
}
