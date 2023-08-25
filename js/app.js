// instantiate the classes
const cocktail = new CocktailAPI;
const cocktailDB = new CocktailDB;
const ui = new UI();



// global variables
const searchForm = document.getElementById('search-form'); 
const searchTerm = document.getElementById('search');
const resultWrapper = document.querySelector('.results-wrapper');
const results = document.getElementById('results');




// event listeners
function eventListeners() {
    // validates that the pages contains the form
    if (searchForm) {
        searchForm.addEventListener('submit', getCocktails);   
    }

    // the results div listeners
    if (results) {
        results.addEventListener('click', resultsDelegation);
    }

    // event listener on loading the dom if the type of the query we want is the category(category page)
    document.addEventListener('DOMContentLoaded', onloadDOM);
    
}
eventListeners();



// functions 
 
function getCocktails(e) {
    // prevents the submit default
    e.preventDefault();

    // validate that the input has an item
    var searchItem = searchTerm.value;

    if (searchItem === '') {
        // call the ui print error message function
        ui.printErrorMessage('Please add a valid term into the form', 'danger');
    } else {
        // server response from promise
        let serverResponse;

        // select the type of the query we want to request from the api that is specific to the particular page we're in.. (ingredient, name, catergories)
        const type = document.getElementById('type').value;

        // switch between the different types to call the API specific to the type and return the Properties
        switch (type) {
            case 'name':
                serverResponse = cocktail.getCocktailByName(searchItem);
                break;
            case 'ingredient': 
                serverResponse = cocktail.getCocktailsByIngredient(searchItem);
                break;
            case 'category':
                serverResponse = cocktail.getCocktailCategory(searchItem);
                break;
            case 'alcohol':
                serverResponse = cocktail.getCocktailsByAlcoholic(searchItem);
                break;
        
            default:
                break;
        }

        // query the cocktail api for the search by the name of the cocktail
        serverResponse.then(cocktailData => {
            const drinks = cocktailData.drinks;

            // validate that the search has a valid drink term
            if (drinks === null) {
                ui.printErrorMessage('No results, please try a different drink name', 'danger');
            } else {
                if (type === 'name') {
                    // display the drinks with the ingredients
                    ui.displayDrinksWithIngredients(drinks);  
                } else {
                    // display drinks without the ingredients (category, alcohol, ingredients)
                    ui.displayDrinks(drinks);
                }
            }
        })

        .catch(error => console.log(error));
    }
}

// delegation to get the target element (get recipe button) in the results div
function resultsDelegation(e) {
    e.preventDefault();

    // execute the function to display the recipe if the clicked item in the results div has the data-id="get-recipe"
    if (e.target.classList.contains('get-recipe')) {
        const drinkId = e.target.dataset.id;
        // send the data into the cocktail API to call a new API for the drink info
        cocktail.getDrinkRecipe(drinkId)
        .then(recipe => {
            //displays the single recipe into the modal
            const drinkRecipe = recipe.drinks[0];
            ui.displaySingleRecipeIntoModal(drinkRecipe);
        })
    }

    // delegation to execute for when the favorite button is clicked
    if (e.target.classList.contains('favorite-bttn')) {
        if (e.target.classList.contains('is-favorite')) {
            // remove the class
            e.target.classList.remove('is-favorite');
            e.target.textContent = '+';

            // remove the properties of the drinks into the local storage
            cocktailDB.removeDB(e.target.dataset.id);
        } else {
            // add the class
            e.target.classList.add('is-favorite');
            e.target.textContent = '-';

            // the get infos from the drinks (id, name, and image)
            const cardBody = e.target.parentElement;
            const drinkInfo = {
                id: e.target.dataset.id,
                name: cardBody.querySelector('.card-title').textContent,
                image: cardBody.querySelector('.card-img-top').src
            }
            // add the properties of the drinks into the local storage
            cocktailDB.saveIntoDB(drinkInfo);
        }
    }
}

// on loading the document 
function onloadDOM() {
    // print the categories from the api into the search select
    const searchCategory = document.querySelector('.search-category');
    if (searchCategory) {
        // display the select in the ui
        ui.displayCategories();
    }

    // print the favorite cocktails selected into the favorites page from the local storage
    const favoritesTable = document.getElementById('favorites');
    if (favoritesTable) {
        // get the properities from the local storage
        const drinks = cocktailDB.getFromDB();

        // display the drinks in the favorite page ui
        ui.displayFavoriteDrinks(drinks);

        // delegate for when the view or remove button is clicked in the favorite page
        favoritesTable.addEventListener('click', (e) => {
            e.preventDefault();

            // delegate
            if (e.target.classList.contains('get-recipe')) {
                // call the previously set api for the drinks recipe
                cocktail.getDrinkRecipe(e.target.dataset.id)
                .then(recipe => {
                    //displays the single recipe into the modal
                    const drinkRecipe = recipe.drinks[0];
                    ui.displaySingleRecipeIntoModal(drinkRecipe);
                })
            }

            if (e.target.classList.contains('remove-recipe')) {
                // remove the parent (tr) of the parent (td) of the button
                e.target.parentElement.parentElement.remove();

                // remove the drink from the local storage
                cocktailDB.removeDB(e.target.dataset.id);
            }
        })
    }
}