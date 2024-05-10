'use client';

import { LogOut } from 'lucide-react';
import { signIn,signOut } from 'next-auth/react';
import useSWRMutation from 'swr/mutation';
import { DropdownMenuItem } from '../ui/dropdown-menu';
import { Loader } from '../ui/loader';

export const LogoutButton = () => {
  const { trigger, isMutating } = useSWRMutation('auth', signIn);

  return (
    <DropdownMenuItem className='text-red-500'
    onClick={() => signOut({
      redirect: true,
      callbackUrl: `${window.location.origin}/auths/login`
  })}
    >
      {isMutating ? <Loader /> : <LogOut className="mr-2 h-4 w-4" />}
      <span>Log out</span>
    </DropdownMenuItem>
  );
};
