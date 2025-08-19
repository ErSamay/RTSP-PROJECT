// frontend/src/components/Landing.jsx
import { useState } from 'react';

const Landing = ({ onStreamStart }) => {
  const [rtspUrl, setRtspUrl] = useState('');
  const [error, setError] = useState('');

  // Sample RTSP URLs for testing
  const sampleUrls = [
    {
      name: 'Big Buck Bunny (Test Stream)',
      url: 'rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4'
    },
    {
      name: 'Sample Demo Stream',
      url: 'rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264'
    }
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');

    if (!rtspUrl.trim()) {
      setError('Please enter a valid RTSP URL');
      return;
    }

    if (!rtspUrl.startsWith('rtsp://')) {
      setError('URL must start with rtsp://');
      return;
    }

    onStreamStart(rtspUrl.trim());
  };

  const handleSampleUrl = (url) => {
    setRtspUrl(url);
    setError('');
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center">
      <div className="card w-full max-w-2xl bg-base-200 shadow-xl">
        <div className="card-body">
          <h2 className="card-title text-3xl mb-6 justify-center">
            🎥 Welcome to Livestream Overlay App
          </h2>
          
          <p className="text-center mb-8 text-lg">
            Enter an RTSP URL to start watching your livestream with custom overlays
          </p>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="form-control">
              <label className="label">
                <span className="label-text text-lg font-medium">RTSP Stream URL</span>
              </label>
              <input
                type="url"
                placeholder="rtsp://example.com/stream"
                className={`input input-bordered input-lg ${error ? 'input-error' : ''}`}
                value={rtspUrl}
                onChange={(e) => {
                  setRtspUrl(e.target.value);
                  setError('');
                }}
              />
              {error && (
                <label className="label">
                  <span className="label-text-alt text-error">{error}</span>
                </label>
              )}
            </div>

            <button
              type="submit"
              className="btn btn-primary btn-lg w-full"
              disabled={!rtspUrl.trim()}
            >
              🚀 Start Livestream
            </button>
          </form>

          <div className="divider">OR TRY SAMPLE STREAMS</div>

          <div className="space-y-3">
            <p className="text-sm text-base-content/70 text-center">
              Don't have an RTSP URL? Try these sample streams:
            </p>
            
            {sampleUrls.map((sample, index) => (
              <div key={index} className="card bg-base-100 border">
                <div className="card-body py-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h4 className="font-medium">{sample.name}</h4>
                      <p className="text-sm text-base-content/70 font-mono">
                        {sample.url}
                      </p>
                    </div>
                    <button
                      className="btn btn-outline btn-sm"
                      onClick={() => handleSampleUrl(sample.url)}
                    >
                      Use This
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="alert alert-info mt-6">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="stroke-current shrink-0 w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
            </svg>
            <div>
              <h3 className="font-bold">How to get RTSP URLs:</h3>
              <div className="text-sm mt-2">
                <p>• Visit <strong>rtsp.me</strong> to create temporary streams from video files</p>
                <p>• Use IP camera RTSP streams (if available)</p>
                <p>• Try the sample URLs provided above</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Landing;