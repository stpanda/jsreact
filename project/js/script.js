/* Задания на урок:

1) Удалить все рекламные блоки со страницы (правая часть сайта)

2) Изменить жанр фильма, поменять "комедия" на "драма"

3) Изменить задний фон постера с фильмом на изображение "bg.jpg". Оно лежит в папке img.
Реализовать только при помощи JS

4) Список фильмов на странице сформировать на основании данных из этого JS файла.
Отсортировать их по алфавиту 

5) Добавить нумерацию выведенных фильмов */

'use strict';

document.addEventListener('DOMContentLoaded', () => {
    const movieDB = {
        movies: [
            "Логан",
            "Лига справедливости",
            "Ла-ла лэнд",
            "Одержимость",
            "Скотт Пилигрим против..."
        ]
    };
    
    const adv = document.querySelectorAll('.promo__adv img'),
          poster = document.querySelector('.promo__bg'),
          genre = poster.querySelector('.promo__genre'),
          movieList = document.querySelector('.promo__interactive-list'),
          form = document.querySelector('form.add'),
          input = form.querySelector('.adding__input'),
          checkBox = form.querySelector('[type="checkbox"]');

    form.addEventListener('submit', (e) => {
        e.preventDefault();

        updateMovieList(input.value, checkBox.checked);

        event.target.reset();
    });
    
    adv.forEach(item => {
        item.remove();
    });
    
    genre.textContent = 'драма';
    
    poster.style.backgroundImage = 'url("img/bg.jpg")';

    createMovieList();

    function createMovieList() {
        movieDB.movies.sort();
        movieList.innerHTML = "";
        
        movieDB.movies.forEach((film, i) => {
            movieList.innerHTML += `
                <li class="promo__interactive-item">${i + 1} ${film}
                    <div class="delete"></div>
                </li>
            `;
        });

        document.querySelectorAll('.delete').forEach((item, i) => {
            item.addEventListener('click', () => {
                item.parentElement.remove();
                movieDB.movies.splice(i, 1);
                createMovieList();
            });
        });
    
    }

    function updateMovieList(movie, isFavorite) {
        if(movie != null && movie != '') {
            if(isFavorite) {
                console.log('Добавляем любимый фильм');
            }
            if(movie.length > 21) {
                movie = `${movie.substr(0, 21)}...`;
            }
            movieDB.movies.push(movie);
            createMovieList();
        }
    }
});