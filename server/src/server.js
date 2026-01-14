import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import generativeRouter from './routes/generative.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3001

app.use(cors())
app.use(express.json({ limit: '50mb' }))
app.use(express.urlencoded({ limit: '50mb', extended: true }))

app.use('/api', generativeRouter)

app.get('/health', (req, res) => {
  res.json({ status: 'ok', message: 'Sketch2Code AI Server is running' })
})

app.listen(PORT, () => {
  console.log(`🚀 Server is running on http://localhost:${PORT}`)
  console.log(`📝 API endpoint: http://localhost:${PORT}/api/generate`)
})
