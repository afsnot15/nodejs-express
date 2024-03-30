import express, { Request, Response } from 'express';
import { findAll, findById, create, update } from './usuario/usuario.service';

export const router = express.Router();

router.route('/usuario').get(async (req: Request, res: Response) => {
  res.send(await findAll());
});

router.route('/usuario/:id').get(async (req: Request, res: Response) => {
  res.send(await findById(+req.params.id));
});

router.route('/usuario').post(async (req: Request, res: Response) => {
  res.send(await create(req.body));
});

router.route('/usuario/:id').patch(async (req: Request, res: Response) => {
  res.send(await update(+req.params.id, req.body));
});
