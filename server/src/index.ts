import express from 'express';
import cors from 'cors';

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
    repository: 'https://github.com/aancaa/salin-tempel-api',
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
app.listen(process.env.PORT || PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
