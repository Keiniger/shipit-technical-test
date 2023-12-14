import { ShipmentEntity } from '../entities/shipment.entity';
import { ShipmentRepository } from '../infraestructure/db/repositories/shipment.repository';
import { AddressRepository } from '../infraestructure/db/repositories/addresses.repository';

export default async function createShipmentUseCase(
  shipment: ShipmentEntity,
  destinyId: number
): Promise<ShipmentEntity> {
  const createdShipment = (await ShipmentRepository.create(shipment)) as unknown as ShipmentEntity;

  if (!createdShipment.id) throw new Error('Error creating shipment');

  await AddressRepository.create(destinyId, createdShipment.id);

  return createdShipment;
}
