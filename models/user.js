'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      User.hasOne(models.Business, { onDelete: 'cascade'});
      User.hasMany(models.Order, { onDelete: 'cascade'});
      User.hasMany(models.Favourite, { onDelete: 'cascade'});
      User.hasMany(models.Wishlist, { onDelete: 'cascade'});
    }
  }
  
  User.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    email:{
      type: DataTypes.STRING, 
      allowNull:false 
    },
    phone:{
      type: DataTypes.STRING, 
      allowNull:false 
    },
    name:{
      type: DataTypes.STRING, 
      allowNull:false 
    },
    image: {
      type: DataTypes.STRING, 
      allowNull:true
    },
    role:{
      type: DataTypes.STRING, 
      allowNull:false  
    },
    password:{
      type: DataTypes.STRING, 
      allowNull:false  
    },
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};