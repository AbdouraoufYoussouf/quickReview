import { Avatar, AvatarFallback, AvatarImage } from '../ui/avatar';

interface Props{
  image:string
}
export const UserAvatar = ({image}:Props )=> {
  
  return ( 
    <Avatar size='default'>
      <AvatarImage className='' src={image} alt={'profile'} />
     
    </Avatar>
  );
};
