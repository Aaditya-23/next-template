'use server'

import { db, tweets } from '@/database'
import { auth } from '@clerk/nextjs'
import { redirect } from 'next/navigation'
import { z } from 'zod'

const tweetSchema = z.object({
  content: z
    .string({ invalid_type_error: 'tweet should be of type string' })
    .trim()
    .max(200, { message: 'tweet should not be more than 200 characters' })
    .nonempty('tweet cannot be empty'),
})

export async function postTweet(formData: FormData) {
  const data = Object.fromEntries(formData)
  const parsedData = tweetSchema.safeParse(data)
  const { userId } = auth()

  if (!userId) redirect('/sign-up')

  if (parsedData.success) {
    const { content } = parsedData.data

    await db.insert(tweets).values({
      content,
      userId,
    })

    return { success: true }
  }

  const error = parsedData.error.errors[0].message
  return { error }
}
