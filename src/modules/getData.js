export const getData = async () => {
    
    try {
        let resp = await fetch('https://marvelheroes-3c25f-default-rtdb.firebaseio.com/heroes.json');
        return await resp.json();
    } catch (error) {
        console.log(error);
    }
 
    
};