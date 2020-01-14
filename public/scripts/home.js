console.log('Hello world');

const container = document.querySelector('#main-container');

fetch('/api/1/movies')
    .then(function(raw){
        return raw.json();
    })
    .then(function(json){
        console.log(json);
        json.forEach(function(movie, index){
            const article = document.createElement('article');
            article.classList.add('card');
            article.innerHTML = `
                <img src="https://source.unsplash.com/random/300x200?v=${movie._id}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${movie.original_title}</h5>
                    <p class="card-text">${movie.overview}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            `;
            container.appendChild(article);
        });
    })