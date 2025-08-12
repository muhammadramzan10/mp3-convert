import express from 'express';
import cors from 'cors';
import { spawn } from 'child_process';
import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';
import path from 'path';

const app = express();
const PORT = process.env.PORT || 3000;
const API_KEY = process.env.API_KEY || null;
const TEMP_DIR = './temp';

if (!fs.existsSync(TEMP_DIR)) {
  fs.mkdirSync(TEMP_DIR);
}

app.use(cors());
app.use(express.json());

if (API_KEY) {
  app.use((req, res, next) => {
    if (req.headers['x-api-key'] !== API_KEY) {
      return res.status(403).json({ error: 'Forbidden' });
    }
    next();
  });
}

app.post('/convert', async (req, res) => {
  const { url, quality } = req.body;
  if (!url) return res.status(400).json({ error: 'Missing URL' });

  const id = uuidv4();
  const outputPath = path.join(TEMP_DIR, `${id}.mp3`);

  const ytDlpArgs = [
    '-x',
    '--audio-format', 'mp3',
    '--audio-quality', quality || '192K',
    '-o', outputPath,
    url
  ];

  const process = spawn('yt-dlp', ytDlpArgs);

  process.stderr.on('data', data => {
    console.error(data.toString());
  });

  process.on('close', code => {
    if (code === 0 && fs.existsSync(outputPath)) {
      res.download(outputPath, 'audio.mp3', err => {
        fs.unlinkSync(outputPath);
        if (err) console.error('Error sending file:', err);
      });
    } else {
      res.status(500).json({ error: 'Conversion failed' });
    }
  });
});

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
