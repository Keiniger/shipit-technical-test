import Destiny from '../models/destiny.model';

export class DestinyRepository {
  static async getAllDestinies() {
    return await Destiny.findAll();
  }

  static async findById(id: number) {
    return await Destiny.findByPk(id);
  }
}
