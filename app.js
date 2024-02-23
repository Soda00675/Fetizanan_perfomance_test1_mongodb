const express = require('express');
const mongoose = require('mongoose');
const app = express();
const port = 4000;
const coursesData = require('./courses.json');
const Course = require("./model/coursesModel");

// Retrieve courses sorted alphabetically
app.get('/api/courses', async (req, res) => {
  try {
    const allCourses = [];
    coursesData.forEach(year => {
      Object.values(year).forEach(courseList => {
        allCourses.push(...courseList);
      });
    });
    // Sort alphabetically by description
    allCourses.sort((a, b) => a.description.localeCompare(b.description));
    res.json(allCourses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


// Retrieve all BSIS courses
app.get('/api/courses/bsis', (req, res) => {
  try {
    const bsisCourses = [];
    coursesData.forEach(year => {
      Object.values(year).forEach(courseList => {
        courseList.forEach(course => {
          if (course.tags.includes('BSIS')) {
            bsisCourses.push(course);
          }
        });
      });
    });

    // Sort the BSIS courses
    bsisCourses.sort((a, b) => a.description.localeCompare(b.description));

    res.json(bsisCourses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Retrieve all BSIT courses
app.get('/api/courses/bsit', (req, res) => {
  try {
    const bsitCourses = [];
    coursesData.forEach(year => {
      Object.values(year).forEach(courseList => {
        courseList.forEach(course => {
          if (course.tags.includes('BSIT')) {
            bsitCourses.push(course);
          }
        });
      });
    });

    // Sort the BSIT courses
    bsitCourses.sort((a, b) => a.description.localeCompare(b.description));

    res.json(bsitCourses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});


//retrieve all the backend course alphabetically
app.get('/api/backend-courses', async (req, res) => {
  try {

    const filteredCourses = coursesData.filter(year => {
      return Object.values(year).some(courseList => {
        return courseList.some(course => isBackendCourse(course));
      });
    });

    let allCourses = [];
    filteredCourses.forEach(year => {
      Object.values(year).forEach(courseList => {
        allCourses = allCourses.concat(courseList.filter(course => isBackendCourse(course)));
      });
    });
    allCourses.sort((a, b) => a.description.localeCompare(b.description));

    res.json(allCourses);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Function to check if a course belongs to a backend course
function isBackendCourse(course) {
  const backendTags = ['Database', 'System', 'Software', 'Enterprise', 'Web', 'Information'];
  return course.tags.some(tag => backendTags.includes(tag));
}


// Function to extract name and specialization of each course
const extractCourseDetails = () => {
  const courseDetails = [];
  coursesData.forEach(year => {
    Object.values(year).forEach(courseList => {
      courseList.forEach(course => {
        // Extract name and specialization and add to courseDetails array
        const { description, tags } = course;
        const name = tags[0];
        const specialization = tags[1];
        courseDetails.push({ name, specialization });
      });
    });
  });

  return courseDetails;
};
const extractedDetails = extractCourseDetails();
console.log(extractedDetails);

// Define the endpoint name and specialization
app.get('/api/course-details', (req, res) => {
  try {
    // Call the function to extract course details
    const extractedDetails = extractCourseDetails();
    res.json(extractedDetails);
  } catch (error) {
    console.error('Error:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/mongo-test')
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
