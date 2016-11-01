var chai = require('chai');
var chaiHttp = require('chai-http');
var nock = require('nock');
var app = require('./app');
var should = chai.should();

chai.use(chaiHttp);

describe('/PUT sms', function(){
    var requestMock;

    beforeEach(function(done){
        requestMock = nock('http://www.tim.com.br').put('/api/v1/sms');
        done();
    });

    it('should send', function(done){
        requestMock.reply(201);

        chai.request(app).put('/api/v1/sms/send').end(function(err, res){
            res.should.have.status(201);
            res.should.be.json;
            res.body.description.should.equal('Message sent!');
            done();
        });
    });

    it('should not send when external api responds with error', function(done){
        requestMock.replyWithError;

        chai.request(app).put('/api/v1/sms/send').end(function(err, res){
            res.should.have.status(500);
            res.should.be.json;
            res.body.error.should.equal('Internal Server Error');
            done();
        });
    });

});
