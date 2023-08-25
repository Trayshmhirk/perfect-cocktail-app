class CocktailDB {
    // return the recipes from the local storage
    getFromDB() {
        let drinks;

        if (localStorage.getItem('drinks') === null) {
            drinks = [];
        } else {
            drinks = JSON.parse(localStorage.getItem('drinks'));
        }
        return drinks;
    }

    // save recipes from the local storage
    saveIntoDB(drink) {
        const drinks = this.getFromDB();
        
        drinks.push(drink);

        localStorage.setItem('drinks', JSON.stringify(drinks));
    }

    // remove the particular selected drink from the local storage
    removeDB(drinkId) {
        // call the data from the storage
        const drinkFromDB = this.getFromDB();

        // loop through the data to check if the id from the drink ui matches that of the local storage
        drinkFromDB.forEach((store, index) => {
            if (drinkId === store.id) {
                // splice the data and return the new array
                drinkFromDB.splice(index, 1);
            }
            // set the new array into the local storage
            localStorage.setItem('drinks', JSON.stringify(drinkFromDB));
        });  
    }
}