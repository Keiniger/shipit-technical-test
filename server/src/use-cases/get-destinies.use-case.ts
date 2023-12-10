import { DestinyRepository } from '../infraestructure/db/repositories/destiny.repository';

export default async function getDestiniesUseCase() {
  try {
    return await DestinyRepository.getAllDestinies();
  } catch (error) {
    console.log(error);
  }
}
