import { DataTypes } from 'sequelize';
import { sequelize } from '../database';
import Shipment from './shipment.model';

const Address = sequelize.define('address', {
  destiny_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  shipment_id: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
});

Address.hasOne(Shipment, { foreignKey: 'id', sourceKey: 'shipment_id' });

export default Address;
