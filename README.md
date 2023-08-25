# Perfect Cocktail API

This is a  multipage website where you can search for cocktails based on names, ingredients, categories, and alcohol content. Add cocktails to favorites and access them in the favorites page. Bootstrap 5.0 was used in building this app.

## Table of contents
- [Perfect Cocktail API](#perfect-cocktail-api)
  - [Table of contents](#table-of-contents)
  - [My process](#my-process)
    - [Built with](#built-with)
    - [What I learned](#what-i-learned)
    - [Continued development](#continued-development)
  - [Author](#author)


## My process

### Built with

- Semantic HTML5 markup
- Bootstrap
- Vanilla Javascript


### What I learned

I had to remove the measurements for some of the ingredients, because the measurements were not available and it was returning null

```js
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

```

### Continued development
I would like to see how i can develop a full scale website like this using reactJS


## Author

- GitHub - [@Trayshmhirk](https://github.com/Trayshmhirk)
- Twitter - [@TrayShmhirk01](https://www.twitter.com/TrayShmhirk01)

