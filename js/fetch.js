export async function fetchMealDetails(mealId) {
    try {
        const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
        const response = await fetch(url);
        const data = await response.json();
        const meal = data.meals[0];

        // Build ingredients list
        let ingredients = "";
        for (let i = 1; i <= 20; i++) {
            if (meal[`strIngredient${i}`] && meal[`strIngredient${i}`] !== "") {
                ingredients += `<li>${meal[`strIngredient${i}`]} - ${meal[`strMeasure${i}`]}</li>`;
            } else {
                break;
            }
        }

        // Populate details section
        const detailsSection = document.querySelector(".meal-details");
        detailsSection.innerHTML = `
            <div class="details-content">
                <h2>${meal.strMeal}</h2>
                <img src="${meal.strMealThumb}" alt="${meal.strMeal}" style="width: 100%; max-width: 300px; border-radius: 8px;">
                <h3>Category: ${meal.strCategory}</h3>
                <h3>Area: ${meal.strArea}</h3>
                <h3>Ingredients:</h3>
                <ul>${ingredients}</ul>
                <h3>Instructions:</h3>
                <p>${meal.strInstructions}</p>
                ${meal.strYoutube ? `<a href="${meal.strYoutube}" target="_blank">Watch Video</a>` : ""}
                <button class="btn close-details">Back</button>
            </div>
        `;

        // Add event listener for back button
        document.querySelector(".close-details").addEventListener("click", () => {
            window.location.href = "index.html";
        });

        return meal; // Return for potential chaining
    } catch (error) {
        console.error("Error fetching meal details:", error);
        const detailsSection = document.querySelector(".meal-details");
        detailsSection.innerHTML = `<p style="text-align: center; color: red;">Error loading recipe details. Please try again.</p>`;
    }
}

// Run on details.html
if (document.querySelector(".meal-details")) {
    const params = new URLSearchParams(window.location.search);
    const mealId = params.get("id");
    if (mealId) {
        fetchMealDetails(mealId);
    }
}