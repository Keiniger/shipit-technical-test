import { config } from '../../../config';
import { OriginEntity } from '../../../entities/origin.entity';

export class OriginRepository {
  static async getDefaultOrigin() {
    const response = await fetch(config.shipit_endpoint + '/v/origins', {
      method: 'GET',
      headers: config.shipit_headers,
    });

    if (!response.ok) throw new Error('Could not retrieve default origin.');

    const origins = (await response.json()) as OriginEntity[];
    const defaultOrigin = origins.find((o) => o.address_book.default);

    return defaultOrigin;
  }
}
