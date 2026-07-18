const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Main route
app.get('/', (req, res) => {
  res.status(200).json({
    message: "🚀 Hello from your automated Docker CI/CD pipeline!",
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

// Start the server only if run directly (not when imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
  });
}

// Export app for testing
module.exports = app;