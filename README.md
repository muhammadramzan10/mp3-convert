README (quickstart)Create a GitHub repo and copy these files into it along with server.js (the backend canvas file).
Local test (optional)
Install Node.js (v18+), yt-dlp, and ffmpeg on your machine.
Clone the repo and run:
npm install
node server.jsTest with curl (replace VIDEO_URL):
curl -X POST 'http://localhost:3000/convert' \
  -H 'Content-Type: application/json' \
  -d '{"url":"VIDEO_URL","quality":"192K"}' --output sample.mp3Deploy with Docker (Render, Railway, VPS)
Push your repo to GitHub.
On Render: Create a new Web Service -> Connect GitHub -> Choose the repo -> Render will use the Dockerfile to build the image.
Set environment variables if needed (API_KEY, MAX_CONCURRENCY).
WordPress integration
In your frontend HTML (the canvas file), set API_ENDPOINT to https://your-service-url/convert.
If you use an API key, add the header x-api-key in the fetch call.
Notes & troubleshooting
Ensure yt-dlp and ffmpeg are installed in the environment (Dockerfile installs them).
Check server logs on your hosting panel if conversions fail.
If deployment fails due to missing packages, verify the Docker build steps.
