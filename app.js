// Recipe data - list of available recipes
const recipes = [
    { title: 'Maple Brown Sugar Oatmeal Muffins', file: 'maple-oatmeal-muffins.md' },
    { title: 'Chocolate Chip Cookies', file: 'chocolate-chip-cookies.md' },
    { title: 'Spaghetti Carbonara', file: 'spaghetti-carbonara.md' }
];

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadRecipeList();
});

// Load and display the recipe list
function loadRecipeList() {
    const recipeList = document.getElementById('recipe-list');
    recipeList.innerHTML = '';
    
    recipes.forEach(recipe => {
        const card = document.createElement('article');
        card.className = 'recipe-card';
        card.innerHTML = `
            <h2>${recipe.title}</h2>
            <p>Click to view recipe</p>
            <button class="recipe-btn" onclick="loadRecipe('${recipe.file}')">View Recipe</button>
        `;
        recipeList.appendChild(card);
    });
}

// Load a specific recipe markdown file
async function loadRecipe(filename) {
    try {
        const response = await fetch(`recipes/${filename}`);
        if (!response.ok) throw new Error('Failed to load recipe');
        
        const markdown = await response.text();
        const html = marked.parse(markdown);
        
        const recipeContent = document.getElementById('recipe-content');
        recipeContent.innerHTML = html;
        
        // Show recipe view, hide home view
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('recipe-view').classList.add('active');
        
        // Scroll to top
        window.scrollTo(0, 0);
    } catch (error) {
        alert('Error loading recipe: ' + error.message);
    }
}

// Go back to home view
function showHome() {
    document.getElementById('recipe-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    window.scrollTo(0, 0);
}
