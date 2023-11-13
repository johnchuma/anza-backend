'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Review extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Review.belongsTo(models.Product)
      // define association here
    }
  }
  Review.init({
    uuid:{
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    rate:{
      type:DataTypes.INTEGER,
      allowNull:false
     },
    comment:{
      type: DataTypes.STRING, 
      allowNull:false  
    },
    name:{
      type: DataTypes.STRING, 
      allowNull:true
    },
    email:{
      type: DataTypes.STRING, 
      allowNull:true 
    },
    productId:{
      type:DataTypes.INTEGER,
      allowNull:false
    },
    userId:{
      type: DataTypes.STRING, 
      allowNull:true
    },
  }, {
    sequelize,
    modelName: 'Review',
  });
  return Review;
};