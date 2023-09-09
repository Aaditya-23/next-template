import { fetchTopUsersProfile } from '@/server/users'
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar'
import { Separator } from '@/components/ui/separator'
import { formatDate } from '@/utils/formatDate'
import Link from 'next/link'

type TopUserProps = Awaited<ReturnType<typeof fetchTopUsersProfile>>[0]

export default async function TopUsers() {
  const topUsers = await fetchTopUsersProfile()

  return (
    <div className='hidden flex-1 space-y-5 md:block'>
      <div className='space-y-1'>
        <TypographyLarge />
        <Separator />
      </div>

      {topUsers.map((user, indx) => (
        <TopUser {...user} key={indx} />
      ))}
    </div>
  )
}

function TopUser(props: TopUserProps) {
  const { firstName, lastName, username, followers, avatar, createdAt } = props

  const avatarFallback =
    firstName && lastName ? `${firstName[0]}${lastName[0]}` : 'U'

  return (
    <Link
      href='/'
      className='flex items-center gap-8 rounded-xl border p-3 transition-colors hover:bg-neutral-50 dark:hover:bg-neutral-900'
    >
      <Avatar>
        <AvatarImage src={avatar || ''} />
        <AvatarFallback>{avatarFallback}</AvatarFallback>
      </Avatar>

      <div className='flex flex-col gap-px'>
        <span className='mb-2 text-xs font-semibold'>@{username}</span>
        <span className='text-[10px] font-medium'>{followers} Followers</span>
        <span className='text-[10px] font-medium'>
          Member since {formatDate(createdAt)}
        </span>
      </div>
    </Link>
  )
}

export function TypographyLarge() {
  return <div className='text-lg font-semibold'>Top Users</div>
}
