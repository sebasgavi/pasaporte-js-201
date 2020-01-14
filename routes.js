const assert = require('assert');
const path = require('path');

function setRoutes(app, db) {
    app.get('/', function(req, res){
        // res.send('página inicial');
        res.sendFile(path.join(__dirname, '/public/index.html'));
    });
    
    app.get('/api/1/movies', function(req, res){
        console.log(req.query);
        const filters = {};

        if(req.query.year){
            filters.release_year = parseInt(req.query.year);
        }

        if(req.query.genre){
            filters.genres = {
                $regex: new RegExp(req.query.genre),
            }
        }

        const movies = db.collection('movies');
        movies
        .find(filters)
        .limit(10)
        .toArray(function(err, list){
            assert.equal(null, err);
            res.send(list);
        });
    });
}

module.exports = setRoutes;