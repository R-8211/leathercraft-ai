import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import chatRouter from './routes/chat.js'

const app = express()
const PORT = process.env.PORT ?? 3001

app.use(cors({
  origin: /^http:\/\/(localhost|127\.0\.0\.1)(:\d+)?$/,
  methods: ['GET', 'POST'],
  allowedHeaders: ['Content-Type'],
}))
app.use(express.json())

app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() })
})

app.use('/api/chat', chatRouter)

app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' })
})

app.use((err, _req, res, _next) => {
  console.error('[Error]', err)
  res.status(500).json({ error: 'Internal server error' })
})

app.listen(PORT, () => {
  console.log(`LeatherCraft AI backend listening on port ${PORT}`)
})
