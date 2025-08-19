// backend/src/controllers/overlayController.js
console.log('Loading overlayController.js...');
const Overlay = require('../models/Overlay');
console.log('Overlay model loaded:', Overlay);
// Get all overlays
const getAllOverlays = async (req, res) => {
  try {
    const overlays = await Overlay.find().sort({ createdAt: -1 });
    res.json({
      success: true,
      data: overlays,
      count: overlays.length
    });
  } catch (error) {
    console.error('Error fetching overlays:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch overlays',
      error: error.message
    });
  }
};

// Get single overlay by ID
const getOverlayById = async (req, res) => {
  try {
    const overlay = await Overlay.findById(req.params.id);
    
    if (!overlay) {
      return res.status(404).json({
        success: false,
        message: 'Overlay not found'
      });
    }

    res.json({
      success: true,
      data: overlay
    });
  } catch (error) {
    console.error('Error fetching overlay:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to fetch overlay',
      error: error.message
    });
  }
};

// Create new overlay
const createOverlay = async (req, res) => {
  try {
    const {
      name,
      type,
      content,
      position,
      size,
      style,
      isVisible
    } = req.body;

    // Validation
    if (!name || !type || !content) {
      return res.status(400).json({
        success: false,
        message: 'Name, type, and content are required fields'
      });
    }

    const newOverlay = new Overlay({
      name,
      type,
      content,
      position: position || { x: 0, y: 0 },
      size: size || { width: 100, height: 50 },
      style: style || {},
      isVisible: isVisible !== undefined ? isVisible : true
    });

    const savedOverlay = await newOverlay.save();

    res.status(201).json({
      success: true,
      message: 'Overlay created successfully',
      data: savedOverlay
    });
  } catch (error) {
    console.error('Error creating overlay:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to create overlay',
      error: error.message
    });
  }
};

// Update overlay
const updateOverlay = async (req, res) => {
  try {
    const overlayId = req.params.id;
    const updateData = req.body;

    const updatedOverlay = await Overlay.findByIdAndUpdate(
      overlayId,
      { $set: updateData },
      { new: true, runValidators: true }
    );

    if (!updatedOverlay) {
      return res.status(404).json({
        success: false,
        message: 'Overlay not found'
      });
    }

    res.json({
      success: true,
      message: 'Overlay updated successfully',
      data: updatedOverlay
    });
  } catch (error) {
    console.error('Error updating overlay:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to update overlay',
      error: error.message
    });
  }
};

// Delete overlay
const deleteOverlay = async (req, res) => {
  try {
    const overlayId = req.params.id;

    const deletedOverlay = await Overlay.findByIdAndDelete(overlayId);

    if (!deletedOverlay) {
      return res.status(404).json({
        success: false,
        message: 'Overlay not found'
      });
    }

    res.json({
      success: true,
      message: 'Overlay deleted successfully',
      data: deletedOverlay
    });
  } catch (error) {
    console.error('Error deleting overlay:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to delete overlay',
      error: error.message
    });
  }
};

// Toggle overlay visibility
const toggleOverlayVisibility = async (req, res) => {
  try {
    const overlayId = req.params.id;

    const overlay = await Overlay.findById(overlayId);
    if (!overlay) {
      return res.status(404).json({
        success: false,
        message: 'Overlay not found'
      });
    }

    overlay.isVisible = !overlay.isVisible;
    const updatedOverlay = await overlay.save();

    res.json({
      success: true,
      message: `Overlay ${updatedOverlay.isVisible ? 'shown' : 'hidden'} successfully`,
      data: updatedOverlay
    });
  } catch (error) {
    console.error('Error toggling overlay visibility:', error);
    res.status(500).json({
      success: false,
      message: 'Failed to toggle overlay visibility',
      error: error.message
    });
  }
};

module.exports = {
  getAllOverlays,
  getOverlayById,
  createOverlay,
  updateOverlay,
  deleteOverlay,
  toggleOverlayVisibility
};