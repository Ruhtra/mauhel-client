import express from 'express'
import cors from 'cors'
import { stripeRouter } from './middlewares/StripeWebhook'
import { configAuth } from './auth'
import { apiRouter } from './routes/api'
import { requireJwtAuth } from './auth/RequiredJwtAuth'

const app = express()

app.use(
  cors({
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
    origin: true
  })
)

// stripe middelware deve ser antes da definição do express json e urlenconded
app.use(stripeRouter)

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
// app.use();

configAuth(app)
app.use('/api', requireJwtAuth, apiRouter)

// app.use("/api", router);

// app.get("/", (req, res) => {
//   res.send("Home Page");
// });

export { app }
