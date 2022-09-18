import 'dotenv/config';
import express from 'express';
/*
import TripController from '../controllers/http/trip.controller';
import UserController from '../controllers/http/user.controller';
*/

//Temp
import { Request, Response } from 'express';

const app = express();
const port = process.env.PORT || 3000;

app.get('/', (req: Request, res: Response) => {
  res.send('Lets do this!');
});

app.use(express.json());
//app.use('/trip', TripController);
//app.use('/user', UserController);

app.listen(port, () => {
  console.log('Application started, running on http://localhost:' + port);
});
