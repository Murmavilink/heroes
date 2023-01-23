export const search = () => {
    const formHeader = document.querySelector('.form-header');
    const formSearch = document.querySelector('.form-header__search');

    const cards = document.querySelector('.cards');

    const render = (data) => {
        cards.innerHTML = '';

        data.forEach(item => {
            cards.insertAdjacentHTML('beforeend', `
            <div class="card">
                <img class="card__img" src="./db/${item.photo}" alt="card img">
                <h3 class="card__title">${item.name}</h3>
            </div>`);  
        });
    };

    const searchData = (data, value) => {
        return data.filter(item => {
            return item.name.toLowerCase().includes(value);
        });
    };

    const getHeroes = (value) => {
        let resp = fetch('./db/dbHeroes.json')
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error('Данные были получены с ошибкой!');
            }
        }).catch(error => console.log(error));

        resp.then(data => {
            let sortedData = data;
            sortedData = searchData(data, value.toLowerCase());
            console.log(sortedData);


            render(sortedData);
        });
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