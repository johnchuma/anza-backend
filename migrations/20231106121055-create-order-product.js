'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('OrderProducts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      productId:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
      orderId:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
       quantity:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      status:{
       type:DataTypes.ENUM('waiting', 'canceled','delivered'),
       defaultValue:"waiting"
      },
      createdAt: {
        allowNull: false,
        type: DataTypes.DATE
      },
      updatedAt: {
        allowNull: false,
        type: DataTypes.DATE
      }
    });
  },
  async down(queryInterface, DataTypes) {
    await queryInterface.dropTable('OrderProducts');
  }
};