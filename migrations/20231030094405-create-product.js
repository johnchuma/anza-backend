'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Products', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: DataTypes.INTEGER
      },
      uuid: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4
      },
      businessId:{
       type:DataTypes.INTEGER,
       allowNull:false
      },
      name: {
        type: DataTypes.STRING,
        allowNull:false  
      },
      description: {
        type: DataTypes.STRING,
        allowNull:false  
      },
      buyingPrice: {
        type: DataTypes.DOUBLE,
        allowNull:true  
      },
      sellingPrice: {
        type: DataTypes.DOUBLE,
        allowNull:false  
      },
      amount: {
        type: DataTypes.DOUBLE,
        allowNull:false  
      },
      isFeatured: {
        type: DataTypes.BOOLEAN,
        defaultValue: false,
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
    await queryInterface.dropTable('Products');
  }
};