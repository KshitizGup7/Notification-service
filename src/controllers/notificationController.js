const express = require('express');
const fs = require('fs');
const path = require('path');
const { sendToQueue } = require('../queue/notificationQueue');

const router = express.Router();

// POST /notifications
router.post('/', async (req, res) => {
    const { userId, type, message } = req.body;

    if (!userId || !type || !message) {
        return res.status(400).json({ error: 'userId, type, and message are required' });
    }

    const notification = { userId, type, message };

    try {
        await sendToQueue(notification);
        res.status(200).json({ message: 'Notification queued successfully' });
    } catch (error) {
        console.error('Failed to send to queue', error);
        res.status(500).json({ error: 'Failed to queue notification' });
    }
});

// GET /notifications
router.get('/', (req, res) => {
    const filePath = path.join(__dirname, '../../data/inAppNotifications.json');

    fs.readFile(filePath, 'utf8', (err, data) => {
        if (err) {
            console.error('Error reading JSON file:', err);
            return res.status(500).json({ error: 'Failed to read notifications file' });
        }

        try {
            const jsonData = JSON.parse(data);
            res.json(jsonData);
        } catch (parseErr) {
            console.error('Error parsing JSON:', parseErr);
            res.status(500).json({ error: 'Invalid JSON format' });
        }
    });
});

module.exports = router;
