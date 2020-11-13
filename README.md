# Pandemic Purchase

This is a stock-checker bot that parses HTML data from a curated list of popular gym equipment items from the 3 most renowned retailers - Rogue, Titan, and REP. 

You can use it by going to https://pandemic-purchase.herokuapp.com/.

# Features

Use the "What's In Stock" tab to view the list of items. If you see a particular item you want that's out of stock, take the item ID, go to "Get Notified", and sign up for that item.

Planned features for implementation: revamped UI for viewing, sorting and filtering, one-click notification registration from the stock page.

# Run your own instance

You'll need a PostgreSQL server instance, Node.js, and npm.

1. Create a process.env file and add the line "DATABASE_URL = [insert database url here]"
2. npm install
3. npm start
4. Access locally at localhost:5000
