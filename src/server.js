const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Main route
app.get('/status', (req, res) => {
  // Quick internal sanity check
  const selfCheckPass = (2 + 2 === 4); 

  if (!selfCheckPass) {
    return res.status(500).json({ status: "unhealthy", error: "Internal math failure" });
  }

  res.status(200).json({
    message: "🚀 calculator status",
    timestamp: new Date().toISOString(),
    status: "healthy"
  });
});

app.get('/add', (req, res) => {
  const value1 = Number(req.query.x);
  const value2 = Number(req.query.y);
  const result = value1 + value2;
  res.status(200).json({
    result: result
  });
});
app.get('/sub', (req, res) => {
  const value1 = Number(req.query.x);
  const value2 = Number(req.query.y);
  const result = value1 - value2;
  res.status(200).json({
    result: result
  });
});
// Start the server only if run directly (not when imported by tests)
if (require.main === module) {
  app.listen(PORT, () => {
    console.log(`Server is running and listening on port ${PORT}`);
  });
}
app.get('/mul', (req, res) => {
  const value1 = Number(req.query.x);
  const value2 = Number(req.query.y);
  const result = value1 * value2;
  res.status(200).json({ result });
});

app.get('/div', (req, res) => {
  const value1 = Number(req.query.x);
  const value2 = Number(req.query.y);

  // Guard clause against dividing by zero
  if (value2 === 0) {
    return res.status(400).json({ 
      error: "Invalid input", 
      message: "Division by zero is not allowed." 
    });
  }

  const result = value1 / value2;
  res.status(200).json({ result });
});

// Export app for testing
module.exports = app;