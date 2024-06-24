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
    // Insert multiple recipes from data.json
    return Recipe.insertMany(data);
  })
  .then(recipes => {
    recipes.forEach(recipe => {
      console.log(`Recipe created: ${recipe.title}`);
    });
    // Update the duration of "Rigatoni alla Genovese"
    return Recipe.findOneAndUpdate(
      { title: 'Rigatoni alla Genovese' },
      { duration: 100 },
      { new: true }
    );
  })
  .then(updatedRecipe => {
    console.log(`Successfully updated recipe: ${updatedRecipe.title}, new duration: ${updatedRecipe.duration}`);
    // Remove "Carrot Cake" recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully removed Carrot Cake');
    // Close the database connection
    return mongoose.connection.close();
  })
  .then(() => {
    console.log('Database connection closed');
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
    mongoose.connection.close(); // Ensure the connection is closed on error
  });
