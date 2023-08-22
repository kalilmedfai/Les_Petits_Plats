const selectedIngredients = [];
const selectedApparels = [];
const selectedUtensils = [];

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
}

// Événement de clic sur un tag
tagsZone.addEventListener("click", function (event) {
    event.stopPropagation()
    const clickedTag = event.target;
  
    // Vérification si l'élément cliqué est une balise <img>
    if (clickedTag.tagName === "IMG" && clickedTag.parentElement.tagName === "SPAN") {
      const parentSpan = clickedTag.parentElement;
  
      // Récupérer le texte et la classe du tag
      const tagText = parentSpan.textContent;
      const tagClass = parentSpan.classList[1];
  
      // Récupérer la liste des balises appropriée
      const tagList = tagClass === "ingredientTag" ? ingredientsTagsList :
        (tagClass === "appareilTag" ? appareilsTagsList : ustensilsTagsList);
  
      // Recréer l'élément de la liste dans la liste appropriée
      const tagListItem = document.createElement("li");
      tagListItem.textContent = tagText;
      tagListItem.style.display = "list-item";
      tagListItem.style.listStyleType = "none";
      tagList.appendChild(tagListItem);
  
      // Supprimer l'élément tag cliqué de tagsZone
      parentSpan.remove();

      const selectedList = tagClass === "ingredientTag" ? selectedIngredients : 
        (tagClass === "appareilTag" ? selectedApparels : selectedUtensils)
      
        const position = selectedList.indexOf(tagText)
        selectedList.splice(position, 1)
      
  
      refreshRecipes();
    }
});
   
  /*
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
  */
  

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
  for (let i = 0; i < liElements.length; i++) {
    const li = liElements[i];
    const ingredient = li.textContent.toLowerCase();
    const displayStyle = ingredient.startsWith(searchValue) ? "list-item" : "none";
    li.style.display = displayStyle;
  }  
});

// Écouter l'événement "input" sur le champ de recherche d'appareils
inputAppareils.addEventListener("input", function(event) {
  // Récupérer la valeur saisie dans le champ de recherche d'appareils
  const searchValue = event.target.value.toLowerCase();

  // Récupérer tous les éléments li dans appareilsTagsList
  const liElements = appareilsTagsList.querySelectorAll("li");
  
  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  for (let i = 0; i < liElements.length; i++) {
    const li = liElements[i];
    const appareil = li.textContent.toLowerCase();
    const displayStyle = appareil.startsWith(searchValue) ? "list-item" : "none";
    li.style.display = displayStyle;
  }  
});

// Écouter l'événement "input" sur le champ de recherche d'ustensiles
inputUstensils.addEventListener("input", function(event) {
  // Récupérer la valeur saisie dans le champ de recherche d'ustensiles
  const searchValue = event.target.value.toLowerCase();

  // Récupérer tous les éléments li dans ustensilsTagsList
  const liElements = ustensilsTagsList.querySelectorAll("li");

  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  for (let i = 0; i < liElements.length; i++) {
    const li = liElements[i];
    const ustensil = li.textContent.toLowerCase();
    const displayStyle = ustensil.startsWith(searchValue) ? "list-item" : "none";
    li.style.display = displayStyle;
  }  
});