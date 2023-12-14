import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

const Address = sequelize.define(
  'Address',
  {
    destiny_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
    },
  },
  {
    tableName: 'addresses',
  }
);

export default Address;
