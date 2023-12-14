import { config } from '../../config';

type Origin = {
  id: number;
  address_book: {
    default: boolean;
  };
};

export async function getDefaultOrigin() {
  const response = await fetch(config.shipit_endpoint + '/v/origins', {
    method: 'GET',
    headers: config.shipit_headers,
  });

  if (!response.ok) throw new Error('No se pudo obtener el origen default.');

  const origins = (await response.json()) as Origin[];
  const defaultOrigin = origins.find((o) => o.address_book.default);

  return defaultOrigin;
}
