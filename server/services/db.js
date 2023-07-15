const Sequelize = require("sequelize");
require('dotenv').config()
const cls = require('cls-hooked');
const namespace = cls.createNamespace('CFS');
Sequelize.useCLS(namespace);
let sequelize;
require('dotenv').config();


if(process.env.NODE_ENV === "dev") {
  console.log('Currenly in dev environment');

  
  sequelize = new Sequelize(
    process.env.DATABASE_NAME_DEV,
    process.env.DATABASE_USERNAME_DEV,
    process.env.DATABASE_PASSWORD_DEV,
    {
      host: process.env.DATABASE_HOSTNAME_DEV,
      dialect: 'mysql',
    }
);

}
else if(process.env.NODE_ENV ==="test") {
  console.log("Currenly in test environment");
  sequelize = new Sequelize(
    process.env.DATABASE_NAME_TEST,
    process.env.DATABASE_USERNAME_TEST,
    process.env.DATABASE_PASSWORD_TEST,
    {
      host: process.env.DATABASE_HOSTNAME_TEST,
      dialect: 'mysql',
    }
);
}

else if(process.env.NODE_ENV === "prod") {
  console.log('Currenly in prod environment');

  sequelize = new Sequelize(
    process.env.DATABASE_NAME_PROD,
    process.env.DATABASE_USERNAME_PROD,
    process.env.DATABASE_PASSWORD_PROD,
    {
      host: process.env.DATABASE_HOSTNAME_PROD,
      dialect: 'mysql',
    }
);

}


sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error);
});


module.exports = {
    sequelize: sequelize
};