'use client'

import { HeartIcon } from 'lucide-react'
import { experimental_useFormStatus as useFormStatus } from 'react-dom'
import { Button } from '../ui/button'
import { formatLikes } from '@/utils/formatLikes'
import { toggleTweetLike } from './actions'
import { useRouter } from 'next/navigation'
import { useToast } from '../ui/use-toast'

type LikeTweetProps = { likes: number; tweetId: number; isTweetLiked: boolean }

export default function LikeTweet({
  likes,
  tweetId,
  isTweetLiked,
}: LikeTweetProps) {
  const { refresh } = useRouter()
  const { toast } = useToast()

  async function action(formData: FormData) {
    formData.append('tweetId', tweetId.toString())
    const { success, error } = await toggleTweetLike(formData)

    if (success) refresh()
    else if (error) {
      toast({ description: error })
    }
  }

  return (
    <form action={action} className='self-end'>
      <LikeButton likes={likes} isTweetLiked={isTweetLiked} />
    </form>
  )
}

function LikeButton({ likes, isTweetLiked }: Omit<LikeTweetProps, 'tweetId'>) {
  const { pending } = useFormStatus()
  return (
    <Button
      disabled={pending}
      variant='ghost'
      size='sm'
      className='flex gap-1 text-sm'
    >
      <HeartIcon
        size='1em'
        className={isTweetLiked ? 'fill-red-500 stroke-red-500' : ''}
      />
      <span className='text-xs'>{formatLikes(likes)}</span>
    </Button>
  )
}
