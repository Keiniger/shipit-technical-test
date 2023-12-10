'use strict';

module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('destinies', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      country_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      external_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
      },
      region_name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      name: {
        type: Sequelize.STRING,
        allowNull: false,
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.NOW,
      },
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('destinies');
  },
};
