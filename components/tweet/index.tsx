import { fetchTweets } from '@/server/tweets'
import { formatDate } from '@/utils/formatDate'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import LikeTweet from './client'

type TweetProps = Awaited<ReturnType<typeof fetchTweets>>[0]

export default function Tweet(props: TweetProps) {
  const {
    tweetId,
    content,
    createdAt,
    isTweetLiked,
    userAvatar,
    firstName,
    lastName,
    likeCount,
    username,
  } = props

  const avatarFallback =
    firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'U'

  return (
    <div className='flex flex-col gap-3'>
      <header className='flex items-center gap-2'>
        <Avatar>
          <AvatarImage src={userAvatar || ''} />
          <AvatarFallback>{avatarFallback}</AvatarFallback>
        </Avatar>

        <span className='text-xs font-semibold'>@{username}</span>
        <span className='aspect-square w-[3px] rounded-full bg-neutral-300'></span>
        <span className='text-[10px] font-medium'>
          {formatDate(createdAt.valueOf())}
        </span>
      </header>

      <pre className='whitespace-pre-wrap font-[inherit] text-xs'>
        {content}
      </pre>

      <LikeTweet
        tweetId={tweetId}
        likes={likeCount}
        isTweetLiked={isTweetLiked}
      />
    </div>
  )
}
