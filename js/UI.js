class UI {

    // prints error message for the form validation
    printErrorMessage(message, className) {
        // remove the previous error div for click error
        const prevDiv = document.querySelector('.alert');
        if (prevDiv) {
            prevDiv.remove();
        }

        // create the error message div
        const div = document.createElement('div');

        // add the html template
        div.innerHTML = `
            <div class="alert alert-${className} alert-dismissible fade show" role="alert">
                ${message}
                <button type="button" class="btn-close" style data-bs-dismiss="alert" aria-label="Close"></button>
            </div>
        `;

        // insert into the html using insertBefore method
        const reference = document.querySelector('.jumbotron h1');
        const parentNode = reference.parentElement;

        parentNode.insertBefore(div, reference);

        // remove the error message after 5s
        setTimeout(() => {
            div.remove();
        }, 5000);
    }

    // display the different drinks in the UI with their ingredients
    displayDrinksWithIngredients(drinks) {
        // display the results div
        resultWrapper.style.display = 'block';

        // loop throough the drinks and insert the the results into the results div
        results.innerHTML = '';

        drinks.forEach(drink => {
            // construct the html
            results.innerHTML += `
                <div class="col-md-6">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-bttn btn btn-outline-info">+</button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <p class="card-text font-weight-bold">Instruction:</p>
                            <p class="card-text">${drink.strInstructions}</p>
                            <p class="card-text">
                                <ul class="list-group">
                                    <li class="list-group-item list-group-ingredient">Ingredients</li>
                                    ${this.displayIngredients(drink)}
                                </ul>
                            </p>
                            <p class="card-text font-weight-bold">Extra Information:</p>
                            <p class="card-text">
                                <span class="badge rounded-pill bg-success align-top">
                                    ${drink.strAlcoholic}
                                </span>
                                <span class="badge rounded-pill bg-warning align-top">
                                    Category: ${drink.strCategory}
                                </span>
                            </p>
                        </div>
                    </div>
                </div>
            `;
        });

        this.isFavorite();
    }

    // function to display the ingredients
    displayIngredients(drink) {
        // create an empty array
        let ingredients = [];

        // loop from 1 to 15, as the ingreadients and measures are within that range.
        // this is to make sure that only the numbers with valid strings (not null) are gotten
        for (let i = 1; i < 16; i++) {
            // create an empty object that will carry the values of the ingredients or measures that is returned
           const ingredientsMeasure = {};
           // validate that the ingredient with the looped number is not null
           if (drink[`strIngredient${i}`] !== null) {
               ingredientsMeasure.ingredient = drink[`strIngredient${i}`];
               ingredientsMeasure.measure = drink[`strMeasure${i}`];
               // push the object created into the array
               ingredients.push(ingredientsMeasure);
           }
        }

        // create a string template to pass the ingredients and measure into and return the string into the function to be called at the deignated site
        let ingredientTemplate = '';
        ingredients.forEach(ingredient => {
            // returns a different list item if the measure of a particular ingredient is null from the API
            if (ingredient.measure === null) {
                // remove the null from the DOM
                return ingredientTemplate += `
                    <li class="list-group-item">${ingredient.ingredient}</li>
                `
            } else {
                // add the measure of the ingredient
                return ingredientTemplate += `
                    <li class="list-group-item">${ingredient.ingredient} - ${ingredient.measure}</li>
                `
            } 
        });
        
        return ingredientTemplate;
    }

    // display the drinks in the UI without the ingredients
    displayDrinks(drinks) {
        // display the results div
        resultWrapper.style.display = 'block';

        // loop throough the drinks and insert the the results into the results div
        results.innerHTML = '';
        
        drinks.forEach(drink => {
            // construct the html
            results.innerHTML += `
                <div class="col-md-4">
                    <div class="card my-3">
                        <button type="button" data-id="${drink.idDrink}" class="favorite-bttn btn btn-outline-info">+</button>
                        <img class="card-img-top" src="${drink.strDrinkThumb}" alt="${drink.strDrink}">

                        <div class="card-body">
                            <h2 class="card-title text-center">${drink.strDrink}</h2>
                            <a data-bs-toggle="modal" data-bs-target="#recipe" href="#" class="btn btn-success get-recipe" data-id="${drink.idDrink}">
                                Get Recipe
                            </a> 
                        </div>
                    </div>
                </div>
            `
        });

        this.isFavorite();
    }

    // displays the recipe for each drinks gotten by their id
    displaySingleRecipeIntoModal(recipe) {
        // get all the variables for the modal div
        const modalTitle = document.querySelector('.modal-title');
        const descriptionText = document.querySelector('.description-text');
        const modalIngredients = document.querySelector('.ingredient-list .list-group')

        // set the values
        modalTitle.innerHTML = recipe.strDrink;
        descriptionText.innerHTML = recipe.strInstructions;
        modalIngredients.innerHTML = this.displayIngredients(recipe);
    }

    // displays the category called from the api into the select
    displayCategories() {
        // call the category api
        const categoryList = cocktail.getCategories();

        categoryList.then(categories => {
            const apiCategoryList = categories.drinks;

            // append the category lists into the select;
            apiCategoryList.forEach(category => {
                // 
                const options = document.createElement('option');
                options.textContent = category.strCategory;
                options.value = category.strCategory.split(' ').join('_');
                document.getElementById('search').appendChild(options);
            })
        })
        .catch(error => console.log(error))
    }

    // displays the favorites from the local storage
    displayFavoriteDrinks(favorites) {
        const favoritesTable = document.querySelector('#favorites tbody');

        favorites.forEach(drink => {
            // create new table row for the table body
            const tr = document.createElement('tr');

            tr.innerHTML = `
                <td>
                    <img src="${drink.image}" alt="${drink.name}" class="favorites-img" width="100px">
                </td>
                <td class="favorites-text">${drink.name}</td>
                <td>
                    <a href="#" data-bs-toggle="modal" data-bs-target="#recipe" data-id="${drink.id}" class="btn btn-success get-recipe">
                        View
                    </a>
                </td>
                <td>
                    <a href="#" data-bs-target="#recipe" data-id="${drink.id}" class="btn btn-danger remove-recipe">
                        Remove
                    </a>
                </td>
            `

            // add the tr into the favorites table
            favoritesTable.appendChild(tr);
        })
    }

    // add the class to signify that the cocktail is already a favorite into the local storage
    isFavorite() {
        const drinks = cocktailDB.getFromDB();

        drinks.forEach(drink => {
            let {id} = drink;

            let favoriteDrink = document.querySelector(`[data-id="${id}"]`);

            if (favoriteDrink) {
                favoriteDrink.classList.add('is-favorite');
                favoriteDrink.textContent = '-';
            }
        })
    }
}