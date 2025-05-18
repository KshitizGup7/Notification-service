# Notification Service

A basic notification system built with **Node.js**, **Express**, and **RabbitMQ**, designed to handle three types of notifications: Email, SMS (mocked), and In-App. Developed as part of an internship assignment.

---

##  Features

- **Email Notification**: Sends a real email using Gmail SMTP via Nodemailer.
- **SMS Notification (Mocked)**: Simulates SMS delivery by logging to the console.
- **In-App Notification**: Stores user messages in a JSON file and displays them via a GET endpoint.
- **RabbitMQ Integration**: Uses message queues to handle asynchronous delivery of notifications.

---

##  Tech Stack

- **Backend**: Node.js, Express
- **Queueing**: RabbitMQ (`amqplib`)
- **Email**: Nodemailer (Gmail)
- **Mock SMS**: Console log simulation
- **In-App Storage**: JSON file system

## Install dependencies

- npm install

## Run the app

- Start the Express server:
node app.js
- Start the queue consumer worker:
node worker.js
---


##  Assumptions Made

- Email credentials (Gmail account and app password) are provided in `.env`.
- RabbitMQ is running locally and accessible at `amqp://localhost`.
- SMS sending is mocked and does not use a real SMS gateway.
- In-app notifications are stored in a local JSON file (`/data/inAppNotifications.json`).
- To view In-App Notifications
GET http://localhost:3000/notifications
Returns stored notifications in JSON format.
- For email notifications, the recipient address is hardcoded for testing purposes.
- The notification are send by postman with a post request in this format.

{
  "userId": "user123",

  "type": "email",  or "sms" or "in-app"

  "message": "This is a test notification"
}


## 👤 Author

**Name:** Kshitiz gupta 

**University Roll Number:** 2228031

**Email:** kshitiz260603@gmail.com 
---
