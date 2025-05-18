const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();

app.use(express.json());

// Route to serve notifications
app.get('/notifications', (req, res) => {
    // Ensure the file path is correct
    const filePath = path.join(__dirname, '../data/inAppNotifications.json');
    console.log(`Attempting to read file at: ${filePath}`); // Debug log

    try {
        // Verify file exists
        if (!fs.existsSync(filePath)) {
            throw new Error(`File not found at ${filePath}`);
        }

        const data = fs.readFileSync(filePath, 'utf-8');
        let notifications;

        // Parse JSON safely
        try {
            notifications = JSON.parse(data);
        } catch (parseErr) {
            throw new Error(`Invalid JSON in file: ${parseErr.message}`);
        }

        // Ensure notifications is an array
        if (!Array.isArray(notifications)) {
            throw new Error('Notifications data must be an array');
        }

        // Filter by userId if provided
        const userId = req.query.userId;
        const filtered = userId
            ? notifications.filter(n => n.userId === userId)
            : notifications;

        // Generate HTML
        let html = `<h2>In-App Notifications</h2>`;
        if (filtered.length === 0) {
            html += `<p>No notifications found.</p>`;
        } else {
            html += `<ul>`;
            filtered.forEach(n => {
                html += `<li><strong>${n.userId || 'Unknown'}</strong>: ${
                    n.message || 'No message'
                } <br><small>${n.timestamp || 'No timestamp'}</small></li>`;
            });
            html += `</ul>`;
        }

        res.send(html);
    } catch (err) {
        console.error('Error in /notifications:', err.message);
        res.status(500).send(`Error reading notifications: ${err.message}`);
    }
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});