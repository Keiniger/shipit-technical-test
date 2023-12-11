import { config } from '../config';
import { OriginRepository } from '../infraestructure/db/repositories/origin.repository';

type Dimension = { length: number; width: number; height: number; weight: number };
export default async function getCotizationUseCase(destinyId: number, { length, width, height, weight }: Dimension) {
  const defaultOrigin = await OriginRepository.getDefaultOrigin();

  if (!defaultOrigin) throw new Error('Selected origin not found.');

  const postData = {
    parcel: {
      length,
      width,
      height,
      weight,
      destiny_id: destinyId,
      origin_id: defaultOrigin.id,
      is_payable: false,
      destiny: 'Domicilio',
      courier_selected: false,
      courier_for_client: '',
      request_from: 'calculator',
    },
  };

  const response = await fetch(config.shipit_endpoint + '/v/rates', {
    method: 'POST',
    headers: {
      ...config.shipit_headers,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(postData),
  });

  if (!response.ok) {
    if (response.status === 400) {
      const error = (await response.json()) as { message: string };
      throw new Error(error.message);
    }
  }

  type Cotization = { prices: { price: number }[] };

  const cotizations = (await response.json()) as Cotization;

  if (cotizations.prices.length === 0) return undefined;

  const cheapestCotization = Math.min(...cotizations.prices.map((p) => p.price));

  return cheapestCotization;
}
