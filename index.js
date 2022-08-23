import 'dotenv/config'
import express from 'express'
import mongoose from 'mongoose'
import cors from 'cors'

import './passport/passport.js'
import usersRouter from './routes/users.js'
import attractionsRouter from './routes/attractions.js'
import tripinfosRouter from './routes/tripinfos.js'
import tripnotesRouter from './routes/tripnotes.js'

mongoose.connect(process.env.DB_URL)

const app = express()

app.use(cors({
  origin(origin, callback) {
    if (origin === undefined || origin.includes('github') || origin.includes('localhost')) {
      callback(null, true)
    } else {
      callback(new Error('Not Allowed'), false)
    }
  }
}))
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '請求被拒絕' })
})

app.use(express.json())
app.use((_, req, res, next) => {
  res.status(400).send({ success: false, message: '請求格式錯誤' })
})

app.use('/users', usersRouter)
app.use('/attractions', attractionsRouter)
app.use('/tripinfos', tripinfosRouter)
app.use('/tripnotes', tripnotesRouter)

app.use('*', (req, res) => {
  res.status(404).send({ success: false, message: '找不到' })
})
app.listen(process.env.PORT || 4000, () => {
  console.log('Server is runnung')
})
