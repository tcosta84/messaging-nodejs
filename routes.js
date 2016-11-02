var express = require('express');
var request = require('request');
var nock = require('nock');
var router = express.Router();

router.put('/sms/send', function(req, res, next){

    // Validation
    var requiredProps = ['from', 'to', 'body'];
    for(var prop of requiredProps){
        if(req.body[prop] == undefined){
            res.status(400).json({'error': 'Property "' + prop + '" is missing'});
            return;
        }
    }

    if(new Date(req.body.expiration_date) < new Date()){
        res.status(400).json({'error': 'Expiration date is old'});
        return;
    }

    var options = {
        'headers': {
            'Content-type': 'application/json'
        }
    };

    request.put('http://www.tim.com.br/api/v1/sms', options, function(error, response, body){
        if(error){
            res.status(500).send({'error': 'Internal Server Error'});
            return;
        }

        if(response.statusCode == 201){
            res.status(201).json({'description': 'Message sent!'});
        } else {
            res.status(205).end();
        }
    });
});

module.exports = router;
