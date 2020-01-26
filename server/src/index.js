import express from 'express';
import connectDB from './utils/db';

// routes
import userRouter from './routes/users';
import profileRouter from './routes/profile';
import authRouter from './routes/auth';

// Init App
const app = express();

const PORT = process.env.PORT || 8080;

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.get('/', (req, res) => res.send('API running'));
app.use('/users', userRouter);
app.use('/auth', authRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}...`)
);
