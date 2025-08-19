// backend/src/models/Overlay.js
console.log('Loading Overlay model...');
const mongoose = require('mongoose');

const overlaySchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  type: {
    type: String,
    required: true,
    enum: ['text', 'logo', 'image'],
    default: 'text'
  },
  content: {
    type: String,
    required: true
  },
  position: {
    x: {
      type: Number,
      default: 0
    },
    y: {
      type: Number,
      default: 0
    }
  },
  size: {
    width: {
      type: Number,
      default: 100
    },
    height: {
      type: Number,
      default: 50
    }
  },
  style: {
    color: {
      type: String,
      default: '#ffffff'
    },
    fontSize: {
      type: String,
      default: '16px'
    },
    fontFamily: {
      type: String,
      default: 'Arial'
    },
    backgroundColor: {
      type: String,
      default: 'transparent'
    },
    opacity: {
      type: Number,
      default: 1,
      min: 0,
      max: 1
    }
  },
  isVisible: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Index for better query performance
overlaySchema.index({ name: 1 });
overlaySchema.index({ type: 1 });
overlaySchema.index({ isVisible: 1 });

const Overlay = mongoose.model('Overlay', overlaySchema);

module.exports = Overlay;