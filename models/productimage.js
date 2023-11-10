'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class ProductImage extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      ProductImage.belongsTo(models.Product)
      // define association here
    }
  }
  ProductImage.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    image: {
      type: DataTypes.STRING,
      allowNull:false
    },
    productId:{
      type:DataTypes.INTEGER,
      allowNull:false
     },
  }, {
    sequelize,
    modelName: 'ProductImage',
  });
  return ProductImage;
};