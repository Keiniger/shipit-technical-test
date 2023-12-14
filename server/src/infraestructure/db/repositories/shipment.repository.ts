import { ShipmentEntity } from '../../../entities/shipment.entity';
import Shipment from '../models/shipment.model';
import Destiny from '../models/destiny.model';
import Address from '../models/address.model';

export class ShipmentRepository {
  static async create(shipment: ShipmentEntity) {
    return Shipment.create({ ...shipment });
  }

  static async getAllShipments() {
    let shipments;
    try {
      shipments = await Shipment.findAll({
        include: [
          {
            model: Address,
            include: [{ model: Destiny }],
          },
        ],
      });
      return shipments;
    } catch (error) {
      console.log(error);
    }
  }
}
