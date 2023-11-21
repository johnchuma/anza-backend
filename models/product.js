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
      Product.hasMany(models.ProductImage, { onDelete: 'cascade'})
      Product.hasMany(models.Favourite, { onDelete: 'cascade'})
      Product.hasMany(models.Review, { onDelete: 'cascade'})
      Product.hasMany(models.Wishlist, { onDelete: 'cascade'})
      Product.belongsTo(models.Business)
      // Product.belongsTo(models.OrderProduct)
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
  }, {
    sequelize,
    modelName: 'Product',
  });
  return Product;
};