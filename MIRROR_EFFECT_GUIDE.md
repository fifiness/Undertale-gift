# 🪞 Perfect Mirror Effect - Technical Details

## Overview
The webcam mirror has been optimized for a **perfect mirror experience** that replicates looking into a real mirror while maintaining UNDERTALE's aesthetic.

## Mirror Effect Features

### 1. **True Mirror Flip** ✅
- Video is horizontally flipped using `transform: scaleX(-1)`
- This creates the authentic mirror effect where movements match naturally
- Left hand in real life appears as left hand in mirror (as expected)

### 2. **High Quality Video** 📹
```javascript
video: {
  width: { ideal: 1920, min: 1280 },
  height: { ideal: 1080, min: 720 },
  facingMode: 'user',
  frameRate: { ideal: 30 }
}
```
- Requests highest quality available (up to 1920x1080)
- Minimum 720p to ensure clarity
- 30fps for smooth motion
- Front-facing camera (`facingMode: 'user'`)

### 3. **Perfect Positioning** 🎯
```css
transform: translate(-50%, -50%) scaleX(-1);
object-fit: cover;
```
- Centered both horizontally and vertically
- `object-fit: cover` ensures no black bars
- Maintains aspect ratio while filling entire screen
- No distortion or stretching

### 4. **Optimized Visibility** 💡
```css
filter: brightness(0.65) contrast(1.15) saturate(1.1);
```
- **Brightness (0.65)**: Slightly darkened so white text is readable
- **Contrast (1.15)**: Enhanced to maintain facial definition
- **Saturation (1.1)**: Slightly boosted for natural skin tones
- Balance between seeing yourself clearly and reading dialogue

### 5. **Smooth Performance** ⚡
```css
will-change: transform;
```
- GPU-accelerated rendering
- Smooth 30fps playback
- Minimal lag or stuttering
- Optimized for battery life

### 6. **Atmospheric Vignette** 🌑
```css
radial-gradient(
  rgba(0, 0, 0, 0) 0%,      /* Clear center */
  rgba(0, 0, 0, 0.2) 60%,   /* Subtle darkening */
  rgba(0, 0, 0, 0.5) 100%   /* Darker edges */
)
```
- Darkens edges while keeping center clear
- Draws focus to your reflection
- Enhances dialogue readability
- Creates depth and atmosphere

## Error Handling

### Comprehensive Error Messages
1. **NotAllowedError**: "Camera permission denied. Please allow camera access."
2. **NotFoundError**: "No camera found. Please connect a camera."
3. **NotReadableError**: "Camera is already in use by another application."
4. **Generic**: "Unable to access webcam. Please grant camera permissions."

### User-Friendly States
- **Loading**: "* Accessing mirror..." with pulse animation
- **Error**: Red bordered box with "Try Again" button
- **Prompt**: Centered "Start Mirror" button

## Responsive Design

### Desktop (Default)
- Full 1920x1080 quality
- Large dialogue boxes
- Optimal vignette effect

### Tablet (≤768px)
- Adaptive video quality
- Smaller UI elements
- Adjusted padding

### Mobile (≤480px)
- Minimum 720p quality
- Compact dialogue boxes
- Touch-friendly buttons

## Technical Implementation

### Video Element
```jsx
<video
  ref={videoRef}
  autoPlay          // Starts immediately
  playsInline       // iOS compatibility
  muted             // No audio feedback
  className="mirror-video"
/>
```

### Stream Cleanup
```javascript
useEffect(() => {
  return () => {
    const tracks = videoRef.current.srcObject.getTracks();
    tracks.forEach(track => track.stop());
  };
}, []);
```
- Properly stops camera when leaving page
- Prevents camera staying on
- Releases hardware resources

## Mirror Effect Checklist

✅ **Horizontal Flip**: Video is mirrored (scaleX(-1))
✅ **Full Screen**: Cover entire viewport
✅ **High Quality**: 1080p ideal, 720p minimum
✅ **Smooth Motion**: 30fps playback
✅ **Readable Text**: Balanced brightness/contrast
✅ **Natural Colors**: Enhanced saturation
✅ **Atmospheric**: Vignette effect
✅ **Centered**: Perfect positioning
✅ **No Distortion**: Maintains aspect ratio
✅ **Responsive**: Works on all screen sizes
✅ **Clean Cleanup**: Stops camera on exit
✅ **Error Handling**: Helpful error messages

## Testing the Mirror

1. Click "START MIRROR"
2. Allow camera permission
3. Verify:
   - ✅ Your reflection is horizontally flipped (like a real mirror)
   - ✅ Movements are natural (raise right hand, right hand raises in mirror)
   - ✅ Video fills entire screen without black bars
   - ✅ Face is clearly visible but not too bright
   - ✅ Dialogue text is easily readable
   - ✅ Edges are slightly darker (vignette)
   - ✅ No lag or stuttering

## Tips for Best Experience

1. **Lighting**: Face a light source for best visibility
2. **Position**: Center yourself in frame
3. **Distance**: Sit about arm's length from camera
4. **Browser**: Use Chrome/Edge for best performance
5. **Privacy**: Camera only activates when you click the button

---

**The mirror is now perfect!** It combines the authentic mirror effect with UNDERTALE's atmospheric style while keeping you clearly visible. 🪞✨
