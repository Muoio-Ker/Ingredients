const urlParams = new URLSearchParams(window.location.search);
const id = urlParams.get("id");

const dishTitle = document.querySelector(".dish__title");
const dishCategories = document.querySelector(".dish__categories");
const dishImg = document.querySelector(".dish__img");
const dishParagraph = document.querySelector(".recipe__paragraph");
const prepTime = document.querySelector(".prep-time");
const cookTime = document.querySelector(".cook-time");
const servings = document.querySelector(".servings");
const ingredients = document.querySelector(".recipe__ingredients");
const instructions = document.querySelector(".recipe__instructions");
const [dishTime, dishReactions, dishRating] =
  document.querySelectorAll(".dish__indicator");

if (id) {
  fetch(`https://dummyjson.com/recipes/${id}`)
    .then((res) => res.json())
    .then((recipe) => {
      console.log(recipe);
      dishTitle.innerHTML = recipe.name;
      dishCategories.innerHTML = null;
      recipe.tags.forEach((tag) => {
        const span = document.createElement("span");
        span.classList.add("dish__category");
        span.innerHTML = tag;
        dishCategories.append(span);
      });
      dishImg.style.backgroundImage = `url(${recipe.image})`;
      dishParagraph.innerHTML = recipe.difficulty;
      dishTime.innerHTML = recipe.cookTimeMinutes;
      dishReactions.innerHTML = recipe.reviewCount;
      dishRating.innerHTML = recipe.rating;
      prepTime.innerHTML = recipe.prepTimeMinutes;
      cookTime.innerHTML = recipe.cookTimeMinutes;
      servings.innerHTML = recipe.servings;
      ingredients.innerHTML = null;
      recipe.ingredients.forEach((ingredient) => {
        const li = document.createElement("li");
        li.innerHTML = ingredient;
        ingredients.append(li);
      });
      instructions.innerHTML = null;
      recipe.instructions.forEach((instruction) => {
        const li = document.createElement("li");
        li.innerHTML = instruction;
        instructions.append(li);
      });
    });
}
