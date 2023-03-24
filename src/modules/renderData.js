import { getData } from "./getData";

export const renderData = (sortedData) => {
    const cards = document.querySelector('.cards');
    const btn = document.querySelector('.btn');

    let stack = 9;
    let count = 1;

    const render = (data) => {
        cards.innerHTML = '';

        data.forEach(item => {
            cards.insertAdjacentHTML('beforeend', `
                <div class="card">
                   <img class="card__img" src="./db/${item.photo}" alt="${item.name + ' img'}">
                        <h3 class="card__title">${item.name}</h3>
                </div>`);
        });

        data.length === 0 ? cards.innerHTML = '<span class="text-info">no information about Heroes</span>' : '';
    };

    const sliceArray = (data, index) => {
        return data.slice(0, index);
    };

    const changeData = (data) => {
        const newStack = stack * count;

        render(sliceArray(data, newStack));

        if (data.length > newStack) {
            count++;
        } else {
            btn.remove();
        }
    };

    const getHeroes = () => {
        getData().then(data => changeData(data)).catch(error => console.log(error.message));
    };

    
    if(btn) {
        btn.addEventListener('click', () => {
            getHeroes();
            
            setTimeout(() => {
                btn.scrollIntoView({
                    block: "center",
                    behavior: "smooth"
                });
            }, 500);

        });
    }


    if(!sortedData) {
        getHeroes();
    } else {
        btn ? btn.remove() : ''; 
        render(sortedData);
    }

};