console.log('Hello world');

const container = document.querySelector('#main-container');

fetch('/api/1/movies')
    .then(function(raw){
        return raw.json();
    })
    .then(function(json){
        console.log(json);
        json.forEach(function(movie, index){
            const col = document.createElement('div');
            col.classList.add('col-4');
            
            const article = document.createElement('article');
            article.classList.add('card');
            article.classList.add('mb-4');
            article.innerHTML = `
                <img src="https://source.unsplash.com/random/300x200?v=${movie._id}" class="card-img-top" alt="">
                <div class="card-body">
                    <h5 class="card-title">${movie.original_title}</h5>
                    <p class="card-text">${movie.overview.substring(0, 150)}</p>
                    <a href="#" class="btn btn-primary">Go somewhere</a>
                </div>
            `;

            col.appendChild(article);
            container.appendChild(col);
        });
    });


const form = document.querySelector('#filter-form');
form.addEventListener('submit', function(event){
    event.preventDefault();
    console.log(form.year.value);
});