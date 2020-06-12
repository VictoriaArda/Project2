$(document).ready(function() {
  // This file just does a GET request to figure out which user is logged in
  // and updates the HTML on the page
  $.get("/api/user_data").then(function(data) {
    $(".member-name").text(data.email);
  });

   //=================================================================
   var results = localStorage.getItem("data");
  
   if (results){
     createCardList(JSON.parse(results));
     
   } 
 
   // event listener added to button
   $("#submit").on("click", function(event) {
     event.preventDefault();
     
     // set value of input type text to variable
     var keywordSearch = $("#keyword-search").val();
     // if no text is entered in input element exit function
     if ($.trim(keywordSearch) == "") {
       return;
     }    
      // edamam url for api query
     var queryURL = "https://api.edamam.com/search?q=" + keywordSearch + "&app_id=7f7dc0e9&app_key=bc52a5ef84c7a218a85ce06b5f1e8925";
     
     $.ajax({
       url: queryURL,
       method: "GET"
     })
       .then(function(response) {
       //console.log(response);
       // response object saved to results array
       var results = response.hits;
       console.log(results);
       // if no result found in api write message
       if (results.length == 0) {
         $("#list-results").empty();
         var recipeDiv = $("<div>").addClass("card");        
         var cardBodyDiv = $("<div>").addClass("card-body text-center");
         var heading = $("<h3>").text("No results found. Try another search.");
         cardBodyDiv.append(heading);
       
         // append nested divs      
         recipeDiv.append(cardBodyDiv);
         $("#list-results").append(recipeDiv);
     
       } else {
         localStorage.clear();
         $("#list-results").empty();
         localStorage.setItem("data", JSON.stringify(results));
         
       
         createCardList(results);  
           
       }
     }); 
       
   });
 
   function createCardList(cardList){
      // Unique identifier for each icon
      var iconId = 0;     
 
     for (var i = 0; i < cardList.length; i++) {    
               
       // create div elements; add classes for styling
       var recipeDiv = $("<div>").addClass("col card jumbotron");
       recipeDiv.attr("style", "width:400px;padding:auto");        
       var cardBodyDiv = $("<div>").addClass("card-body");      
       
       var recipe = {
         title: cardList[i].recipe.label,
         image: cardList[i].recipe.image,
         ingredients: cardList[i].recipe.ingredientLines,
         link: cardList[i].recipe.url,
         source: cardList[i].recipe.source
       };
       // console.log(recipe.ingredients[1]);
 
       var ingredientList = "";
       recipe.ingredients.forEach(function(item){
         ingredientList += `<li>${item}</li>`;
       });
       //console.log(ingredientList);
       
       var htmlContent = $("<div>").html(`<img src="${recipe.image}" alt="meal"><h3>${recipe.title}</h3><ul><p>Ingredients: </p>${ingredientList}</ul><p><a href="${recipe.link}">View more</a></p><p style="display:inline"><em>Source: </em>${recipe.source}</p><a href="#">
       <input type="image" src="../public/assets/images/favicon.png" alt="icon image" data-id="${iconId++}" style="float: right" class="fav-icon"/>
       </a>`);
       //console.log(htmlContent);
       htmlContent.addClass("text-left")
       // append html to inner card div 
       cardBodyDiv.append(htmlContent);
       // append nested divs
       recipeDiv.append(cardBodyDiv);
 
       $("#list-results").append(recipeDiv); 
       
     } 
 
   }
   
   //button to clear local storage and refresh the page
   $("#clear").click(function() {
     localStorage.clear();
     $("#list-results").empty();   
   });
   //console.log(results);
    //=================================================================
     // Upon clicking an icon, send POST request to server with it's data
  $(".fav-icon").on("click", function() {
    // Store unique id of favorite icon
    var thisId = $(this).data("id");
    // console.log(thisId);
    // Object recipe stored
    var thisRecipe = ((JSON.parse(results)[thisId]).recipe); 
    console.log(thisRecipe.image);
    console.log(thisRecipe.label);
    console.log(thisRecipe.url);
    // Create favorite object to send to server
    var favorite = {
      image: thisRecipe.image,
      title: thisRecipe.label,
      url: thisRecipe.url 
    };
    // Send the POST request to server with favorite data
    $.ajax("/api/favorites", {
      type: "POST",
      data: favorite
    }).then(
      function() {
        console.log("Success in creating a new post");
      }
    );
  }); 
  //==================================================================== 
});