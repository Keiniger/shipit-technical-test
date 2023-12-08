import { DataTypes } from 'sequelize';
import { sequelize } from '../database';

import Shipment from './shipment.model';
import Destiny from './destiny.model';

const Address = sequelize.define(
  'Address',
  {
    destiny_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    shipment_id: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
  },
  {
    tableName: 'addresses',
  }
);

Address.hasOne(Destiny, { foreignKey: 'external_id', sourceKey: 'destiny_id' });
Address.hasOne(Shipment, { foreignKey: 'id', sourceKey: 'shipment_id' });

export default Address;
