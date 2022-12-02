import express from 'express';
import cors from 'cors';
import db from './connection/db';

const PORT = 3000;

const app = express();

app.use(
  cors({
    origin: '*',
  }),
);

app.get('/', (req, res) => {
  res.status(200).json({
    api_name: 'Salin Tempel API',
    author: 'aancaa',
    description:
      'A place to archive salintempel (the Indonesian word for copypasta).',
    version: 'v1.0.0',
    end_points: {},
    repository: 'https://github.com/aancaa/salintempel/server',
  });
});

app.use((req, res) => {
  res.status(404).json({
    status: 'error',
    end_point: req.originalUrl,
    method: req.method,
    message: 'Not Found',
  });
});

app.use(express.json());
db.once('open', () => {
  app.listen(process.env.PORT || PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
  });
});
