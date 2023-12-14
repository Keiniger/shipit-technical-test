import { initDatabase } from './infraestructure/db/database';
import { initHttpServer } from './infraestructure/web/web-server';

async function init() {
  initDatabase();
  initHttpServer();
}

init();
