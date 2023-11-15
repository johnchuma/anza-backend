'use strict';
module.exports = {
  async up(queryInterface, DataTypes) {
    await queryInterface.createTable('Businesses', {
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
      status:{
        type: DataTypes.ENUM('waiting','rejected','accepted'), 
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
    await queryInterface.dropTable('Businesses');
  }
};