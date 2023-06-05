const {Sequelize, DataTypes} = require("sequelize");
require('dotenv').config()


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

const Group = sequelize.define("groups", {
    id: {
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        primaryKey: true
    },
    groupName: {
        type: DataTypes.STRING,
        allowNull: false
    },
    description: {
        type: DataTypes.STRING,
        allowNull: True
        
    },
    image: {
        type: DataTypes.STRING,
        defaultValue: "default group image url"
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    private: {
        type: Boolean,
        allowNull: false
    },
    members: {
        type: String,
        allowNull: true,
        get() {
            return this.getDataValue('members').split(';');
        },
        set(val) {
            this.setDataValue('members', val.join(';'));
        }
    },
    upcomingEvents:{
        type: String
    }


})