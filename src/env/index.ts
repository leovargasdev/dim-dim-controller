import { z } from 'zod'

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production']).default('development'),
  FIREBASE_API_KEY: z.string(),
  FIREBASE_PROJECT_ID: z.string(),
  FIREBASE_APP_ID: z.string()
})

const _env = envSchema.safeParse(process.env)

if (_env.success === false) {
  console.error('Invalid enviroment variables', _env.error.format())

  throw new Error('Invalid enviroment variables')
}

export const env = _env.data
