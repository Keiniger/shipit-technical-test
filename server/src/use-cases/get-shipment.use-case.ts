import { ShipmentRepository } from '../infraestructure/db/repositories/shipment.repository';

export default async function getShipmentsUseCase() {
  return ShipmentRepository.getAllShipments();
}
