const Sequelize = require("sequelize");
require('dotenv').config()
const cls = require('cls-hooked');
const namespace = cls.createNamespace('CFS');
Sequelize.useCLS(namespace);
let sequelize;
require('dotenv').config();
var fs = require("fs");
const serverCa = [fs.readFileSync("./DigiCertGlobalRootCA.crt.pem")];
console.log('Initializing database');
process.env['NODE_TLS_REJECT_UNAUTHORIZED'] = 0;
console.log("check")
  sequelize = new Sequelize(
    process.env.DATABASE_NAME,
    process.env.DATABASE_USERNAME,
    process.env.DATABASE_PASSWORD,
    
    {
      host: process.env.DATABASE_HOSTNAME,
      dialect: 'mysql',
      port: 3306,
            
    dialectOptions: {
      ssl: {
        rejectUnauthorized: false,
        encrypt: true,
        ca:  serverCa
      }

    }
      
    }
  );




sequelize.authenticate().then(() => {
    console.log('Connection has been established successfully.');
}).catch((error) => {
    console.error('Unable to connect to the database: ', error );
});


module.exports = {
    sequelize: sequelize
};