let matchingRecipes = [];

// fonction permettant de rafraîchir 
function refreshRecipes() {
  const hasFilterCriterias = searchedValue || selectedIngredients.length || selectedUtensils.length || selectedApparels.length
  
  matchingRecipes = [];

  if (!hasFilterCriterias) {
    matchingRecipes = normalizedRecipes;
  } else {
    for (let i = 0; i < normalizedRecipes.length; i++) {
      const recipe = normalizedRecipes[i];

      const nameDescriptionMatch = (searchedValue === '' || searchedValue.length < 3) ||
        (searchedValue !== '' && (recipe.name.includes(searchedValue) || recipe.description.includes(searchedValue)));

      const ingredientMatch = selectedIngredients.length === 0 ||
        (selectedIngredients.length > 0 && recipe.ingredients.find(ingredient => selectedIngredients.includes(ingredient.ingredient)));

      const utensilMatch = selectedUtensils.length === 0 ||
        (selectedUtensils.length > 0 && recipe.ustensils.find(ustensil => selectedUtensils.includes(ustensil)));

      const apparelMatch = selectedApparels.length === 0 ||
        (selectedApparels.length > 0 && selectedApparels.includes(recipe.appliance));

      if (nameDescriptionMatch && ingredientMatch && utensilMatch && apparelMatch) {
        matchingRecipes.push(recipe);
      }
    }
  }

  // Créez des ensembles pour stocker les valeurs uniques
  const uniqueIngredients = new Set();
  const uniqueUstensils = new Set();
  const uniqueAppliances = new Set();

  const sectionRecipes = document.querySelector(".recipes-container");
  sectionRecipes.innerHTML = ''

  for (const recipe of matchingRecipes) {
    // Ajoutez chaque ingrédient, ustensile et appareil aux ensembles respectifs
    for (const ingredient of recipe.ingredients) {
      if (!selectedIngredients.includes(ingredient.ingredient)) {
        uniqueIngredients.add(ingredient.ingredient);
      }
    }

    for (const ustensil of recipe.ustensils) {
      if (!selectedUtensils.includes(ustensil)) {
        uniqueUstensils.add(ustensil);
      }
    }

    if (!selectedApparels.includes(recipe.appliance)) {
      uniqueAppliances.add(recipe.appliance);
    }

    const articleElement = document.createElement("article");
    
    const divImage = document.createElement("div");
    divImage.setAttribute("class", "imgOfRecipe");

    const textContainer = document.createElement("div");
    textContainer.setAttribute("class", "textContainer");

    const div1 = document.createElement("div");
    div1.setAttribute("class", "underImg");
    const nomElement = document.createElement("h2");
    nomElement.style.fontSize = "18px";
    nomElement.setAttribute("class", "titleOfRecipe");
    nomElement.innerText = recipe.name;
    nomElement.style.margin = "0";

    const div1Bis = document.createElement("div");
    div1Bis.setAttribute("class", "divOfTime");

    const timerIcon = document.createElement("img");
    timerIcon.setAttribute("src", "assets/Logo/icons8-clock-144.png");
    timerIcon.style.height = "24px";
    timerIcon.style.width = "24px";

    const timeElement = document.createElement("p");
    timeElement.style.fontSize = "18px";
    timeElement.style.margin = "0";
    timeElement.innerHTML = `${recipe.time} min`;
    
    const div2 = document.createElement("div");
    div2.setAttribute("class", "ingredientsAndDescription");
    const ingredientsElement = document.createElement("p");
    ingredientsElement.style.fontSize = "12px";
    ingredientsElement.setAttribute("class", "allIngredientsOfRecipe");
    for (const ingredients of recipe.ingredients) {
      const ingredientLine = ingredients.quantity ? `<b>${ingredients.ingredient}:</b> ${ingredients.quantity} ${ingredients.unit ?? ''}<br>` : `<b>${ingredients.ingredient}</b> ${ingredients.unit ?? ''}<br>`;
      ingredientsElement.innerHTML += ingredientLine;
    }
      
    const descriptionElement = document.createElement("p");
    descriptionElement.style.fontSize = "12px";
    descriptionElement.setAttribute("class", "descriptionOfRecipe")
    descriptionElement.innerHTML = `${recipe.description}`

    // On rattache la balise article a la section Fiches
    sectionRecipes.appendChild(articleElement);
    articleElement.appendChild(divImage);
    articleElement.appendChild(textContainer);
    textContainer.appendChild(div1);
    div1.appendChild(nomElement);
    div1.appendChild(div1Bis); 
    div1Bis.appendChild(timerIcon);
    div1Bis.appendChild(timeElement);
    textContainer.appendChild(div2);
    div2.appendChild(ingredientsElement);
    div2.appendChild(descriptionElement);
  }

  // Convertir les ensembles en tableaux pour continuer à travailler avec eux si nécessaire
  allIngredients = Array.from(uniqueIngredients);
  allUstensils = Array.from(uniqueUstensils);
  allAppliances = Array.from(uniqueAppliances);
  
  // update dropdowns with new options
  ingredientsTagsList.innerHTML = '';
  appareilsTagsList.innerHTML = '';
  ustensilsTagsList.innerHTML = '';
  displayIngredients()
  displayAppliances()
  displayUstensils()

  searchBar.value.toLowerCase();

  // Récupération de tous les articles
  const articles = document.querySelectorAll(".recipes-container article");

  // Récupération de l'élément HTML pour afficher l'erreur
  const errorArticles = document.querySelector(".recipes-error");
  const errorArticlesP = document.querySelector(".recipes-error-p");

  // Vérification si au moins un article est visible
  const anyVisibleArticle = Array.from(articles).some((article) => article.style.display !== "none"  );

  // Affichage ou masquage des éléments d'erreur
  if (anyVisibleArticle) {
    errorArticles.style.display = "none";
    errorArticlesP.style.display = "none";
  } else {
    errorArticles.style.display = "block";
    errorArticlesP.style.display = "flex";
  }
}

refreshRecipes()