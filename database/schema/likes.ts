import { relations } from 'drizzle-orm'
import { mysqlTable, text, uniqueIndex, varchar } from 'drizzle-orm/mysql-core'
import { profiles } from './profiles'
import { tweets } from './tweets'

export const likes = mysqlTable(
  'likes',
  {
    userId: varchar('user_id', { length: 100 }).notNull(),
    tweetId: varchar('tweet_id', { length: 100 }).notNull(),
  },
  (likes) => ({
    likesIndex: uniqueIndex('likesIndex').on(likes.userId, likes.tweetId),
  })
)

export const likesRelations = relations(likes, ({ one }) => ({
  user: one(profiles, {
    fields: [likes.userId],
    references: [profiles.userId],
  }),
  tweet: one(tweets, {
    fields: [likes.tweetId],
    references: [tweets.id],
  }),
}))
