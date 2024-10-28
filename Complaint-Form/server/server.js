// server.js
const express = require('express');
const multer = require('multer');
const path = require('path');
const fs = require('fs');
const cors = require('cors');

const app = express();
const port = 3001;

// Multer setup for file upload
const upload = multer({ dest: 'uploads/' });

// Middleware to parse JSON body
app.use(express.json());
app.use(cors());


const corsOptions = {
    origin: 'http://localhost:3001'
  };
  
  //app.use(cors(corsOptions));


  function setCorsHeaders(req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); //, PUT, PATCH, DELETE
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
  }


  app.use(setCorsHeaders);

app.post('/api/complaint', upload.single('image'), (req, res) => {
  const { email, description } = req.body;

  console.log("Entery point");

  if (!email || !description) {
      return res.status(400).json({ success: false, message: 'Email and description are required.' });
  }

  const complaintData = {
      email,
      description,
      image: req.file ? req.file.filename : null,
      timestamp: new Date().toISOString()
  };

  let complaints = [];
  const filePath = path.join(__dirname, 'complaints.json');

  if (fs.existsSync(filePath)) {
      const existingData = fs.readFileSync(filePath);
      try {
          complaints = JSON.parse(existingData);
      } catch (error) {
          console.error('Error parsing JSON:', error);
      }
  }

  // Append new complaint
  complaints.push(complaintData);

  // Write the updated complaints array back to the file
  fs.writeFileSync(filePath, JSON.stringify(complaints, null, 2));

  res.json({ success: true, message: 'Complaint submitted successfully!' });
});

// Simple success route for redirect
app.get('/success', (req, res) => {
    res.send('<h1>Complaint Submitted Successfully!</h1>');
});

// Start the server
app.listen(port, () => {
    console.log(`Server running on http://localhost:${port}`);
});

// GET all complaints
app.get('/allcomplaints', (req, res) => {
  const filePath = path.join(__dirname, 'complaints.json');
  
  // Check if the file exists
  if (fs.existsSync(filePath)) {
      const data = fs.readFileSync(filePath);
      try {
          const complaints = JSON.parse(data);
          res.json(complaints);
      } catch (error) {
          res.status(500).json({ success: false, message: 'Error parsing complaints.' });
      }
  } else {
      res.json([]); // Return an empty array if no complaints
  }
});
