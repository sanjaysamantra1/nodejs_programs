const express = require('express');
const mongoose = require('mongoose');

const app = express();
app.use(express.json());

// Connect to MongoDB
const url = "mongodb://0.0.0.0:27017/test";
mongoose.connect(url);

// Define URL schema and model
const urlSchema = new mongoose.Schema({
    originalUrl: String,
    shortUrl: String,
    urlCode: String,
    date: { type: String, default: Date.now }
});
const Url = mongoose.model('Url', urlSchema);

// Base URL for the shortened URLs (Change this to your domain in production)
const baseUrl = 'http://localhost:3000';

// Route for creating a short URL
app.post('/api/url/shorten', async (req, res) => {
    const { originalUrl } = req.body;
    try {
        // Check if the URL already exists in the database
        let url = await Url.findOne({ originalUrl });

        if (url) {
            // If it exists, return the short URL
            return res.json(url);
        } else {
            // Create URL code and short URL
            const urlCode = Math.random().toString(36).substring(7);
            const shortUrl = `${baseUrl}/${urlCode}`;

            // Create a new URL entry in the database
            const newUrl = new Url({
                originalUrl,
                shortUrl,
                urlCode,
                date: new Date()
            });
            await newUrl.save();
            res.json(newUrl);
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});

// Route to handle redirection from short URL to original URL
app.get('/:code', async (req, res) => {
    try {
        // Find the URL by the code
        const url = await Url.findOne({ urlCode: req.params.code });

        if (url) {
            // Redirect to the original URL
            return res.redirect(url.originalUrl);
        } else {
            return res.status(404).json('No URL found');
        }
    } catch (err) {
        console.error(err);
        res.status(500).json('Server error');
    }
});
const PORT = 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
