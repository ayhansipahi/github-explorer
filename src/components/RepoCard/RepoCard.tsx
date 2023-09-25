import { RepoSearchResultItem } from '@/lib/api/repoSearch.types';
import Link from 'next/link';

interface Props {
  repo: RepoSearchResultItem;
}
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { EyeOpenIcon, Share1Icon, StarIcon } from '@radix-ui/react-icons';

export default function RepoCard({ repo }: Props) {
  const lastUpdated = (new Date(repo.updated_at)).toLocaleString("en-GB", {
    year: "numeric",
    month: "long",
    day: "numeric",
    hour: "2-digit",
    minute:  "2-digit",
    hour12: true,
  });
  return (
    <Link href={`${repo.html_url}`} target='_blank'>
      <Card>
        <CardHeader>
          <CardTitle>{repo.name}</CardTitle>
          <CardDescription>{repo.description}</CardDescription>
        </CardHeader>
        <CardContent>
          {repo.stargazers_count && repo.stargazers_count > 0 ? (
            <span className='mr-2 flex items-center gap-2'>
              <StarIcon />
              {repo.stargazers_count}
            </span>
          ) : null}
          {repo.forks_count && repo.forks_count > 0 ? (
            <span className='mr-2 flex items-center gap-2'>
              <Share1Icon /> {repo.forks_count} forks
            </span>
          ) : null}
          {repo.watchers_count && repo.watchers_count > 0 ? (
            <span className='mr-2 flex items-center gap-2'>
              <EyeOpenIcon /> {repo.watchers_count} watchers
            </span>
          ) : null}
        </CardContent>
        <CardFooter>Last updated: {lastUpdated} </CardFooter>
      </Card>
    </Link>
  );
}
