import z from 'zod'

const envScheme = z.object({
  PORT: z.string().optional().default('8000'),
  MODE: z.enum(['development', 'production']),
  DATABASE_URL: z.string(),
  DIRECT_URL: z.string(),

  // PRODUÇÃO = false
  // HOMOLOGAÇÃO = true
  sandbox: z
  .union([z.string(), z.boolean()])
  .transform((value) => {
    if (typeof value === 'string') {
      return value.toLowerCase() === 'true';
    }
    return value;
  }),
  client_id: z.string(), //'seu_client_id'
  client_secret: z.string(), // 'seu_client_secret'
  certificate: z.string() //'caminho/ate/seu/certificado.p12'

})

export const env = envScheme.parse(process.env)
