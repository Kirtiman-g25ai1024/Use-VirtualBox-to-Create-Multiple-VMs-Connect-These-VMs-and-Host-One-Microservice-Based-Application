const express = require('express');
const app = express();

app.get('/api/data', (req, res) => {
  res.json({
    service: "backend",
    vm: "vm2",
    message: "Hello from VM2 backend"
  });
});

// Bind to all interfaces so VM1 can reach it over the host-only network
const HOST = '0.0.0.0';
const PORT = 3000;

app.listen(PORT, HOST, () => {
  console.log(`Backend running on http://${HOST}:${PORT}`);
});
