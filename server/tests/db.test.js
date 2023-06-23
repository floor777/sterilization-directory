const { User } = require('../models/user.model.js');
const db = REQUIRE
const request = require('supertest');
const app = require('../index.js');

const Sequelize = require("sequelize");
require('dotenv').config()
const mysql2 = require('mysql2');
const cls = require('cls-hooked');
const namespace = cls.createNamespace('CFS');
Sequelize.useCLS(namespace);
let sequelize;
require('dotenv').config()



describe('Database tests', () => {


    beforeAll(async () => {
      // Establish the database connection
      await db.sequelize.authenticate();
      
    });
  
    afterAll(async () => {
      // Close the database connection
      await User.destroy({ where: {} });
      process.env.NODE_ENV = 'prod';
      await db.sequelize.close();
      console.log(process.env.NODE_ENV);
      
    });
  
    test('should establish a connection to the database', () => {
      expect(db.sequelize.authenticate()).resolves.not.toThrow();
    });



    test('Should create a new user', async () => {
      const response = await request(app)
        .post('/signup')
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
        .post('/signup')
        .send({ name: 'john smith', email: 'johnsmith@email.com' })
        .expect(400);

      // console.log(response.body);
      expect(response.body.message).toBe('User already exists');
    });


    test('Find a user'), async () => {

      const response = await request(app)
        .get('/users')
        .send({
          name: "john smith",
          email: "johnsmith@email.com",
          password: "johnsmith",
          location: "johnsmithcalifornia"
        });

      const searchedUser = await User.findOne({
        where: {
          email: req.body.email
        },
        
  
      });
    }

    // test('should delete a user with a given id', async () => {
    //   const resposne = await request(app)
    // })


    test("It should response the GET method", async () => {
      const response = await request(app).get("/");
      expect(response.statusCode).toBe(200);
    });
    
  });