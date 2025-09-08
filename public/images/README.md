# 📸 How to Add Your Photos

## Step 1: Add Your Photos Here

1. **Copy your photos** to this folder (`public/images/`)
2. **Name them**: `photo1.jpg`, `photo2.jpg`, etc. (up to `photo6.jpg`)
3. **Supported formats**: `.jpg`, `.jpeg`, `.png`, `.webp`

## Step 2: Update Captions (Optional)

Open `src/components/PhotoGallery.tsx` and update the captions to match your photos:

```javascript
{
  id: 1,
  src: '/images/photo1.jpg',
  alt: 'Our first memory together',
  caption: 'Your custom message here 💕'
}
```

## Current Photo Files Needed:

- `photo1.jpg` - First memory
- `photo2.jpg` - Adventure together  
- `photo3.jpg` - Celebrating
- `photo4.jpg` - Quiet moments
- `photo5.jpg` - Sharing laughter
- `photo6.jpg` - Forever together

## Tips:

- **High quality**: Use photos at least 800x600 pixels
- **Landscape or square** work best in the gallery
- **File size**: Keep under 2MB each for fast loading
- **Names matter**: Use exactly `photo1.jpg`, `photo2.jpg`, etc.

## Alternative Names:

If you prefer different names, update the `src` paths in `PhotoGallery.tsx`:

```javascript
src: '/images/your-custom-name.jpg'
```

**Ready to add your beautiful memories with Twin!** 💕
