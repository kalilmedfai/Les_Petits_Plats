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

buttons.forEach(button => {
  const label = button.querySelector(".labelBtn");
  const input = button.querySelector(".inputBtn");
  const tagsList = button.querySelector(".listOfTags");

  button.addEventListener("click", function (event) {
    event.stopPropagation();
    button.classList.add("active");
    label.style.display = "none";
    input.style.display = "block";
    input.focus();
    tagsList.style.display = "grid";
    button.style.width = "468px";
  });

  document.addEventListener("click", function (event) {
    const isClickedInside = button.contains(event.target);
    if (!isClickedInside) {
      button.classList.remove("active");
      label.style.display = "block";
      input.style.display = "none";
      tagsList.style.display = "none";
      button.style.width = "170px";
    }
  });

  tagsList.addEventListener("click", function (event) {
    const clickedTag = event.target;
    const tagName = clickedTag.textContent;

    const tagElement = document.createElement("span");
    tagElement.textContent = tagName;
    tagElement.className = "tag";
    const closeIcon = document.createElement("img");
    closeIcon.setAttribute("src", "assets/Logo/icons8-close-64.png");
    tagElement.appendChild(closeIcon);

    if (tagsList.classList.contains("ingredientsListTags")) {
      tagElement.classList.add("ingredientTag");
      selectedIngredients.push(tagName);
    } else if (tagsList.classList.contains("appareilsListTags")) {
      tagElement.classList.add("appareilTag");
      selectedApparels.push(tagName);
    } else if (tagsList.classList.contains("ustensilsListTags")) {
      tagElement.classList.add("ustensilTag");
      selectedUtensils.push(tagName);
    }

    tagsZone.appendChild(tagElement);
    clickedTag.remove();
    refreshRecipes();
  });
});

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
normalizedRecipes.forEach(recipe => {
  recipe.ingredients.forEach(ingredient => {
    if (!allIngredients.includes(ingredient.ingredient)) {
      allIngredients.push(ingredient.ingredient);
    }
  });
});

// Boucle pour extraire les appareils uniques des recettes
normalizedRecipes.forEach(recipe => {
  const appliance = recipe.appliance;
  if (!allAppliances.includes(appliance)) {
    allAppliances.push(appliance);
  }
});

// Boucle pour extraire les ustensiles uniques des recettes
normalizedRecipes.forEach(recipe => {
  recipe.ustensils.forEach(ustensil => {
    if (!allUstensils.includes(ustensil)) {
      allUstensils.push(ustensil);
    }
  });
});

const ingredientsTagsList = document.querySelector(".ingredientsListTags");
const appareilsTagsList = document.querySelector(".appareilsListTags");
const ustensilsTagsList = document.querySelector(".ustensilsListTags");

function displayIngredients() {
  // Utilisation de forEach pour afficher les balises d'ingrédients dans la liste
  allIngredients.forEach(ingredient => {
    // Créez un élément de liste pour chaque ingrédient
    const li = document.createElement("li");
    li.textContent = ingredient;
    li.style.listStyleType = "none";

    // Ajoutez l'élément de liste à la liste d'ingrédients
    ingredientsTagsList.appendChild(li);
  });
}

function displayAppliances() {
  // Utilisation de forEach pour afficher les balises d'appareils dans la liste
  allAppliances.forEach(appliance => {
    // Créez un élément de liste pour chaque appareil
    const li = document.createElement("li");
    li.textContent = appliance;
    li.style.listStyleType = "none";

    // Ajoutez l'élément de liste à la liste d'appareils
    appareilsTagsList.appendChild(li);
  });
}

function displayUstensils() {
  // Utilisation de forEach pour afficher les balises d'ustensiles dans la liste
  allUstensils.forEach(ustensil => {
    // Créez un élément de liste pour chaque ustensile
    const li = document.createElement("li");
    li.textContent = ustensil;
    li.style.listStyleType = "none";

    // Ajoutez l'élément de liste à la liste d'ustensiles
    ustensilsTagsList.appendChild(li);
  });
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
inputIngredients.addEventListener("input", function (event) {
  // Récupérer la valeur saisie dans le champ de recherche d'ingrédients
  const searchValue = event.target.value.toLowerCase();
  // Récupérer tous les éléments li dans ingredientsTagsList
  const liElements = ingredientsTagsList.querySelectorAll("li");

  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  liElements.forEach(li => {
    const ingredient = li.textContent.toLowerCase();
    const displayStyle = ingredient.startsWith(searchValue) ? "list-item" : "none";
    li.style.display = displayStyle;
  });
});

// Écouter l'événement "input" sur le champ de recherche d'appareils
inputAppareils.addEventListener("input", function (event) {
  // Récupérer la valeur saisie dans le champ de recherche d'appareils
  const searchValue = event.target.value.toLowerCase();
  // Récupérer tous les éléments li dans appareilsTagsList
  const liElements = appareilsTagsList.querySelectorAll("li");

  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  liElements.forEach(li => {
    const appareil = li.textContent.toLowerCase();
    const displayStyle = appareil.startsWith(searchValue) ? "list-item" : "none";
    li.style.display = displayStyle;
  });
});

// Écouter l'événement "input" sur le champ de recherche d'ustensiles
inputUstensils.addEventListener("input", function (event) {
  // Récupérer la valeur saisie dans le champ de recherche d'ustensiles
  const searchValue = event.target.value.toLowerCase();
  // Récupérer tous les éléments li dans ustensilsTagsList
  const liElements = ustensilsTagsList.querySelectorAll("li");

  // Parcourir tous les éléments li et les afficher ou les masquer en fonction de la correspondance avec la valeur de recherche
  liElements.forEach(li => {
    const ustensil = li.textContent.toLowerCase();
    const displayStyle = ustensil.startsWith(searchValue) ? "list-item" : "none";
    li.style.display = displayStyle;
  });
});