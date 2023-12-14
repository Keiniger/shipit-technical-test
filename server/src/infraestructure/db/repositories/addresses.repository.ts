import Addres from '../models/address.model';

export class AddressRepository {
  static async create(destiny_id: number, shipment_id: number) {
    return Addres.create({ destiny_id, shipment_id });
  }
}
