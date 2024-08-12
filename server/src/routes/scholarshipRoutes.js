const express = require('express');
const router = express.Router();
const Scholarship = require('../models/scholarship');

// Endpoint to add a new scholarship
router.post('/', async (req, res) => {
  try {
    const newScholarship = new Scholarship(req.body);
    await newScholarship.save();
    res.status(200).json('Scholarship added successfully');
  } catch (error) {
    console.error('Error adding scholarship:', error);
    res.status(500).json('Failed to add scholarship');
  }
});

// Endpoint to fetch scholarships based on criteria
router.get('/', async (req, res) => {
  const { classSelection, genderSelection, stateSelection } = req.query;
  try {
    const scholarships = await Scholarship.find({
      class: classSelection,
      gender: genderSelection,
      state: stateSelection
    });
    res.status(200).json(scholarships);
  } catch (error) {
    console.error('Error fetching scholarships:', error);
    res.status(500).json('Failed to fetch scholarships');
  }
});

// Endpoint to fetch scholarship details by ID
// router.get('/:id', async (req, res) => {
//   try {
//     const scholarship = await Scholarship.findById(req.params.id);
//     res.status(200).json(scholarship);
//   } catch (error) {
//     console.error('Error fetching scholarship details:', error);
//     res.status(500).json('Failed to fetch scholarship detail');
//   }
// });
 
// Route to get the total count of scholarships
router.get('/count', async (req, res) => {
  try {
    const count = await Scholarship.countDocuments();
    console.log(count);
    res.json({ count });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
});
module.exports = router;
