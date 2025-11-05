import { FollowerUser } from '@/lib/api/followers.types';
import Link from 'next/link';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';

interface Props {
  user: FollowerUser;
}

export default function UserCard({ user }: Props) {
  return (
    <Card className='hover:shadow-md transition-shadow'>
      <CardContent className='p-4'>
        <Link
          href={`/${user.login}`}
          className='flex items-center gap-4 no-underline'
        >
          <div className='relative h-16 w-16 min-w-[64px] overflow-hidden rounded-full border border-[#d0d7de] dark:border-[#444c56]'>
            <Image
              src={user.avatar_url}
              alt={user.login}
              width={64}
              height={64}
              className='w-full h-full object-cover'
            />
          </div>
          <div className='flex-1'>
            <h3 className='text-lg font-semibold text-[#24292f] dark:text-[#c9d1d9]'>
              {user.login}
            </h3>
            <p className='text-sm text-[#768390]'>
              View Profile
            </p>
          </div>
        </Link>
      </CardContent>
    </Card>
  );
}
