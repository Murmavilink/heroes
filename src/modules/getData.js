const getData = async () => {
    
    const cards = document.querySelector('.cards');
    const btn = document.querySelector('.btn');

    let stack = 9;
    let count = 1;

    btn.addEventListener('click', () => {
        cards.innerHTML = '';
        getHeroes();

        setTimeout(() => {
            if(btn) {
                btn.scrollIntoView({
                    block: "center", 
                    behavior: "smooth"
                });
            }
        }, 30);
    });

    const render = (data) => {
        data.forEach((item, index) => {
            cards.insertAdjacentHTML('beforeend', `
            <a class="card" href="${index}">
                <img class="card__img" src="${item.photo}" alt="card img">
                <h3 class="card__title">${item.name}</h3>
            </a>`);  
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
        fetch('./dbHeroes.json')
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

    getHeroes();
 
};

export default getData;