import { relations } from 'drizzle-orm'
import { mysqlTable, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'
import { profiles } from './profiles'

export const followers = mysqlTable(
  'followers',
  {
    followerId: varchar('follower_id', { length: 100 }).notNull(),
    followingId: varchar('following_id', { length: 100 }).notNull(),
  },
  (followers) => ({
    followersIndex: uniqueIndex('followersIndex').on(
      followers.followerId,
      followers.followingId
    ),
  })
)

export const followersRelations = relations(followers, ({ one }) => ({
  follower: one(profiles, {
    fields: [followers.followerId],
    references: [profiles.userId],
  }),
  following: one(profiles, {
    fields: [followers.followingId],
    references: [profiles.userId],
  }),
}))
