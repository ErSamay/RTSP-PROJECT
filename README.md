Prerequisites

Node.js (v16 or higher)
MongoDB (local installation or MongoDB Atlas)
npm or yarn


# Terminal 1 - Backend
cd backend && npm i && npm run dev
Server will run on http://localhost:5000

API Documentation
Base URL: http://localhost:5000/api# RTSP Video Streaming Application with Overlay Management

A full-stack application for streaming RTSP video feeds with real-time overlay management capabilities. Built with Node.js/Express backend and modern frontend technologies.

## 🚀 Features

- **RTSP Stream Integration**: Stream video from any RTSP-compatible source
- **Real-time Overlay Management**: Add, edit, and manage text and logo overlays
- **Interactive Controls**: Play/pause, volume control, and fullscreen viewing
- **Drag & Drop Interface**: Intuitive overlay positioning with drag-and-drop
- **Persistent Storage**: All overlays saved to MongoDB database
- **Responsive Design**: Works across different screen sizes

## 📋 Prerequisites

Before running the application, ensure you have:

- **Node.js** (v16 or higher) - [Download here](https://nodejs.org/)
- **MongoDB** - Choose one:
  - Local installation - [Installation guide](https://docs.mongodb.com/manual/installation/)
  - MongoDB Atlas (cloud) - [Get started](https://www.mongodb.com/atlas)
- **npm** or **yarn** package manager

## 🛠️ Installation & Setup

### 1. Clone the Repository
```bash
git clone <your-repository-url>
cd <project-directory>
```

### 2. Backend Setup
```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Create environment file (optional)
cp .env.example .env

# Start development server
npm run dev
```
The backend server will start on `http://localhost:5000`

### 3. Frontend Setup
```bash
# Open a new terminal and navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start development server
npm run dev
```
The frontend application will start on `http://localhost:5173`

## 📚 API Documentation

### Base URL
```
http://localhost:5000/api
```

### Overlay Endpoints

#### Get All Overlays
```http
GET /overlays
```

**Example:**
```bash
curl -X GET http://localhost:5000/api/overlays
```

#### Create New Overlay
```http
POST /overlays
Content-Type: application/json
```

**Request Body:**
```json
{
  "name": "Logo Overlay",
  "type": "logo",
  "content": "Company Logo",
  "position": {"x": 10, "y": 10},
  "size": {"width": 100, "height": 50},
  "style": {"color": "#ffffff", "fontSize": "16px"}
}
```

**Example:**
```bash
curl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Logo Overlay",
    "type": "logo",
    "content": "Company Logo",
    "position": {"x": 10, "y": 10},
    "size": {"width": 100, "height": 50},
    "style": {"color": "#ffffff", "fontSize": "16px"}
  }'
```

#### Update Overlay
```http
PUT /overlays/:id
Content-Type: application/json
```

**Example:**
```bash
curl -X PUT http://localhost:5000/api/overlays/OVERLAY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Logo",
    "position": {"x": 20, "y": 20}
  }'
```

#### Delete Overlay
```http
DELETE /overlays/:id
```

**Example:**
```bash
curl -X DELETE http://localhost:5000/api/overlays/OVERLAY_ID
```

## 📖 Usage Guide

### Getting Started

1. **Launch the Application**
   - Ensure both backend and frontend servers are running
   - Navigate to `http://localhost:5173` in your browser

2. **Enter RTSP Stream**
   - On the landing page, enter your RTSP URL
   - Click "Connect" to start streaming

### Video Controls

| Control | Description |
|---------|-------------|
| **Play/Pause** | Start or stop the video stream |
| **Volume** | Adjust audio volume with the slider |
| **Fullscreen** | Enter/exit fullscreen mode |

### Overlay Management

#### Adding Overlays
- **Text Overlay**: Click "Add Text Overlay" to add customizable text
- **Logo Overlay**: Click "Add Logo Overlay" for image overlays

#### Editing Overlays
- **Select**: Click on any overlay to select and edit
- **Move**: Drag overlays to reposition them
- **Resize**: Use corner handles to adjust size
- **Properties**: Edit text, colors, and styling options
- **Save**: Changes are automatically saved to database
- **Delete**: Remove unwanted overlays

#### Overlay Types

**Text Overlays**
- Custom text content
- Font size adjustment
- Color customization
- Position and size control

**Logo Overlays**
- Image/logo placement
- Size and position control
- Transparency options (if supported)

## 🧪 Testing RTMP Streams

### Using RTSP.me (Recommended for Testing)
1. Visit [rtsp.me](https://rtsp.me)
2. Upload your video file
3. Copy the generated RTSP URL
4. Paste it into the application

### Sample Test Streams

| Stream Name | URL | Description |
|-------------|-----|-------------|
| **Big Buck Bunny** | `rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4` | High-quality test video |
| **Sample Camera Feed** | `rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp` | Live camera simulation |

### Creating Your Own Test Stream

For development purposes, you can create your own RTSP stream using:
- **FFmpeg**: Convert local video files to RTSP streams
- **OBS Studio**: Stream from your webcam or screen
- **VLC Media Player**: Stream local files over network

## 🔧 Configuration

### Environment Variables

Create a `.env` file in the backend directory:

```env
PORT=5000
MONGODB_URI=mongodb://localhost:27017/rtsp-overlay-app
NODE_ENV=development
```

### Database Configuration

The application uses MongoDB to store overlay configurations. Ensure your MongoDB instance is running and accessible.

## 🚨 Troubleshooting

### Common Issues

**RTSP Stream Not Loading**
- Verify the RTSP URL is correct and accessible
- Check network firewall settings
- Ensure the stream format is supported

**Overlays Not Saving**
- Check MongoDB connection
- Verify backend server is running
- Check browser console for errors

**Performance Issues**
- Try reducing video quality in RTSP settings
- Close unnecessary browser tabs
- Check system resources

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🙋‍♂️ Support

If you encounter any issues or have questions:
- Check the [troubleshooting section](#🚨-troubleshooting)
- Open an issue on GitHub
- Contact the development team

---

**Happy Streaming! 🎥**
Overlay Endpoints
GET /overlays
Get all saved overlays
bashcurl -X GET http://localhost:5000/api/overlays
POST /overlays
Create a new overlay
bashcurl -X POST http://localhost:5000/api/overlays \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Logo Overlay",
    "type": "logo",
    "content": "Company Logo",
    "position": {"x": 10, "y": 10},
    "size": {"width": 100, "height": 50},
    "style": {"color": "#ffffff", "fontSize": "16px"}
  }'
PUT /overlays/:id
Update an existing overlay
bashcurl -X PUT http://localhost:5000/api/overlays/OVERLAY_ID \
  -H "Content-Type: application/json" \
  -d '{
    "name": "Updated Logo",
    "position": {"x": 20, "y": 20}
  }'
DELETE /overlays/:id
Delete an overlay
bashcurl -X DELETE http://localhost:5000/api/overlays/OVERLAY_ID


# Terminal 2 - Frontend  
cd frontend && npm i  && npm run dev
Frontend will run on http://localhost:5173



Usage Guide
1. Landing Page

Enter an RTSP URL (you can use RTSP.me or create a test stream)
Example RTSP URLs for testing:

rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4
rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp?profile=profile_1_h264



2. Video Controls

Play/Pause: Click the play button to start/stop the stream
Volume: Adjust volume using the volume slider
Fullscreen: Click fullscreen button for immersive viewing

3. Overlay Management

Add Overlay: Click "Add Text Overlay" or "Add Logo Overlay"
Edit: Click on any overlay to edit its properties
Drag: Drag overlays to reposition them on the video
Resize: Use corner handles to resize overlays
Save: All changes are automatically saved to the database
Delete: Remove overlays you no longer need

4. Overlay Types

Text Overlays: Add custom text with color and font size options
Logo Overlays: Add image/logo overlays (placeholder functionality)

Testing RTSP Streams
Using RTSP.me

Visit rtsp.me
Upload a video file
Copy the generated RTSP URL
Paste it in the application

Alternative Test Streams

Big Buck Bunny: rtsp://wowzaec2demo.streamlock.net/vod/mp4:BigBuckBunny_115k.mp4
Sample Camera Feed: rtsp://demo:demo@ipvmdemo.dyndns.org:5541/onvif-media/media.amp

