// frontend/src/components/VideoPlayer.jsx
import { useState, useRef, useEffect } from 'react';
import OverlayManager from './OverlayManager';

const VideoPlayer = ({ rtspUrl }) => {
  const videoRef = useRef(null);
  const containerRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [videoError, setVideoError] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const video = videoRef.current;
    if (video) {
      video.volume = volume;
      setIsLoading(true);
      setVideoError(false);
    }
  }, [volume, rtspUrl]);

  const togglePlay = () => {
    const video = videoRef.current;
    if (video) {
      if (isPlaying) {
        video.pause();
      } else {
        video.play().catch((error) => {
          console.error('Error playing video:', error);
          setVideoError(true);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleVolumeChange = (e) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (videoRef.current) {
      videoRef.current.volume = newVolume;
    }
  };

  const toggleFullscreen = () => {
    const container = containerRef.current;
    
    if (!isFullscreen) {
      if (container.requestFullscreen) {
        container.requestFullscreen();
      }
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
    setIsFullscreen(!isFullscreen);
  };

  const handleVideoLoad = () => {
    setIsLoading(false);
    setVideoError(false);
  };

  const handleVideoError = () => {
    setIsLoading(false);
    setVideoError(true);
  };

  return (
    <div className="space-y-6">
      {/* Video Player Section */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">
            📺 Live Stream Player
            <div className="badge badge-primary">LIVE</div>
          </h2>
          
          <div 
            ref={containerRef}
            className="relative bg-black rounded-lg overflow-hidden aspect-video"
          >
            {isLoading && !videoError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black">
                <div className="text-center">
                  <span className="loading loading-spinner loading-lg text-primary"></span>
                  <p className="text-white mt-4">Loading stream...</p>
                </div>
              </div>
            )}

            {videoError ? (
              <div className="absolute inset-0 flex items-center justify-center bg-black text-white text-center p-8">
                <div>
                  <div className="text-6xl mb-4">⚠️</div>
                  <h3 className="text-xl font-bold mb-2">Stream Unavailable</h3>
                  <p className="text-sm opacity-75 mb-4">
                    Unable to load the RTSP stream. This might be due to:
                  </p>
                  <ul className="text-sm opacity-75 text-left">
                    <li>• Browser compatibility issues with RTSP</li>
                    <li>• Stream server is offline</li>
                    <li>• Network connectivity problems</li>
                    <li>• Invalid RTSP URL</li>
                  </ul>
                  <p className="text-xs mt-4 opacity-50">
                    URL: {rtspUrl}
                  </p>
                </div>
              </div>
            ) : (
              <video
                ref={videoRef}
                className="w-full h-full"
                onLoadStart={handleVideoLoad}
                onError={handleVideoError}
                onCanPlay={() => setIsLoading(false)}
              >
                <source src={rtspUrl} type="application/x-rtsp" />
                Your browser does not support RTSP streams.
              </video>
            )}

            {/* Overlay Container */}
            <div className="absolute inset-0 pointer-events-none">
              <OverlayManager videoContainer={containerRef.current} />
            </div>
          </div>

          {/* Video Controls */}
          <div className="flex items-center gap-4 mt-4">
            <button
              className={`btn ${isPlaying ? 'btn-error' : 'btn-success'}`}
              onClick={togglePlay}
              disabled={videoError}
            >
              {isPlaying ? '⏸️ Pause' : '▶️ Play'}
            </button>

            <div className="flex items-center gap-2 flex-1">
              <span className="text-sm">🔊</span>
              <input
                type="range"
                min="0"
                max="1"
                step="0.1"
                value={volume}
                onChange={handleVolumeChange}
                className="range range-sm flex-1 max-w-xs"
              />
              <span className="text-sm w-12">{Math.round(volume * 100)}%</span>
            </div>

            <button
              className="btn btn-outline"
              onClick={toggleFullscreen}
              disabled={videoError}
            >
              {isFullscreen ? '🔳' : '⛶'} Fullscreen
            </button>
          </div>

          <div className="text-sm opacity-60 mt-2">
            <strong>Stream:</strong> {rtspUrl}
          </div>
        </div>
      </div>

      {/* Overlay Management Section */}
      <div className="card bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title mb-4">
            🎨 Overlay Management
          </h2>
          <OverlayManager />
        </div>
      </div>
    </div>
  );
};

export default VideoPlayer;