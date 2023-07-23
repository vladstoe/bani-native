// Import the required modules
const mongoose = require('mongoose');

// Replace 'your-mongodb-uri' with the actual connection string to your MongoDB database
const mongoURI = 'mongodb://127.0.0.1:27017/';
mongoose.connect(mongoURI, { useNewUrlParser: true, useUnifiedTopology: true });

// Check for successful connection
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
db.once('open', () => {
  console.log('Connected to MongoDB successfully!');

  // Define the User schema and model
  const userSchema = new mongoose.Schema({
    username: { type: String, required: true },
    email: { type: String, required: true },
    password: { type: String, required: true },
  });

  const User = mongoose.model('User', userSchema);

  // Define an array of fake users (you can customize this data as needed)
  const fakeUsers = [
    { username: 'user1', email: 'user1@example.com', password: 'a' },
    { username: 'user2', email: 'user2@example.com', password: 'b' },
    // Add more fake users as needed
  ];

  async function insertFakeUsers() {
    try {
      // Remove any existing users (optional, if you want to start with a clean slate)
      await User.deleteMany();

      // Insert the fake users into the database
      await User.insertMany(fakeUsers);

      console.log('Fake users inserted successfully!');
    } catch (error) {
      console.error('Error inserting fake users:', error);
    } finally {
      // Close the MongoDB connection when done
      mongoose.disconnect();
    }
  }

  // Call the function to insert fake users
  insertFakeUsers();
});
