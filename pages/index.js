function AfficherRecettes() {

  // Affiche les recettes
  for (let i = 0; i < recipes.length; i++) {
    
    const article = recipes[i];
    // Récupération de l'élément du DOM qui accueillera les fiches
    const sectionRecipes = document.querySelector(".recipes-container");
    
    const articleElement = document.createElement("article");
    
    const divImage = document.createElement("div");
    divImage.setAttribute("class", "imgOfRecipe");

    const textContainer = document.createElement("div");
    textContainer.setAttribute("class", "textContainer");

    const div1 = document.createElement("div");
    const nomElement = document.createElement("h2");
    nomElement.style.fontSize = "18px";
    nomElement.setAttribute("class", "titleOfRecipe");
    nomElement.innerText = article.name;
    nomElement.style.margin = "0";
    const timeElement = document.createElement("p");
    timeElement.style.fontSize = "18px";
    timeElement.style.margin = "0";
    timeElement.innerHTML = `${article.time} min`;
    
    const div2 = document.createElement("div");
    const ingredientsElement = document.createElement("p");
    ingredientsElement.style.fontSize = "12px";
    ingredientsElement.setAttribute("class", "allIngredientsOfRecipe");
    for (const ingredients of article.ingredients) {
      ingredientsElement.innerHTML = ingredientsElement.innerHTML + `<b>${ingredients.ingredient ?? ''}:</b> ${ingredients.quantity ?? ''} ${ingredients.unit ?? ''}<br>`
    }
      
    const descriptionElement = document.createElement("p");
    descriptionElement.style.fontSize = "12px";
    descriptionElement.setAttribute("class", "descriptionOfRecipe")
    descriptionElement.innerHTML = `${article.description}`

    // On rattache la balise article a la section Fiches
    sectionRecipes.appendChild(articleElement);
    articleElement.appendChild(divImage);
    articleElement.appendChild(textContainer);
    textContainer.appendChild(div1);  
    div1.appendChild(nomElement);
    div1.appendChild(timeElement);
    textContainer.appendChild(div2);
    div2.appendChild(ingredientsElement);
    div2.appendChild(descriptionElement);
  }

}

AfficherRecettes()

// Trier les articles via la barre de recherche
const searchBar = document.getElementById('search');


// Ajout d'un événement "input" sur l'input
searchBar.addEventListener("input", function() {
  // Récupération de la valeur de l'input
  const searchValue = searchBar.value.toLowerCase();

  // Récupération de tous les articles
  const articles = document.querySelectorAll(".recipes-container article");

  // Parcours des articles
  for (let i = 0; i < articles.length; i++) {
    const article = articles[i];

    // Récupération du titre de l'article
    const title = article.querySelector(".titleOfRecipe").innerText.toLowerCase();

    // Récupération des ingredients de l'article
    const ingredients = article.querySelector(".allIngredientsOfRecipe").innerText.toLowerCase();

    // Récupération de la description des ingredients de l'article
    const description = article.querySelector(".descriptionOfRecipe").innerText.toLowerCase();

    // Vérification de la longueur de la chaîne de caractères, on affiche l'article
    if (searchBar.value.length < 3) {
      article.style.display = "block";
     }
    // Vérification de la longueur de la chaîne de caractères ET Si le titre OU la liste des ingrédient OU un mot/nombre de la description contient la valeur de recherche, on affiche l'article en question
    else if (searchBar.value.length >= 3 && (title.includes(searchValue) || ingredients.includes(searchValue) || description.includes(searchValue))){
      article.style.display = "block";
    }
    // Sinon on efface tout et on affiche l'erreur
    else {
      article.style.display = "none";
    }
  }

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

});


// Sélection des boutons et des listes de balises dans le DOM
let ingredientsBtn = document.querySelector(".ingredientsBtn");
let appareilsBtn = document.querySelector(".appareilsBtn");
let ustensilsBtn = document.querySelector(".ustensilsBtn");

// Création d'un tableau contenant les boutons
let buttons = [ingredientsBtn, appareilsBtn, ustensilsBtn];

// Déclaration de la variable tagsZone en dehors de la boucle for
let tagsZone = document.querySelector(".tags-zone");

