'use server'

import { db, likes } from '@/database'
import { auth } from '@clerk/nextjs'
import { and, eq } from 'drizzle-orm'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const likeTweetSchema = z.object({
  tweetId: z.string().trim().nonempty('tweetId cannot be empty'),
})

export async function toggleTweetLike(formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsedData = likeTweetSchema.safeParse(data)
  const { userId } = auth()

  if (!userId) redirect('/sign-in')

  if (parsedData.success) {
    const { tweetId } = parsedData.data

    const postLike = await db.query.likes.findFirst({
      where: and(eq(likes.tweetId, tweetId), eq(likes.userId, userId)),
    })

    if (postLike)
      await db
        .delete(likes)
        .where(and(eq(likes.tweetId, tweetId), eq(likes.userId, userId)))
    else await db.insert(likes).values({ tweetId, userId })

    return { success: true }
  }

  const error = parsedData.error.errors[0].message
  return { error }
}
