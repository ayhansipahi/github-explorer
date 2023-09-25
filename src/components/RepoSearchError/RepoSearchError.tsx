import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { RepoSearchFail } from '@/lib/api/repoSearch.types';

type Props = {
  error: RepoSearchFail;
};

const RepoSearchError = ({ error }: Props) => (
  <Alert variant='destructive'>
    <ExclamationTriangleIcon className='h-4 w-4' />
    <AlertTitle>Error</AlertTitle>
    <AlertDescription>{error.message}</AlertDescription>
    {error?.errors?.map((err, i) => (
      <AlertDescription key={i}>{err.message}</AlertDescription>
    ))}
  </Alert>
);

export default RepoSearchError;
