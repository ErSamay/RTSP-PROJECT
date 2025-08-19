// test-routes.js
console.log('Testing route file loading...');

try {
  const overlayRoutes = require('./src/routes/overlayRoutes');
  console.log('✅ Routes loaded successfully:', typeof overlayRoutes);
} catch (error) {
  console.error('❌ Error loading routes:', error.message);
  console.error('Stack:', error.stack);
}