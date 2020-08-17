//Requirements:
const fetch = require("node-fetch");
const playBook = require('./playBook');
'use strict'

//Variables:
var url = 'https://google.com.au'
var httpEndpoint = []
var httpResults = []

// First Promise:
var promise1 = new Promise((resolve, reject) => {
        
        var i = 0
        for (i = 0; i < playBook.length; i++) {
            httpEndpoint.push(url + playBook[i])
            fetch(httpEndpoint)
            .then(httpResults.push)
            //.then(response => response.json())
            //.then(console.log(response))
        resolve(httpResults)
}
      
});
//First Promise .Then Statement:
promise1.then((result) => {

    console.log(result)

}
).catch((error) => {
      
    console.log(error);
      
})


.then(res => {
  
    res.json()

        .then((data) => {
      
            console.log(data);
      
        })
