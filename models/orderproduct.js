'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class OrderProduct extends Model {
    static associate(models) {
      // OrderProduct.hasOne(models.Product)
      OrderProduct.belongsTo(models.Order)
      OrderProduct.belongsTo(models.Product)
    }
  }
  OrderProduct.init({
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
     isDelivered:{
      type:DataTypes.BOOLEAN,
      defaultValue:false
     },
  }, {
    sequelize,
    modelName: 'OrderProduct',
  });
  return OrderProduct;
};