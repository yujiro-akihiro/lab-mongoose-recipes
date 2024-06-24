const mongoose = require('mongoose');

// Import of the model Recipe from './models/Recipe.model.js'
const Recipe = require('./models/Recipe.model');

const MONGODB_URI = 'mongodb://localhost:27017/recipe-app';

// Suppress the deprecation warning for `strictQuery`
mongoose.set('strictQuery', true);

// Connection to the database "recipe-app"
mongoose
  .connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(x => {
    console.log(`Connected to the database: "${x.connection.name}"`);
    // Remove "Carrot Cake" recipe
    return Recipe.deleteOne({ title: 'Carrot Cake' });
  })
  .then(() => {
    console.log('Successfully removed Carrot Cake');
    mongoose.connection.close(); // データベース接続を終了
  })
  .catch(error => {
    console.error('Error connecting to the database', error);
  });
