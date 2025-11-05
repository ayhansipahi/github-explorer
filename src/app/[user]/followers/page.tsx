import { Separator } from '@/components/ui/separator';
import { getFollowers } from '@/lib/api/getFollowers';
import { getUser } from '@/lib/api/getUser';
import UserCard from '@/components/UserCard/UserCard';
import Pagination from '@/components/Pagination/Pagination';

type Props = {
  params: {
    user: string;
  };
  searchParams: {
    page?: string;
    per_page?: string;
  };
};

export default async function Page({ params, searchParams }: Props) {
  const { user } = params;
  const page = parseInt(searchParams.page || '1');
  const per_page = parseInt(searchParams.per_page || '30');

  try {
    const [followers, userProfile] = await Promise.all([
      getFollowers(user, page, per_page),
      getUser(user),
    ]);

    return (
      <div className='my-4'>
        <h1 className='text-xl font-semibold mb-2'>Followers of {user}</h1>
        <p className='text-sm text-[#768390] mb-4'>
          {userProfile.followers} {userProfile.followers === 1 ? 'follower' : 'followers'}
        </p>
        <Separator className='my-4' />

        {followers.length === 0 ? (
          <div className='text-center text-[#768390] py-8'>
            No followers yet
          </div>
        ) : (
          <>
            <div className='grid gap-4 md:grid-cols-2'>
              {followers.map((follower) => (
                <UserCard key={follower.id} user={follower} />
              ))}
            </div>
            <Pagination total_count={userProfile.followers} per_page={per_page} />
          </>
        )}
      </div>
    );
  } catch (error) {
    return (
      <div className='my-4 text-center'>
        <h1 className='text-xl font-semibold mb-2'>Error</h1>
        <Separator className='my-4' />
        <p className='text-red-500'>
          Failed to load followers. Please try again later.
        </p>
      </div>
    );
  }
}
