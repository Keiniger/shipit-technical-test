import { Model } from 'sequelize';
import { ShipmentEntity } from '../entities/shipment.entity';
import { ShipmentRepository } from '../infraestructure/db/repositories/shipment.repository';

export default async function createShipmentUseCase(shipment: ShipmentEntity): Promise<Model> {
  const createdShipment = await ShipmentRepository.create(shipment);
  return createdShipment as Model;
}
