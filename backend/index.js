import express from 'express';
import { PORT, mongoDBURL } from './config.js';
import mongoose from 'mongoose';
import paperRoutes from './routes/paperRoutes.js';
import metalRoutes from './routes/metalRoutes.js';
import glassRoutes from './routes/glassRoutes.js';
import plasticRoutes from './routes/plasticRoutes.js';
import cardboardRoutes from './routes/cardboardRoutes.js';
import trashRoutes from './routes/trashRoutes.js';

import cors from 'cors';

const app = express();

// Middleware to parse the body of the request
app.use(express.json());

// Middleware to allow CORS
app.use(cors({
    origin: '*',
    methods: ['GET,POST,PUT,DELETE'],
    allowedHeaders: ['Content-Type'],
}));

app.get('/', (request, response) => {
    console.log(request)
    return response.status(234).send('Hello World');
});

app.use('/papers', paperRoutes);
app.use('/metals', metalRoutes);
app.use('/glasses', glassRoutes);
app.use('/plastics', plasticRoutes);
app.use('/cardboards', cardboardRoutes);
app.use('/trash', trashRoutes);

mongoose
  .connect(mongoDBURL)
  .then(() => {
    console.log('Connected to MongoDB');
    app.listen(PORT, () => {
        console.log(`Server is running on http://localhost:${PORT}`);
      });
  })
  .catch((error) => {
    console.log(error);
    });