import { Model } from 'sequelize';
import { ShipmentEntity } from '../entities/shipment.entity';
import Shipment from '../infraestructure/db/models/shipment.model';

export default async function createShipmentUseCase(shipment: ShipmentEntity): Promise<Model> {
  const createdShipment = await Shipment.create({ ...shipment });
  return createdShipment as Model;
}
