var addRecipeButton = document.querySelector("#newRecipeBtn");
var addRecipeForm = document.querySelector(".addRecipeForm");

var recipeForm = document.querySelector("#recipeForm");
var UpdateRecipeForm = document.querySelector("#UpdateRecipeForm");

var addRecipeContainer = document.querySelector(".add-recipe-container");
var recipeApp = document.querySelector(".recipe-app");
// getting the parent of ul menu

var addRecipeContainer = document.querySelector(".add-recipe-container");
var updateRecipeContainer = document.querySelector(".update-recipe-container");

// confirm meessage box
var closeBtn = document.querySelector(".closeBtn");
var closeupdateButton = document.querySelector(".upDateCloseBtn");

var confirmBox = document.querySelector(".confirmBox");

var recipeData = JSON.parse(localStorage.getItem("itemName")) || [];

function setToLocalStorage(dataIndex) {
  localStorage.setItem("itemName", JSON.stringify(recipeData));
  localStorage.removeItem(dataIndex.name);
}

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
    divIcon.addEventListener("click", getEditIndex);
  }
}

function addRecipe(e) {
  recipeApp.innerHTML = "";
  e.preventDefault();

  var dataObject = {};
  dataObject.name = recipeName.value;
  dataObject.ingredent = ingredentsName.value;
  dataObject.direction = directionName.value;
  recipeData.push(dataObject);

  addRecipeForm.style.display = "none";
  addRecipeButton.style.display = "block";
  recipeForm.reset();
  localStorage.setItem("itemName", JSON.stringify(recipeData));
  rederRecipeData();
}

function addRecipeClass() {
  addRecipeButton.style.display = "none";
  addRecipeForm.style.display = "block";
}

function showUpdateRecipeForm() {
  updateRecipeContainer.style.display = "block";
  addRecipeContainer.style.display = "none";
}

function removeRecipeBox(e) {
  if (e.target.id === "deleteMe") {
    var deletIndex = e.target.getAttribute("delete-index");
    var dataIndex = recipeData[deletIndex];
    console.log(dataIndex.name);
    var confirmMessage = confirm(
      `Do you really want to delete this ${
        dataIndex.name
      } from your recipe box list ?`
    );

    if (confirmMessage === true) {
      recipeData.splice(deletIndex, 1);
      recipeApp.removeChild(recipeApp.childNodes[deletIndex]);
      confirmBox.innerHTML = `<p>Successfully deleted ${dataIndex.name}</p>`;
      setToLocalStorage(dataIndex);
      recipeApp.innerHTML = "";
      rederRecipeData();
      confirmBox.style.display = "block";
      setTimeout(function() {
        confirmBox.style.display = "none";
      }, 3000);

    }
  }
}

var saveButton = document.getElementById("saveButton");
var UpdateRecipeName = document.getElementById("UpdateRecipeName");
var UpdateIngredentsName = document.getElementById("UpdateIngredentsName");
var UpdateDirectionName = document.getElementById("UpdateDirectionName");

function getEditIndex(e) {
  if (e.target.id === "editMe") {
    updateIndex = e.target.getAttribute("edit-index");
    updateDataIndex = recipeData[updateIndex];
    console.log(updateDataIndex);
    showUpdateRecipeForm();
  }
}

function updateRecipeDate(e) {
  recipeApp.innerHTML = "";
  e.preventDefault();
  updateDataIndex.name = UpdateRecipeName.value;
  updateDataIndex.ingredent = UpdateIngredentsName.value;

  updateDataIndex.direction = UpdateDirectionName.value;
  updateRecipeContainer.style.display = "none";
  addRecipeContainer.style.display = "block";
  rederRecipeData();
  setToLocalStorage(updateIndex);
  UpdateRecipeForm.reset();
}

addRecipeButton.addEventListener("click", addRecipeClass);
recipeForm.addEventListener("submit", addRecipe);
rederRecipeData();

saveButton.addEventListener("click", updateRecipeDate);

closeBtn.addEventListener("click", function() {
  addRecipeForm.style.display = "none";
  addRecipeButton.style.display = "block";
});

closeupdateButton.addEventListener("click", function() {
  updateRecipeContainer.style.display = "none";
  addRecipeContainer.style.display = "block";
});
