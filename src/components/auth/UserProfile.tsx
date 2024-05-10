"use client"

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '../ui/dropdown-menu';
import { User2 } from 'lucide-react';
import Link from 'next/link';
import { useSession } from 'next-auth/react'
import { Button, buttonVariants } from '../ui/button';
import useMediaQuery from '@/src/hooks/UseMediaQuery';
import { LogoutButton } from './LogoutButton';
import { UserAvatarMini } from './UserAvatarMini';
import { useRouter } from 'next/navigation';
import { UserAvatar } from './UserAvatar';

export const UserProfile = () => {
  const { data: session } = useSession()
  const isMobile = useMediaQuery("(max-width: 768px)");
  const router = useRouter()

  if (!session || !session.user?.name) {
    return <Button variant={'outline'} onClick={()=>router.push(`${window.location.origin}/auths/login`)}>Login</Button>
  }
  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="default" className='rounded-full bg-transparent w-11 h-11 border border-primary hover:bg-transparent' variant={'ghost'} >
        {
          session.user.image ? (
            <UserAvatar image={session.user.image} />
          ) : (
            <UserAvatarMini
              nom={session?.user.name?.split(' ')[0] || ''}
              prenom={session?.user.name?.split(' ')[1] || ''}
            />
          )
        }
       
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56">
        <DropdownMenuItem asChild>
          <Link href="/profile">
            <User2 className="mr-2 h-4 w-4" />
            Profile
          </Link>
        </DropdownMenuItem>
        <LogoutButton />
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
