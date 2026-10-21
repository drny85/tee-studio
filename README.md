# TEE STUDIO — Local Apparel & Graphic Mockup Lab

A 100% local, zero-dependency interactive apparel mockup & design studio built with HTML5 Canvas. Upload any PNG/SVG/WebP/JPG graphic, place and blend it onto realistic garments, customize dye colors, and export 2K mockups or production Tech Pack sheets entirely in your browser.

## Features
- **6 Garment Silhouettes (Front & Back)**: Classic Crew, Boxy Heavy Tee, Ringer Trim Tee, Long Sleeve, Street Hoodie, and Muscle Tank.
- **24 Curated Streetwear Dye Swatches + Custom Color Pickers**: Independent color controls for Body, Sleeves, and Collar Ribbing, plus 3D Wrinkle & Cotton Weave and Vintage Acid Wash sliders.
- **Interactive On-Shirt Gizmo**: Drag, corner-scale, and rotate graphics directly on the garment with magnetic chest center-line snapping and 1-click placement presets.
- **Local PNG Studio Tools**:
  - 1-Click Solid Background Knockout with color picker & tolerance feathering
  - Graphic Color Tint override
  - Vintage Cracked / Distressed Screenprint Ink filter
  - Fabric Ink Blend Modes (`Plastisol`, `Water-Based Multiply`, `Discharge Screen`, `Vintage Overlay`)
- **Streetwear Typography Engine**: Add custom text layers with Varsity Arch/Curve, outline stroke, and font selection.
- **Inside Neck Woven Brand Label**: Customize the woven collar tag visible on the Front view.
- **100% Local Persistence & Export**:
  - Browser Local Library (`localStorage`) + `.teestudio.json` project file import/export
  - 2K Ultra-HD Mockup PNG export (Studio Dark, Concrete, Daylight, Tech Grid, or Transparent)
  - Side-by-side **Front + Back Production Tech Pack Sheet** PNG generator

## Running Locally
Open `index.html` directly in any modern browser, or serve locally:
```bash
python3 -m http.server 3030
```
Then visit `http://localhost:3030`.
