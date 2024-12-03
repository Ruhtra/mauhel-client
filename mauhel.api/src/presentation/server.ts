import http from 'http'
import https from 'https'
import fs from 'fs'

import { app } from './app'
import { env } from './env'

// import '../tests'
import path from 'path'

async function initModules() {
  console.log(' ~. Starting modules...')

  if (env.MODE == 'development') {
    const options = {
      key: fs.readFileSync(
        path.join(__dirname, '..', '..', 'certifies', 'key.pem')
      ),
      cert: fs.readFileSync(
        path.join(__dirname, '..', '..', 'certifies', 'cert.pem')
      )
    }

    https.createServer(options, app).listen(env.PORT, () => {
      console.log(' >. Server running in: https://localhost:' + env.PORT)
    })
  } else {
    http.createServer(app).listen(env.PORT, () => {
      console.log(' >. Server running in: http://localhost:' + env.PORT)
    })
  }
}

initModules()
