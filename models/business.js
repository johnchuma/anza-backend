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
      Business.belongsTo(models.BusinessSector);
      Business.hasMany(models.Product, { onDelete: 'cascade'});
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
     name: {
       type: DataTypes.STRING,
       allowNull:false
     },
    businessSectorId:{
      type: DataTypes.INTEGER, 
      allowNull:false  
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
  }, {
    sequelize,
    modelName: 'Business',
  });
  return Business;
};