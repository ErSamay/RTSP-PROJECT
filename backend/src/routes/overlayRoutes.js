const express = require('express');
const router = express.Router();
const {
  getAllOverlays,
  getOverlayById,
  createOverlay,
  updateOverlay,
  deleteOverlay,
  toggleOverlayVisibility
} = require('../controllers/overlayController');

console.log('Adding routes...');

// Add routes one by one to identify the problematic one
try {
  router.get('/overlays', getAllOverlays);
  console.log('✅ GET /overlays added');
  
  router.get('/overlays/:id', getOverlayById);
  console.log('✅ GET /overlays/:id added');
  
  router.post('/overlays', createOverlay);
  console.log('✅ POST /overlays added');
  
  router.put('/overlays/:id', updateOverlay);
  console.log('✅ PUT /overlays/:id added');
  
  router.patch('/overlays/:id/toggle', toggleOverlayVisibility);
  console.log('✅ PATCH /overlays/:id/toggle added');
  
  router.delete('/overlays/:id', deleteOverlay);
  console.log('✅ DELETE /overlays/:id added');
  
} catch (error) {
  console.error('❌ Error adding route:', error.message);
}

console.log('All routes added successfully');
module.exports = router;