//-----------------------------------------------------
// Title: Test
// Author: Tunç Gürsoy
// ID: 64528127274
// Section: 1
// Homework: 1
// Description: Unit testing of this application 
//-----------------------------------------------------

const request = require('supertest');
const app = require('../app');

//==================== user API test ====================


describe('Connection Test', function () {
    it('This test is testing the connetion of the Api', function (done) {
        request(app)
            .get('/')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });
  });

  describe('User Tests', function () {
    it('Get All users test /users(Slow because of the Waiting database connetion)', function (done) {
        request(app)
            .get('/users')
            .set('Accept', 'application/json')
            .expect('Content-Type', /json/)
            .expect(200, done);
    });

    it('Post New User Test /users', function (done) {
      request(app)
          .post('/users').send({"_id":"604dfeb75bca4772101d943b","name":"TestName","surname":"TestSurname","tc":"66666666666","email":"test@test@test.com"})
          .set('Accept', 'application/json')
          .expect(201, done);
  });
  it('Update New User Test /users/604dfeb75bca4772101d943b', function (done) {
    request(app)
        .put('/users/604dfeb75bca4772101d943b').send([{"propname":"name", "value":"TestName2"}])
        .set('Accept', 'application/json')
        .expect(200, done);
});

  it('Delete User Test /users/604dfeb75bca4772101d943b', function (done) {
    request(app)
        .delete('/users/604dfeb75bca4772101d943b')
        .set('Accept', 'application/json')
        .expect(200, done);
});
  });

