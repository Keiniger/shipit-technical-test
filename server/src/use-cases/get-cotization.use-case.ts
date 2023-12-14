import getCotization from '../infraestructure/external/get-cotization';

type Dimension = { length: number; width: number; height: number; weight: number };
export default async function getCotizationUseCase(destinyId: number, { length, width, height, weight }: Dimension) {
  return getCotization(destinyId, { length, width, height, weight });
}
