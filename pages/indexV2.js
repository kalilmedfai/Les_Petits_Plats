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