'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('businesses', {
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
      name: {
        type: DataTypes.STRING,
        allowNull:false
      },
      userId:{
        type:DataTypes.INTEGER,
        allowNull:false
       },
       businessSectorId:{
        type: DataTypes.STRING, 
        allowNull:true  
      },
      region:{
        type: DataTypes.STRING, 
        allowNull:true  
      },
      description:{
        type: DataTypes.STRING, 
        allowNull:true 
      },
      active:{
        type: DataTypes.BOOLEAN, 
        defaultValue:false
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
    await queryInterface.dropTable('businesses');
  }
};