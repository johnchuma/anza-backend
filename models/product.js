'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Product extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Product.hasMany(models.ProductImage)
      Product.hasMany(models.Favourite)
      Product.hasMany(models.Review)
      Product.belongsTo(models.Business)
      // Product.hasMany(models.OrderProduct)
    }
  }
  Product.init({
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
    oldPrice: {
      type: DataTypes.DOUBLE,
      allowNull:true  
    },
    newPrice: {
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
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};