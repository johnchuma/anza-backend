'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class BusinessCategory extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
    }
  }
  BusinessCategory.init({
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
  }, {
    sequelize,
    modelName: 'BusinessCategory',
  });
  return BusinessCategory;
};