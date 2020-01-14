const express = require('express');
const MongoClient = require('mongodb').MongoClient;
const assert = require('assert');

const setRoutes = require('./routes');

const app = express();
const port = 3000;

const url = 'mongodb://localhost:27017';
const dbName = 'pasaporte';

app.use(express.static('public'));

MongoClient.connect(url, function(err, client) {
    assert.equal(null, err);
    console.log("Connected successfully to server");

    const db = client.db(dbName);
   
    setRoutes(app, db);
});


function listenCallback () {
    console.log('App listening in port ' + port);
}

app.listen(port, listenCallback);