// frontend/src/App.jsx
import { useState } from 'react';
import Landing from './components/Landing';
import VideoPlayer from './components/VideoPlayer';
import './App.css';

function App() {
  const [rtspUrl, setRtspUrl] = useState('');
  const [showPlayer, setShowPlayer] = useState(false);

  const handleStreamStart = (url) => {
    setRtspUrl(url);
    setShowPlayer(true);
  };

  const handleBackToLanding = () => {
    setShowPlayer(false);
    setRtspUrl('');
  };

  return (
    <div className="min-h-screen bg-base-100">
      <div className="navbar bg-primary text-primary-content">
        <div className="flex-1">
          <h1 className="text-xl font-bold">Livestream Overlay App</h1>
        </div>
        {showPlayer && (
          <div className="flex-none">
            <button 
              className="btn btn-secondary btn-sm"
              onClick={handleBackToLanding}
            >
              ← Back to Landing
            </button>
          </div>
        )}
      </div>

      <main className="container mx-auto p-4">
        {!showPlayer ? (
          <Landing onStreamStart={handleStreamStart} />
        ) : (
          <VideoPlayer rtspUrl={rtspUrl} />
        )}
      </main>

      <footer className="footer footer-center p-4 bg-base-300 text-base-content mt-8">
        <div>
          <p>&copy; 2025 Livestream Overlay App. Built with React, Node.js & MongoDB.</p>
        </div>
      </footer>
    </div>
  );
}

export default App;