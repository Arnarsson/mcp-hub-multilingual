#!/usr/bin/env node
/*
 * video-to-gif.js
 * Convert an input video (mp4/webm) to a short GIF clip for social sharing.
 *
 * Usage:
 *   node scripts/video-to-gif.js <inputVideo> <outputGif> [durationSeconds]
 *
 * Example:
 *   node scripts/video-to-gif.js public/videos/filesystem-story-demo.mp4 public/gifs/filesystem-story-demo.gif 8
 */
const { execSync } = require('child_process');
const fs = require('fs');

function usage() {
  console.log('Usage: node scripts/video-to-gif.js <inputVideo> <outputGif> [durationSeconds]');
  process.exit(1);
}

const [, , inputVideo, outputGif, durationArg] = process.argv;
if (!inputVideo || !outputGif) usage();

const duration = durationArg || '8'; // default 8 seconds

if (!fs.existsSync(inputVideo)) {
  console.error(`❌ Input video not found: ${inputVideo}`);
  process.exit(1);
}

// Ensure output directory exists
const path = require('path');
fs.mkdirSync(path.dirname(outputGif), { recursive: true });

try {
  // Palette generation for better quality
  const palette = path.join(path.dirname(outputGif), 'palette.png');
  execSync(`ffmpeg -y -t ${duration} -i ${inputVideo} -vf fps=15,scale=640:-1:flags=lanczos,palettegen ${palette}`, { stdio: 'inherit' });
  execSync(`ffmpeg -y -t ${duration} -i ${inputVideo} -i ${palette} -filter_complex "fps=15,scale=640:-1:flags=lanczos[x];[x][1:v]paletteuse" ${outputGif}`, { stdio: 'inherit' });
  fs.rmSync(palette);
  console.log(`✅ GIF generated at ${outputGif}`);
} catch (err) {
  console.error('❌ ffmpeg GIF generation failed:', err.message);
  process.exit(1);
} 