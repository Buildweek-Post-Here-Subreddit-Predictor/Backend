const request = require('supertest');
const server = require('../api/server.js');

describe('auth-router.js', () => {

    describe('POST /register',() =>{
        it('should return status 200', () => {
      let user = {"username": "millare", "password": "password123"};
      return request(server)
      .post('/api/register')
      .send(user)
      .then(res => {
        expect(res.status).toBe(200);
      })
      .catch(err => {
        console.log(err)
      })
    })
    it('should error if no user info is given', () => {
      let user = {};
      return request(server)
      .post('/api/register')
      .send(user)
      .then(res => {
        expect(res.status).toBe(404);
      })
    })
  })
})

describe('POST /login', () => {
    it('should return code 200 if user is validated', () => {
      let credentials = {"username": "millare", "password": "password123"};
      return request(server)
      .post('/api/login')
      .send(credentials)
      .then(res => {
        console.log(res.status)
      })
      .catch(err => {
        console.log(err)
      })
    })
    it('should error if credentials are incorrect', () => {
      let credentials = {"username": "millare123", "password": "password"};
      return request(server)
      .post('/api/login')
      .send(credentials)
      .then(res => {
        expect(res.status).toBe(404)
      })
      .catch(err => {
        console.log(err)
      })
    })
  })
