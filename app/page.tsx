import PostTweet from '@/components/post-tweet'
import TopUsers from '@/components/top-users'
import Tweet from '@/components/tweet'
import { fetchTweets } from '@/server/tweets'
import { Menubar, Navbar } from '@/layouts'
import { Separator } from '@/components/ui/separator'
import PaginationControls from '@/components/pagination-controls'

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined }
}) {
  const cursor = (() => {
    const { cursor } = searchParams
    if (typeof cursor === 'string') return parseInt(cursor)
    return 0
  })()

  const tweets = await fetchTweets(cursor)
  const disableNextPage = tweets.length < 8

  return (
    <>
      <Navbar />
      <main className='mb-12 flex justify-between gap-6 p-2 md:px-8 lg:pl-16'>
        <Menubar />
        <div className='flex flex-[2] flex-col gap-6 px-4 md:border-x'>
          <PostTweet />
          <div className='space-y-4'>
            {tweets.map((tweet, indx) => (
              <>
                <Tweet {...tweet} key={indx} />
                {indx !== tweets.length - 1 && <Separator />}
              </>
            ))}
            {tweets.length === 0 && <p>No results found.</p>}
          </div>
          <PaginationControls disableNextPage={disableNextPage} />
        </div>
        <TopUsers />
      </main>
    </>
  )
}
