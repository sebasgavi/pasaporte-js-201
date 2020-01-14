const assert = require('assert');
const path = require('path');

function setRoutes(app, db) {
    app.get('/', function(req, res){
        // res.send('página inicial');
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });
    
    app.get('/api/1/movies', function(req, res){
        const movies = db.collection('movies');
        movies
        .find()
        .limit(10)
        .toArray(function(err, list){
            assert.equal(null, err);
            console.log(list);
            res.send(list);
        });
    });
}

module.exports = setRoutes;