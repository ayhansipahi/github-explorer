import { Separator } from '@/components/ui/separator';

type Props = {
  params: {
    user: string;
  };
};
export default async function Page({ params }: Props) {
  const { user } = params;

  return (
    <div className='my-4 text-center'>
      <h1 className='text-xl'>Followers of {user}</h1>
      <Separator className='my-4' />
      <code>TODO: implement this page</code>
    </div>
  );
}
