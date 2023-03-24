import { renderData } from "./renderData";
import { getData } from "./getData";

export const search = () => {
    const formHeader = document.querySelector('.form-header');
    const formSearch = document.querySelector('.form-header__search');

    const searchData = (data, value) => {
        return data.filter(item => {
            return item.name.toLowerCase().includes(value);
        });
    };

    const getHeroes = (value) => {
        getData().then(data => {
            let sortedData = data;
            sortedData = searchData(data, value.toLowerCase());
            
            renderData(sortedData);
        }).catch(error => console.log(error.message));
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