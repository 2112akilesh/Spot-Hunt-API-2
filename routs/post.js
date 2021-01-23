const express = require('express');
const router  = express.Router();
const Posts   = require('../models/image_schema');          //Importing schemas from image_data.js



//Push the request to Data base
router.post('/update', async (req, res) => {
    
    //Saving the req value in "Exists"
    const Exists = await Posts.findOne({ Photo_DNA: req.body.Photo_DNA })
    
    //Checking if the Photo_DNA is already present in D.B or not
    if (Exists) {
        return res.status(400).json({ message: 'dna already exists!' })
    }
    else {
        //Creating new user if it is not prersent in D.B
        const post = new Posts({
            Photo_DNA: req.body.Photo_DNA,
            size: req.body.size,
            pixel: req.body.pixel,
            EXIF_data: req.body.EXIF_data,
            App_Name: req.body.App_Name
        });
        try {
            const savePost = await post.save();
            res.send(savePost);
        } catch (err) {
            res.send(err);
        }
    }
});


module.exports = router;