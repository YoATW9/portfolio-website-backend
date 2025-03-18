const config = {
  mongoURI: process.env.MONGODB_URI,
  jwtSecret: process.env.JWT_SECRET || 'your-default-jwt-secret',
  port: process.env.PORT || 5000,
  corsOrigin: process.env.NODE_ENV === 'production'
    ? ['https://YoATW9.github.io']  // Your GitHub Pages domain
    : ['http://localhost:3000'],
};

module.exports = config;
