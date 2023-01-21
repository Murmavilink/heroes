const getData = () => {
    const cards = document.querySelector('.cards');
    const btn = document.querySelector('.btn');

    let stack = 9;
    let count = 1;

    const render = (data) => {
        cards.innerHTML = '';

        data.forEach((item, index) => {
            cards.insertAdjacentHTML('beforeend', `
            <div class="card" data-id="${index}">
                <img class="card__img" src="./db/${item.photo}" alt="card img">
                <h3 class="card__title">${item.name}</h3>
            </div>`);  
        });
    };

    const sliceArray = (data, index) => {
        return data.slice(0, index);
    };

    const changeData = (data) => {
        const newStack = stack * count;
        
        render(sliceArray(data, newStack));

        if(data.length > newStack) {
            count++;
        } else {
            btn.remove();
        }
    };

    const getHeroes = () => {
        fetch('./db/dbHeroes.json')
        .then(res => {
            if(res.ok) {
                return res.json();
            } else {
                throw new Error('Данные были получены с ошибкой!');
            }
        })
        .then(data => changeData(data))
        .catch(error => console.log(error));
    };

    btn.addEventListener('click', () => {
        getHeroes();

        setTimeout(() => {
            btn.scrollIntoView({
                block: "center", 
                behavior: "smooth"
            });
        }, 30);
    });

    getHeroes();
};

export default getData;