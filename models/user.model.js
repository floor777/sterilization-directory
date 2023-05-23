const {Sequelize, DataTypes} = require("sequelize");
require('dotenv').config();


const sequelize = new Sequelize(
  process.env.DATABASE_NAME,
  process.env.DATABASE_USERNAME,
  process.env.DATABASE_PASSWORD,
   {
     host: process.env.DATABASE_HOSTNAME,
     dialect: 'mysql'
   }
 );
   
sequelize.authenticate().then(() => {
  console.log('Connection has been established successfully.');
}).catch((error) => {
  console.error('Unable to connect to the database: ', error);
});
const User = sequelize.define("users", {
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

sequelize.sync().then(() => {
   console.log('User table created successfully');
}).catch((error) => {
   console.error('Unable to create table : ', error);
});

function createNewUser() {
  User.findOne({where: {username: 'meow'}})
}

module.exports = {
  User: User
}