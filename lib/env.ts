import { z } from 'zod'

const envSchema = z.object({
  DATABASE_URL: z.string({
    required_error: 'you forgot to add DATABASE_URL in your env file',
  }),
  DATABASE_HOST: z.string({
    required_error: 'you forgot to add DATABASE_HOST in your env file',
  }),
  DATABASE_USERNAME: z.string({
    required_error: 'you forgot to add DATABASE_USERNAME in your env file',
  }),
  DATABASE_PASSWORD: z.string({
    required_error: 'you forgot to add DATABASE_PASSWORD in your env file',
  }),
})

export const env = envSchema.parse(process.env)
