import { initDatabase } from './infraestructure/db/database';

async function init() {
  initDatabase();
}

init();
