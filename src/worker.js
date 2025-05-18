const { consumeQueue } = require('./queue/notificationQueue');
const { sendEmail } = require('./services/emailService');
const { sendSMS } = require('./services/smsService');
const { sendInAppNotification } = require('./services/inAppService');

// ✅ Consume messages from RabbitMQ
consumeQueue(async ({ userId, type, message }) => {
    try {
        if (type === 'email') {
            await sendEmail('recipient@example.com', message);
        } else if (type === 'sms') {
            await sendSMS('+1234567890', message);
        } else if (type === 'in-app') {
            await sendInAppNotification(userId, message);
        } else {
            throw new Error('Unknown notification type');
        }

        console.log(`✅ ${type} notification processed successfully`);
    } catch (err) {
        console.error('❌ Failed to process message:', err);
        throw err; 
    }
});
