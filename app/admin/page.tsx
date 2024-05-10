import { authOptions } from '@/src/lib/auth'
import { getServerSession } from 'next-auth'
import React from 'react'

const AdminPage = async () => {
  const session = await getServerSession(authOptions);
  console.log(session)
  if (!session?.user) {
    return <div className="p-24">Veillez vous connecter pour voir cette page</div>

  }
  return (
    <div className="p-24">Bienvenue {session?.user?.name}</div>
  )
}

export default AdminPage