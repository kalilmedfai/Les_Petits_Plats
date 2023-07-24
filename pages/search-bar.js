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