'use client'

import { useContext, useTransition } from 'react'
import { Button } from '../ui/button'
import { followUser, isFollowedByCurrentUser, unsubscribeUser } from '@/src/actions/user.action'
import { Loader } from '../ui/loader'
import { useRouter } from 'next/navigation'
import { CurrentUserContext } from '@/src/contexts/CurrentUserProvider'

export const UserProfilActions = ({ userProfilId, isFollowed = false, messages }: { userProfilId:string, isFollowed:boolean, messages:Record<string, string> }) => {

  const router = useRouter()
  const [isFollowPending, onFollowTransition] = useTransition()
  const [isUnsubscribePending, onUnsubscribeTransition] = useTransition()
  const currentUser = useContext(CurrentUserContext)

  const doFollowUser = () => {
    onFollowTransition(() => {
      followUser(userProfilId)
    })

    router.refresh()
  }

  const doUnsubscribeUser = () => {
    onUnsubscribeTransition(() => {
      unsubscribeUser(userProfilId)
    })

    router.refresh()
  }

  return (
    <div>
      {userProfilId != currentUser?.id && (
        isFollowed ? 
        <Button className="rounded-full" variant="outline" onClick={doUnsubscribeUser}>
          {isUnsubscribePending && <Loader size={18} className="mr-2" />}
          {messages?.unsubscribe}
        </Button>
        :
        <Button className="rounded-full" onClick={doFollowUser}>
          {isFollowPending && <Loader size={18} className="mr-2" />}
          {messages?.follow}
        </Button>
      )}
    </div>
  )
}
