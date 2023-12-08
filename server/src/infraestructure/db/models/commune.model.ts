import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Commune = sequelize.define(
  'Commune',
  {
    country_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    country_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    id: {
      type: DataTypes.INTEGER,
      primaryKey: true,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    postal_code: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    region_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    region_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  {
    modelName: 'Commune',
    tableName: 'communes',
  }
);

export default Commune;
