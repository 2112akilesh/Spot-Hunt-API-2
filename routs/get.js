const express = require('express');
const router  = express.Router();
const Gets    = require('../models/image_schema');          //Importing schemas from image_data.js


//check the id already exists
router.get('/check', async (req, res) => {
  
  //Saving the req.Photo_DNA value in "x"
  const x = await Gets.findOne({ Photo_DNA: req.body.Photo_DNA });

  //Checking if Photo_DNA is present in D.B or not
  try {
    if (x != null)
      res.json(x);
    else
      res.send("you are Data is safe");
  } catch (err) {
      res.json({ message: err });
  }
});


module.exports = router;
