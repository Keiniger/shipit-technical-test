import Address from './address.model';
import Destiny from './destiny.model';
import Shipment from './shipment.model';

Shipment.hasMany(Address, { foreignKey: 'shipment_id' });
Address.belongsTo(Shipment, { foreignKey: 'shipment_id' });

Destiny.hasMany(Address, { foreignKey: 'destiny_id' });
Address.belongsTo(Destiny, { foreignKey: 'destiny_id' });
