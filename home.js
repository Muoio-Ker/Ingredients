const recipeCardTemplate = document.querySelector(".card__template");

fetch("https://dummyjson.com/recipes?sortBy=reviewCount&order=desc&limit=4")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderCategory(".recipes", "Popular Recipes", data.recipes);
  });

fetch("https://dummyjson.com/recipes?sortBy=cookTimeMinutes&order=asc&limit=4")
  .then((res) => res.json())
  .then((data) => {
    console.log(data);
    renderCategory(".fast", "Fast Recipes", data.recipes);
  });

fetch("https://dummyjson.com/recipes/tags")
  .then((res) => res.json())
  .then(console.log);

function renderCategory(sectionClassName, title, recipes) {
  const section = document.querySelector(sectionClassName);
  const sectionTitle = section.querySelector(".title");
  sectionTitle.innerHTML = title;
  const sectionCards = section.querySelector(".cards");
  sectionCards.innerHTML = null;
  recipes.forEach((recipe) => {
    const clone = recipeCardTemplate.content.cloneNode(true);
    const cardTitle = clone.querySelector(".card__title");
    cardTitle.innerHTML = recipe.name;
    const cardLink = clone.querySelector(".card__link");
    cardLink.href = `./recipes.html?id=${recipe.id}`;
    const card = clone.querySelector(".card");
    card.style.backgroundImage = `linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 1)),
    url(${recipe.image})`;
    const cardCategories = clone.querySelector(".card__categories");
    const [cardTime, cardReactions, cardRating] =
      clone.querySelectorAll(".card__indicator");
    cardTime.innerHTML = recipe.cookTimeMinutes;
    cardReactions.innerHTML = recipe.reviewCount;
    cardRating.innerHTML = recipe.rating;
    recipe.tags.forEach((tag) => {
      const span = document.createElement("span");
      span.classList.add("card__category");
      span.innerHTML = tag;
      cardCategories.append(span);
    });
    sectionCards.append(clone);
  });
}
