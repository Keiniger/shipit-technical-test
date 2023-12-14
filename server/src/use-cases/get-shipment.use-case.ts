import { ShipmentRepository } from '../infraestructure/db/repositories/shipment.repository';

export default async function getShipmentsUseCase() {
  const shipments = await ShipmentRepository.getAllShipments();

  if (!shipments) return [];

  const remappedShipments = shipments.map((s: any) => ({ ...s.dataValues, destiny_name: s.Addresses[0].Destiny.name }));

  return remappedShipments;
}
