const {Sequelize, DataTypes} = require("sequelize");
const db = require('../services/db.js');
require('dotenv').config();

const User = db.sequelize.define("users", {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false
  },
  name: {
    type: DataTypes.STRING,
    allowNull: false
  },
  avatar: {
    type: DataTypes.STRING,
    allowNull: false,
    defaultValue: "default value for avatar"
  },
  location: {
    type: DataTypes.STRING,
    allowNull: true
  },
  description: {
    type: DataTypes.STRING,
    allowNull: true,
    defaultValue: "I'm new say hi!"
  },
})

db.sequelize.sync().then(() => {
   console.log('User table created successfully');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});




module.exports = {
  User: User
}