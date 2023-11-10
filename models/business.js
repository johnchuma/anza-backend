'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Business extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Business.belongsTo(models.User);
    }
  }
  Business.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
     },
    businessSector:{
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
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};