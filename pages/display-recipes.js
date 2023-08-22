function AfficherRecettes() {
  // Récupération de l'élément du DOM qui accueillera les fiches
  const sectionRecipes = document.querySelector(".recipes-container");

  // Affiche les recettes
  normalizedRecipes.forEach(article => {
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
    nomElement.innerText = article.name;
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
    timeElement.innerHTML = `${article.time} min`;

    const div2 = document.createElement("div");
    div2.setAttribute("class", "ingredientsAndDescription");
    const ingredientsElement = document.createElement("p");
    ingredientsElement.style.fontSize = "12px";
    ingredientsElement.setAttribute("class", "allIngredientsOfRecipe");

    article.ingredients.forEach(ingredients => {
      const ingredientLine = ingredients.quantity
        ? `<b>${ingredients.ingredient}:</b> ${ingredients.quantity} ${ingredients.unit ?? ''}<br>`
        : `<b>${ingredients.ingredient}</b> ${ingredients.unit ?? ''}<br>`;
      ingredientsElement.innerHTML += ingredientLine;
    });

    const descriptionElement = document.createElement("p");
    descriptionElement.style.fontSize = "12px";
    descriptionElement.setAttribute("class", "descriptionOfRecipe");
    descriptionElement.innerHTML = `${article.description}`;

    // On rattache la balise article à la section Fiches
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
  });
}

AfficherRecettes();