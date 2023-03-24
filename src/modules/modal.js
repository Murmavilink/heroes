import { getData } from "./getData";

export const modal = async () => {
    const cards = document.querySelector('.cards');
    const modal = document.querySelector('.modal');

    const heroesData = await getData();


    const openModal = (obj) => {
        document.body.classList.add('stop-scrolling');
        modal.classList.add('modal--show');
        modal.innerHTML = '';

        modal.insertAdjacentHTML('beforeend', `
        <div class="modal__card">
            <img class="modal__movie-backdrop" src="./db/${obj.photo}" alt="">
                <h2 class="modal__movie-title">${obj.name}</h2>
                <ul class="modal__movie-info">
                <li><span>Имя:</span> ${obj.actors}</li>
                ${obj.birthDay ? `<li><span>День рождения:</span> ${obj.birthDay}</li>` : '<li><span>День рождения:</span> &#9785;</li>'}
                ${obj.gender ? `<li><span>Пол:</span> ${obj.gender === 'male' ? 'Мужской' : 'Женский'}` : ''}</li>
                ${obj.citizenship ? `<li><span>Гражданство: </span> ${obj.citizenship}</li>` : ''}
                ${obj.movies ? `<li><span>Фильмы:</span> ${obj.movies.join(', ')}</li>` : ''}                    
                </ul>
            <button type="button" class="modal__button-close">Закрыть</button>
        </div>`);
    };


    const getHero = (title) => {
        heroesData.forEach(item => {
            item.name === title ? openModal(item) : '';
        });
    };


    const closeModal = () => {
        modal.addEventListener('click', (e) => {
            if (e.target.classList.contains('modal__button-close') || !e.target.closest('.modal__card')) {
                modal.classList.remove('modal--show');
                document.body.classList.remove('stop-scrolling');
            }
        });

        window.addEventListener('keydown', (e) => {
            if (e.key === 'Escape') {
                modal.classList.remove('modal--show');
                document.body.classList.remove('stop-scrolling');
            }
        });
    };


    cards.addEventListener('click', (e) => {
        let movieTitle;

        if (!e.target.classList.contains('cards')) {
            movieTitle = e.target.closest('.card').querySelector('.card__title').textContent;
        }

        getHero(movieTitle);
        closeModal();
    });
};