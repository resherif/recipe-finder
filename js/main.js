let recipes = document.getElementsByClassName("recipes")[0]


document.addEventListener("DOMContentLoaded", function () {
    let apiLink = "https://www.themealdb.com/api/json/v1/1/random.php";
    recipes.innerHTML = "";
    for (let i = 0; i < 8; i++) {
        fetch(apiLink).then(res => res.json()).then(res => {
            console.log(res);
            recipes.innerHTML += `<div class="recipe-card" data-id="${res.meals[0].idMeal}">
        <img src="${res.meals[0].strMealThumb}">
        <h5>${res.meals[0].strMeal}</h5>
        <p>${res.meals[0].strCategory}</p>
        <button class="btn btn-details">See Details</button>
        </div>`

        })
            .then(() => {
                let btn = document.querySelectorAll(".btn-details");
                console.log(btn);
                btn.forEach(button => {
                    button.addEventListener("click", function () {
                        let mealId = this.parentElement.getAttribute("data-id");
                                   window.location.href = `mealDetails.html?id=${mealId}`;

                    });
                });
            });

    }

});
let categories = document.getElementsByClassName("categories")[0];
async function getCategorizedRecipes(CATEGORY_NAME) {
    let res = await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${CATEGORY_NAME}`);
    let responses = await res.json();
    console.log(responses)
    recipes.innerHTML = "";
    for (let i=0;i<responses.meals.length;i++) {
// for (let response of responses.meals)
        recipes.innerHTML += `<div class="recipe-card" data-id="${responses.meals[i].idMeal}">
        <img src="${responses.meals[i].strMealThumb}">
        <h5>${responses.meals[i].strMeal}</h5>
       
        <button class="btn btn-details" data-id="${responses.meals[i].idMeal}">See Details</button>
        </div>`
    }
    // Add event listeners to all "See Details" buttons after they're added to the DOM
    document.querySelectorAll(".btn-details").forEach(button => {
        button.addEventListener("click", function () {
            let mealId = this.parentElement.getAttribute("data-id");
            window.location.href = `mealDetails.html?id=${mealId}`;
        });
    });
}
console.log(categories)
categories.addEventListener("click", function (e) {
    let categoryName = e.target.innerText;
    getCategorizedRecipes(categoryName)
});
