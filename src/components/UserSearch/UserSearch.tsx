// client component
'use client';
import React, { useEffect, useState } from 'react';

import {
  Command,
  CommandEmpty,
  CommandInput,
  CommandItem,
  CommandList,
} from '@/components/ui/command';
import { searchUsers } from '@/lib/api/userSearch';
import { useRouter } from 'next/navigation';
import { useDebounce } from '@/lib/hooks/useDebounce';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { ExclamationTriangleIcon } from '@radix-ui/react-icons';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { isFailure } from '@/lib/api/userSearch';
import {
  UserSearchFail,
  UserSearchResultItem,
} from '@/lib/api/userSearch.types';

export default function UserSearch() {
  const { push } = useRouter();
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState<UserSearchResultItem[] | null>(null);
  const debouncedSearchTerm = useDebounce(search, 300);
  const [error, setError] = useState<UserSearchFail | null>(null);

  useEffect(() => {
    setLoading(true);
    if (!debouncedSearchTerm) {
      setUsers(null);
      setLoading(false);
      return;
    }

    const query = debouncedSearchTerm.toLowerCase().replace(/\s/g, '');
    searchUsers(query)
      .then((data) => {
        if (!data) return;
        if (isFailure(data)) {
          setError(data);
          setUsers(null);
          return;
        }

        if (data.total_count === 0) {
          setUsers([]);
          return;
        }
        setUsers(data.items);
        setError(null);
      })
      .catch((err) => {
        setError(err);
        setUsers(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [debouncedSearchTerm, setLoading, setUsers]);

  const handleSelect = (user: string) => {
    push(`/${user}`);
  };
  const handleValueChange = (value: string) => {
    setSearch(value);
  };

  return (
    <>
      {error && (
        <Alert variant='destructive'>
          <ExclamationTriangleIcon className='h-4 w-4' />
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>
            Github API rate limit exceeded. Please try again later.
          </AlertDescription>
        </Alert>
      )}
      <Command shouldFilter={false}>
        <CommandInput
          placeholder='Search users...'
          value={search}
          onValueChange={handleValueChange}
        />
        <CommandList>
          {users?.map((user) => (
            <CommandItem
              key={user.id}
              value={user.login}
              onSelect={handleSelect}
            >
              <Avatar>
                <AvatarImage src={user.avatar_url} />
                <AvatarFallback>{user.login}</AvatarFallback>
              </Avatar>
              <span className='ml-2'>{user.login}</span>
            </CommandItem>
          ))}
          {loading && <CommandEmpty>Loading…</CommandEmpty>}
          {!loading && users && users.length === 0 && (
            <CommandEmpty>No results found.</CommandEmpty>
          )}
        </CommandList>
      </Command>
    </>
  );
}
