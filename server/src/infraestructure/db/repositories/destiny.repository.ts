import Destiny from '../models/destiny.model';

export class DestinyRepository {
  static async getAllDestinies() {
    return await Destiny.findAll();
  }
}
