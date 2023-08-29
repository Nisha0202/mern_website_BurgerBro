const mongoose = require('mongoose');
const pass = 'mongodb+srv://Admin:Admin0202@cluster0.ydoby6v.mongodb.net/mern_website_burger_bro';
const connectToMongo = async () => {
  try {
    mongoose.set('strictQuery', false);
    await mongoose.connect(pass);
    console.log('Connected to MongoDB successfully!');
    
    const foodSchema = new mongoose.Schema({
      CategoryName: String,
      name: String,
      img: String,
      options: [{
        medium: String,
        large: String,
      }],
      description: String
    });
    
    const categorySchema = new mongoose.Schema({
      CategoryName: String,
    });
    
    const Food = mongoose.model('food_items', foodSchema);
    const Category = mongoose.model('food_categories', categorySchema);
    
    try {
      const foodItems = await Food.find({});
      global.food_items = foodItems;
      // console.log(global.food_items);
    } catch (foodError) {
      console.log('Error fetching food items:', foodError);
    }
    
    try {
      const categories = await Category.find({});
      global.food_category = categories;
      // console.log(global.food_category);
    } catch (categoryError) {
      console.log('Error fetching food categories:', categoryError);
    }
  } catch (error) {
    console.log('MongoDB connection error:', error);
  }
};

module.exports = connectToMongo;











