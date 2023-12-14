import { ShipmentEntity } from '../entities/shipment.entity';
import { ShipmentRepository } from '../infraestructure/db/repositories/shipment.repository';
import { AddressRepository } from '../infraestructure/db/repositories/addresses.repository';
import getCotization from '../infraestructure/external/get-cotization';

export default async function createShipmentUseCase(
  shipment: ShipmentEntity,
  destinyId: number
): Promise<ShipmentEntity> {
  const cotization = await getCotization(destinyId, {
    length: shipment.length,
    width: shipment.width,
    height: shipment.height,
    weight: shipment.weight,
  });

  if (cotization?.courier !== shipment.courier || cotization.price !== shipment.price)
    throw new Error('La cotización no es válida');

  const createdShipment = (await ShipmentRepository.create(shipment)) as unknown as ShipmentEntity;

  if (!createdShipment.id) throw new Error('Error al crear el envio');

  await AddressRepository.create(destinyId, createdShipment.id);

  return createdShipment;
}
