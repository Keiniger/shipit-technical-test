import { Request, Response, Application } from 'express';
import getDestiniesUseCase from '../../use-cases/get-destinies.use-case';

export function initRoutes(app: Application) {
  app.get('/destinies', async (req: Request, res: Response) => {
    const destinies = await getDestiniesUseCase();
    res.json(destinies);
  });
}
