import * as fs from 'fs';
import * as path from 'path';
import { Sequelize } from 'sequelize';

export const sequelize = new Sequelize(
  String(process.env.POSTGRES_DB),
  String(process.env.POSTGRES_USER),
  String(process.env.POSTGRES_PASSWORD),
  {
    host: process.env.POSTGRES_HOST,
    dialect: 'postgres', // Or any other dialect supported by Sequelize
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
  });

  await sequelize.sync();
}
