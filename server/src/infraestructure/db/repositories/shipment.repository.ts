import { ShipmentEntity } from '../../../entities/shipment.entity';
import Shipment from '../models/shipment.model';

export class ShipmentRepository {
  static async create(shipment: ShipmentEntity) {
    return Shipment.create({ ...shipment });
  }

  static async getAllShipments() {
    return Shipment.findAll();
  }
}
