var recipeMenu = document.querySelector('.recipe-menu');
var RecipeBtn = document.getElementById('add-recipe');

var recipeBox = document.querySelector('#addRecipeBox')
var recipeName = document.querySelector('#recipe-name');

var addRecipeForm = document.getElementById('addRecipeForm');

var markSign = document.querySelector('#close-sign');
var closeReciptBoxBtn = document.querySelector('.close');

var recipeHeading = document.getElementById('recipe-heading');

var addRecipeBtn = document.querySelector('.addRecipe');
var ingredents = document.getElementById("ingredents");

var description = document.getElementById('description');
var ingredentList = document.getElementById('recipe-ingredents');

var editTextIcon = document.getElementById('edit-text');
var recipeDirectionList = document.getElementById('recipe-direction');

var recipeData = [];

var recipeTextDiv = document.getElementById('recipe-text-div');
console.log(recipeTextDiv);

function renderData() {
    for (var i = 0; i < recipeData.length; i++) {
        nameList = document.createElement('li');
        nameList.textContent = recipeData[i].name;
        nameList.setAttribute("data-index", i);


        editIcon = document.createElement('i');
        editIcon.className = "fa fa-edit";
        editIcon.setAttribute('edit-index', i);
        editIcon.id = "editBtn";

        deleteIcon = document.createElement('i');
        deleteIcon.className = "fa fa-trash";
        deleteIcon.setAttribute('delete-index', i);
        deleteIcon.id = "deleteBtn";


        recipeMenu.appendChild(nameList);

        recipeTextDiv.appendChild(deleteIcon);
        recipeTextDiv.appendChild(editIcon);


    }
}

function addRecipe() {
    recipeMenu.innerHTML = "";
    recipeTextDiv.innerHTML = "";

    if (recipeName.value == "" || ingredents.value == "" || description.value == "") {
        alert("please add the value in empty boxs");
        return;
    }

    recipeTextDiv.innerHTML = "";
    var dataObject = {};
    dataObject.name = recipeName.value;
    dataObject.ingredents = ingredents.value;
    dataObject.description = description.value;
    recipeData.push(dataObject);
    renderData();
    removeClass();
    addRecipeForm.reset();
    console.log(recipeData);
}





function getRecipe(e) {
    ingredentList.innerHTML = "";
    recipeDirectionList.innerHTML = "";

    if (e.target.nodeName == "LI") {
        var dataIndex = e.target.getAttribute('data-index');
        var recipes = recipeData[dataIndex];
        recipeHeading.textContent = recipes.name;
        var ingredentsLi = document.createElement('li');
        ingredentsLi.textContent = recipes.ingredents;

        var descriptionLi = document.createElement('li');
        descriptionLi.textContent = recipes.description;

        ingredentList.appendChild(ingredentsLi);
        recipeDirectionList.appendChild(descriptionLi);
    } else {
        return;
    }


}


function editRecipeText(e) {
    var editIconIndex = e.target.getAttribute('edit-index');
    console.log(editIconIndex);
}


recipeTextDiv.addEventListener("click", editRecipeText);


function addClass() {
    recipeBox.classList.add('active');
}

function removeClass() {
    recipeBox.classList.remove('active');
}




markSign.addEventListener("click", removeClass);
addRecipeBtn.addEventListener("click", addRecipe);
closeReciptBoxBtn.addEventListener("click", removeClass);
RecipeBtn.addEventListener("click", addClass);
recipeMenu.addEventListener("click", getRecipe);