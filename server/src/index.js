import express from 'express';
import connectDB from './utils/db';

// routes

// Init App
const app = express();

const PORT = process.env.PORT || 8080;

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.get('/', (req, res) => res.send('API running'));
// app.use('/api/users', userRouter)

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}...`)
);