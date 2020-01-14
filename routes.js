const assert = require('assert');
const path = require('path');
const ObjectID = require('mongodb').ObjectID;

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

    app.put('/api/1/movies/:id', function(req, res) {
        const find = {
            _id: new ObjectID(req.params.id)
        };

        const movies = db.collection('movies');
        movies
        .find(find)
        .toArray(function(err, arr){
            assert.equal(null, err);
            console.log(arr);

            var likes = arr[0].likes || 0;
            if(req.query.type == 'like'){
                likes++;
            } else {
                likes--;
            }

            movies.update(find, {
                ...arr[0],
                likes: likes
            }, function(err, info){
                res.send({
                    likes: likes
                });
            });
        })
    });
}

module.exports = setRoutes;