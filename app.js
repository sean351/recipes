// Recipe data - list of available recipes
const recipes = [
    { title: 'Maple Brown Sugar Oatmeal Muffins', file: 'maple-oatmeal-muffins.md' },
    { title: 'Chocolate Chip Cookies', file: 'chocolate-chip-cookies.md' },
    { title: 'Spaghetti Carbonara', file: 'spaghetti-carbonara.md' }
];

// Determine the base path for GitHub Pages
// If the repository is a project site, adjust the path accordingly
const BASE_PATH = window.location.hostname === 'localhost' ? '' : '';

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
        const recipeUrl = `${BASE_PATH}recipes/${filename}`;
        console.log('Fetching recipe from:', recipeUrl);
        
        const response = await fetch(recipeUrl);
        if (!response.ok) {
            throw new Error(`HTTP ${response.status}: ${response.statusText}`);
        }
        
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
        console.error('Error loading recipe:', error);
        const recipeContent = document.getElementById('recipe-content');
        recipeContent.innerHTML = `<p style="color: red;">Error loading recipe: ${error.message}</p><p>Make sure the recipe file exists in the recipes/ folder. Check browser console for details.</p>`;
        document.getElementById('home-view').classList.remove('active');
        document.getElementById('recipe-view').classList.add('active');
    }
}

// Go back to home view
function showHome() {
    document.getElementById('recipe-view').classList.remove('active');
    document.getElementById('home-view').classList.add('active');
    window.scrollTo(0, 0);
}
