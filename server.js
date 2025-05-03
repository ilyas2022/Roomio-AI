const express = require('express');
const path = require('path');
const { createProxyMiddleware } = require('http-proxy-middleware');
const app = express();
const PORT = process.env.PORT || 8080;

// Define backend URL from environment variable or use default
const BACKEND_URL = process.env.BACKEND_URL || 'https://roomio-ai-backend.fly.dev';

// Habilitar CORS para desarrollo local
app.use((req, res, next) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }
  next();
});

// Proxy API requests to the backend service
app.use('/api', createProxyMiddleware({
  target: BACKEND_URL,
  changeOrigin: true,
  pathRewrite: {
    '^/api': '', // Remove /api prefix when forwarding to backend
  },
  onError: (err, req, res) => {
    console.error('Proxy error:', err);
    res.status(503).json({ error: "Backend service unavailable" });
  }
}));

// Serve static files from the frontend build directory
app.use(express.static(path.join(__dirname, 'frontend/dist')));

// Endpoint básico de healthcheck
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

// For any other request, send the index.html
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend/dist/index.html'));
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API requests will be proxied to: ${BACKEND_URL}`);
}); 