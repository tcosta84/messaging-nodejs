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

        var data = {'from': '21981527318', 'to': '21980072800', 'body': 'Hello!'};
        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(201);
            res.should.be.json;
            res.body.description.should.equal('Message sent!');
            done();
        });
    });

    it('should not send when external api responds with error', function(done){
        requestMock.replyWithError;

        var data = {'from': '21981527318', 'to': '21980072800', 'body': 'Hello!'};
        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(500);
            res.should.be.json;
            res.body.error.should.equal('Internal Server Error');
            done();
        });
    });

    it('should not send when data is empty', function(done){
        var data = '';
        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(400);
            done();
        });
    });

    it('should not send when property "from" is missing', function(done){
        var data = {'to': '21980072800', 'body': 'Hello!'};
        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.error.should.equal('Property "from" is missing');
            done();
        });
    });

    it('should not send when property "to" is missing', function(done){
        var data = {'from': '21981527318', 'body': 'Hello!'};
        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.error.should.equal('Property "to" is missing');
            done();
        });
    });

    it('should not send when property "body" is missing', function(done){
        var data = {'to': '21980072800', 'from': '21981527318'};
        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.error.should.equal('Property "body" is missing');
            done();
        });
    });

    it('should not send when property "expiration_date" is an old date', function(done){
        var data = {
            'from': '21981527318',
            'to': '21980072800',
            'body': 'Hello!',
            'expiration_date': '2010-07-14T10:00'
        };

        chai.request(app).put('/api/v1/sms/send').send(data).end(function(err, res){
            res.should.have.status(400);
            res.should.be.json;
            res.body.error.should.equal('Expiration date is old');
            done();
        });
    });

});
