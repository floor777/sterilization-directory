const { User } = require('../models/user.model.js');
// const db = require('../services/db.js');
const request = require('supertest');
const app = require('../index.js');

const Sequelize = require("sequelize");
require('dotenv').config()
const mysql2 = require('mysql2');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('CFS');
Sequelize.useCLS(namespace);
require('dotenv').config();



let test_sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: ':memory:',
  logging: false, 
});


describe('Database tests', () => {


    beforeAll(async () => {
      // Establish the database connection
      await test_sequelize.authenticate();
      
    });
  
    afterAll(async () => {
      // Close the database connection
      await User.destroy({ where: {} });
      process.env.NODE_ENV = 'prod';
      await test_sequelize.close();
      console.log("NODE_ENV set to: " + process.env.NODE_ENV);
      
    });
  
    test('should confirm the connection to the database', () => {
      expect(test_sequelize.authenticate()).resolves.not.toThrow();
    });



    // test('Should create a new user', async () => {
    //   const response = await request(app)
    //     .post('/user/createuser')
    //     .send({
    //       name: "john smith",
    //       email: "johnsmith@email.com",
    //       password: "johnsmith",
    //       location: "johnsmithcalifornia"
    //     });
    
    //     expect(response.status).toBe(200);
    //     // console.log(response.body);
    //     expect(response.body.message).toEqual('User was created');
    //     expect(response.body.name).toEqual("john smith");
    //     expect(response.body.email).toEqual("johnsmith@email.com");
    // });



    // test('should prevent duplicate user creation', async () => {

    //   const response = await request(app)
    //     .post('/user/createuser')
    //     .send({ name: 'john smith', email: 'johnsmith@email.com' })
    //     .expect(400);

    //   // console.log(response.body);
    //   expect(response.body.message).toBe('User already exists');
    // });


    // test('Find a user', async () => {
    //   const newUser = await User.create({ 
    //     name: 'jane doe', 
    //     email: 'janedoe@example.com',
    //     password: 'janedoepw'
    //   });
    //   const response = await request(app)
    //     .get('/user/:id')
    //     .send({
    //       id: newUser.id,

    //     })
    //     .expect(200);
    //     console.log(response.body.message);

    //     expect(response.body.message).toBe('User with the provided id was found');

    // });

    // test('should delete a user with a given id', async () => {

    //   const newUser = await User.create({ 
    //     name: 'delete me', 
    //     email: 'deleteme@example.com',
    //     password: 'deletemepw'
    //   });
    //   const response = await request(app)
    //     .delete('/user/:id')
    //     .send({
    //       id: newUser.id,

    //     })
    //     .expect(200);
    //     console.log(response.body.message);

    //     expect(response.body.message).toBe('User with the provided id was deleted');

    //     const deletedUser = await User.findByPk(newUser.id);
   
    //     expect(deletedUser).toBeNull();

    // });

    // test('should update the name of a user with a given id', async () => {

    //   const newUser = await User.create({ 
    //     name: 'not updated', 
    //     email: 'notupdated@example.com',
    //     password: 'not updated'
    //   });
    //   const response = await request(app)
    //     .put('/user/:id')
    //     .send({
    //       name: 'updated!',
    //       id: newUser.id

    //     })
    //     .expect(200);
    //     console.log(response.body.message);

    //     expect(response.body.message).toBe('User with the provided id was updated');

    // });


    // test("It should response the GET method", async () => {
    //   const response = await request(app).get("/");
    //   expect(response.statusCode).toBe(200);
    // });
    
  });