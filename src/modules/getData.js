export const getData = async () => {
    
    try {
        let resp = await fetch('https://marvelheroes-d8094-default-rtdb.firebaseio.com/heroes.json');
        return await resp.json();
    } catch (error) {
        console.log(error);
    }
 
    
};