const fs = require('fs');
const path = require('path');

const filePath = path.join(__dirname, '../../data/inAppNotifications.json');

async function sendInAppNotification(userId, message) {
    const notification = {
        userId,
        message,
        timestamp: new Date().toISOString(),
        read: false,
    };

    // Read existing notifications
    let notifications = [];

    try {
        const data = fs.readFileSync(filePath, 'utf-8');
        notifications = JSON.parse(data);
    } catch (err) {
        // If file doesn't exist or is empty, continue with empty array
        console.log('No existing in-app notifications or file empty.');
    }

    // Add the new notification
    notifications.push(notification);

    // Save back to the JSON file
    fs.writeFileSync(filePath, JSON.stringify(notifications, null, 2));

    console.log(`✅ In-app notification saved for user ${userId}`);
}

module.exports = { sendInAppNotification };
