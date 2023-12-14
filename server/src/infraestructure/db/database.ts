import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';

require('dotenv').config();

export const sequelize = new Sequelize(
  String(process.env.POSTGRES_DB),
  String(process.env.POSTGRES_USER),
  String(process.env.POSTGRES_PASSWORD),
  {
    host: process.env.POSTGRES_HOST || 'pg',
    dialect: 'postgres',
  }
);

export async function initDatabase() {
  const directoryPath = path.join(__dirname, './models');

  fs.readdir(directoryPath, (err, files) => {
    if (err) return console.error('Error reading directory:', err);

    for (const file of files) {
      if (!file.endsWith('.model.ts')) continue;

      const filePath = path.join(directoryPath, file);

      require(filePath);
    }
    const associationsFile = files.find((f) => f.startsWith('associations'));

    if (associationsFile) require(path.join(directoryPath, associationsFile));
  });

  await sequelize.sync();
}
