import { relations, sql } from 'drizzle-orm'
import {
  index,
  int,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { likes } from './likes'

export const tweets = mysqlTable(
  'tweets',
  {
    id: int('id').autoincrement().unique().notNull(),
    userId: varchar('user_id', { length: 100 }).notNull(),
    content: text('content').notNull(),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
  },
  (tweets) => ({
    pkIndex: index('pk_index').on(tweets.id, tweets.userId),
  })
)

export const tweetsRelations = relations(tweets, ({ many }) => ({
  likes: many(likes),
}))

export type Tweet = typeof tweets.$inferSelect
export type NewTweet = typeof tweets.$inferInsert
