import { db, likes, tweets } from '@/database'
import { auth, clerkClient } from '@clerk/nextjs'
import { asc, desc, eq, gt, sql } from 'drizzle-orm'

export async function fetchTweets(cursor: number) {
  const { userId } = auth()

  const allTweets = await db
    .select({
      tweetId: tweets.id,
      content: tweets.content,
      userId: tweets.userId,
      createdAt: tweets.createdAt,
      isTweetLiked: sql<number>`IFNULL(MAX(${likes.userId} = ${
        userId || ''
      }), 0)`.mapWith(Number),
      likeCount: sql<number>`count(${likes.tweetId})`.mapWith(Number),
    })
    .from(tweets)
    .leftJoin(likes, eq(likes.tweetId, tweets.id))
    .groupBy(({ tweetId }) => tweetId)
    .orderBy(asc(tweets.id))
    .limit(8)
    .where(gt(tweets.id, cursor))

  const uniqueUserId = [...new Set(allTweets.map((tweet) => tweet.userId))]

  const users = await clerkClient.users.getUserList({
    userId: uniqueUserId,
  })

  return allTweets.map((tweet) => {
    const user = users.find((user) => user.id === tweet.userId)
    if (!user) throw Error('database out of sync')

    return {
      ...tweet,
      isTweetLiked: tweet.isTweetLiked === 0 ? false : true,
      userId: undefined,
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username!,
      userAvatar: user.hasImage ? user.imageUrl : null,
    }
  })
}
