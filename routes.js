var express = require('express');
var request = require('request');
var nock = require('nock');
var router = express.Router();

router.put('/sms/send', function(req, res, next) {
    var options = {
        'headers': {
            'Content-type': 'application/json'
        }
    };
    request.put('http://www.tim.com.br/api/v1/sms', options, function(error, response, body){
        if(error){
            res.status(500).send({'error': 'Internal Server Error'});
        } else {
            if(response.statusCode == 201){
                res.status(201).json({'description': 'Message sent!'});
            } else {
                res.status(205).end();
            }
        }
    });
});

// nock('http://www.tim.com.br')
//     .put('/api/v1/sms')
//     // .replyWithError('Something terrible happened!');
//     .reply(201, {
//         'description': 'Message sent!'
//     });

module.exports = router;
