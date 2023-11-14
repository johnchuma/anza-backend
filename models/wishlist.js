'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Wishlist extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Wishlist.belongsTo(models.Product)
      Wishlist.belongsTo(models.User)
      // define association here
    }
  }
  Wishlist.init({
    productId:{
      type:DataTypes.INTEGER,
      allowNull:false
     },
    userId:{
      type:DataTypes.INTEGER,
      allowNull:false
     },
     uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
  }, {
    sequelize,
    modelName: 'Wishlist',
  });
  return Wishlist;
};