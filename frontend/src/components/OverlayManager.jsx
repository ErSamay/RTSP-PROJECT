// frontend/src/components/OverlayManager.jsx
import { useState, useEffect } from 'react';
import OverlayItem from './OverlayItem';
import { overlayAPI } from '../services/api';

const OverlayManager = () => {
  const [overlays, setOverlays] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [editingOverlay, setEditingOverlay] = useState(null);

  // Form state
  const [formData, setFormData] = useState({
    name: '',
    type: 'text',
    content: '',
    position: { x: 50, y: 50 },
    size: { width: 200, height: 40 },
    style: {
      color: '#ffffff',
      fontSize: '16px',
      backgroundColor: 'rgba(0,0,0,0.5)'
    }
  });

  // Fetch overlays on component mount
  useEffect(() => {
    fetchOverlays();
  }, []);

  const fetchOverlays = async () => {
    try {
      setLoading(true);
      const response = await overlayAPI.getAll();
      setOverlays(response.data.data || []);
      setError('');
    } catch (err) {
      setError('Failed to fetch overlays');
      console.error('Error fetching overlays:', err);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateOverlay = async (e) => {
    e.preventDefault();
    try {
      const response = await overlayAPI.create(formData);
      setOverlays([...overlays, response.data.data]);
      resetForm();
      setShowAddForm(false);
    } catch (err) {
      setError('Failed to create overlay');
      console.error('Error creating overlay:', err);
    }
  };

  const handleUpdateOverlay = async (id, updateData) => {
    try {
      const response = await overlayAPI.update(id, updateData);
      setOverlays(overlays.map(overlay => 
        overlay._id === id ? response.data.data : overlay
      ));
      setEditingOverlay(null);
    } catch (err) {
      setError('Failed to update overlay');
      console.error('Error updating overlay:', err);
    }
  };

  const handleDeleteOverlay = async (id) => {
    if (!window.confirm('Are you sure you want to delete this overlay?')) return;
    
    try {
      await overlayAPI.delete(id);
      setOverlays(overlays.filter(overlay => overlay._id !== id));
    } catch (err) {
      setError('Failed to delete overlay');
      console.error('Error deleting overlay:', err);
    }
  };

  const handleToggleVisibility = async (id) => {
    try {
      const response = await overlayAPI.toggleVisibility(id);
      setOverlays(overlays.map(overlay => 
        overlay._id === id ? response.data.data : overlay
      ));
    } catch (err) {
      setError('Failed to toggle visibility');
      console.error('Error toggling visibility:', err);
    }
  };

  const resetForm = () => {
    setFormData({
      name: '',
      type: 'text',
      content: '',
      position: { x: 50, y: 50 },
      size: { width: 200, height: 40 },
      style: {
        color: '#ffffff',
        fontSize: '16px',
        backgroundColor: 'rgba(0,0,0,0.5)'
      }
    });
  };

  const startEditing = (overlay) => {
    setEditingOverlay(overlay._id);
    setFormData({
      name: overlay.name,
      type: overlay.type,
      content: overlay.content,
      position: overlay.position,
      size: overlay.size,
      style: overlay.style
    });
    setShowAddForm(true);
  };

  const handleFormChange = (field, value) => {
    if (field.includes('.')) {
      const [parent, child] = field.split('.');
      setFormData(prev => ({
        ...prev,
        [parent]: {
          ...prev[parent],
          [child]: value
        }
      }));
    } else {
      setFormData(prev => ({
        ...prev,
        [field]: value
      }));
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {error && (
        <div className="alert alert-error">
          <span>{error}</span>
          <button 
            className="btn btn-ghost btn-sm"
            onClick={() => setError('')}
          >
            ✕
          </button>
        </div>
      )}

      {/* Add/Edit Form */}
      {showAddForm && (
        <div className="card bg-base-100 border">
          <div className="card-body">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-bold">
                {editingOverlay ? 'Edit Overlay' : 'Add New Overlay'}
              </h3>
              <button 
                className="btn btn-ghost btn-sm"
                onClick={() => {
                  setShowAddForm(false);
                  setEditingOverlay(null);
                  resetForm();
                }}
              >
                ✕
              </button>
            </div>

            <form onSubmit={editingOverlay ? 
              (e) => {
                e.preventDefault();
                handleUpdateOverlay(editingOverlay, formData);
              } : 
              handleCreateOverlay
            } className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Name</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.name}
                  onChange={(e) => handleFormChange('name', e.target.value)}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Type</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.type}
                  onChange={(e) => handleFormChange('type', e.target.value)}
                >
                  <option value="text">Text</option>
                  <option value="logo">Logo</option>
                </select>
              </div>

              <div className="form-control md:col-span-2">
                <label className="label">
                  <span className="label-text">Content</span>
                </label>
                <input
                  type="text"
                  className="input input-bordered"
                  value={formData.content}
                  onChange={(e) => handleFormChange('content', e.target.value)}
                  placeholder={formData.type === 'text' ? 'Enter text content' : 'Enter logo URL or text'}
                  required
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Text Color</span>
                </label>
                <input
                  type="color"
                  className="input input-bordered h-12"
                  value={formData.style.color}
                  onChange={(e) => handleFormChange('style.color', e.target.value)}
                />
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Font Size</span>
                </label>
                <select
                  className="select select-bordered"
                  value={formData.style.fontSize}
                  onChange={(e) => handleFormChange('style.fontSize', e.target.value)}
                >
                  <option value="12px">Small (12px)</option>
                  <option value="16px">Medium (16px)</option>
                  <option value="20px">Large (20px)</option>
                  <option value="24px">Extra Large (24px)</option>
                </select>
              </div>

              <div className="md:col-span-2">
                <button type="submit" className="btn btn-primary">
                  {editingOverlay ? 'Update Overlay' : 'Create Overlay'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Add Button */}
      {!showAddForm && (
        <div className="flex gap-2">
          <button 
            className="btn btn-primary"
            onClick={() => setShowAddForm(true)}
          >
            ➕ Add Text Overlay
          </button>
          <button 
            className="btn btn-secondary"
            onClick={() => {
              setFormData(prev => ({ ...prev, type: 'logo' }));
              setShowAddForm(true);
            }}
          >
            🖼️ Add Logo Overlay
          </button>
        </div>
      )}

      {/* Overlays List */}
      {overlays.length === 0 ? (
        <div className="text-center py-8 text-base-content/60">
          <div className="text-4xl mb-4">📝</div>
          <p>No overlays created yet. Add your first overlay above!</p>
        </div>
      ) : (
        <div className="grid gap-4">
          {overlays.map(overlay => (
            <OverlayItem
              key={overlay._id}
              overlay={overlay}
              onEdit={() => startEditing(overlay)}
              onDelete={() => handleDeleteOverlay(overlay._id)}
              onToggleVisibility={() => handleToggleVisibility(overlay._id)}
              onUpdate={(updateData) => handleUpdateOverlay(overlay._id, updateData)}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default OverlayManager;

