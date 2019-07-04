import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from "mocha"
import {user as User} from "../../models";

chai.use(chaiHttp);
chai.should();

const app = require('../../server');

describe('Settings', () => {
    describe('New password', () => {
        it('PUT /user/update without data', done => {
            chai.request(app)
                .put('/user/update')
                .end((err, res) => {
                    res.should.have.status(401);
                    // res.body.success.should.equal(false);
                    // res.body.error.should.equal('no user found!');
                    done()
                });
        });
        it('PUT /user/update without access token', done => {
            const user = {
                email: 't@gmail.com',
            };
            chai.request(app)
                .put('/user/update')
                .send(user)
                .end((err, res) => {
                    res.should.have.status(401);
                    // res.body.success.should.equal(false);
                    // res.body.error.should.equal('Empty user');
                    done()
                });
        });
        it('PUT /user/update without email', done => {
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
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.success.should.equal(false);
                            res.body.error.should.equal('no user found!');
                            done()
                        });
                });
        });
        it('PUT /user/update with invalid mail', done => {
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
                    let usr = {
                        email: 't@gmail.com',
                    };
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(usr)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.success.should.equal(false);
                            res.body.error.should.equal('no user found!');
                            done()
                        });
                });
        });
        it('PUT /user/update with correct mail', done => {
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
                    let usr = {
                        email: 'test@gmail.com',
                    };
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(usr)
                        .end((err, res) => {
                            res.should.have.status(200);
                            res.body.success.should.equal(true);
                            res.body.user.should.be.a('object');
                            res.body.user.should.include.keys("refresh_token");
                            done()
                        });
                });
        });
        it('PUT /user/update try to set new password without old password, with correct mail', done => {
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
                    let usr = {
                        email: 'test@gmail.com',
                        new_password: 'test1',
                    };
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(usr)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.success.should.equal(false);
                            res.body.error.should.equal('Enter old password to change it');
                            done()
                        });
                });
        });
        it('PUT /user/update try to set new password with invalid old password, with correct mail', done => {
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
                    let usr = {
                        email: 'test@gmail.com',
                        old_password: 'invalid',
                        new_password: 'test1',
                    };
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(usr)
                        .end((err, res) => {
                            console.log(res.body);
                            res.should.have.status(400);
                            res.body.success.should.equal(false);
                            res.body.error.should.equal('invalid password');
                            done()
                        });
                });
        });
        it('PUT /user/update try to set new password with correct old password, with correct mail', done => {
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
                    let usr = {
                        email: 'test@gmail.com',
                        old_password: 'test',
                        new_password: 'test',
                    };
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(usr)
                        .end((err, res) => {
                            console.log(res.body);
                            res.should.have.status(200);
                            res.body.success.should.equal(true);
                            res.body.user.should.be.a('object');
                            res.body.user.should.include.keys("refresh_token");
                            done()
                        });
                });
        });
        it('PUT /user/update try to set new image with incorrect format, with correct mail', done => {
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
                    let usr = {
                        email: 'test@gmail.com',
                        user_image: 'test1',
                    };
                    login.put("/user/update")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(usr)
                        .end((err, res) => {
                            res.should.have.status(400);
                            res.body.success.should.equal(false);
                            res.body.error.should.equal('Enter old password to change it');
                            done()
                        });
                });
        });
    })

});

