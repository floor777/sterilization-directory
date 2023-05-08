const express = require('express');
const app = express();
const port = 3000;
const Sequelize = require("sequelize");
require('dotenv').config()

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.get('/a', (req, res) => {
    res.send('Hello Worlzzd!')
  })

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})

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