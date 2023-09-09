import { db, followers, profiles } from '@/database'
import { clerkClient } from '@clerk/nextjs'
import { desc, eq, sql } from 'drizzle-orm'

export async function fetchTopUsersProfile() {
  const topUsersProfile = await db
    .select({
      userId: profiles.userId,
      avatarKey: profiles.avatarKey,
      followersCount: sql<number>`count(${followers.followerId})`.mapWith(
        Number
      ),
    })
    .from(profiles)
    .leftJoin(followers, eq(profiles.userId, followers.followingId))
    .groupBy(({ userId }) => userId)
    .orderBy(({ followersCount }) => desc(followersCount))
    .limit(4)

  const topUsers = await clerkClient.users.getUserList({
    userId: topUsersProfile.map((profile) => profile.userId),
  })

  return topUsersProfile.map((el, indx) => {
    const user = topUsers.find((user) => user.id === el.userId)

    if (!user) throw Error('database out of sync')

    return {
      firstName: user.firstName,
      lastName: user.lastName,
      username: user.username!,
      followers: el.followersCount,
      avatar: user.hasImage ? user.imageUrl : null,
      createdAt: user.createdAt,
    }
  })
}
