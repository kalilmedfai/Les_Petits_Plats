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

    // Ajouter la classe spécifique en fonction de la classe de la div parente
    if (tagsList.classList.contains("ingredientsListTags")) {
      tagElement.classList.add("ingredientTag");
    } else if (tagsList.classList.contains("appareilsListTags")) {
      tagElement.classList.add("appareilTag");
    } else if (tagsList.classList.contains("ustensilsListTags")) {
      tagElement.classList.add("ustensilTag");
    }

    // Ajouter la balise à la section des tags
    tagsZone.appendChild(tagElement);

    // Masquer l'élément cliqué dans listOfTags
    clickedTag.style.display = "none";
  });
  
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
        }
        const tagListItem = document.createElement("li");
        tagListItem.textContent = tagText;
        tagListItem.className = `tag ${tagClass}`;
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
        const tagListItem = document.createElement("li");
        tagListItem.textContent = tagText;
        tagListItem.className = `tag ${tagClass}`;
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
        const tagListItem = document.createElement("li");
        tagListItem.textContent = tagText;
        tagListItem.className = `tag ${tagClass}`;
        tagListItem.style.display = "list-item";
        tagListItem.style.listStyleType = "none";
        ustensilsListTags.appendChild(tagListItem);
      }
  
      // Supprimer l'élément tag cliqué de tagsZone
      clickedTag.remove();


      /*// Tri des articles en fonction des balises affichées
      const visibleTags = Array.from(tagsZone.querySelectorAll(".tag")).map(tag => tag.textContent.toLowerCase());
  
      // Récupération de tous les articles
      const articles = document.querySelectorAll(".recipes-container article");
  
      // Parcours des articles
      for (let i = 0; i < articles.length; i++) {
        const article = articles[i];
  
        // Récupération du titre de l'article
        const title = article.querySelector(".titleOfRecipe").innerText.toLowerCase();
  
        // Récupération des ingrédients de l'article
        const ingredients = article.querySelector(".allIngredientsOfRecipe").innerText.toLowerCase();
  
        // Récupération de la description de l'article
        const description = article.querySelector(".descriptionOfRecipe").innerText.toLowerCase();
  
        // Vérification si l'article correspond aux balises affichées
        const isArticleVisible = visibleTags.some(tag => title.includes(tag) || ingredients.includes(tag) || description.includes(tag));
  
        // Affichage ou masquage de l'article en fonction de la correspondance
        article.style.display = isArticleVisible ? "block" : "none";
      }*/
    }
  });
   
  
}


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

console.log(inputAppareils)
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