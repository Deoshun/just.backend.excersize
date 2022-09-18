import express from 'express';
import { Request, Response } from 'express';
import { tripInteractor } from '../../core/interactors/main.interactor';
import { TripDTO } from '../../core/dto/trip.dto';

const router = express.Router();

router.get('/', async (req: Request, res: Response) => {
  const newTrip: TripDTO = req.body;
  const { status, data, error } = await tripInteractor.process(newTrip);
  return res.status(status).json({ data, error });
});

export default router;
