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
      console.log('reached before')
      // Establish the database connection
      await test_sequelize.authenticate().then(() => {
        console.log('SQLite connection has been established successfully.');
    }).catch((error) => {
        console.error('Unable to connect to the database: ', error );
    });
      
    });
  
    afterAll(async () => {
      console.log('reached after')
      // Close the database connection
      // await User.destroy({ where: {} });
      // process.env.NODE_ENV = 'prod';
       await test_sequelize.close();
      // console.log("NODE_ENV set to: " + process.env.NODE_ENV);
      console.log('done after all!')
    });
  
    test('should confirm the connection to the database', () => {
      expect(test_sequelize.authenticate()).resolves.not.toThrow();
    });



    test('Should create a new user', async () => {
      const response = await request(app)
        .post('/user/createuser')
        .send({
          name: "john smith",
          email: "johnsmith@email.com",
          password: "johnsmith",
          location: "johnsmithcalifornia"
        });
    
        expect(response.status).toBe(200);
        // console.log(response.body);
        expect(response.body.message).toEqual('User was created');
        expect(response.body.name).toEqual("john smith");
        expect(response.body.email).toEqual("johnsmith@email.com");
    });



    test('should prevent duplicate user creation', async () => {

      const response = await request(app)
        .post('/user/createuser')
        .send({ name: 'john smith', email: 'johnsmith@email.com' })
        .expect(400);

      // console.log(response.body);
      expect(response.body.message).toBe('User already exists');
    });


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

      const newUser = await User.create({ 
        name: 'delete mee', 
        email: 'deleteme@example.com',
        password: 'deletemepw'
      });
      console.log("asdsa"+ newUser.id);
      const response = await request(app)
        .delete('/user/:id')
        .send({
          id: newUser.id,

        })
        .expect(200);
        console.log(response.body.message);

        expect(response.body.message).toBe('User with the provided id was deleted');

        const deletedUser = await User.findByPk(newUser.id);
        console.log(deletedUser.name + "yxy")
        console.log(deletedUser + 'sad');
        expect(deletedUser).toBeNull();

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