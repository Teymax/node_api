import chai from 'chai';
import chaiHttp from 'chai-http';
import {describe, it} from "mocha"
import {user as User} from "../../models";

chai.use(chaiHttp);
chai.should();

const app = require('../../server');

describe('Reports', () => {
    describe('New report', () => {
        it('POST /yard/report try to report with correct data', done => {
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
                    let report = {
                            user_email: 'test@gmail.com',
                            vehicle_id: 1,
                            type: 1,
                            note: 'report for first vehicle'
                    };
                    login.post("/yard/report")
                        .set('Authorization', `Bearer ${res.body.access_token}`)
                        .send(report)
                        .end((err, res) => {
                            console.log(res);
                            res.should.have.status(200);
                            res.body.success.should.equal(false);
                            res.body.report.should.be.a('object');
                            done();
                        });
                });
        });
    })

});

