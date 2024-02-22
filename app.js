const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
// Import course data
const coursesData = require('./courses.json');

// Define Course schema and model
const courseSchema = new mongoose.Schema({
  name: String,
  specialization: String,
  degree: String,
  published: Boolean
});
const Course = mongoose.model('Course', courseSchema);

//Import course data to MongoDB
const importDataToMongoDB = async () => {
  try {
    await Course.insertMany(coursesData);
    console.log('Data imported successfully');
  } catch (error) {
    console.error('Error importing data:', error);
  }
};
//importDataToMongoDB();

app.get('/api/courses', async (req, res) => {
  try {
    const courses = await Course.find();
    res.json(courses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});




// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/course')
  .then(() => console.log('Connected to MongoDB...'))
  .catch((err) => console.error('Connection failed...', err));

// Define a simple route
app.get('/', (req, res) => {
  res.send('Hello World!');
});

// Start the server
app.listen(port, () => {
  console.log(`Server listening at http://localhost:${port}`);
});
