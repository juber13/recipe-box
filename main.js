var addRecipeButton = document.querySelector("#newRecipeBtn");
var addRecipeForm = document.querySelector(".addRecipeForm");
var recipeForm = document.querySelector("#recipeForm");

var addRecipeContainer = document.querySelector(".add-recipe-container");
var recipeApp = document.querySelector(".recipe-app");
// getting the parent of ul menu

// confirm meessage box

var confirmBox = document.querySelector(".confirmBox");

var recipeData = [];

function rederRecipeData() {
  for (var i = 0; i < recipeData.length; i++) {
    var div = document.createElement("div");
    div.className = "card-1";

    var heading = document.createElement("div");
    heading.className = "heading";
    var recipeHeading = document.createElement("h2");
    recipeHeading.textContent = recipeData[i].name;
    heading.appendChild(recipeHeading);

    var ingredentDiv = document.createElement("div");
    ingredentDiv.className = "ingredent-div";
    var ingredentHeading = document.createElement("p");
    ingredentHeading.textContent = "Ingredents";

    var ingredentsMenu = document.createElement("ul");
    var ingredentsList = document.createElement("li");
    ingredentsList.textContent = recipeData[i].ingredent;
    ingredentsMenu.appendChild(ingredentsList);

    ingredentDiv.appendChild(ingredentHeading);
    ingredentDiv.appendChild(ingredentsMenu);

    var directionDiv = document.createElement("div");
    directionDiv.className = "direction-div";
    var directionHeading = document.createElement("p");
    directionHeading.textContent = "Direction";

    var directionMenu = document.createElement("ul");
    var directionList = document.createElement("li");
    directionList.textContent = recipeData[i].direction;
    directionMenu.appendChild(directionList);

    directionDiv.appendChild(directionHeading);
    directionDiv.appendChild(directionMenu);

    var divIcon = document.createElement("div");
    divIcon.className = "iconDiv";

    var editIcon = document.createElement("i");
    editIcon.className = "fa fa-edit";
    editIcon.id = "editMe";
    editIcon.setAttribute("edit-index", i);

    deleteIcon = document.createElement("i");
    deleteIcon.className = "fa fa-trash";
    deleteIcon.id = "deleteMe";
    deleteIcon.setAttribute("delete-index", i);

    divIcon.appendChild(editIcon);
    divIcon.appendChild(deleteIcon);

    div.appendChild(heading);
    div.appendChild(ingredentDiv);
    div.appendChild(directionDiv);
    div.appendChild(divIcon);

    recipeApp.appendChild(div);
    divIcon.addEventListener("click", removeRecipeBox);
  }
}

function addRecipe(e) {
  recipeApp.innerHTML = "";
  e.preventDefault();

  if (
    recipeName.value == "" ||
    ingredentsName.value == "" ||
    directionName.value == ""
  ) {
    alert("fille fill up these recipe boxes");
    return;
  }

  var dataObject = {};
  dataObject.name = recipeName.value;
  dataObject.ingredent = ingredentsName.value;
  dataObject.direction = directionName.value;
  recipeData.push(dataObject);

  addRecipeForm.style.display = "none";
  addRecipeButton.style.display = "block";
  rederRecipeData();
}

function addRecipeClass() {
  addRecipeButton.style.display = "none";
  addRecipeForm.style.display = "block";
}

function removeRecipeBox(e) {
  if (e.target.id === "deleteMe") {
    var deletIndex = e.target.getAttribute("delete-index");
    var dataIndex = recipeData[deletIndex];
    var confirmMessage = confirm(
      `Do you really want to delete this ${
        dataIndex.name
      } from your recipe box list ?`
    );

    if (confirmMessage === true) {
      recipeData.splice(deletIndex, 1);
      recipeApp.removeChild(recipeApp.childNodes[deletIndex]);
      confirmBox.innerHTML = `<p>Successfully deleted ${dataIndex.name}</p>`;
      recipeApp.innerHTML = "";
      rederRecipeData();
      confirmBox.style.display = "block";

      setTimeout(function () {
        confirmBox.style.display = "none";
      }, 3000);

      console.log(dataIndex);
    } else {
      if (e.target.id === "editMe") {
        console.log("yes I am matching");
      } else {
        return;
      }
    }
  }
}
addRecipeButton.addEventListener("click", addRecipeClass);
recipeForm.addEventListener("submit", addRecipe);