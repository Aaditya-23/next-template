import { db, profiles } from '@/database'
import { auth } from '@clerk/nextjs'
import { eq } from 'drizzle-orm'
import { RedirectType } from 'next/dist/client/components/redirect'
import { redirect } from 'next/navigation'

export async function GET() {
  const { userId } = auth()

  if (!userId) redirect('/sign-up')

  const userProfileInDb = await db.query.profiles.findFirst({
    where: eq(profiles.userId, userId),
    columns: {
      userId: true,
    },
  })

  if (!userProfileInDb) await db.insert(profiles).values({ userId })

  redirect('/')
}
