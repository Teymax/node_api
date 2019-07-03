import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from "mocha"

chai.use(chaiHttp);
chai.should();

const app = require('../../server');

describe('Authorization', () => {
  describe('Registration', () => {
    it('POST /user/register without data', done => {
      chai.request(app)
        .post('/user/register')
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          res.body.error.should.equal('Please enter an email and username to register');
        })
      done();
    });
    it('POST /user/register without email and password', done => {
      const user = {
        username: 'test'
      };
      chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          res.body.error.should.equal('Please enter an email and username to register');
        })
      done();
    });
    it('POST /user/register without password', done => {
      const user = {
        username: 'test',
        email: 'test@gm.com'
      };
      chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.success.should.equal(false);
          res.body.error.should.equal('Please enter an password to register');
        })
      done();
    });
    it('POST /user/register with invalid email', done => {
      const user = {
        username: 'test',
        email: 'test',
        password: 'test'
      };
      chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.success.should.equal(false);
          res.body.error.should.equal('Validation error: Invalid email');
        })
      done();
    });
    it('POST /user/register with correct data', done => {
      const user = {
        username: 'test',
        email: 'test@gmail.com',
        password: 'test'
      };
      chai.request(app)
        .post('/user/register')
        .send(user)
        .end((err, res) => {
          res.should.have.status(201);
          res.body.success.should.equal(true);
          res.body.user.should.be.a('object');
        })
      done();
    });
  })
})
