const fetch = require("node-fetch");
'use strict'
var promise = new Promise((resolve,reject) => {

    //This is the playbook thats run against the HTTP endpoint.
    var playBook = [
        '/home',
        '/abc',
        '/123'
    ]

    //This array has both the playbook and URL glued together
    var httpEndpoint = []

    //This array holds the responses to each of the fetch requests
    var httpEndpointResults = []

    //This is the HTTP endpoint URL.
    var url = 'https://guardpoint.com.au'
    
    //Loop that iterates through the playBook and glues it to the HTTP endpoint.
    var i = 0
    for (i = 0; i < playBook.length; i++) {
        httpEndpoint.push(url + playBook[i])
    }

    //Loop that Fetches each of the completed HTTP Endpoints.
    for (i = 0; i < playBook.length; i++) {
        const response = fetch(httpEndpoint[i]);
        httpEndpointResults.push(response)
    }
    resolve(httpEndpointResults);
  
});
promise.then((result) => {

        console.log(result)
  
}).catch((error) => {
  
    console.log(error);
  
})