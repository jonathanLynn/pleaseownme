//The below code creates the DynamoDB Table and Associated Keys.

var AWS = require('aws-sdk');
AWS.config.update({region: 'ap-southeast-2'});
var ddb = new AWS.DynamoDB({apiVersion: '2012-08-10'});

var params = {
  AttributeDefinitions: [
    {
      AttributeName: 'DOMAIN_NAME',
      AttributeType: 'S'
    },
    {
      AttributeName: 'RESULT',
      AttributeType: 'S'
    }
  ],
  KeySchema: [
    {
      AttributeName: 'DOMAIN_NAME',
      KeyType: 'HASH'
    },
    {
      AttributeName: 'RESULT',
      KeyType: 'RANGE'
    }
  ],
  ProvisionedThroughput: {
    ReadCapacityUnits: 1,
    WriteCapacityUnits: 1
  },
  TableName: 'pleaseownme',
  StreamSpecification: {
    StreamEnabled: false
  }
};

// Call DynamoDB to create the table
ddb.createTable(params, function(err, data) {
  if (err) {
    console.log("Error", err);
  } else {
    console.log("Table Created", data);
  }
});