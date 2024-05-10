import { Link } from 'lucide-react'
import React from 'react'
import { buttonVariants } from '../ui/button'

export const SignInButton = () => {
    return (
        <div>
            <Link className={buttonVariants({ variant: "default" })} href='auths/login' >Login</Link>
        </div>
    )
}
