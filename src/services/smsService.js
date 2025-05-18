async function sendSMS(to, message) {
  // Simulating a delay for sending SMS
  await new Promise(resolve => setTimeout(resolve, 500));
  
  // Log a custom message to simulate sending
  console.log(`📱 [Mock] SMS sent to ${to}: "${message}"`);
}

module.exports = { sendSMS };
