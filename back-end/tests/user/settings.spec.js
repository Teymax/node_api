import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from "mocha"

chai.use(chaiHttp);
chai.should();

const app = require('../../server');

describe('Settings', () => {
    describe('New password', () => {
        it('PUT /user/update without data', done => {
            chai.request(app)
                .put('/user/update')
                .end((err, res) => {
                    res.should.have.status(400);
                    res.body.success.should.equal(false);
                    res.body.error.should.equal('Please enter an email and username to register');
                    done()
                });
        });

    });
});

