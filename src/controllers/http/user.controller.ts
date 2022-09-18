import express from 'express';
import { Request, Response } from 'express';
import { userInteractor } from '../../core/interactors/main.interactor';

const router = express.Router();

router.get('/:id/trips', async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status, data, error } = await userInteractor.getTrips(parseInt(id));
  res.status(status).json({ data, error });
  return;
});

export default router;
