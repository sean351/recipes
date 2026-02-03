// Recipe data - will be populated dynamically
let recipes = [];
let config = {};

// Initialize the app
document.addEventListener('DOMContentLoaded', function() {
    loadConfig();
});

// Load configuration from config.json
async function loadConfig() {
    try {
        const response = await fetch('config.json');
        config = await response.json();
        loadRecipesFromGitHub();
    } catch (error) {
        console.error('Error loading config:', error);
        // Use defaults if config.json not found
        config = {
            github: {
                owner: 'sean351',
                repo: 'recipes',
                recipesFolder: 'recipes'
            }
        };
        loadRecipesFromGitHub();
    }
}

// Dynamically load recipes from GitHub
async function loadRecipesFromGitHub() {
    try {
        const apiUrl = `https://api.github.com/repos/${config.github.owner}/${config.github.repo}/contents/${config.github.recipesFolder}`;
        const response = await fetch(apiUrl);
        
        if (!response.ok) {
            throw new Error('Failed to fetch recipes from GitHub');
        }
        
        const files = await response.json();
        
        // Filter markdown files and create recipes array
        recipes = files
            .filter(file => file.name.endsWith('.md'))
            .map(file => ({
                title: filenameTotitle(file.name),
                file: file.name
            }));
        
        loadRecipeList();
    } catch (error) {
        console.error('Error loading recipes:', error);
        // Fallback to local fetch if GitHub API fails
        loadRecipesFromFolder();
    }
}

// Fallback: Try to load recipes by checking common filenames
async function loadRecipesFromFolder() {
    const commonRecipes = [
        'maple-oatmeal-muffins.md',
        'chocolate-chip-cookies.md',
        'spaghetti-carbonara.md'
    ];
    
    recipes = commonRecipes.map(file => ({
        title: filenameTotitle(file),
        file: file
    }));
    
    loadRecipeList();
}

// Convert filename to title (e.g., "maple-oatmeal-muffins.md" -> "Maple Oatmeal Muffins")
function filenameTotitle(filename) {
    return filename
        .replace('.md', '')
        .split('-')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
}

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
