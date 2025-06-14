## 🗣 TASK 2 PLAN: TTS + ffmpeg Integration (Prototype Phase)

### **Objective**
Attach an AI-generated voice-over to each Playwright video and output MP4.

### **Prototype Deliverables**
1. 10-second sample MP4 (Filesystem demo + voice) → `demos/filesystem-voice.mp4`
2. Script `scripts/merge-video-audio.js` (done) + doc (`docs/video-pipeline.md`).
3. CLI example for generating voice with macOS `say` (placeholder for ElevenLabs).

### **Approach**
1. Generate voice track (`audio.mp3`).  
2. Run merge script – wraps ffmpeg command.
3. Verify sync and size.

### **Dependencies**
• ffmpeg binary present in environment.  
• TTS source (local `say` or remote API).

### **Timeline**
| Task | Est. |
|------|------|
| Voice placeholder & merge demo | 1 h |
| Capture sync issues & tweak | 1 h |
| Prep report with sample MP4 | 0.5 h |

### **Questions for User**
1. OK to rely on macOS `say` for prototype audio?  
2. Preferred voice (e.g., Samantha, Alex) or just default?

### **Approval Needed**
- [ ] Proceed to build sample MP4 with placeholder TTS?  
- [ ] Any specific script line for narration? 