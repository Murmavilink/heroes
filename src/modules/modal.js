const modal = () => {
    const cards = document.querySelector('.cards');

    cards.addEventListener('click', (e) => {
        e.preventDefault();
        console.log(e.target.closest('a').getAttribute('href'));
    });


};


export { modal };