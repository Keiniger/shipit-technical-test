import { DestinyRepository } from '../infraestructure/db/repositories/destiny.repository';

export default async function getDestiniesUseCase() {
  const destinies = await DestinyRepository.getAllDestinies();

  if (!destinies) throw new Error('No se encontraron destinos.');

  return destinies;
}
