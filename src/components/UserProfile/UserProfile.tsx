import {
  EnvelopeClosedIcon,
  IdCardIcon,
  Link2Icon,
  PersonIcon,
  SewingPinIcon,
  TwitterLogoIcon,
} from '@radix-ui/react-icons';
import { Separator } from '@/components/ui/separator';
import { UserResponse } from '@/lib/api/getUser.types';
import Link from 'next/link';
import Image from 'next/image';

import styles from './UserProfile.module.css';

interface Props {
  profile: UserResponse;
}

export default function UserProfile({ profile }: Props) {
  return (
    <div className='flex flex-col gap-4'>
      <section className='flex items-center md:block'>
        <div className='relative z-20 mr-4 h-full w-[96px] min-w-[96px] overflow-hidden rounded-full border border-[#d0d7de] dark:border-[#444c56] md:mb-4 md:mr-0  xl:w-[296px]'>
          <Image
            src={profile.avatar_url}
            alt={profile.name || profile.login}
            width={296}
            height={296}
            className={'w-full'}
          />
        </div>

        <h1 className='md:mb-4'>
          <span className='dark:text-github-dark-text block text-[26px] font-semibold leading-tight'>
            {profile.name}
          </span>
          <span className='text-xl font-light leading-6 text-[#768390]'>
            {profile.login}
          </span>
        </h1>
      </section>
      <p className='text-base'>{profile.bio}</p>
      <section className='flex flex-wrap content-stretch md:flex-col lg:flex-row'>
        <Link
          href={`/${profile.login}/followers`}
          className='inline-flex items-center gap-1'
        >
          <PersonIcon />
          {profile.followers} followers
        </Link>
        <Separator
          orientation={'vertical'}
          className={'mx-4 inline-block h-auto md:hidden lg:block '}
        />
        <Link
          href={`/${profile.login}/following`}
          className='inline-flex items-center gap-1'
        >
          <PersonIcon className='hidden md:block lg:hidden' />
          {profile.following} following
        </Link>
      </section>

      <section className='flex flex-col gap-2'>
        {profile.company && (
          <div className={styles.info}>
            <IdCardIcon />
            {profile.company}
          </div>
        )}
        {profile.location && (
          <div className={styles.info}>
            <SewingPinIcon />
            {profile.location}
          </div>
        )}
        {profile.email && (
          <a className={styles.info} href={'mailto:' + profile.email}>
            <EnvelopeClosedIcon />
            {profile.email}
          </a>
        )}

        {profile.blog && (
          <a className={styles.info} href={profile.blog} target={'_blank'}>
            <Link2Icon />
            {profile.blog}
          </a>
        )}
        {profile.twitter_username && (
          <a
            className={styles.info}
            href={'https://x.com/' + profile.twitter_username}
            target={'_blank'}
          >
            <TwitterLogoIcon />@{profile.twitter_username}
          </a>
        )}
      </section>
    </div>
  );
}
