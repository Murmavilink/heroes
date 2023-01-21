const filter = () => {
    const cards = document.querySelector('.cards');
    const formHeader = document.querySelector('.form-header');
    const formSearch = document.querySelector('.form-header__search');

    const searchData = (data, value) => {
        cards.innerHTML = '';

        data.forEach((item, index) => {

            if(item.name.toLowerCase().includes(value)) {    
                cards.insertAdjacentHTML('beforeend', `
                <div class="card" data-id="${index}">
                    <img class="card__img" src="./db/${item.photo}" alt="card img">
                    <h3 class="card__title">${item.name}</h3>
                </div>`);
            }

        });
    };

    const getHeroes = (value) => {
        fetch('./db/dbHeroes.json')
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error('Данные были получены с ошибкой!');
            }
        })
        .then(data => searchData(data, value.toLowerCase()))
        .catch(error => console.log(error));
    };

    const formEventListener = (param) => {
        formHeader.addEventListener(param, (e) => {
            e.preventDefault();
            getHeroes(formSearch.value);
        });
    };
    
    formEventListener('input');
    formEventListener('submit');    
};

export default filter;