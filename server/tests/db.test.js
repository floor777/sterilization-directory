const { User } = require('../models/user.model.js');
const db = require('../services/db.js');
const request = require('supertest');
const app = require('../index.js');

const Sequelize = require("sequelize");
require('dotenv').config()
const mysql2 = require('mysql2');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('CFS');
Sequelize.useCLS(namespace);
require('dotenv').config();



// let test_sequelize = new Sequelize({
//   dialect: 'sqlite',
//   storage: ':memory:',
//   logging: false, 
// });


describe('Database tests', () => {


    beforeAll(async () => {
      console.log('reached before')
      // Establish the database connection

      await db.sequelize.authenticate().then(() => {
        console.log('Test connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error );
    });
      
    });
  
    afterAll(async () => {
      console.log('reached after')
      // Close the database connection
      // await User.destroy({ where: {} });
      // process.env.NODE_ENV = 'prod';
    //    await test_sequelize.close().then(() => {
    //     console.log('SQLite connection has been closed.');
    // }).catch((error) => {
    //     console.error('Unable to close the connection: ', error );
    // });;
      // console.log("NODE_ENV set to: " + process.env.NODE_ENV);
      console.log('done after all!')
    });
  
    test('should confirm the connection to the database', () => {
      expect(db.sequelize.authenticate()).resolves.not.toThrow();
    });



    test('Should create a new user', async () => {
      const response = await request(app)
        .post('/user/createuser')
        .send({
          name: "ER",
          email: "ER@email.com",
          password: "ER",
          location: "ER"
        });
        console.log("creat euser " + response.text + " | " + response.status + " | " + response.statusCode )
    
        expect(response.status).toBe(200);
        // console.log(response.body);
        expect(response.body.message).toEqual('User was created');
        expect(response.body.name).toEqual("ER");
        expect(response.body.email).toEqual("ER@email.com");
    });



    // test('should prevent duplicate user creation', async () => {

    //   const response = await request(app)
    //     .post('/user/createuser')
    //     .send({ 
    //       name: 'ER',
    //       email: "ER@email.com",
    //       password: "ER",
    //       location: "ER"
    //     }
    //     )
    //     .expect(400);
    //   console.log("yoyo")
    //   console.log(response.body.message);
      
    //   expect(response.body.message).toBe('User already exists');
    // });


    test('Find a user', async () => {
      const newUser = await User.create({ 
        name: 'jane doe', 
        email: 'janedoe@example.com',
        password: 'janedoepw'
      });
      const response = await request(app)
        .get('/user/:id')
        .send({
          id: newUser.id,

        })
        .expect(200);
        console.log(response.body.message);

        expect(response.body.message).toBe('User with the provided id was found');

    });

    test('should delete a user with a given id', async () => {

      const userToDelete = await User.findOne( {where: { 
        name: 'ER', 
        email: 'ER@email.com',
      }});
      console.log("asdsa"+ userToDelete.id);
      console.log(userToDelete);
      const response = await request(app)
        .delete('/user/:id')
        .send({
          id: userToDelete.id,

        })
        .expect(200);

      
        console.log("degod" + response.body.message + response.body.name + " | " + response.body.user);

        expect(response.body.message).toBe('User with the provided id was deleted');
        const check = await User.findByPk(userToDelete.ID);
        // console.log("aaa " + check.id)
        console.log("bbb " + userToDelete.id)
        

        expect(check).toBeNull();

    });

    test('should update the name of a user with a given id', async () => {

      const newUser = await User.create({ 
        name: 'not updated', 
        email: 'notupdated@example.com',
        password: 'not updated'
      });
      const response = await request(app)
        .put('/user/:id')
        .send({
          name: 'updated!',
          id: newUser.id

        })
        .expect(200);
        console.log(response.body.message);

        expect(response.body.message).toBe('User with the provided id was updated');

    });


    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
    
  });