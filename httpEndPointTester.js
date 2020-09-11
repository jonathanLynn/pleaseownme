const fetch = require("node-fetch");
var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});
'use strict'

//This is the HTTP endpoint URL.
var url = 'https://swapi.dev/api'

var promise = new Promise((resolve,reject) => {

    //This is the playbook thats run against the HTTP endpoint.
    var playBook = [
        '/people/1',
        '/people/2',
        '/people/3',
        '/people/4',
        '/people/5',
    ]

    //This array has both the playbook and URL glued together
    var httpEndpoint = []
    
    //Loop that iterates through the playBook and glues it to the HTTP endpoint.
    var i = 0
    for (i = 0; i < playBook.length; i++) {
        httpEndpoint.push(url + playBook[i])
    }

    resolve(httpEndpoint);
  
});
promise.then((result) => {
    
    //Takes the Completed HTTP endpoint and fetches the result.
    var i = 0
    var httpEndpointResults = []
    var fetchResults = []
    for (i = 0; i < result.length; i++) {
        fetch(result[i])
        .then((res) => {
            return res.json()

        })
        .then ((data) => {

            //Writing the result to the DynamoDB.
            var params = {
                TableName: 'pleaseownme', 
                Item: {
                    'DOMAIN_NAME' : {S: (new Date()).getTime().toString(36) + Math.random().toString(36).slice(2)}, 
                    //'RESULT' : {S: data["name"]}
                    'RESULT' : {S: JSON.stringify(url) + data}
                      }
                            };
            ddb.putItem(params, function(err, data) {
            if (err) {
            console.log("Something went terribly wrong!", err);
            } else {
            console.log("Success!!", data);
            }
            });
        })            
                }
     
        }     

).catch((error) => {
  
    console.log(error);
  
})