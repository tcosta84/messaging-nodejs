var express = require('express');
var request = require('request');
var nock = require('nock');
var router = express.Router();

var environment = process.env.NODE_ENV || 'development';
var config = require('./knexfile.js')[environment];
var knex = require('knex')(config);

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

    knex('message')
        .insert({
            from: req.body.from,
            to: req.body.to,
            body: req.body.body
        })
        .returning('id')
        .then(function(id){
            console.log('Inserted message id: ' + id);

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

                knex('message')
                    .update({
                        status_code: response.statusCode
                    })
                    .then(function(affectedRows){
                        console.log('Affected rows on update: ' + affectedRows);
                    });

                if(response.statusCode == 201){
                    res.status(201).json({'description': 'Message sent!'});
                } else {
                    res.status(205).end();
                }

            });

        });

});

module.exports = router;
