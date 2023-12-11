import { Request, Response, Application } from 'express';
import getDestiniesUseCase from '../../use-cases/get-destinies.use-case';
import getCotizationUseCase from '../../use-cases/get-cotization.use-case';

export function initRoutes(app: Application) {
  app.get('/destinies', async (req: Request, res: Response) => {
    try {
      const destinies = await getDestiniesUseCase();
      res.json(destinies);
    } catch (error) {
      res.status(500).send({ error });
    }
  });

  app.post('/cotization', async (req: Request, res: Response) => {
    const { destinyId, length, width, height, weight } = req?.body;

    if (!req.body || !destinyId || !length || !width || !height || !weight) {
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    try {
      const cotization = await getCotizationUseCase(destinyId, { length, width, height, weight });

      if (!cotization) return res.status(404).json({ error: 'Cotization not found.' });

      res.send(String(cotization));
    } catch (error: any) {
      res.status(500).send({ error: error.message });
    }
  });
}
