import express from 'express';
import connectDB from './utils/db';

// routes
import userRouter from './routes/user';
import authRouter from './routes/auth';
import organizationRouter from './routes/organization';
import eventRouter from './routes/event';
import rewardRouter from './routes/reward';

// Init App
const app = express();

const PORT = process.env.PORT || 8080;

// Connect Database
connectDB();

// Middleware
app.use(express.json({ extended: false }));

// Routes
app.get('/', (req, res) => res.send('API running'));
app.use('/user', userRouter);
app.use('/auth', authRouter);
app.use('/event', eventRouter);
app.use('/organization', organizationRouter);
app.use('/reward', rewardRouter);

app.listen(PORT, () =>
  console.log(`Server started on http://localhost:${PORT}...`)
);
