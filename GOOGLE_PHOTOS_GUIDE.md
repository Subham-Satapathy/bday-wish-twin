# 📸 Photo Integration Guide

## How to Add Your Photos to Twin's Birthday Website

✅ **RECOMMENDED**: Use local images in the `public/images/` folder for best performance and reliability.

### Method 1: Local Images (Recommended) ⭐

**This is the best and simplest approach!**

1. **Create your photos**: Save/download photos from Google Photos to your computer
2. **Copy to project**: Put them in `public/images/` folder
3. **Name them**: `photo1.jpg`, `photo2.jpg`, `photo3.jpg`, etc.
4. **That's it!** The website will automatically use them

**Benefits:**
- ✅ **Fastest loading** - no external requests
- ✅ **Always works** - no broken links
- ✅ **Offline support** - works without internet
- ✅ **Easy to manage** - files are in your project

### Method 2: Google Photos Direct URLs

If you prefer online hosting:

1. **Go to Google Photos**: Open [photos.google.com](https://photos.google.com)
2. **Open a photo**: Click on the photo you want to use
3. **Get direct URL**: Right-click on the image and select "Copy image address"
4. **Use the URL**: This gives you a direct URL starting with `https://lh3.googleusercontent.com/`

### Method 3: Google Drive

1. **Save to Drive**: Download the photo and upload to Google Drive
2. **Share the file**: Right-click → "Get shareable link"
3. **Make it public**: Change permissions to "Anyone with the link can view"
4. **Convert URL**: Change the URL format:
   - From: `https://drive.google.com/file/d/FILE_ID/view`
   - To: `https://drive.google.com/uc?id=FILE_ID`

### Step 2: Add Photos to Your Website

#### For Local Images (Recommended):
1. **Copy photos** to `public/images/` folder
2. **Name them**: `photo1.jpg`, `photo2.jpg`, etc.
3. **Update captions** (optional) in `src/components/PhotoGallery.tsx`

#### For Online URLs:
Open the file: `src/components/PhotoGallery.tsx` and update the URLs:

```javascript
const photos: Photo[] = [
  {
    id: 1,
    src: '/images/photo1.jpg', // For local images
    // OR
    src: 'https://your-direct-image-url-here', // For online images
    alt: 'Description of the photo',
    caption: 'Your sweet message for Twin 💕'
  },
  // Add more photos...
]
```

### Example Google Photos URLs that work:

- `https://photos.app.goo.gl/ABC123xyz` (shared link)
- `https://lh3.googleusercontent.com/...` (direct link)

### Step 4: Customize Your Captions

Update the captions with your own personal messages:

```javascript
{
  id: 1,
  src: 'https://photos.app.goo.gl/your-link-here',
  alt: 'Our first date',
  caption: 'The day I fell in love with your smile 😍'
},
{
  id: 2,
  src: 'https://photos.app.goo.gl/your-link-here',
  alt: 'Beach vacation',
  caption: 'Sand between our toes and love in our hearts 🏖️'
}
```

### Tips for Best Results:

1. **High Quality Photos**: Use photos with good resolution (at least 800x600)
2. **Square or Landscape**: These work best in the gallery layout
3. **6 Photos Total**: The gallery is designed for 6 special memories
4. **Personal Moments**: Choose photos that tell your love story

### Privacy Note:

- Google Photos shared links are viewable by anyone with the link
- Make sure you're comfortable sharing these photos publicly
- You can always change the sharing settings in Google Photos later

### Need Help?

If you have any issues with the photo links, just let me know and I'll help you troubleshoot!

---

**Ready to add your memories?** 📸💕

Just replace the placeholder URLs in `PhotoGallery.tsx` with your Google Photos links and rebuild the site!
