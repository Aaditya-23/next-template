import { relations, sql } from 'drizzle-orm'
import {
  index,
  mysqlTable,
  text,
  timestamp,
  varchar,
} from 'drizzle-orm/mysql-core'
import { likes } from './likes'
import { followers } from './followers'

export const profiles = mysqlTable(
  'profiles',
  {
    userId: varchar('user_id', { length: 100 }).notNull().unique(),
    firstName: text('first_name'),
    lastName: text('last_name'),
    bio: text('bio'),
    dob: text('dob'),
    avatarKey: text('avatar_key'),
    createdAt: timestamp('created_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .notNull(),
    updatedAt: timestamp('updated_at')
      .default(sql`CURRENT_TIMESTAMP`)
      .onUpdateNow()
      .notNull(),
  },
  (profiles) => ({
    pkIndex: index('pk_index').on(profiles.userId),
  })
)

export const profileRelations = relations(profiles, ({ many }) => ({
  likes: many(likes),
  followers: many(followers),
}))

export type Profile = typeof profiles.$inferSelect
export type NewProfile = typeof profiles.$inferInsert
