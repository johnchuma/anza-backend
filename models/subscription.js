'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Subscription extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      Subscription.belongsTo(models.User)
      // define association here
    }
  }
  Subscription.init({
    uuid: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4
    },
    userId: {
      type:DataTypes.INTEGER,
      allowNull:true
    },
    email: {
      type:DataTypes.STRING,
      allowNull:false,
      unique: true
    },
  }, {
    sequelize,
    modelName: 'Subscription',
  });
  return Subscription;
};