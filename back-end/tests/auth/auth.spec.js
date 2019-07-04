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
					res.body.error.should.equal('Please enter an email and username to register')
					done()
				});
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
					res.body.error.should.equal('Please enter an email and username to register')
					done()
				});
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
					res.body.error.should.equal('Please enter an password to register')
					done()
				});
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
					res.should.have.status(400);
					res.body.success.should.equal(false);
					res.body.error.should.equal('Validation error: Invalid email')
					done()
				});
		});
		// it('POST /user/register with correct data', done => {
		// 	const user = {
		// 		username: 'test',
		// 		email: 'test@gmail.com',
		// 		password: 'test'
		// 	};
		// 	chai.request(app)
		// 		.post('/user/register')
		// 		.send(user)
		// 		.end((err, res) => {
		//       console.log(res)
		//       res.should.have.status(201);
		// 			res.body.success.should.equal(true);
		// 			res.body.user.should.be.a('object')
		//       done()
		// 		});
		// })
	});

	describe('Login', () => {
		it('POST /user/login without data', done => {
			chai.request(app)
				.post('/user/login')
				.end((err, res) => {
					res.should.have.status(400);
					res.body.success.should.equal(false);
					res.body.error.should.equal("Please enter a password and password to login")
					done()
				});
		});
		it('POST /user/login without email', done => {
			const user = {
				password: 'test',
			};
			chai.request(app)
				.post('/user/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.success.should.equal(false);
					res.body.error.should.equal('Please enter a password and password to login')
					done()
				});
		});
		it('POST /user/login without password', done => {
			const user = {
				email: 'test@gmail.com',
			};
			chai.request(app)
				.post('/user/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.success.should.equal(false);
					res.body.error.should.equal('Please enter a password and password to login')
					done()
				});
		});
		it('POST /user/login with incorrect email', done => {
			const user = {
				email: 't@gmail.com',
				password: 'test'
			};
			chai.request(app)
				.post('/user/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.success.should.equal(false);
					res.body.error.should.equal('Not registered')
					done()
				});
		});
		it('POST /user/login with incorrect password', done => {
			const user = {
				email: 'test@gmail.com',
				password: 'test23'
			};
			chai.request(app)
				.post('/user/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(400);
					res.body.success.should.equal(false);
					res.body.error.should.equal('invalid password');
					done()
				});
		});
		it('POST /user/login with correct data', done => {
			const user = {
				email: 'test@gmail.com',
				password: 'test'
			};
			chai.request(app)
				.post('/user/login')
				.send(user)
				.end((err, res) => {
					res.should.have.status(200);
					res.body.success.should.equal(true);
					res.body.should.be.a('object');
					res.body.should.include.keys("access_token");
					res.body.should.include.keys("refresh_token");
					done()
				});
		});
		it('POST /user/logout with correct data', done => {
			const user = {
				email: 'test@gmail.com',
				password: 'test'
			};
			let login = chai.request.agent(app);
			login.post('/user/login')
				.send(user)
				.end((err, res) => {
					res.body.should.include.keys("access_token");
					res.body.should.include.keys("refresh_token");

					login.post("/user/logout")
						.end((err, res)=>{
							res.should.have.status(200);
							res.body.success.should.equal(true);
							done()
						});
				});

		})
	})

});

