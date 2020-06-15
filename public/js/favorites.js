$(document).ready(function() {

    var favorites = []; 
  
    function getFavorites() {
      
      $.get("/api/user_data").then(function(data) {
          var id = data.id;
         
          $.get('/api/favorites/' + id).then(function(data) {
              console.log(data);
              renderFavorites(data);
          });
      });
    }
  
      // Saves favorite recipe data to array &   
  
    function renderFavorites(data) {
      data.forEach(function(item) {
        var favorite = {
          image: item.image,
          title: item.title,
          url: item.url
        }
        favorites.push(favorite);
  
      });
      console.log(favorites);
  
      if (favorites.length == 0) {
        $('.favorite-container').empty();
        var recipeDiv = $('<div>').addClass('card');
        var cardBodyDiv = $('<div>').addClass('card-body text-center');
        var heading = $('<h3>').text('No results found. Try another search.');
        cardBodyDiv.append(heading);
  
        // append nested divs
        recipeDiv.append(cardBodyDiv);
        $('.favorite-container').append(recipeDiv);
  
      } else {
        $('.favorite-container').empty();
  
        createCardList(favorites);
  
      }
    }
  
    // Creates a card for each favorite recipe
  
    function createCardList(cardList){    
  
     for (var i = 0; i < cardList.length; i++) {    
               
       // create div elements; add classes for styling
       var recipeDiv = $("<div>").addClass("col card jumbotron");
       recipeDiv.attr("style", "width:400px;padding:auto");        
       var cardBodyDiv = $("<div>").addClass("card-body");      
       
       var favs = {
          image: favorites[i].image,  
          title: favorites[i].title,       
          url: favorites[i].url
       };
       console.log(favs);
       var htmlContent = $("<div>").html(`<img src="${favs.image}" alt="meal"><h3>${favs.title}</h3><p><a href="${favs.url}">View more</a></p>`);
       //console.log(htmlContent);
       htmlContent.addClass("text-left")
       // append html to inner card div 
       cardBodyDiv.append(htmlContent);
       // append nested divs
       recipeDiv.append(cardBodyDiv);
  
       $(".favorite-container").append(recipeDiv); 
       
     }
  
   }
  
    getFavorites();
  
  });