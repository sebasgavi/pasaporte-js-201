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
            article.innerHTML = movie.original_title;
            container.appendChild(article);
        });
    })