// Boucle pour ajouter des écouteurs d'événements de clic à chaque bouton
for (let i = 0; i < buttons.length; i++) {
  let button = buttons[i];
  let label = button.querySelector(".labelBtn");
  let input = button.querySelector(".inputBtn");
  let tagsList = button.querySelector(".listOfTags");

  // Événement de clic sur le bouton
  button.addEventListener("click", function (event) {
    event.stopPropagation();
    // Ajout de la classe "active" pour mettre en surbrillance le bouton
    button.classList.add("active");
    // Masquer le texte du label
    label.style.display = "none";
    // Afficher le champ de saisie
    input.style.display = "block";
    input.focus();
    // Afficher la liste des balises
    tagsList.style.display = "grid";
    // Définir la largeur du bouton
    button.style.width = "468px";
  });

  // Événement de clic en dehors du bouton
  document.addEventListener("click", function (event) {
    let isClickedInside = button.contains(event.target);
    if (!isClickedInside) {
      // Supprimer la classe "active"
      button.classList.remove("active");
      // Afficher le texte du label
      label.style.display = "block";
      // Masquer le champ de saisie
      input.style.display = "none";
      // Masquer la liste des balises
      tagsList.style.display = "none";
      // Rétablir la largeur initiale du bouton
      button.style.width = "170px";
    }
  });

  // Événement de clic sur un élément de la liste des balises
  tagsList.addEventListener("click", function (event) {
    let clickedTag = event.target;
    let tagName = clickedTag.textContent;

    // Créer un élément de balise pour l'élément cliqué
    let tagElement = document.createElement("span");
    tagElement.textContent = tagName;
    tagElement.className = "tag";

    // Ajouter la balise à la section des tags
    tagsZone.appendChild(tagElement);

    // Supprimer l'élément cliqué de la liste des balises
    let index = -1;
    if (tagsList === ingredientsTagsList) {
      index = allIngredients.indexOf(tagName);
      if (index !== -1) {
        allIngredients.splice(index, 1); // Supprimer l'élément de la liste
      }
    } else if (tagsList === appareilsTagsList) {
      index = allAppliances.indexOf(tagName);
      if (index !== -1) {
        allAppliances.splice(index, 1); // Supprimer l'élément de la liste
      }
    } else if (tagsList === ustensilsTagsList) {
      index = allUstensils.indexOf(tagName);
      if (index !== -1) {
        allUstensils.splice(index, 1); // Supprimer l'élément de la liste
      }
    }

    clickedTag.remove(); // Supprimer l'élément du DOM
  });

  // Événement de clic sur un élément de la zone des tags
  tagsZone.addEventListener("click", function (event) {
    const clickedTag = event.target;

    // Vérification si l'élément cliqué est une balise <span> (tag)
    if (clickedTag.tagName === "SPAN") {
      clickedTag.remove(); // Supprimer l'élément du DOM
    }

    if (clickedTag.tagName === "LI") {
      // Vérifier si l'élément tag cliqué est déjà présent dans tags-zone
      const isTagSelected = tagsZone.contains(clickedTag);

      if (isTagSelected) {
        // Supprimer l'élément tag cliqué de tags-zone
        tagsZone.removeChild(clickedTag);
      } else {
        // Ajouter l'élément tag cliqué à tags-zone
        tagsZone.appendChild(clickedTag.cloneNode(true));
      }
    }
  });
}


// Tableaux pour stocker les ingrédients, les appareils et les ustensiles uniques
let allIngredients = [];
let allAppliances = [];
let allUstensils = [];

// Boucle pour extraire les ingrédients uniques des recettes
for (const recipe of recipes) {
  for (const ingredient of recipe.ingredients) {
    if (!allIngredients.includes(ingredient.ingredient)) {
      allIngredients.push(ingredient.ingredient);
    }
  }
}

// Boucle pour extraire les appareils uniques des recettes
for (const recipe of recipes) {
  const appliance = recipe.appliance;
  if (!allAppliances.includes(appliance)) {
    allAppliances.push(appliance);
  }
}

// Boucle pour extraire les ustensiles uniques des recettes
for (const recipe of recipes) {
  for (const ustensil of recipe.ustensils) {
    if (!allUstensils.includes(ustensil)) {
      allUstensils.push(ustensil);
    }
  }
}






// Sélection des listes de balises dans le DOM
ingredientsTagsList = document.querySelector(".ingredientsListTags");
appareilsTagsList = document.querySelector(".appareilsListTags");
ustensilsTagsList = document.querySelector(".ustensilsListTags");

// Boucle pour créer les balises d'ingrédients et les ajouter à la liste
for (let ingredient of allIngredients) {
  // Créez un élément de liste pour chaque ingrédient
  const li = document.createElement("li");
  li.textContent = ingredient;
  li.style.listStyleType = "none";

  // Ajoutez l'élément de liste à la liste d'ingrédients
  ingredientsTagsList.appendChild(li);
}

// Boucle pour créer les balises d'appareils et les ajouter à la liste
for (let appliance of allAppliances) {
  // Créez un élément de liste pour chaque ingrédient
  const li = document.createElement("li");
  li.textContent = appliance;
  li.style.listStyleType = "none";

  // Ajoutez l'élément de liste à la liste d'ingrédients
  appareilsTagsList.appendChild(li);
}

// Boucle pour créer les balises d'ustensiles et les ajouter à la liste
for (let ustensil of allUstensils) {
  // Créez un élément de liste pour chaque ingrédient
  const li = document.createElement("li");
  li.textContent = ustensil;
  li.style.listStyleType = "none";

  // Ajoutez l'élément de liste à la liste d'ingrédients
  ustensilsTagsList.appendChild(li);
}

// trier les listes dans les dropdowns

// Récupérer les éléments nécessaires du DOM
const input = document.querySelector(".inputBtn");

// Écouter l'événement "input" sur le champ de recherche
input.addEventListener("input", function(event) {
  // Récupérer la valeur saisie dans le champ de recherche
  const searchValue = event.target.value.toLowerCase();
  
  // Supprimer tous les éléments de la liste d'ingrédients
  ingredientsTagsList.innerHTML = "";

  // Filtrer les ingrédients correspondant à la recherche
  const filteredIngredients = allIngredients.filter(function(ingredient) {
    return ingredient.toLowerCase().includes(searchValue);
  });

  // Créer un élément de liste pour chaque ingrédient filtré
  for (let i = 0; i < filteredIngredients.length; i++) {
    const ingredient = filteredIngredients[i];
    const li = document.createElement("li");
    li.textContent = ingredient;
    li.style.listStyleType = "none";
    ingredientsTagsList.appendChild(li);
  }
});