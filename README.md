# My Recipes

A dynamic GitHub Pages site for sharing recipes with markdown support.

## Features

- Clean, responsive design
- Dynamically load recipes from markdown files
- Easy to customize and add new recipes
- Mobile-friendly layout
- Uses marked.js for markdown to HTML conversion

## How to Deploy

1. Push this repository to GitHub
2. Enable GitHub Pages in repository settings
3. Select the main branch as the source
4. Your site will be live at `https://yourusername.github.io/recipes`

## File Structure

```
recipes/
├── index.html              # Main page
├── app.js                  # JavaScript logic for dynamic loading
├── style.css              # Styling
├── recipes/               # Folder for markdown recipe files
│   ├── maple-oatmeal-muffins.md
│   ├── chocolate-chip-cookies.md
│   └── spaghetti-carbonara.md
├── assets/                # Images and other media
│   └── images/
└── README.md              # This file
```

## How to Add Recipes

1. Create a new markdown file in the `recipes/` folder with your recipe content
2. Add an entry to the `recipes` array in `app.js`:
   ```javascript
   { title: 'Your Recipe Title', file: 'your-recipe-file.md' }
   ```
3. Your recipe will automatically appear on the home page

## Customization

- Edit `style.css` to customize colors and styling
- Update recipes in the `recipes/` folder using markdown format
- Modify the recipes array in `app.js` to change displayed recipes

## Recipe Format

Use standard markdown format for recipes:
```markdown
# Recipe Title

## Ingredients

- Ingredient 1
- Ingredient 2

## Instructions

1. Step 1
2. Step 2

## Prep Time
X minutes

## Cook Time
X minutes

## Servings
X servings
```
