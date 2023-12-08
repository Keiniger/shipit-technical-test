import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Destiny = sequelize.define(
  'destiny',
  {
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    external_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Destiny',
    tableName: 'destinies',
  }
);

export default Destiny;
