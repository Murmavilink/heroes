import { renderData } from "./renderData";
import { getData } from "./getData";


export const sortCards = async () => {
    const filterblock = document.getElementById('sort');
    
    const heroesData = await getData();


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
                return item[key].toLowerCase() === value.toLowerCase();
            }
        });
    };


    filterblock.addEventListener('change', () => {
        const selectsList = filterblock.querySelectorAll('select');

            let sortedData = heroesData;

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
                }
            });
            
            renderData(sortedData);
    });
};

