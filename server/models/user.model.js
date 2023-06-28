const {Sequelize, DataTypes} = require("sequelize");
const db = require('../services/db.js');


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
  location: {
    type: DataTypes.STRING,
    allowNull: true
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