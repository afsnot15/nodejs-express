import express, { Request, Response } from 'express';
import {
    create,
    findAll,
    findById,
    remove,
    revokeAdmin,
    setAdmin,
    update,
} from './usuario/usuario.service';

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

router.route('/usuario/:id').delete(async (req: Request, res: Response) => {
  await remove(+req.params.id);
  res.status(204).send();
});

router.route('/usuario/:id/revokeAdmin').put(async (req: Request, res: Response) => {
    res.send(await revokeAdmin(+req.params.id));
  });

  router.route('/usuario/:id/setadmin').put(async (req: Request, res: Response) => {
    res.send(await setAdmin(+req.params.id));
  });
