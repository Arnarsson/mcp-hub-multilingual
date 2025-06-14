#!/usr/bin/env node
/*
 * merge-video-audio.js
 * Merge a Playwright‐recorded WebM video with a voice-over audio track to produce an MP4.
 * Usage: node scripts/merge-video-audio.js <inputVideo.webm> <inputAudio.mp3> <output.mp4>
 */
const { execSync } = require('child_process');
const path = require('path');

function usage() {
  console.log('Usage: node scripts/merge-video-audio.js <video.webm> <audio.(mp3|wav|aiff)> <output.mp4>');
  process.exit(1);
}

const [ , , videoPath, audioPath, outputPath ] = process.argv;
if (!videoPath || !audioPath || !outputPath) usage();

try {
  execSync(`ffmpeg -y -i ${videoPath} -i ${audioPath} -map 0:v:0 -map 1:a:0 -c:v libx264 -preset slow -crf 18 -c:a aac -b:a 192k ${outputPath}`, { stdio: 'inherit' });
  console.log(`✅ Merged video written to ${outputPath}`);
} catch (err) {
  console.error('❌ ffmpeg merge failed:', err.message);
  process.exit(1);
} 