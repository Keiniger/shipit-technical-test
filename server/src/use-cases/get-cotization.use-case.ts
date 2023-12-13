import { config } from '../config';
import { OriginRepository } from '../infraestructure/db/repositories/origin.repository';

type Dimension = { length: number; width: number; height: number; weight: number };
export default async function getCotizationUseCase(destinyId: number, { length, width, height, weight }: Dimension) {
  const defaultOrigin = await OriginRepository.getDefaultOrigin();

  if (!defaultOrigin) throw new Error('Origen default no encontrado.');

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
      const error = await response.json();
      throw new Error((error as { message: string }).message);
    }
  }

  type Cotization = { prices: { price: number; courier: { name: string } }[] };

  const { prices } = (await response.json()) as Cotization;

  if (prices.length === 0) return undefined;

  const priceValues = prices.map((p) => p.price);

  const cheapesPrice = Math.min(...priceValues);

  const cheapestCotization = prices.find((c) => c.price === cheapesPrice);

  if (!cheapestCotization) throw new Error('Hubo un error al obtener la cotización.');

  return {
    price: cheapestCotization?.price,
    courier: cheapestCotization?.courier?.name,
  };
}
