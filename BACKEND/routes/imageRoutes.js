const express = require('express');
const router = express.Router();
const multer = require('multer');
const Image = require('../models/Image');

const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

// creat Upload image
router.post('/upload', upload.single('image'), async (req, res) => {
    try {
        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        // Create a new image document
        const newImage = new Image({
            userId: req.body.userId,
            img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            }
        });

        // Save the image to the database
        await newImage.save();

        res.status(201).json({ msg: 'Image uploaded successfully' });
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

// Get image by user ID endpoint
router.get('/get/:id', async (req, res) => {
    try {
        const userId = req.params.id;
        console.log(`Received request for image with user ID: ${userId}`);

        // Find the image by user ID
        const image = await Image.findOne({ userId: userId }).exec();

        if (!image) {
            console.error('Image not found');
            return res.status(404).send('Image not found');
        }

        res.set('Content-Type', image.img.contentType);
        res.send(image.img.data);
    } catch (err) {
        console.error(`Error finding image: ${err}`);
        return res.status(500).send(err);
    }
});


router.post('/edit/:userId', upload.single('image'), async (req, res) => {
    try {
        const { userId } = req.params;
        const img = {
            data: req.file.buffer,
            contentType: req.file.mimetype
        };

        const updatedImage = await Image.findOneAndUpdate(
            { userId },
            { img },
            { new: true }
        );

        if (!updatedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json({ msg: 'Image updated successfully' });
    } catch (error) {
        console.error('Error updating image:', error);
        res.status(500).json({ error: 'Internal server error' });
    }
});

router.post('/edit', upload.single('image'), async (req, res) => {
    try {
        // Ensure a file was uploaded
        if (!req.file) {
            return res.status(400).json({ error: 'No file uploaded' });
        }

        const updatedImage = await Image.findOneAndUpdate(
            { userId: req.body.userId },
            { img: {
                data: req.file.buffer,
                contentType: req.file.mimetype
            } },
            { new: true }
        );
        
        // Save the image to the database
        if (!updatedImage) {
            return res.status(404).json({ error: 'Image not found' });
        }

        res.status(200).json({ msg: 'Image updated successfully' });
    } catch (err) {
        console.error('Error uploading image:', err);
        res.status(500).json({ error: 'Internal server error' });
    }
});

module.exports = router;
