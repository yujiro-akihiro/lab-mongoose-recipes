const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');
// Import of the data from './data.json'
const data = require('./data');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Suppress the deprecation warning for `strictQuery`
mongoose.set('strictQuery', true);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Before adding any recipes to the database, let's remove all existing ones
    return Recipe.deleteMany();
  })
  .then(() => {
    // Add the array of recipes from data.json
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    // Print the title of each recipe
    recipes.forEach(recipe => {
      console.log(`Recipe created: ${recipe.title}`);
    });
    mongoose.connection.close(); // データベース接続を終了
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
