console.log('Hello world');

const container = document.querySelector('#main-container');

function fetchMovies(query){
    fetch('/api/1/movies' + query)
    .then(function(raw){
        return raw.json();
    })
    .then(function(json){
        container.innerHTML = '';
        json.forEach(function(movie, index){
            const col = document.createElement('div');
            col.classList.add('col-4');
            
            const article = document.createElement('article');
            article.classList.add('card');
            article.classList.add('mb-4');
            article.innerHTML = `
                <img src="https://source.unsplash.com/random/300x200?v=${movie._id}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${movie.original_title} (${movie.release_year})</h5>
                    <p class="card-text">
                        <strong>${movie.genres}</strong><br>
                        ${movie.overview.substring(0, 150)}
                    </p>
                    <button class="btn btn-danger">Dislike</button>
                    <span class="badge badge-secondary">${movie.likes || 0}</span>
                    <button class="btn btn-success">Like</button>
                </div>
            `;
            col.appendChild(article);
            container.appendChild(col);

            function updateLikes(likes){
                article.querySelector('.badge').innerText = likes;
            }
            
            article.querySelector('.btn-danger')
                .addEventListener('click', function() {
                    fetch('/api/1/movies/' + movie._id + '?type=dislike', {
                        method: 'PUT'
                    }).then(function(raw){
                        return raw.json();
                    }).then(function(json){
                        updateLikes(json.likes);
                    });
                });
            article.querySelector('.btn-success')
                .addEventListener('click', function() {
                    fetch('/api/1/movies/' + movie._id + '?type=like', {
                        method: 'PUT'
                    }).then(function(raw){
                        return raw.json();
                    }).then(function(json){
                        updateLikes(json.likes);
                    });
                });
        });
    });
}

fetchMovies('');

const form = document.querySelector('#filter-form');
form.addEventListener('submit', function(event){
    event.preventDefault();
    fetchMovies('?year=' + form.year.value + '&genre=' + form.genre.value);
});