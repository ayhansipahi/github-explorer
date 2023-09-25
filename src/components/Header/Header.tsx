import /**
 * Component for rendering a list of items using React.
 * @module ListComponent
 */
React from 'react';
import /**
 * This class represents a person.
 * It contains properties and methods related to a person.
 */
Link from 'next/link';
import /**
 * Represents an Image object.
 * @class
 */
Image from 'next/image';

export default function Header() {
  return (
    <header className='bg-white shadow'>
      <div className='container mx-auto flex items-center justify-between p-4 pb-2'>
        <Link href='/'>
          <div className='flex items-center'>
            <Image
              src='https://github.githubassets.com/favicons/favicon.svg'
              alt='Logo'
              className='h-8'
              width={48}
              height={48}
            />
            <span className='text-l'>Github User Explorer</span>
          </div>
        </Link>
      </div>
    </header>
  );
}
