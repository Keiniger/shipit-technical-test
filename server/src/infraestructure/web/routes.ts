import { Request, Response, Application } from 'express';
import getDestiniesUseCase from '../../use-cases/get-destinies.use-case';
import getCotizationUseCase from '../../use-cases/get-cotization.use-case';
import createShipmentUseCase from '../../use-cases/create-shipment.use-case';
import getShipmentsUseCase from '../../use-cases/get-shipment.use-case';

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

    if (!destinyId || !length || !width || !height || !weight) {
      return res.status(400).json({ error: 'Invalid request. Missing required fields.' });
    }

    try {
      const cotization = await getCotizationUseCase(destinyId, { length, width, height, weight });

      if (!cotization) return res.status(404).json({ error: 'Cotización no encontrada.' });

      res.json(cotization);
    } catch (error: any) {
      res.status(500).send({ error: error.message || 'Hubo un error al solicital la cotización.' });
    }
  });

  app.post('/shipment', async (req: Request, res: Response) => {
    const shipmentData = req?.body;

    try {
      const shipment = await createShipmentUseCase(shipmentData, shipmentData.destinyId);

      if (!shipment) return res.status(404).json({ error: 'No se pudo crear el envío.' });

      res.json(shipment);
    } catch (error: any) {
      res.status(500).send({ error: error.message || 'No se pudo crear el envio.' });
    }
  });

  app.get('/shipment', async (req: Request, res: Response) => {
    try {
      const shipments = await getShipmentsUseCase();

      if (!shipments) return res.status(404).json({ error: 'No se pudo crear el envío.' });

      res.json(shipments);
    } catch (error: any) {
      res.status(500).send({ error: error.message || 'No se pudo crear el envio.' });
    }
  });
}
