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