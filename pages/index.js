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
    for (const ingredients of article.ingredients) {
      const ingredientLine = ingredients.quantity ? `<b>${ingredients.ingredient}:</b> ${ingredients.quantity} ${ingredients.unit ?? ''}<br>` : `<b>${ingredients.ingredient}</b> ${ingredients.unit ?? ''}<br>`;
      ingredientsElement.innerHTML += ingredientLine;
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
    div1.appendChild(div1Bis); 
    div1Bis.appendChild(timerIcon);
    div1Bis.appendChild(timeElement);
    textContainer.appendChild(div2);
    div2.appendChild(ingredientsElement);
    div2.appendChild(descriptionElement);
  }

}

AfficherRecettes()

// Trier les articles via la barre de recherche
const searchBar = document.getElementById('search');

let matchingRecipes = [];

const selectedIngredients = [];
const selectedApparels = [];
const selectedUtensils = [];
let searchedValue = '';

// Ajout d'un événement "input" sur l'input
searchBar.addEventListener("input", function() {
  // Récupération de la valeur de l'input
  searchedValue = searchBar.value.toLowerCase();
  refreshRecipes()
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

    // Créer un élément de balise pour l'élément cliqué (tag)
    let tagElement = document.createElement("span");
    tagElement.textContent = tagName;
    tagElement.className = "tag";
    const closeIcon = document.createElement("img")
    closeIcon.setAttribute("src", "assets/Logo/icons8-close-64.png");
    tagElement.appendChild(closeIcon)

    // Ajouter la classe spécifique en fonction de la classe de la div parente
    if (tagsList.classList.contains("ingredientsListTags")) {
      tagElement.classList.add("ingredientTag")
      selectedIngredients.push(tagName) // ajouter ingrédient à la liste des ingrédients séléctionnés
      console.log(selectedIngredients)
    } else if (tagsList.classList.contains("appareilsListTags")) {
      tagElement.classList.add("appareilTag")
      selectedApparels.push(tagName) // ajouter appareil à la liste des appareils séléctionnés
      console.log(selectedApparels)
    } else if (tagsList.classList.contains("ustensilsListTags")) {
      tagElement.classList.add("ustensilTag")
      selectedUtensils.push(tagName) // ajouter ustensil à la liste des ustensils séléctionnés
      console.log(selectedUtensils)
    }

    // Ajouter la balise à la section des tags
    tagsZone.appendChild(tagElement);


    // Masquer l'élément cliqué dans listOfTags
    clickedTag.remove()

    refreshRecipes()
  });
  
  // Événement de clic sur un tag
  tagsZone.addEventListener("click", function (event) {
    const clickedTag = event.target;
  
    // Vérification si l'élément cliqué est une balise <span> (tag)
    if (clickedTag.tagName === "SPAN") {
      const tagText = clickedTag.textContent;
      const tagClass = clickedTag.classList[1]; // Récupérer la deuxième classe du span
  
      // Vérifier la classe du tag pour le réinsérer dans la div correspondante
      if (tagClass === "ingredientTag") {
        const ingredientsListTags = document.querySelector(".ingredientsListTags");
        const existingLi = ingredientsListTags.querySelector(`li.${tagClass}`);
        if (existingLi) {
          existingLi.style.display = "block";
          existingLi.style.listStyleType = "none";
          ingredientsListTags.removeChild(existingLi);
          console.log(selectedIngredients)
        }
        // supprimer l'ingrédient de l'array selectedIngredients
        for (let i = selectedIngredients.length - 1; i >= 0; i--) {
          if (tagText === selectedIngredients[i]) {
            selectedIngredients.splice(i, 1);
          }
        }
        // recréer l'élément de la liste dans la liste des ingrédients
        const tagListItem = document.createElement("li");
        tagListItem.textContent = tagText;
        tagListItem.style.display = "list-item";
        tagListItem.style.listStyleType = "none";
        ingredientsListTags.appendChild(tagListItem);
      } else if (tagClass === "appareilTag") {
        const appareilsListTags = document.querySelector(".appareilsListTags");
        const existingLi = appareilsListTags.querySelector(`li.${tagClass}`);
        if (existingLi) {
          existingLi.style.display = "block";
          existingLi.style.listStyleType = "none";
          appareilsListTags.removeChild(existingLi);
        }
        // supprimer l'appareil de l'array selectedApparels
        for (let i = selectedApparels.length - 1; i >= 0; i--) {
          if (tagText === selectedApparels[i]) {
            selectedApparels.splice(i, 1);
          }
        }
        // recréer l'élément de la liste dans la liste des appareils
        const tagListItem = document.createElement("li");
        tagListItem.textContent = tagText;
        tagListItem.style.display = "list-item";
        tagListItem.style.listStyleType = "none";
        appareilsListTags.appendChild(tagListItem);
      } else if (tagClass === "ustensilTag") {
        const ustensilsListTags = document.querySelector(".ustensilsListTags");
        const existingLi = ustensilsListTags.querySelector(`li.${tagClass}`);
        if (existingLi) {
          existingLi.style.display = "block";
          existingLi.style.listStyleType = "none";
          ustensilsListTags.removeChild(existingLi);
        }
        // supprimer l'ustensil de l'array selectedUstensils
        for (let i = selectedUtensils.length - 1; i >= 0; i--) {
          if (tagText === selectedUtensils[i]) {
            selectedUtensils.splice(i, 1);
          }
        }
        // recréer l'élément de la liste dans la liste des ustensils
        const tagListItem = document.createElement("li");
        tagListItem.textContent = tagText;
        tagListItem.style.display = "list-item";
        tagListItem.style.listStyleType = "none";
        ustensilsListTags.appendChild(tagListItem);
      }
  
      // Supprimer l'élément tag cliqué de tagsZone
      clickedTag.remove();

      refreshRecipes()
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

const ingredientsTagsList = document.querySelector(".ingredientsListTags");
const appareilsTagsList = document.querySelector(".appareilsListTags");
const ustensilsTagsList = document.querySelector(".ustensilsListTags");

function displayIngredients() {
  // Boucle pour créer les balises d'ingrédients et les ajouter à la liste
  for (let ingredient of allIngredients) {
    // Créez un élément de liste pour chaque ingrédient
    const li = document.createElement("li");
    li.textContent = ingredient;
    li.style.listStyleType = "none";

    // Ajoutez l'élément de liste à la liste d'ingrédients
    ingredientsTagsList.appendChild(li);
  }
}

function displayAppliances() {
  // Boucle pour créer les balises d'appareils et les ajouter à la liste
  for (let appliance of allAppliances) {
    // Créez un élément de liste pour chaque appareil
    const li = document.createElement("li");
    li.textContent = appliance;
    li.style.listStyleType = "none";

    // Ajoutez l'élément de liste à la liste d'appareils
    appareilsTagsList.appendChild(li);
  }
}

function displayUstensils() {
  // Boucle pour créer les balises d'ustensiles et les ajouter à la liste
  for (let ustensil of allUstensils) {
    // Créez un élément de liste pour chaque ustensile
    const li = document.createElement("li");
    li.textContent = ustensil;
    li.style.listStyleType = "none";

    // Ajoutez l'élément de liste à la liste d'ustensiles
    ustensilsTagsList.appendChild(li);
  }
}

displayIngredients()
displayAppliances()
displayUstensils()

// Sélection des listes de balises dans le DOM


// Récupérer les éléments nécessaires du DOM
const inputIngredients = ingredientsBtn.querySelector("input");
const inputAppareils = appareilsBtn.querySelector("input");
const inputUstensils = ustensilsBtn.querySelector("input");


// Écouter l'événement "input" sur le champ de recherche d'ingrédients
inputIngredients.addEventListener("input", function(event) {
  // Récupérer la valeur saisie dans le champ de recherche d'ingrédients
  const searchValue = event.target.value.toLowerCase();

  // Récupérer tous les éléments li dans ingredientsTagsList
  const liElements = ingredientsTagsList.querySelectorAll("li");

  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  liElements.forEach(function(li) {
    const ingredient = li.textContent.toLowerCase();
    if (ingredient.startsWith(searchValue)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
  });
});

// Écouter l'événement "input" sur le champ de recherche d'appareils
inputAppareils.addEventListener("input", function(event) {
  // Récupérer la valeur saisie dans le champ de recherche d'appareils
  const searchValue = event.target.value.toLowerCase();

  // Récupérer tous les éléments li dans appareilsTagsList
  const liElements = appareilsTagsList.querySelectorAll("li");
  
  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  liElements.forEach(function(li) {
    const appareil = li.textContent.toLowerCase();
    if (appareil.startsWith(searchValue)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
  });
});

// Écouter l'événement "input" sur le champ de recherche d'ustensiles
inputUstensils.addEventListener("input", function(event) {
  // Récupérer la valeur saisie dans le champ de recherche d'ustensiles
  const searchValue = event.target.value.toLowerCase();

  // Récupérer tous les éléments li dans ustensilsTagsList
  const liElements = ustensilsTagsList.querySelectorAll("li");

  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  liElements.forEach(function(li) {
    const ustensil = li.textContent.toLowerCase();
    if (ustensil.startsWith(searchValue)) {
      li.style.display = "list-item";
    } else {
      li.style.display = "none";
    }
  });
});

// fonction permettant de rafraîchir 
function refreshRecipes() {
  const hasFilterCriterias = searchedValue || selectedIngredients.length || selectedUtensils.length || selectedApparels.length

    matchingRecipes = !hasFilterCriterias ? recipes : recipes.filter((recipe) =>
    { 
      return (
        (
          // si searchValue vide ou caractères inférieur à 3
          (searchedValue === '' || searchedValue.length < 3) ||
            (searchedValue !== '' && (recipe.name.includes(searchedValue) || recipe.description.includes(searchedValue)))
        ) &&
        (
          selectedIngredients.length === 0 ||
            (selectedIngredients.length > 0 && recipe.ingredients.find( ingredient => selectedIngredients.includes(ingredient.ingredient)))
        ) &&
        (
          selectedUtensils.length === 0 ||
            (selectedUtensils.length > 0 && recipe.ustensils.find(ustensil => selectedUtensils.includes(ustensil))) 
        ) &&
        (
          selectedApparels.length === 0 ||
            (selectedApparels.length > 0 && selectedApparels.includes(recipe.appliance))
        )
      )
    })

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

  console.log(anyVisibleArticle)
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