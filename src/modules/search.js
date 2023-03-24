import { renderData } from "./renderData";
import { getData } from "./getData";

export const search = async () => {
    const formHeader = document.querySelector('.form-header');
    const formSearch = document.querySelector('.form-header__search');

    const heroesData = await getData();


    const searchData = (data, value) => {
        return data.filter(item => {
            return item.name.toLowerCase().includes(value);
        });
    };


    const getHeroes = (value) => {
        let sortedData = heroesData;
        sortedData = searchData(heroesData, value.toLowerCase());

        renderData(sortedData);
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