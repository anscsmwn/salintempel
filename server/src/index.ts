import cors from 'cors'
import express from 'express'
import db from './connection/db'
import salinTempelRoute from './routes/salinTemple'
import tagRoute from './routes/tag'

const PORT = 3000

const app = express()
app.use(
  cors({
    origin: '*',
  }),
)
app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.enable('trust proxy')
app.use('/api/salin-tempel', salinTempelRoute)
app.use('/api/salin-tempel-tag', tagRoute)

app.get('/', (req, res) => {
  res.status(200).json({
    api_name: 'Salin Tempel API',
    author: 'anscsmwn',
    description:
      'A place to archive salintempel (the Indonesian word for copypasta).',
    version: 'v1.0.0',
    end_points: {
      '/api/salin-tempel': {
        GET: 'Get all salin tempel.',
        POST: 'Create a new salin tempel.',
      },
      '/api/salin-tempel/random': {
        GET: 'Get a random salin tempel.',
      },
      '/api/salin-tempel/:id': {
        DELETE: 'Delete a salin tempel.',
      },
      '/api/salin-tempel/:id/like/:userId': {
        PUT: 'Like or unlike a salin tempel.',
      },
    },
    repository: 'https://github.com/anscsmwn/salintempel/server',
  })
})

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    end_point: req.originalUrl,
    method: req.method,
    message: 'Not Found',
  })
})

try {
  db.once('open', () => {
    app.listen(process.env.PORT || PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`)
    })
  })
} catch (error) {
  db.on('error', () => {
    console.log('Error connecting to databasee')
  })
}
