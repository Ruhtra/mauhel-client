import z from 'zod'

const envScheme = z.object({
  PORT: z.string().optional().default('8000'),
  MODE: z.enum(['development', 'production']),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),

  // PRODUÇÃO = false
  // HOMOLOGAÇÃO = true
  sandbox: z.union([z.string(), z.boolean()]).transform(value => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true'
    }
    return value
  }),
  // client_id: z.string(), //'seu_client_id'
  // client_secret: z.string(), // 'seu_client_secret'
  // certificate: z.string(), //'caminho/ate/seu/certificado.p12'

  STRIPE_SECRET_KEY: z.string(),
  STRIPE_WEBHOOK_SECRET: z.string(),

  GOOGLE_CLIENT_ID: z.string(),
  GOOGLE_CLIENT_SECRET: z.string(),
  GOOGLE_REDIRECT_URL: z.string(),

  JWT_SECRET: z.string(),
  DOMAIN: z.string(),
  URL_FRONTEND: z.string()
})

export const env = envScheme.parse(process.env)
