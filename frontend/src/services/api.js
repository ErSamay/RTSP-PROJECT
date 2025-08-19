// frontend/src/services/api.js
import axios from 'axios';

const API_BASE_URL = 'http://localhost:3001/api';

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  }
});

// Request interceptor
api.interceptors.request.use(
  (config) => {
    console.log(`Making ${config.method.toUpperCase()} request to ${config.url}`);
    return config;
  },
  (error) => {
    console.error('Request error:', error);
    return Promise.reject(error);
  }
);

// Response interceptor
api.interceptors.response.use(
  (response) => {
    console.log(`Response received:`, response.data);
    return response;
  },
  (error) => {
    console.error('Response error:', error.response || error.message);
    
    // Handle common errors
    if (error.response) {
      const { status, data } = error.response;
      
      switch (status) {
        case 404:
          console.error('Resource not found');
          break;
        case 500:
          console.error('Server error');
          break;
        default:
          console.error(`HTTP ${status}: ${data.message || 'Unknown error'}`);
      }
    } else if (error.request) {
      console.error('Network error - no response received');
    }
    
    return Promise.reject(error);
  }
);

// Overlay API endpoints
export const overlayAPI = {
  // Get all overlays
  getAll: async () => {
    try {
      const response = await api.get('/overlays');
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch overlays: ${error.message}`);
    }
  },

  // Get overlay by ID
  getById: async (id) => {
    try {
      const response = await api.get(`/overlays/${id}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to fetch overlay: ${error.message}`);
    }
  },

  // Create new overlay
  create: async (overlayData) => {
    try {
      const response = await api.post('/overlays', overlayData);
      return response;
    } catch (error) {
      throw new Error(`Failed to create overlay: ${error.message}`);
    }
  },

  // Update overlay
  update: async (id, updateData) => {
    try {
      const response = await api.put(`/overlays/${id}`, updateData);
      return response;
    } catch (error) {
      throw new Error(`Failed to update overlay: ${error.message}`);
    }
  },

  // Delete overlay
  delete: async (id) => {
    try {
      const response = await api.delete(`/overlays/${id}`);
      return response;
    } catch (error) {
      throw new Error(`Failed to delete overlay: ${error.message}`);
    }
  },

  // Toggle overlay visibility
  toggleVisibility: async (id) => {
    try {
      const response = await api.patch(`/overlays/${id}/toggle`);
      return response;
    } catch (error) {
      throw new Error(`Failed to toggle overlay visibility: ${error.message}`);
    }
  }
};

// Utility function to check API health
export const checkAPIHealth = async () => {
  try {
    const response = await api.get('/');
    return response.data;
  } catch (error) {
    throw new Error(`API health check failed: ${error.message}`);
  }
};

export default api;