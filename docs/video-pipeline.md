# 📽 MCP Hub Video Pipeline – Prototype

## Overview
This pipeline turns Playwright-recorded WebM clips into share-ready MP4 tutorials with optional AI voice-over.

```
┌────────┐   Playwright    ┌────────────┐  ffmpeg merge   ┌────────┐
│ demo   │  ──video.webm─▶ │ voice-over │ ───────────────▶│  mp4   │
└────────┘                 └────────────┘                 └────────┘
```

## Steps
1. `npm run tutorials` – records 720 p WebM files to `tutorial_videos/…/video.webm`.
2. Generate voice-over: macOS example using `say` (replace with ElevenLabs later):
   ```bash
   say -v Samantha "Welcome to MCP Hub." -o audio.aiff
   ffmpeg -y -i audio.aiff -acodec libmp3lame audio.mp3
   ```
3. Merge:
   ```bash
   node scripts/merge-video-audio.js tutorial_videos/.../video.webm audio.mp3 output.mp4
   ```

## Quality settings
* Video: H.264, CRF 18, preset slow  
* Audio: AAC 192 kbps  
* Target size: ≤2 MB for 6 s clip

## Next improvements
* Swap `say` with ElevenLabs API (`curl` to /v1/text-to-speech).  
* Automate steps in GitHub Actions.  
* Convert additional promos to GIF (`ffmpeg -t 8 -vf fps=15 ...`). 