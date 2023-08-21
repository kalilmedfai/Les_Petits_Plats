// Trier les articles via la barre de recherche
const searchBar = document.getElementById('search');

let searchedValue = '';

// Ajout d'un événement "input" sur l'input
searchBar.addEventListener("input", function() {
  // Récupération de la valeur de l'input
  searchedValue = searchBar.value.toLowerCase();
  refreshRecipes()
});