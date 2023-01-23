 export const sortCards = () => {
    const filterblock = document.getElementById('sort');
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

    const sortedByMovies = (data, value) => {
        return data.filter(item => {
            if (item.movies) {
                return item.movies.includes(value);
            }
        });
    };

    const sorted = (data, key, value) => {
        return data.filter(item => {
            if (item[key]) {
                return item[key] === value;
            }
        });
    };

    filterblock.addEventListener('change', () => {
        const selectsList = filterblock.querySelectorAll('select');

        let resp = fetch('./db/dbHeroes.json')
            .then(response => response.json())
            .catch(error => console.log(error.message));

        resp.then(data => {
            let sortedData = data;

            selectsList.forEach(selectItem => {
                if (selectItem.value !== 'noselected') {
                    const keyName = selectItem.id;
                    const value = selectItem.value;

                    if (keyName === 'movies') {
                        sortedData = sortedByMovies(sortedData, value);
                    }

                    if (keyName !== 'movies') {
                        sortedData = sorted(sortedData, keyName, value);
                    }

                    return sortedData;
                }
            });
            
            render(sortedData);
            
        });
    });
};

