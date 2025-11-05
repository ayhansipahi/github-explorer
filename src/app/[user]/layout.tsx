import { notFound } from 'next/navigation';
import { ReactNode } from 'react';

import { getUser } from '@/lib/api/getUser';
import { isUserResponse } from '@/lib/api/getUser.types';
import { UserNavigationMenu } from '@/components/UserNavigation/UserNavigation';
import UserProfile from '@/components/UserProfile/UserProfile';

interface Props {
  children: ReactNode;
  params: {
    user: string;
  };
}

export default async function UserLayout({ children, params }: Props) {
  const { user } = params;
  const profileResponse = await getUser(user);

  if (!isUserResponse(profileResponse)) {
    return notFound();
  }

  const profile = profileResponse;

  return (
    <div className='container mx-auto flex flex-col gap-10 py-4 md:flex-row'>
      <aside className='w-full md:w-1/4'>
        <UserProfile profile={profile} />
      </aside>
      <main className='w-full md:w-3/4'>
        <UserNavigationMenu user={user} />
        {children}
      </main>
    </div>
  );
}
