import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props {
  nom: string | null;
  prenom: string | null;

}

export const UserAvatarMini = ({ nom, prenom }: Props) => {
  const initials = (nom || '')
    .charAt(0)
    .toUpperCase() +
    (prenom || '')
      .charAt(0)
      .toUpperCase();

  return (
    <span className='text-lg'>
      {initials}
    </span>
  );
};
