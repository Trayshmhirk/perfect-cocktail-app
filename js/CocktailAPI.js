class CocktailAPI {

    // call the cocktail api for the cocktail name
    async getCocktailByName (inputName) {
        // search by name
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${inputName}`);

        const cocktails = await api.json();
       
        return cocktails;
    }

    // call the cocktail api for the cocktail ingredient
    async getCocktailsByIngredient(ingredient) {
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=${ingredient}`);

        const ingredients = await api.json();

        return ingredients;
    }

    // call the coctail api for the drink recipe
    async getDrinkRecipe(id) {
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`);

        const drinksInfo = await api.json();

        return drinksInfo;
    }

    // call the api to get the categories for the select
    async getCategories() {
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/list.php?c=list`);

        const categories = await api.json();

        return categories;
    }

    // call the cocktail api for the cocktails in the selected category
    async getCocktailCategory(category) {
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?c=${category}`);

        const categories = await api.json();

        return categories;
    }

    // call the cocktail api for the cocktails that are alcoholic or not
    async getCocktailsByAlcoholic(alcoholic) {
        const api = await fetch(`https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=${alcoholic}`);

        const alcoholics = await api.json();

        return alcoholics;
    }
}