const { Model, DataTypes } = require("sequelize");
const sequelize = require("../config/connection");
const moment = require('moment');

// create the Maintenance Model
class Maintenance extends Model { }

Maintenance.init(
  {
    // Expects id, date, mileage, user_id, maintenance type
    id: {
      type: DataTypes.INTEGER,
      allowNull: false,
      primaryKey: true,
      autoIncrement: true,
    },
    date: {
      type: DataTypes.DATEONLY,
      get: function() {
        return moment.utc(this.getDataValue('CreateDate')).format('YYYY-MM-DD')
      }
    }, // removed user_id
    mileage: {
      type: DataTypes.INTEGER,
      allowNull: false,
    },
    user_id: {
      type: DataTypes.INTEGER,
      references: {
        model: "user",
        key: "id",
      },
    }
  },
  {
    sequelize,
    freezeTableName: true,
    underscored: true,
    modelName: "maintenance",
  }
);

module.exports = Maintenance;
