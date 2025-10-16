const recipeCardTemplate = document.querySelector(".card__template");
const searchInput = document.querySelector(".search__input");
const searchBtn = document.querySelector(".search__btn");
const select = document.querySelector(".select");
const clearBtn = document.querySelector(".clear-btn");

getRecipes();

function getRecipes(search) {
  let url = "https://dummyjson.com/recipes";
  if (search) {
    url = `https://dummyjson.com/recipes/search?q=${search}`;
  }

  fetch(url)
    .then((res) => res.json())
    .then((data) => {
      console.log(data.recipes);
      renderCategory(".recipe-list", "All Recipes", data.recipes);
    });
}

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

searchBtn.addEventListener("click", () => {
  const value = searchInput.value;
  getRecipes(value);
});

clearBtn.addEventListener("click", () => {
  searchInput.value = "";
  getRecipes();
});

searchInput.addEventListener("keydown", (event) => {
  if (event.key == "Enter") {
    const value = searchInput.value;
    getRecipes(value);
  }
});
