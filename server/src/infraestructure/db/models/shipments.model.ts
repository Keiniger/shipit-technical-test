import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Shipment = sequelize.define(
  'Shipment',
  {
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    last_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    length: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    height: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    width: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    weight: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    courier: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    price: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    modelName: 'Shipment',
    tableName: 'shipments',
  }
);

export default Shipment;
