import express from 'express';
import 'dotenv/config';
import cors from 'cors';
import { errors } from 'celebrate';

import { connectMongoDB } from './db/connectMongoDB.js';
import { logger } from './middleware/logger.js';
import { notFoundHandler } from './middleware/notFoundHandler.js';
import { errorHandler } from './middleware/errorHandler.js';
import notesRoutes from './routes/notesRoutes.js';

const app = express();
const PORT = process.env.PORT ?? 3000;

// Middleware
app.use(logger);

app.use(express.json({
   type: ['application/json', 'application/vnd.api+json'],
  limit: '100kb',
}));
app.use(cors({
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  origin: '*',
}));




app.use(notesRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.use('/notes', notesRoutes);

app.use(errors());


await connectMongoDB();

app.listen(PORT, () => {
  console.log(`Server is running on localhost:${PORT}`);
});