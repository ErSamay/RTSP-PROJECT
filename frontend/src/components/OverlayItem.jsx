// frontend/src/components/OverlayItem.jsx
import { useState } from 'react';
import Draggable from 'react-draggable';

const OverlayItem = ({ overlay, onEdit, onDelete, onToggleVisibility, onUpdate }) => {
  const [position, setPosition] = useState(overlay.position);

  const handleDrag = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    setPosition(newPosition);
  };

  const handleDragStop = (e, data) => {
    const newPosition = { x: data.x, y: data.y };
    onUpdate({ position: newPosition });
  };

  const getTypeIcon = (type) => {
    switch (type) {
      case 'text': return '📝';
      case 'logo': return '🖼️';
      default: return '📄';
    }
  };

  const getVisibilityIcon = (isVisible) => {
    return isVisible ? '👁️' : '🙈';
  };

  return (
    <div className="card bg-base-100 border">
      <div className="card-body p-4">
        {/* Header */}
        <div className="flex justify-between items-start mb-3">
          <div className="flex items-center gap-2">
            <span className="text-xl">{getTypeIcon(overlay.type)}</span>
            <div>
              <h4 className="font-bold">{overlay.name}</h4>
              <p className="text-sm text-base-content/60 capitalize">
                {overlay.type} Overlay
              </p>
            </div>
          </div>
          
          <div className="flex gap-1">
            <button
              className={`btn btn-xs ${overlay.isVisible ? 'btn-success' : 'btn-error'}`}
              onClick={onToggleVisibility}
              title={overlay.isVisible ? 'Hide overlay' : 'Show overlay'}
            >
              {getVisibilityIcon(overlay.isVisible)}
            </button>
            <button
              className="btn btn-xs btn-primary"
              onClick={onEdit}
              title="Edit overlay"
            >
              ✏️
            </button>
            <button
              className="btn btn-xs btn-error"
              onClick={onDelete}
              title="Delete overlay"
            >
              🗑️
            </button>
          </div>
        </div>

        {/* Preview */}
        <div className="bg-black rounded-lg p-4 relative min-h-32 overflow-hidden">
          <div className="text-xs text-white/50 mb-2">Preview:</div>
          
          {overlay.isVisible && (
            <Draggable
              position={position}
              onDrag={handleDrag}
              onStop={handleDragStop}
              bounds="parent"
            >
              <div
                className="absolute cursor-move select-none"
                style={{
                  color: overlay.style.color,
                  fontSize: overlay.style.fontSize,
                  backgroundColor: overlay.style.backgroundColor || 'rgba(0,0,0,0.5)',
                  padding: '4px 8px',
                  borderRadius: '4px',
                  border: '1px dashed rgba(255,255,255,0.3)',
                  minWidth: overlay.size.width + 'px',
                  minHeight: overlay.size.height + 'px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                {overlay.content}
              </div>
            </Draggable>
          )}

          {!overlay.isVisible && (
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-white/50 text-center">
                <div className="text-2xl mb-2">🙈</div>
                <p className="text-sm">Overlay Hidden</p>
              </div>
            </div>
          )}
        </div>

        {/* Details */}
        <div className="mt-3 space-y-2">
          <div className="grid grid-cols-2 gap-4 text-sm">
            <div>
              <span className="text-base-content/60">Content:</span>
              <p className="font-mono truncate">{overlay.content}</p>
            </div>
            <div>
              <span className="text-base-content/60">Position:</span>
              <p className="font-mono">x: {Math.round(position.x)}, y: {Math.round(position.y)}</p>
            </div>
          </div>
          
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <span className="text-base-content/60">Size:</span>
              <p className="font-mono">{overlay.size.width}×{overlay.size.height}</p>
            </div>
            <div>
              <span className="text-base-content/60">Color:</span>
              <div className="flex items-center gap-2">
                <div 
                  className="w-4 h-4 rounded border"
                  style={{ backgroundColor: overlay.style.color }}
                ></div>
                <span className="font-mono text-xs">{overlay.style.color}</span>
              </div>
            </div>
            <div>
              <span className="text-base-content/60">Font:</span>
              <p className="font-mono">{overlay.style.fontSize}</p>
            </div>
          </div>

          <div className="text-xs text-base-content/40">
            Created: {new Date(overlay.createdAt).toLocaleDateString()}
          </div>
        </div>

        {/* Drag Instructions */}
        <div className="alert alert-info py-2 mt-3">
          <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-4 h-4">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
          <span className="text-xs">
            Drag the overlay in the preview to reposition it. Changes are saved automatically.
          </span>
        </div>
      </div>
    </div>
  );
};

export default OverlayItem;
