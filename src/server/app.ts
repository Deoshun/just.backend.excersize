import 'dotenv/config';
import express from 'express';
import TripController from '../controllers/http/trip.controller';
import UserController from '../controllers/http/user.controller';


import { Request, Response } from 'express';

export const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Lets do this!');
});

app.use(express.json());
app.use('/trips', TripController);
app.use('/users', UserController);

app.listen(port, () => {
  console.log('Application started, running on http://localhost:' + port);
});
