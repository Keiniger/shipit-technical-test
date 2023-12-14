import { sequelize } from '../database';
import { config } from '../../../config';
import Destiny from '../models/destiny.model';
import Region from '../models/region.model';

type DestinyData = {
  id: number;
  region_id: number;
  region_name: string;
  country_name: string;
  name: string;
};

type RegionData = {
  id: number;
  name: string;
};

type RawRegion = {
  id: RegionData;
};

interface RawRegions {
  [key: number]: RawRegion;
}

async function fetchDestinations() {
  try {
    const response = await fetch(config.shipit_endpoint + '/v/communes', {
      method: 'GET',
      headers: config.shipit_headers,
    });

    if (!response.ok) throw new Error('Network response was not ok.');

    const data = await response.json();
    return data as DestinyData[];
  } catch (error) {
    console.error('Fetch error:', error);
  }
}

async function populateDestinies() {
  const destinies = await fetchDestinations();

  if (!destinies) return;

  const remappedDestinies = destinies.map((d) => ({
    id: d.id,
    country_name: d.country_name,
    external_id: d.region_id,
    name: d.name,
  }));

  const regionIds = Array.from(new Set(remappedDestinies.map((d) => d.external_id)));
  const regions = regionIds.map((id) => ({
    id,
    name: destinies.find((d) => d.region_id === id)?.region_name,
  }));

  try {
    await Destiny.bulkCreate(remappedDestinies);
    await Region.bulkCreate(regions);
    console.log('Destinies table successfully populated.');
  } catch (error) {
    console.log('Error when saving to database: ', error);
  } finally {
    await sequelize.close();
  }
}

populateDestinies();
