
import React from 'react';
import { Skeleton } from '@/components/ui/skeleton';

function Loading() {
    return (
        <div className='flex h-full w-full flex-col gap-4 py-4'>
            {[...Array(4)].map((_, i) => (
                <Skeleton key={i} className='h-20' />
            ))}
        </div>
    );
}

export default Loading;
