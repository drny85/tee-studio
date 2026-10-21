// ============================================================================
// TEE STUDIO — INTERACTIVE APPAREL DESIGN ENGINE (100% LOCAL)
// ============================================================================

(function () {
  const CANVAS_W = 1000;
  const CANVAS_H = 1120;
  const STORAGE_KEY = "tee_studio_saved_designs_v1";
  const AUTOSAVE_KEY = "tee_studio_autosave_v1";

  // Application State
  const state = {
    projectName: "Untitled Heavy Tee",
    garmentStyle: "boxy-tee", // classic-tee | boxy-tee | ringer-tee | longsleeve | hoodie | tank
    activeView: "front",      // front | back
    backdrop: "dark",         // dark | light | concrete | grid | transparent

    // Garment Colors & Fabric
    bodyColor: "#141416",
    syncSleeves: true,
    sleeveColor: "#141416",
    syncCollar: true,
    collarColor: "#f8fafc",
    vintageWash: 12,          // 0 - 100 acid/vintage fade
    fabricTexture: 65,        // 0 - 100 cotton weave & wrinkle depth
    showPrintGuides: false,
    clipToShirt: true,
    clipToPrintBox: false,

    // Neck Tag (visible on Front inside collar)
    neckTagEnabled: true,
    neckTagText: "STUDIO ARCHIVE",
    neckTagSub: "HEAVYWEIGHT • L",
    neckTagDark: false,

    // Layers separated by view
    layers: {
      front: [],
      back: []
    },
    selectedLayerId: null,

    // Viewport Zoom
    zoom: 1,

    // History for Undo
    history: []
  };

  // Runtime caches for loaded HTMLImageElement / processed canvases
  const imageCache = new Map();       // layer.id -> HTMLImageElement
  const processedCache = new Map();   // layer.id + filterHash -> HTMLCanvasElement
  let fabricPatternCanvas = null;
  let wrinkleShadingCache = new Map(); // styleId+view -> HTMLCanvasElement
  let starterGraphics = [];

  // Pointer interaction state
  let interaction = {
    mode: null, // 'move' | 'scale' | 'rotate'
    startX: 0,
    startY: 0,
    initialLayerX: 0,
    initialLayerY: 0,
    initialScale: 1,
    initialRotation: 0,
    initialDist: 1,
    initialAngle: 0,
    snapX: false,
    snapY: false
  };

  // DOM References
  const canvas = document.getElementById("studioCanvas");
  const ctx = canvas.getContext("2d");

  // --------------------------------------------------------------------------
  // INITIALIZATION
  // --------------------------------------------------------------------------
  function init() {
    canvas.width = CANVAS_W;
    canvas.height = CANVAS_H;

    buildFabricWeavePattern();
    starterGraphics = window.generateStarterGraphics();

    renderSwatches();
    renderStarterPresets();
    bindUIEvents();
    bindCanvasEvents();
    bindKeyboardShortcuts();

    // Try restoring autosave, otherwise load a crisp default design
    if (!loadAutosave()) {
      addImageLayerFromDataUrl(starterGraphics[0].dataUrl, starterGraphics[0].name);
    }

    renderSavedDesignsList();
    syncUIFromState();
    requestRender();
  }

  // --------------------------------------------------------------------------
  // PROCEDURAL FABRIC WEAVE & 3D WRINKLE SHADING MAPS
  // --------------------------------------------------------------------------
  function buildFabricWeavePattern() {
    const pCanvas = document.createElement("canvas");
    pCanvas.width = 64;
    pCanvas.height = 64;
    const pCtx = pCanvas.getContext("2d");

    const imgData = pCtx.createImageData(64, 64);
    const data = imgData.data;
    for (let y = 0; y < 64; y++) {
      for (let x = 0; x < 64; x++) {
        const idx = (y * 64 + x) * 4;
        // Cotton jersey knit diagonal micro-grain
        const knit = ((x + y * 2) % 4 === 0) ? 255 : 0;
        const noise = (Math.sin(x * 12.9898 + y * 78.233) * 43758.5453) % 1;
        const val = knit * 0.4 + Math.abs(noise) * 155;
        data[idx] = val;
        data[idx + 1] = val;
        data[idx + 2] = val;
        data[idx + 3] = 22;
      }
    }
    pCtx.putImageData(imgData, 0, 0);
    fabricPatternCanvas = pCanvas;
  }

  function getWrinkleMap(styleId, view) {
    const key = `${styleId}_${view}`;
    if (wrinkleShadingCache.has(key)) {
      return wrinkleShadingCache.get(key);
    }

    const wCanvas = document.createElement("canvas");
    wCanvas.width = CANVAS_W;
    wCanvas.height = CANVAS_H;
    const wCtx = wCanvas.getContext("2d");

    // Cylindrical torso 3D studio lighting
    const bodyGrad = wCtx.createLinearGradient(230, 0, 770, 0);
    bodyGrad.addColorStop(0, "rgba(0, 0, 0, 0.34)");
    bodyGrad.addColorStop(0.14, "rgba(0, 0, 0, 0.06)");
    bodyGrad.addColorStop(0.32, "rgba(255, 255, 255, 0.07)");
    bodyGrad.addColorStop(0.5, "rgba(0, 0, 0, 0.02)");
    bodyGrad.addColorStop(0.68, "rgba(255, 255, 255, 0.06)");
    bodyGrad.addColorStop(0.86, "rgba(0, 0, 0, 0.07)");
    bodyGrad.addColorStop(1, "rgba(0, 0, 0, 0.36)");

    wCtx.fillStyle = bodyGrad;
    wCtx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Top shoulder highlight & bottom drape shadow
    const vertGrad = wCtx.createLinearGradient(0, 120, 0, 940);
    vertGrad.addColorStop(0, "rgba(255, 255, 255, 0.12)");
    vertGrad.addColorStop(0.18, "rgba(255, 255, 255, 0.02)");
    vertGrad.addColorStop(0.82, "rgba(0, 0, 0, 0.04)");
    vertGrad.addColorStop(1, "rgba(0, 0, 0, 0.24)");
    wCtx.fillStyle = vertGrad;
    wCtx.fillRect(0, 0, CANVAS_W, CANVAS_H);

    // Soft realistic drape folds radiating from armpits and chest
    const folds = [
      { x1: 270, y1: 340, x2: 375, y2: 560, r: 48, a: 0.14 },
      { x1: 268, y1: 365, x2: 340, y2: 720, r: 55, a: 0.11 },
      { x1: 730, y1: 340, x2: 625, y2: 560, r: 48, a: 0.14 },
      { x1: 732, y1: 365, x2: 660, y2: 720, r: 55, a: 0.11 },
      { x1: 440, y1: 230, x2: 420, y2: 890, r: 75, a: 0.06 },
      { x1: 565, y1: 240, x2: 585, y2: 890, r: 75, a: 0.06 },
      { x1: 180, y1: 280, x2: 265, y2: 355, r: 36, a: 0.16 },
      { x1: 820, y1: 280, x2: 735, y2: 355, r: 36, a: 0.16 }
    ];

    folds.forEach((f) => {
      wCtx.save();
      wCtx.strokeStyle = `rgba(0, 0, 0, ${f.a})`;
      wCtx.lineWidth = f.r;
      wCtx.lineCap = "round";
      wCtx.filter = "blur(16px)";
      wCtx.beginPath();
      wCtx.moveTo(f.x1, f.y1);
      wCtx.lineTo(f.x2, f.y2);
      wCtx.stroke();

      // Adjacent fold ridge highlight
      wCtx.strokeStyle = `rgba(255, 255, 255, ${f.a * 0.45})`;
      wCtx.lineWidth = f.r * 0.45;
      wCtx.beginPath();
      wCtx.moveTo(f.x1 + 10, f.y1 - 6);
      wCtx.lineTo(f.x2 + 10, f.y2 - 6);
      wCtx.stroke();
      wCtx.restore();
    });

    wrinkleShadingCache.set(key, wCanvas);
    return wCanvas;
  }

  // --------------------------------------------------------------------------
  // MAIN STUDIO RENDER PIPELINE
  // --------------------------------------------------------------------------
  let renderPending = false;
  function requestRender() {
    if (!renderPending) {
      renderPending = true;
      requestAnimationFrame(() => {
        renderPending = false;
        renderScene(ctx, state.activeView, true);
      });
    }
  }

  function renderScene(targetCtx, viewName, includeGizmos = false) {
    const w = targetCtx.canvas.width;
    const h = targetCtx.canvas.height;
    const scaleFactor = w / CANVAS_W;

    targetCtx.save();
    targetCtx.clearRect(0, 0, w, h);
    targetCtx.scale(scaleFactor, scaleFactor);

    const paths = window.buildGarmentPaths(state.garmentStyle, viewName);
    const spec = window.GARMENT_SPECS[state.garmentStyle];

    const effectiveSleeveColor =
      state.garmentStyle === "ringer-tee" && !state.syncSleeves
        ? state.sleeveColor
        : state.syncSleeves
        ? state.bodyColor
        : state.sleeveColor;

    const effectiveCollarColor =
      state.garmentStyle === "ringer-tee" && state.syncCollar
        ? "#f8fafc"
        : state.syncCollar
        ? state.bodyColor
        : state.collarColor;

    // 1. Ambient Drop Shadow behind garment
    targetCtx.save();
    targetCtx.shadowColor = "rgba(0, 0, 0, 0.48)";
    targetCtx.shadowBlur = 42;
    targetCtx.shadowOffsetY = 18;
    targetCtx.fillStyle = state.bodyColor;
    targetCtx.fill(paths.fullSilhouette);
    targetCtx.restore();

    // 2. Inner Back-of-Neck Area (darker shade of body color)
    targetCtx.save();
    targetCtx.fillStyle = shadeHexColor(state.bodyColor, -28);
    targetCtx.fill(paths.innerNeck);
    targetCtx.restore();

    // 3. Inside Neck Woven Label (if front view & enabled)
    if (viewName === "front" && state.neckTagEnabled) {
      targetCtx.save();
      targetCtx.clip(paths.innerNeck);
      const tagW = 104;
      const tagH = 48;
      const tagX = 500 - tagW / 2;
      const tagY = 152;

      targetCtx.fillStyle = state.neckTagDark ? "#18181b" : "#f5f5f4";
      targetCtx.shadowColor = "rgba(0,0,0,0.35)";
      targetCtx.shadowBlur = 6;
      targetCtx.fillRect(tagX, tagY, tagW, tagH);

      targetCtx.fillStyle = state.neckTagDark ? "#f4f4f5" : "#18181b";
      targetCtx.font = "800 10px Inter, sans-serif";
      targetCtx.textAlign = "center";
      targetCtx.fillText((state.neckTagText || "STUDIO").slice(0, 18), 500, tagY + 21);

      targetCtx.font = "600 7.5px monospace";
      targetCtx.fillStyle = state.neckTagDark ? "#a1a1aa" : "#52525b";
      targetCtx.fillText((state.neckTagSub || "HEAVY • L").slice(0, 20), 500, tagY + 34);
      targetCtx.restore();
    }

    // 4. Fill Garment Parts (Hood/Detail, Sleeves, Torso, Collar & Cuffs)
    targetCtx.save();
    targetCtx.fillStyle = shadeHexColor(state.bodyColor, -8);
    targetCtx.fill(paths.extraDetail);

    targetCtx.fillStyle = effectiveSleeveColor;
    targetCtx.fill(paths.leftSleeve);
    targetCtx.fill(paths.rightSleeve);

    targetCtx.fillStyle = state.bodyColor;
    targetCtx.fill(paths.torso);

    targetCtx.fillStyle = effectiveCollarColor;
    targetCtx.fill(paths.collarTrim);
    targetCtx.fill(paths.sleeveTrim);
    targetCtx.restore();

    // 5. Vintage / Acid Wash Fade Effect
    if (state.vintageWash > 0) {
      targetCtx.save();
      targetCtx.clip(paths.fullSilhouette);
      const washAlpha = (state.vintageWash / 100) * 0.38;
      const radGrad = targetCtx.createRadialGradient(500, 480, 60, 500, 480, 480);
      radGrad.addColorStop(0, `rgba(255, 255, 255, ${washAlpha})`);
      radGrad.addColorStop(0.65, `rgba(210, 210, 220, ${washAlpha * 0.45})`);
      radGrad.addColorStop(1, "rgba(0, 0, 0, 0.15)");
      targetCtx.globalCompositeOperation = "screen";
      targetCtx.fillStyle = radGrad;
      targetCtx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      targetCtx.restore();
    }

    // 6. Render Uploaded PNG & Typography Layers for this View
    const viewLayers = state.layers[viewName] || [];
    targetCtx.save();
    if (state.clipToShirt) {
      targetCtx.clip(paths.fullSilhouette);
    }
    if (state.clipToPrintBox && spec) {
      const pb = new Path2D();
      pb.rect(spec.printBox.x, spec.printBox.y, spec.printBox.w, spec.printBox.h);
      targetCtx.clip(pb);
    }

    for (const layer of viewLayers) {
      if (!layer.visible) continue;
      drawLayer(targetCtx, layer);
    }
    targetCtx.restore();

    // 7. Apply Realistic 3D Fabric Wrinkle Shading & Cotton Weave Grain Over Shirt + Graphics
    const wrinkleIntensity = state.fabricTexture / 100;
    if (wrinkleIntensity > 0) {
      const wrinkleMap = getWrinkleMap(state.garmentStyle, viewName);
      targetCtx.save();
      targetCtx.clip(paths.fullSilhouette);

      // Multiply pass for creases & shadows
      targetCtx.globalAlpha = wrinkleIntensity;
      targetCtx.globalCompositeOperation = "multiply";
      targetCtx.drawImage(wrinkleMap, 0, 0);

      // Soft highlight pass for ridges
      targetCtx.globalAlpha = wrinkleIntensity * 0.55;
      targetCtx.globalCompositeOperation = "soft-light";
      targetCtx.drawImage(wrinkleMap, 0, 0);

      // Cotton micro-weave pattern
      if (fabricPatternCanvas) {
        targetCtx.globalAlpha = wrinkleIntensity * 0.65;
        targetCtx.globalCompositeOperation = "overlay";
        const pat = targetCtx.createPattern(fabricPatternCanvas, "repeat");
        targetCtx.fillStyle = pat;
        targetCtx.fillRect(0, 0, CANVAS_W, CANVAS_H);
      }
      targetCtx.restore();
    }

    // 8. Garment Seam Stitching & Collar Outline Definition
    targetCtx.save();
    targetCtx.clip(paths.fullSilhouette);
    targetCtx.strokeStyle = "rgba(0, 0, 0, 0.28)";
    targetCtx.lineWidth = 2;
    targetCtx.stroke(paths.collarTrim);
    targetCtx.stroke(paths.innerNeck);

    targetCtx.setLineDash([4, 4]);
    targetCtx.lineWidth = 1.5;
    targetCtx.strokeStyle = "rgba(255, 255, 255, 0.14)";
    targetCtx.stroke(paths.seamLines);
    targetCtx.setLineDash([]);
    targetCtx.strokeStyle = "rgba(0, 0, 0, 0.22)";
    targetCtx.stroke(paths.seamLines);
    targetCtx.restore();

    // Subtle crisp outer contour
    targetCtx.save();
    targetCtx.strokeStyle = "rgba(255, 255, 255, 0.08)";
    targetCtx.lineWidth = 1.5;
    targetCtx.stroke(paths.fullSilhouette);
    targetCtx.restore();

    // 9. Optional Interactive Studio Overlays (Print Safe Zone, Snap Guides, Selection Gizmo)
    if (includeGizmos) {
      if (state.showPrintGuides && spec) {
        targetCtx.save();
        targetCtx.strokeStyle = "rgba(99, 102, 241, 0.65)";
        targetCtx.lineWidth = 1.5;
        targetCtx.setLineDash([6, 6]);
        targetCtx.strokeRect(spec.printBox.x, spec.printBox.y, spec.printBox.w, spec.printBox.h);

        // Center chest crosshair
        targetCtx.strokeStyle = "rgba(99, 102, 241, 0.35)";
        targetCtx.beginPath();
        targetCtx.moveTo(500, spec.printBox.y);
        targetCtx.lineTo(500, spec.printBox.y + spec.printBox.h);
        targetCtx.stroke();

        targetCtx.fillStyle = "rgba(99, 102, 241, 0.85)";
        targetCtx.font = "600 11px monospace";
        targetCtx.fillText("PRINTABLE SAFE AREA (16\" × 20\")", spec.printBox.x + 8, spec.printBox.y - 8);
        targetCtx.restore();
      }

      // Magnetic Snap Lines while dragging
      if (interaction.mode === "move") {
        targetCtx.save();
        targetCtx.strokeStyle = "#10b981";
        targetCtx.lineWidth = 1.5;
        targetCtx.setLineDash([4, 4]);
        if (interaction.snapX) {
          targetCtx.beginPath();
          targetCtx.moveTo(500, 140);
          targetCtx.lineTo(500, 930);
          targetCtx.stroke();
        }
        if (interaction.snapY) {
          targetCtx.beginPath();
          targetCtx.moveTo(260, 410);
          targetCtx.lineTo(740, 410);
          targetCtx.stroke();
        }
        targetCtx.restore();
      }

      // Active Layer Transform Box & Handles
      const activeLayer = getActiveLayer();
      if (activeLayer && activeLayer.visible) {
        drawSelectionGizmo(targetCtx, activeLayer);
      }
    }

    targetCtx.restore();
  }

  // --------------------------------------------------------------------------
  // LAYER RENDERING (PNG GRAPHICS + FILTERS + BACKGROUND KNOCKOUT + TEXT)
  // --------------------------------------------------------------------------
  function drawLayer(targetCtx, layer) {
    targetCtx.save();
    targetCtx.translate(layer.x, layer.y);
    targetCtx.rotate((layer.rotation * Math.PI) / 180);
    targetCtx.scale(
      layer.scale * (layer.flipX ? -1 : 1),
      layer.scale * (layer.flipY ? -1 : 1)
    );

    targetCtx.globalAlpha = layer.opacity ?? 1;
    targetCtx.globalCompositeOperation = layer.blendMode || "source-over";

    if (layer.type === "image") {
      const processedCanvas = getProcessedLayerCanvas(layer);
      if (processedCanvas) {
        const w = layer.width;
        const h = layer.height;
        targetCtx.drawImage(processedCanvas, -w / 2, -h / 2, w, h);
      }
    } else if (layer.type === "text") {
      drawTextLayerContent(targetCtx, layer);
    }

    targetCtx.restore();
  }

  function getProcessedLayerCanvas(layer) {
    const img = imageCache.get(layer.id);
    if (!img || !img.complete) return null;

    const filterSig = JSON.stringify({
      removeBg: layer.removeBg,
      bgKeyColor: layer.bgKeyColor,
      bgTolerance: layer.bgTolerance,
      tintEnabled: layer.tintEnabled,
      tintColor: layer.tintColor,
      brightness: layer.brightness,
      contrast: layer.contrast,
      saturation: layer.saturation,
      distress: layer.distress
    });

    const cached = processedCache.get(layer.id);
    if (cached && cached.sig === filterSig) {
      return cached.canvas;
    }

    const off = document.createElement("canvas");
    const nw = img.naturalWidth || img.width || 500;
    const nh = img.naturalHeight || img.height || 500;
    off.width = nw;
    off.height = nh;
    const oCtx = off.getContext("2d");

    // Apply CSS filter for brightness / contrast / saturation
    const br = layer.brightness ?? 100;
    const ct = layer.contrast ?? 100;
    const st = layer.saturation ?? 100;
    if (br !== 100 || ct !== 100 || st !== 100) {
      oCtx.filter = `brightness(${br}%) contrast(${ct}%) saturate(${st}%)`;
    }
    oCtx.drawImage(img, 0, 0, nw, nh);
    oCtx.filter = "none";

    // Optional Local Background Color Knockout (for non-transparent PNGs/JPGs)
    if (layer.removeBg) {
      const imgData = oCtx.getImageData(0, 0, nw, nh);
      const data = imgData.data;
      const targetRGB = hexToRgb(layer.bgKeyColor || "#ffffff");
      const tol = (layer.bgTolerance ?? 28) * 2.55;
      const feather = Math.max(8, tol * 0.35);

      for (let i = 0; i < data.length; i += 4) {
        const dr = data[i] - targetRGB.r;
        const dg = data[i + 1] - targetRGB.g;
        const db = data[i + 2] - targetRGB.b;
        const dist = Math.sqrt(dr * dr + dg * dg + db * db);
        if (dist < tol) {
          data[i + 3] = 0;
        } else if (dist < tol + feather) {
          const factor = (dist - tol) / feather;
          data[i + 3] = Math.round(data[i + 3] * factor);
        }
      }
      oCtx.putImageData(imgData, 0, 0);
    }

    // Optional Color Tint Override (recolors non-transparent pixels)
    if (layer.tintEnabled && layer.tintColor) {
      oCtx.save();
      oCtx.globalCompositeOperation = "source-atop";
      oCtx.fillStyle = layer.tintColor;
      oCtx.fillRect(0, 0, nw, nh);
      oCtx.restore();
    }

    // Optional Vintage Distressed / Cracked Screenprint Ink Filter
    if ((layer.distress ?? 0) > 0) {
      oCtx.save();
      oCtx.globalCompositeOperation = "destination-out";
      const distressAmount = layer.distress / 100;
      const speckles = Math.floor(nw * nh * 0.0025 * distressAmount);
      oCtx.fillStyle = "#000";
      for (let i = 0; i < speckles; i++) {
        // Deterministic pseudo-random distress cracks so it doesn't flicker
        const s1 = Math.sin(i * 12.9898) * 43758.5453;
        const s2 = Math.cos(i * 78.233) * 29183.1234;
        const rx = Math.abs(s1 - Math.floor(s1)) * nw;
        const ry = Math.abs(s2 - Math.floor(s2)) * nh;
        const rw = 1 + (i % 5) * distressAmount * 2.2;
        const rh = 1 + ((i * 3) % 4) * distressAmount * 1.5;
        oCtx.fillRect(rx, ry, rw, rh);
      }
      oCtx.restore();
    }

    processedCache.set(layer.id, { sig: filterSig, canvas: off });
    return off;
  }

  function drawTextLayerContent(targetCtx, layer) {
    const fontSize = layer.fontSize || 64;
    const fontFamily = layer.fontFamily || "Inter, sans-serif";
    const fontWeight = layer.fontWeight || "900";
    const text = (layer.text || "STUDIO").toUpperCase();
    const letterSpacing = layer.letterSpacing || 0;

    targetCtx.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    targetCtx.textAlign = "center";
    targetCtx.textBaseline = "middle";

    if (layer.curve && Math.abs(layer.curve) > 2) {
      // Curved / Arched Streetwear Text
      const chars = text.split("");
      const radius = 520 - Math.abs(layer.curve) * 3.2;
      const isUp = layer.curve > 0;
      const totalAngle = (chars.length * (fontSize * 0.62 + letterSpacing)) / radius;
      let startAngle = -totalAngle / 2;

      targetCtx.save();
      targetCtx.translate(0, isUp ? radius : -radius);
      for (let i = 0; i < chars.length; i++) {
        const theta = startAngle + (i + 0.5) * (totalAngle / chars.length);
        targetCtx.save();
        targetCtx.rotate(isUp ? theta : -theta);
        targetCtx.translate(0, isUp ? -radius : radius);
        if (layer.strokeWidth > 0) {
          targetCtx.lineWidth = layer.strokeWidth;
          targetCtx.strokeStyle = layer.strokeColor || "#000000";
          targetCtx.strokeText(chars[i], 0, 0);
        }
        targetCtx.fillStyle = layer.color || "#ffffff";
        targetCtx.fillText(chars[i], 0, 0);
        targetCtx.restore();
      }
      targetCtx.restore();
    } else {
      // Standard or tracked text
      if (layer.strokeWidth > 0) {
        targetCtx.lineWidth = layer.strokeWidth;
        targetCtx.strokeStyle = layer.strokeColor || "#000000";
        targetCtx.strokeText(text, 0, 0);
      }
      targetCtx.fillStyle = layer.color || "#ffffff";
      targetCtx.fillText(text, 0, 0);
    }
  }

  // --------------------------------------------------------------------------
  // SELECTION GIZMO & HIT TESTING
  // --------------------------------------------------------------------------
  function getLayerBounds(layer) {
    if (layer.type === "text") {
      ctx.save();
      ctx.font = `900 ${layer.fontSize || 64}px ${layer.fontFamily || "Inter"}`;
      const m = ctx.measureText((layer.text || "STUDIO").toUpperCase());
      ctx.restore();
      const w = Math.max(120, m.width + 40);
      const h = (layer.fontSize || 64) * 1.4 + Math.abs(layer.curve || 0) * 1.2;
      return { w, h };
    }
    return { w: layer.width || 300, h: layer.height || 300 };
  }

  function drawSelectionGizmo(targetCtx, layer) {
    const { w, h } = getLayerBounds(layer);
    const sw = w * layer.scale;
    const sh = h * layer.scale;

    targetCtx.save();
    targetCtx.translate(layer.x, layer.y);
    targetCtx.rotate((layer.rotation * Math.PI) / 180);

    // Bounding Box
    targetCtx.strokeStyle = "#6366f1";
    targetCtx.lineWidth = 2;
    targetCtx.strokeRect(-sw / 2, -sh / 2, sw, sh);

    // Rotation Stem
    targetCtx.beginPath();
    targetCtx.moveTo(0, -sh / 2);
    targetCtx.lineTo(0, -sh / 2 - 32);
    targetCtx.stroke();

    // Rotation Handle Circle
    targetCtx.fillStyle = "#ffffff";
    targetCtx.strokeStyle = "#6366f1";
    targetCtx.lineWidth = 2.5;
    targetCtx.beginPath();
    targetCtx.arc(0, -sh / 2 - 32, 8, 0, Math.PI * 2);
    targetCtx.fill();
    targetCtx.stroke();

    // 4 Corner Scale Handles
    const corners = [
      [-sw / 2, -sh / 2],
      [sw / 2, -sh / 2],
      [sw / 2, sh / 2],
      [-sw / 2, sh / 2]
    ];
    corners.forEach(([cx, cy]) => {
      targetCtx.fillStyle = "#ffffff";
      targetCtx.fillRect(cx - 7, cy - 7, 14, 14);
      targetCtx.strokeRect(cx - 7, cy - 7, 14, 14);
    });

    targetCtx.restore();
  }

  function toLayerLocalCoords(px, py, layer) {
    const dx = px - layer.x;
    const dy = py - layer.y;
    const rad = (-layer.rotation * Math.PI) / 180;
    return {
      lx: dx * Math.cos(rad) - dy * Math.sin(rad),
      ly: dx * Math.sin(rad) + dy * Math.cos(rad)
    };
  }

  function hitTestGizmo(px, py, layer) {
    const { w, h } = getLayerBounds(layer);
    const sw = w * layer.scale;
    const sh = h * layer.scale;
    const { lx, ly } = toLayerLocalCoords(px, py, layer);

    // Check rotation handle
    if (Math.hypot(lx - 0, ly - (-sh / 2 - 32)) <= 16) {
      return "rotate";
    }

    // Check 4 corner scale handles
    const corners = [
      [-sw / 2, -sh / 2],
      [sw / 2, -sh / 2],
      [sw / 2, sh / 2],
      [-sw / 2, sh / 2]
    ];
    for (const [cx, cy] of corners) {
      if (Math.abs(lx - cx) <= 15 && Math.abs(ly - cy) <= 15) {
        return "scale";
      }
    }

    // Check inside bounding box
    if (Math.abs(lx) <= sw / 2 && Math.abs(ly) <= sh / 2) {
      return "move";
    }
    return null;
  }

  // --------------------------------------------------------------------------
  // CANVAS POINTER INTERACTION
  // --------------------------------------------------------------------------
  function getCanvasCoords(e) {
    const rect = canvas.getBoundingClientRect();
    return {
      x: ((e.clientX - rect.left) / rect.width) * CANVAS_W,
      y: ((e.clientY - rect.top) / rect.height) * CANVAS_H
    };
  }

  function bindCanvasEvents() {
    canvas.addEventListener("pointerdown", (e) => {
      const { x, y } = getCanvasCoords(e);
      const active = getActiveLayer();

      // 1. Check active layer gizmo handles first
      if (active && active.visible) {
        const hit = hitTestGizmo(x, y, active);
        if (hit) {
          startInteraction(e, hit, x, y, active);
          return;
        }
      }

      // 2. Check top-most visible layer under cursor
      const viewLayers = state.layers[state.activeView];
      for (let i = viewLayers.length - 1; i >= 0; i--) {
        const l = viewLayers[i];
        if (!l.visible) continue;
        const hit = hitTestGizmo(x, y, l);
        if (hit) {
          state.selectedLayerId = l.id;
          syncUIFromState();
          startInteraction(e, "move", x, y, l);
          return;
        }
      }

      // Clicked outside all layers -> deselect
      state.selectedLayerId = null;
      syncUIFromState();
      requestRender();
    });

    window.addEventListener("pointermove", (e) => {
      const { x, y } = getCanvasCoords(e);

      if (!interaction.mode) {
        // Update cursor hover state
        const active = getActiveLayer();
        if (active && active.visible) {
          const hit = hitTestGizmo(x, y, active);
          canvas.style.cursor =
            hit === "rotate"
              ? "grab"
              : hit === "scale"
              ? "nwse-resize"
              : hit === "move"
              ? "move"
              : "default";
        } else {
          canvas.style.cursor = "default";
        }
        return;
      }

      const layer = getActiveLayer();
      if (!layer) return;

      if (interaction.mode === "move") {
        let nx = interaction.initialLayerX + (x - interaction.startX);
        let ny = interaction.initialLayerY + (y - interaction.startY);

        // Magnetic snap to vertical shirt center (x = 500) & chest line (y = 410)
        interaction.snapX = false;
        interaction.snapY = false;
        if (Math.abs(nx - 500) < 10) {
          nx = 500;
          interaction.snapX = true;
        }
        if (Math.abs(ny - 410) < 10) {
          ny = 410;
          interaction.snapY = true;
        }

        layer.x = Math.round(nx);
        layer.y = Math.round(ny);
      } else if (interaction.mode === "scale") {
        const dist = Math.hypot(x - layer.x, y - layer.y);
        const ratio = dist / Math.max(10, interaction.initialDist);
        layer.scale = Math.max(0.08, Math.min(2.5, +(interaction.initialScale * ratio).toFixed(3)));
      } else if (interaction.mode === "rotate") {
        const angle = (Math.atan2(y - layer.y, x - layer.x) * 180) / Math.PI + 90;
        let snapped = Math.round(angle);
        if (Math.abs(snapped % 45) < 4) {
          snapped = Math.round(snapped / 45) * 45;
        }
        layer.rotation = ((snapped % 360) + 360) % 360;
        if (layer.rotation > 180) layer.rotation -= 360;
      }

      syncLayerInspectorValues();
      requestRender();
    });

    window.addEventListener("pointerup", () => {
      if (interaction.mode) {
        interaction.mode = null;
        interaction.snapX = false;
        interaction.snapY = false;
        saveAutosave();
        requestRender();
      }
    });
  }

  function startInteraction(e, mode, x, y, layer) {
    pushUndoSnapshot();
    canvas.setPointerCapture(e.pointerId);
    interaction.mode = mode;
    interaction.startX = x;
    interaction.startY = y;
    interaction.initialLayerX = layer.x;
    interaction.initialLayerY = layer.y;
    interaction.initialScale = layer.scale;
    interaction.initialRotation = layer.rotation;
    interaction.initialDist = Math.hypot(x - layer.x, y - layer.y);
    requestRender();
  }

  // --------------------------------------------------------------------------
  // LAYER MANAGEMENT (PNG UPLOAD, PRESETS, TEXT, REORDER, DUPLICATE)
  // --------------------------------------------------------------------------
  function getActiveLayer() {
    const list = state.layers[state.activeView] || [];
    return list.find((l) => l.id === state.selectedLayerId) || null;
  }

  function addImageLayerFromFile(file) {
    if (!file || !file.type.startsWith("image/")) {
      showToast("Please select a valid PNG, JPG, SVG, or WebP image.");
      return;
    }
    const reader = new FileReader();
    reader.onload = (ev) => {
      const cleanName = file.name.replace(/\.[^/.]+$/, "");
      addImageLayerFromDataUrl(ev.target.result, cleanName);
      showToast(`Uploaded "${cleanName}" to ${state.activeView.toUpperCase()} view`);
    };
    reader.readAsDataURL(file);
  }

  function addImageLayerFromDataUrl(dataUrl, name = "Uploaded Graphic") {
    pushUndoSnapshot();
    const img = new Image();
    img.onload = () => {
      const id = "layer_" + Date.now() + "_" + Math.random().toString(36).slice(2, 6);
      imageCache.set(id, img);

      // Fit graphic nicely inside chest area (~340px max dimension initially)
      const maxDim = 360;
      const natW = img.naturalWidth || 400;
      const natH = img.naturalHeight || 400;
      const ratio = Math.min(maxDim / natW, maxDim / natH);
      const baseW = Math.round(natW * ratio);
      const baseH = Math.round(natH * ratio);

      // Auto-sample top-left pixel color for optional 1-click background removal
      const sampleCanvas = document.createElement("canvas");
      sampleCanvas.width = 1;
      sampleCanvas.height = 1;
      const sCtx = sampleCanvas.getContext("2d");
      sCtx.drawImage(img, 0, 0, 1, 1, 0, 0, 1, 1);
      const px = sCtx.getImageData(0, 0, 1, 1).data;
      const detectedBgHex = rgbToHex(px[0], px[1], px[2]);

      const spec = window.GARMENT_SPECS[state.garmentStyle];
      const defaultY = state.activeView === "front" ? spec.presets.centerChest.y : spec.presets.fullBack.y;

      const newLayer = {
        id,
        type: "image",
        name,
        dataUrl,
        width: baseW,
        height: baseH,
        x: 500,
        y: defaultY,
        scale: 1,
        rotation: 0,
        opacity: 1,
        blendMode: "source-over",
        flipX: false,
        flipY: false,
        visible: true,
        removeBg: false,
        bgKeyColor: detectedBgHex,
        bgTolerance: 28,
        tintEnabled: false,
        tintColor: "#ffffff",
        brightness: 100,
        contrast: 100,
        saturation: 100,
        distress: 0
      };

      state.layers[state.activeView].push(newLayer);
      state.selectedLayerId = id;
      saveAutosave();
      syncUIFromState();
      requestRender();
    };
    img.src = dataUrl;
  }

  function addTextLayer() {
    pushUndoSnapshot();
    const id = "text_" + Date.now();
    const newLayer = {
      id,
      type: "text",
      name: "Typography Layer",
      text: "STUDIO ARCHIVE",
      fontFamily: "Inter, sans-serif",
      fontSize: 56,
      fontWeight: "900",
      color: "#ffffff",
      strokeColor: "#000000",
      strokeWidth: 0,
      curve: 0,
      letterSpacing: 2,
      x: 500,
      y: 360,
      scale: 1,
      rotation: 0,
      opacity: 1,
      blendMode: "source-over",
      flipX: false,
      flipY: false,
      visible: true
    };
    state.layers[state.activeView].push(newLayer);
    state.selectedLayerId = id;
    saveAutosave();
    syncUIFromState();
    requestRender();
  }

  function duplicateActiveLayer() {
    const active = getActiveLayer();
    if (!active) return;
    pushUndoSnapshot();
    const copy = JSON.parse(JSON.stringify(active));
    copy.id = "layer_" + Date.now() + "_" + Math.random().toString(36).slice(2, 5);
    copy.name = active.name + " Copy";
    copy.x += 24;
    copy.y += 24;

    if (copy.type === "image" && copy.dataUrl) {
      const img = new Image();
      img.onload = () => {
        imageCache.set(copy.id, img);
        requestRender();
      };
      img.src = copy.dataUrl;
    }

    state.layers[state.activeView].push(copy);
    state.selectedLayerId = copy.id;
    saveAutosave();
    syncUIFromState();
    requestRender();
    showToast("Layer duplicated");
  }

  function deleteLayer(id) {
    pushUndoSnapshot();
    const list = state.layers[state.activeView];
    const idx = list.findIndex((l) => l.id === id);
    if (idx !== -1) {
      list.splice(idx, 1);
      imageCache.delete(id);
      processedCache.delete(id);
      if (state.selectedLayerId === id) {
        state.selectedLayerId = list.length ? list[list.length - 1].id : null;
      }
      saveAutosave();
      syncUIFromState();
      requestRender();
    }
  }

  function moveLayerOrder(id, dir) {
    const list = state.layers[state.activeView];
    const idx = list.findIndex((l) => l.id === id);
    if (idx === -1) return;
    const targetIdx = idx + dir;
    if (targetIdx < 0 || targetIdx >= list.length) return;
    const [item] = list.splice(idx, 1);
    list.splice(targetIdx, 0, item);
    saveAutosave();
    syncUIFromState();
    requestRender();
  }

  function applyPlacementPreset(presetKey) {
    const layer = getActiveLayer();
    if (!layer) {
      showToast("Select or upload a graphic layer first");
      return;
    }
    pushUndoSnapshot();
    const spec = window.GARMENT_SPECS[state.garmentStyle];
    const preset = spec.presets[presetKey];
    if (!preset) return;

    layer.x = preset.x;
    layer.y = preset.y;
    layer.scale = +(preset.scale * 1.4).toFixed(2);
    layer.rotation = 0;

    saveAutosave();
    syncUIFromState();
    requestRender();
  }

  // --------------------------------------------------------------------------
  // UNDO & LOCAL PERSISTENCE (AUTOSAVE + SAVED DESIGNS LIBRARY)
  // --------------------------------------------------------------------------
  function pushUndoSnapshot() {
    const snap = JSON.stringify({
      garmentStyle: state.garmentStyle,
      bodyColor: state.bodyColor,
      syncSleeves: state.syncSleeves,
      sleeveColor: state.sleeveColor,
      syncCollar: state.syncCollar,
      collarColor: state.collarColor,
      vintageWash: state.vintageWash,
      fabricTexture: state.fabricTexture,
      layers: state.layers
    });
    state.history.push(snap);
    if (state.history.length > 20) state.history.shift();
  }

  function undo() {
    if (!state.history.length) {
      showToast("Nothing to undo");
      return;
    }
    const prev = JSON.parse(state.history.pop());
    Object.assign(state, prev);
    rehydrateAllLayerImages(() => {
      syncUIFromState();
      requestRender();
      showToast("Undid last action");
    });
  }

  function saveAutosave() {
    try {
      const payload = serializeProject();
      localStorage.setItem(AUTOSAVE_KEY, JSON.stringify(payload));
    } catch (e) {
      // Ignore quota errors if huge raw images are loaded
    }
  }

  function loadAutosave() {
    try {
      const raw = localStorage.getItem(AUTOSAVE_KEY);
      if (!raw) return false;
      const data = JSON.parse(raw);
      loadProjectObject(data);
      return true;
    } catch (e) {
      return false;
    }
  }

  function serializeProject() {
    return {
      version: 1,
      savedAt: new Date().toISOString(),
      projectName: state.projectName,
      garmentStyle: state.garmentStyle,
      bodyColor: state.bodyColor,
      syncSleeves: state.syncSleeves,
      sleeveColor: state.sleeveColor,
      syncCollar: state.syncCollar,
      collarColor: state.collarColor,
      vintageWash: state.vintageWash,
      fabricTexture: state.fabricTexture,
      neckTagEnabled: state.neckTagEnabled,
      neckTagText: state.neckTagText,
      neckTagSub: state.neckTagSub,
      neckTagDark: state.neckTagDark,
      layers: state.layers
    };
  }

  function loadProjectObject(data) {
    state.projectName = data.projectName || "Untitled Tee";
    state.garmentStyle = data.garmentStyle || "boxy-tee";
    state.bodyColor = data.bodyColor || "#141416";
    state.syncSleeves = data.syncSleeves ?? true;
    state.sleeveColor = data.sleeveColor || state.bodyColor;
    state.syncCollar = data.syncCollar ?? true;
    state.collarColor = data.collarColor || state.bodyColor;
    state.vintageWash = data.vintageWash ?? 12;
    state.fabricTexture = data.fabricTexture ?? 65;
    state.neckTagEnabled = data.neckTagEnabled ?? true;
    state.neckTagText = data.neckTagText || "STUDIO ARCHIVE";
    state.neckTagSub = data.neckTagSub || "HEAVYWEIGHT • L";
    state.neckTagDark = data.neckTagDark ?? false;
    state.layers = data.layers || { front: [], back: [] };

    const activeList = state.layers[state.activeView] || [];
    state.selectedLayerId = activeList.length ? activeList[activeList.length - 1].id : null;

    rehydrateAllLayerImages(() => {
      syncUIFromState();
      requestRender();
    });
  }

  function rehydrateAllLayerImages(done) {
    const all = [...(state.layers.front || []), ...(state.layers.back || [])].filter(
      (l) => l.type === "image" && l.dataUrl
    );
    if (!all.length) {
      done();
      return;
    }
    let remaining = all.length;
    all.forEach((l) => {
      const img = new Image();
      img.onload = img.onerror = () => {
        imageCache.set(l.id, img);
        processedCache.delete(l.id);
        remaining--;
        if (remaining <= 0) done();
      };
      img.src = l.dataUrl;
    });
  }

  function saveToLocalLibrary() {
    try {
      // Generate thumbnail
      const thumbCanvas = document.createElement("canvas");
      thumbCanvas.width = 250;
      thumbCanvas.height = 280;
      renderScene(thumbCanvas.getContext("2d"), state.activeView, false);

      const listRaw = localStorage.getItem(STORAGE_KEY);
      const list = listRaw ? JSON.parse(listRaw) : [];

      const entry = {
        id: "design_" + Date.now(),
        thumb: thumbCanvas.toDataURL("image/png"),
        project: serializeProject()
      };
      list.unshift(entry);
      localStorage.setItem(STORAGE_KEY, JSON.stringify(list.slice(0, 15)));
      renderSavedDesignsList();
      showToast(`Saved "${state.projectName}" to Local Studio Library`);
    } catch (e) {
      showToast("Storage full — use Export JSON for very large PNGs");
    }
  }

  // --------------------------------------------------------------------------
  // HIGH-RESOLUTION PNG & TECH PACK SHEET EXPORTERS
  // --------------------------------------------------------------------------
  function exportCurrentMockupPNG() {
    const out = document.createElement("canvas");
    out.width = CANVAS_W * 2; // 2000 x 2240 Ultra HD
    out.height = CANVAS_H * 2;
    const oCtx = out.getContext("2d");

    if (state.backdrop !== "transparent") {
      const bgGrad = oCtx.createRadialGradient(
        out.width * 0.5,
        out.height * 0.42,
        100,
        out.width * 0.5,
        out.height * 0.42,
        out.width * 0.7
      );
      if (state.backdrop === "light") {
        bgGrad.addColorStop(0, "#f3f4f6");
        bgGrad.addColorStop(1, "#d1d5db");
      } else if (state.backdrop === "concrete") {
        bgGrad.addColorStop(0, "#3a3d42");
        bgGrad.addColorStop(1, "#1c1e22");
      } else {
        bgGrad.addColorStop(0, "#1e222d");
        bgGrad.addColorStop(1, "#0d0f14");
      }
      oCtx.fillStyle = bgGrad;
      oCtx.fillRect(0, 0, out.width, out.height);
    }

    renderScene(oCtx, state.activeView, false);
    downloadCanvasAsPNG(
      out,
      `${slugify(state.projectName)}-${state.activeView}-mockup.png`
    );
    showToast("Exported 2K High-Res Mockup PNG");
  }

  function openTechPackModal() {
    const modal = document.getElementById("techPackModal");
    const tpCanvas = document.getElementById("techPackCanvas");
    tpCanvas.width = 2200;
    tpCanvas.height = 1360;
    const tCtx = tpCanvas.getContext("2d");

    // Studio Tech Pack Board Background
    tCtx.fillStyle = "#0e1015";
    tCtx.fillRect(0, 0, 2200, 1360);

    // Subtle technical grid border
    tCtx.strokeStyle = "rgba(255,255,255,0.12)";
    tCtx.lineWidth = 2;
    tCtx.strokeRect(40, 40, 2120, 1280);

    // Header Bar
    tCtx.fillStyle = "#161922";
    tCtx.fillRect(40, 40, 2120, 110);
    tCtx.strokeRect(40, 40, 2120, 110);

    const spec = window.GARMENT_SPECS[state.garmentStyle];
    tCtx.fillStyle = "#ffffff";
    tCtx.font = "800 32px Inter, sans-serif";
    tCtx.fillText(state.projectName.toUpperCase(), 80, 95);

    tCtx.fillStyle = "#9ca3af";
    tCtx.font = "600 18px monospace";
    tCtx.fillText(
      `SPEC SHEET // STYLE: ${spec.name.toUpperCase()} (${spec.fit}) // DATE: ${new Date()
        .toISOString()
        .slice(0, 10)}`,
      80,
      128
    );

    // Render Front View on Left
    const frontOff = document.createElement("canvas");
    frontOff.width = CANVAS_W;
    frontOff.height = CANVAS_H;
    renderScene(frontOff.getContext("2d"), "front", false);
    tCtx.drawImage(frontOff, 90, 185, 860, 963);

    tCtx.fillStyle = "#9ca3af";
    tCtx.font = "700 20px monospace";
    tCtx.textAlign = "center";
    tCtx.fillText("A. FRONT VIEW MOCKUP", 520, 1210);

    // Render Back View in Center
    const backOff = document.createElement("canvas");
    backOff.width = CANVAS_W;
    backOff.height = CANVAS_H;
    renderScene(backOff.getContext("2d"), "back", false);
    tCtx.drawImage(backOff, 920, 185, 860, 963);
    tCtx.fillText("B. BACK VIEW MOCKUP", 1350, 1210);

    // Right Spec Column
    tCtx.textAlign = "left";
    tCtx.strokeStyle = "rgba(255,255,255,0.12)";
    tCtx.beginPath();
    tCtx.moveTo(1780, 150);
    tCtx.lineTo(1780, 1320);
    tCtx.stroke();

    let sy = 210;
    tCtx.fillStyle = "#6366f1";
    tCtx.font = "700 18px monospace";
    tCtx.fillText("01 / COLORWAY SPECS", 1815, sy);
    sy += 35;

    const swatches = [
      { label: "BODY FABRIC", hex: state.bodyColor },
      { label: "SLEEVE TRIM", hex: state.syncSleeves ? state.bodyColor : state.sleeveColor },
      { label: "COLLAR RIB", hex: state.syncCollar ? state.bodyColor : state.collarColor }
    ];

    swatches.forEach((sw) => {
      tCtx.fillStyle = sw.hex;
      tCtx.fillRect(1815, sy, 52, 52);
      tCtx.strokeStyle = "rgba(255,255,255,0.25)";
      tCtx.strokeRect(1815, sy, 52, 52);

      tCtx.fillStyle = "#ffffff";
      tCtx.font = "700 16px Inter, sans-serif";
      tCtx.fillText(sw.label, 1882, sy + 22);
      tCtx.fillStyle = "#9ca3af";
      tCtx.font = "500 15px monospace";
      tCtx.fillText(sw.hex.toUpperCase(), 1882, sy + 44);
      sy += 74;
    });

    sy += 30;
    tCtx.fillStyle = "#6366f1";
    tCtx.font = "700 18px monospace";
    tCtx.fillText("02 / WASH & TREATMENT", 1815, sy);
    sy += 34;
    tCtx.fillStyle = "#e5e7eb";
    tCtx.font = "500 16px monospace";
    tCtx.fillText(`Vintage Wash: ${state.vintageWash}%`, 1815, sy);
    sy += 28;
    tCtx.fillText(`Weave Weight: ${state.fabricTexture}%`, 1815, sy);
    sy += 28;
    tCtx.fillText(`Neck Label: ${state.neckTagEnabled ? state.neckTagText : "None"}`, 1815, sy);

    sy += 54;
    tCtx.fillStyle = "#6366f1";
    tCtx.font = "700 18px monospace";
    tCtx.fillText("03 / ARTWORK PLACEMENTS", 1815, sy);
    sy += 34;

    const allLayers = [
      ...state.layers.front.map((l) => ({ ...l, side: "FRONT" })),
      ...state.layers.back.map((l) => ({ ...l, side: "BACK" }))
    ];
    if (!allLayers.length) {
      tCtx.fillStyle = "#6b7280";
      tCtx.fillText("Blank Garment (No Prints)", 1815, sy);
    } else {
      allLayers.slice(0, 8).forEach((l, i) => {
        tCtx.fillStyle = "#ffffff";
        tCtx.font = "600 15px Inter, sans-serif";
        tCtx.fillText(`${i + 1}. [${l.side}] ${l.name.slice(0, 18)}`, 1815, sy);
        sy += 22;
        tCtx.fillStyle = "#9ca3af";
        tCtx.font = "500 13px monospace";
        tCtx.fillText(
          `   Scale: ${Math.round(l.scale * 100)}% | Rot: ${l.rotation}°`,
          1815,
          sy
        );
        sy += 30;
      });
    }

    modal.classList.add("open");
  }

  // --------------------------------------------------------------------------
  // UI BINDINGS & SYNCHRONIZATION
  // --------------------------------------------------------------------------
  function renderSwatches() {
    const grid = document.getElementById("swatchGrid");
    grid.innerHTML = "";
    window.STUDIO_SWATCHES.forEach((sw) => {
      const btn = document.createElement("button");
      btn.className = "swatch";
      btn.style.backgroundColor = sw.hex;
      btn.title = `${sw.name} (${sw.hex})`;
      btn.dataset.hex = sw.hex;
      btn.addEventListener("click", () => {
        pushUndoSnapshot();
        state.bodyColor = sw.hex;
        if (state.syncSleeves) state.sleeveColor = sw.hex;
        if (state.syncCollar && state.garmentStyle !== "ringer-tee") state.collarColor = sw.hex;
        saveAutosave();
        syncUIFromState();
        requestRender();
      });
      grid.appendChild(btn);
    });
  }

  function renderStarterPresets() {
    const grid = document.getElementById("presetGrid");
    grid.innerHTML = "";
    starterGraphics.forEach((item) => {
      const card = document.createElement("div");
      card.className = "preset-card";
      card.innerHTML = `
        <div class="preset-preview">
          <img src="${item.dataUrl}" alt="${item.name}" />
        </div>
        <div class="preset-label">${item.name}</div>
      `;
      card.addEventListener("click", () => {
        addImageLayerFromDataUrl(item.dataUrl, item.name);
      });
      grid.appendChild(card);
    });
  }

  function renderLayersList() {
    const container = document.getElementById("layerList");
    const list = state.layers[state.activeView] || [];
    document.getElementById("layerCountBadge").textContent = `${list.length}`;

    if (!list.length) {
      container.innerHTML = `<div class="empty-box">No graphics on ${state.activeView.toUpperCase()} view yet. Drop a PNG above or pick a starter graphic!</div>`;
      return;
    }

    container.innerHTML = "";
    // Show top-most layer first
    [...list].reverse().forEach((layer) => {
      const row = document.createElement("div");
      row.className = `layer-item ${layer.id === state.selectedLayerId ? "active" : ""}`;

      const thumbHtml =
        layer.type === "image"
          ? `<img src="${layer.dataUrl}" alt="" />`
          : `<span style="font-weight:800;font-size:13px;color:#fff;">Aa</span>`;

      row.innerHTML = `
        <div class="layer-thumb">${thumbHtml}</div>
        <div class="layer-info">
          <div class="layer-name">${escapeHtml(layer.name)}</div>
          <div class="layer-meta">${layer.type === "image" ? "PNG Graphic" : "Text"} • ${Math.round(
        layer.scale * 100
      )}%</div>
        </div>
        <div class="layer-actions">
          <button class="icon-btn" data-action="up" title="Bring Forward">↑</button>
          <button class="icon-btn" data-action="down" title="Send Backward">↓</button>
          <button class="icon-btn" data-action="vis" title="Toggle Visibility">${
            layer.visible ? "👁" : "🚫"
          }</button>
          <button class="icon-btn" data-action="del" title="Remove">✕</button>
        </div>
      `;

      row.addEventListener("click", (e) => {
        const btn = e.target.closest("button");
        if (btn) {
          e.stopPropagation();
          const act = btn.dataset.action;
          if (act === "up") moveLayerOrder(layer.id, 1);
          else if (act === "down") moveLayerOrder(layer.id, -1);
          else if (act === "vis") {
            layer.visible = !layer.visible;
            syncUIFromState();
            requestRender();
          } else if (act === "del") deleteLayer(layer.id);
          return;
        }
        state.selectedLayerId = layer.id;
        syncUIFromState();
        requestRender();
      });

      container.appendChild(row);
    });
  }

  function renderSavedDesignsList() {
    const container = document.getElementById("savedDesignsList");
    if (!container) return;
    let list = [];
    try {
      list = JSON.parse(localStorage.getItem(STORAGE_KEY) || "[]");
    } catch (e) {
      list = [];
    }

    if (!list.length) {
      container.innerHTML = `<div class="empty-box">No saved designs yet. Click "Save to Library" in the top bar to store designs locally in your browser.</div>`;
      return;
    }

    container.innerHTML = "";
    list.forEach((item) => {
      const card = document.createElement("div");
      card.className = "saved-card";
      card.innerHTML = `
        <img class="saved-thumb" src="${item.thumb}" alt="" />
        <div class="layer-info">
          <div class="layer-name">${escapeHtml(item.project.projectName)}</div>
          <div class="layer-meta">${new Date(item.project.savedAt).toLocaleTimeString([], {
            hour: "2-digit",
            minute: "2-digit"
          })} • ${item.project.garmentStyle}</div>
        </div>
        <button class="icon-btn" data-del="${item.id}" title="Delete Saved">✕</button>
      `;
      card.addEventListener("click", (e) => {
        const delBtn = e.target.closest("[data-del]");
        if (delBtn) {
          e.stopPropagation();
          const filtered = list.filter((x) => x.id !== item.id);
          localStorage.setItem(STORAGE_KEY, JSON.stringify(filtered));
          renderSavedDesignsList();
          return;
        }
        loadProjectObject(item.project);
        showToast(`Loaded "${item.project.projectName}"`);
      });
      container.appendChild(card);
    });
  }

  function syncUIFromState() {
    // Project name
    document.getElementById("projectNameInput").value = state.projectName;

    // View toggle buttons
    document.querySelectorAll("[data-view]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.view === state.activeView);
    });

    // Garment Style buttons
    document.querySelectorAll("[data-garment]").forEach((btn) => {
      btn.classList.toggle("active", btn.dataset.garment === state.garmentStyle);
    });

    // Swatches
    document.querySelectorAll(".swatch").forEach((sw) => {
      sw.classList.toggle(
        "active",
        sw.dataset.hex.toLowerCase() === state.bodyColor.toLowerCase()
      );
    });

    // Color inputs
    document.getElementById("bodyColorPicker").value = state.bodyColor;
    document.getElementById("bodyHexInput").value = state.bodyColor.toUpperCase();

    document.getElementById("syncSleevesToggle").checked = state.syncSleeves;
    document.getElementById("sleeveColorRow").style.display = state.syncSleeves ? "none" : "flex";
    document.getElementById("sleeveColorPicker").value = state.sleeveColor;

    document.getElementById("syncCollarToggle").checked = state.syncCollar;
    document.getElementById("collarColorRow").style.display = state.syncCollar ? "none" : "flex";
    document.getElementById("collarColorPicker").value = state.collarColor;

    // Wash & Texture Sliders
    document.getElementById("fabricTextureSlider").value = state.fabricTexture;
    document.getElementById("fabricTextureVal").textContent = `${state.fabricTexture}%`;
    document.getElementById("vintageWashSlider").value = state.vintageWash;
    document.getElementById("vintageWashVal").textContent = `${state.vintageWash}%`;

    // Toggles
    document.getElementById("showGuidesToggle").checked = state.showPrintGuides;
    document.getElementById("clipPrintBoxToggle").checked = state.clipToPrintBox;
    document.getElementById("neckTagToggle").checked = state.neckTagEnabled;
    document.getElementById("neckTagTextInput").value = state.neckTagText;
    document.getElementById("neckTagSubInput").value = state.neckTagSub;
    document.getElementById("neckTagDarkToggle").checked = state.neckTagDark;

    renderLayersList();
    syncLayerInspectorValues();
  }

  function syncLayerInspectorValues() {
    const active = getActiveLayer();
    const emptyNotice = document.getElementById("noLayerSelectedNotice");
    const inspectorBody = document.getElementById("activeLayerControls");
    const imageOnlyControls = document.getElementById("imageSpecificControls");
    const textOnlyControls = document.getElementById("textSpecificControls");

    if (!active) {
      emptyNotice.style.display = "block";
      inspectorBody.style.display = "none";
      return;
    }

    emptyNotice.style.display = "none";
    inspectorBody.style.display = "flex";

    document.getElementById("layerScaleSlider").value = Math.round(active.scale * 100);
    document.getElementById("layerScaleVal").textContent = `${Math.round(active.scale * 100)}%`;

    document.getElementById("layerRotateSlider").value = active.rotation;
    document.getElementById("layerRotateVal").textContent = `${active.rotation}°`;

    document.getElementById("layerOpacitySlider").value = Math.round((active.opacity ?? 1) * 100);
    document.getElementById("layerOpacityVal").textContent = `${Math.round(
      (active.opacity ?? 1) * 100
    )}%`;

    document.getElementById("layerBlendSelect").value = active.blendMode || "source-over";

    if (active.type === "image") {
      imageOnlyControls.style.display = "flex";
      textOnlyControls.style.display = "none";

      document.getElementById("removeBgToggle").checked = !!active.removeBg;
      document.getElementById("bgKnockoutSubControls").style.display = active.removeBg
        ? "flex"
        : "none";
      document.getElementById("bgKeyColorPicker").value = active.bgKeyColor || "#ffffff";
      document.getElementById("bgToleranceSlider").value = active.bgTolerance ?? 28;
      document.getElementById("bgToleranceVal").textContent = `${active.bgTolerance ?? 28}%`;

      document.getElementById("tintGraphicToggle").checked = !!active.tintEnabled;
      document.getElementById("tintColorPicker").value = active.tintColor || "#ffffff";

      document.getElementById("distressSlider").value = active.distress ?? 0;
      document.getElementById("distressVal").textContent = `${active.distress ?? 0}%`;

      document.getElementById("brightnessSlider").value = active.brightness ?? 100;
      document.getElementById("contrastSlider").value = active.contrast ?? 100;
    } else {
      imageOnlyControls.style.display = "none";
      textOnlyControls.style.display = "flex";

      document.getElementById("textContentInput").value = active.text || "";
      document.getElementById("textColorPicker").value = active.color || "#ffffff";
      document.getElementById("textFontSelect").value = active.fontFamily || "Inter, sans-serif";
      document.getElementById("textCurveSlider").value = active.curve || 0;
      document.getElementById("textCurveVal").textContent = `${active.curve || 0}°`;
      document.getElementById("textStrokeSlider").value = active.strokeWidth || 0;
      document.getElementById("textStrokeColorPicker").value = active.strokeColor || "#000000";
    }
  }

  function bindUIEvents() {
    // Left Panel Tabs
    document.querySelectorAll(".panel-tab").forEach((tab) => {
      tab.addEventListener("click", () => {
        document.querySelectorAll(".panel-tab").forEach((t) => t.classList.remove("active"));
        tab.classList.add("active");
        const target = tab.dataset.tab;
        document.querySelectorAll("[data-tab-panel]").forEach((p) => {
          p.style.display = p.dataset.tabPanel === target ? "flex" : "none";
        });
      });
    });

    // File Upload Input & Dropzone
    const fileInput = document.getElementById("pngFileInput");
    const dropzone = document.getElementById("uploadDropzone");

    document.getElementById("topUploadBtn").addEventListener("click", () => fileInput.click());
    dropzone.addEventListener("click", () => fileInput.click());

    fileInput.addEventListener("change", (e) => {
      Array.from(e.target.files || []).forEach(addImageLayerFromFile);
      fileInput.value = "";
    });

    // Global Drag & Drop PNG anywhere on window
    window.addEventListener("dragover", (e) => {
      e.preventDefault();
      dropzone.classList.add("drag-over");
    });
    window.addEventListener("dragleave", () => {
      dropzone.classList.remove("drag-over");
    });
    window.addEventListener("drop", (e) => {
      e.preventDefault();
      dropzone.classList.remove("drag-over");
      if (e.dataTransfer?.files?.length) {
        Array.from(e.dataTransfer.files).forEach(addImageLayerFromFile);
      }
    });

    // Global Paste Image from Clipboard
    window.addEventListener("paste", (e) => {
      const items = e.clipboardData?.items || [];
      for (const item of items) {
        if (item.type.startsWith("image/")) {
          const file = item.getAsFile();
          if (file) addImageLayerFromFile(file);
        }
      }
    });

    // Project Name
    document.getElementById("projectNameInput").addEventListener("input", (e) => {
      state.projectName = e.target.value || "Untitled Tee";
      saveAutosave();
    });

    // Front / Back View Switcher
    document.querySelectorAll("[data-view]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.activeView = btn.dataset.view;
        const list = state.layers[state.activeView] || [];
        state.selectedLayerId = list.length ? list[list.length - 1].id : null;
        syncUIFromState();
        requestRender();
      });
    });

    // Stage Backdrop Switcher
    document.querySelectorAll("[data-backdrop]").forEach((btn) => {
      btn.addEventListener("click", () => {
        state.backdrop = btn.dataset.backdrop;
        const stage = document.getElementById("stageContainer");
        stage.className = `stage-container backdrop-${state.backdrop}`;
        requestRender();
      });
    });

    // Garment Style Selector
    document.querySelectorAll("[data-garment]").forEach((btn) => {
      btn.addEventListener("click", () => {
        pushUndoSnapshot();
        state.garmentStyle = btn.dataset.garment;
        if (state.garmentStyle === "ringer-tee") {
          state.syncCollar = false;
          state.syncSleeves = false;
          state.collarColor = "#141416";
          state.sleeveColor = "#141416";
        }
        saveAutosave();
        syncUIFromState();
        requestRender();
      });
    });

    // Color Pickers
    document.getElementById("bodyColorPicker").addEventListener("input", (e) => {
      state.bodyColor = e.target.value;
      if (state.syncSleeves) state.sleeveColor = state.bodyColor;
      if (state.syncCollar) state.collarColor = state.bodyColor;
      syncUIFromState();
      requestRender();
    });

    document.getElementById("bodyHexInput").addEventListener("change", (e) => {
      let val = e.target.value.trim();
      if (!val.startsWith("#")) val = "#" + val;
      if (/^#[0-9A-Fa-f]{6}$/.test(val)) {
        state.bodyColor = val;
        if (state.syncSleeves) state.sleeveColor = val;
        if (state.syncCollar) state.collarColor = val;
        syncUIFromState();
        requestRender();
      }
    });

    document.getElementById("syncSleevesToggle").addEventListener("change", (e) => {
      state.syncSleeves = e.target.checked;
      if (state.syncSleeves) state.sleeveColor = state.bodyColor;
      syncUIFromState();
      requestRender();
    });

    document.getElementById("sleeveColorPicker").addEventListener("input", (e) => {
      state.sleeveColor = e.target.value;
      requestRender();
    });

    document.getElementById("syncCollarToggle").addEventListener("change", (e) => {
      state.syncCollar = e.target.checked;
      if (state.syncCollar) state.collarColor = state.bodyColor;
      syncUIFromState();
      requestRender();
    });

    document.getElementById("collarColorPicker").addEventListener("input", (e) => {
      state.collarColor = e.target.value;
      requestRender();
    });

    // Fabric Realism & Vintage Wash Sliders
    document.getElementById("fabricTextureSlider").addEventListener("input", (e) => {
      state.fabricTexture = +e.target.value;
      document.getElementById("fabricTextureVal").textContent = `${state.fabricTexture}%`;
      requestRender();
    });

    document.getElementById("vintageWashSlider").addEventListener("input", (e) => {
      state.vintageWash = +e.target.value;
      document.getElementById("vintageWashVal").textContent = `${state.vintageWash}%`;
      requestRender();
    });

    // Print Guides & Clipping
    document.getElementById("showGuidesToggle").addEventListener("change", (e) => {
      state.showPrintGuides = e.target.checked;
      requestRender();
    });

    document.getElementById("clipPrintBoxToggle").addEventListener("change", (e) => {
      state.clipToPrintBox = e.target.checked;
      requestRender();
    });

    // Neck Tag Controls
    document.getElementById("neckTagToggle").addEventListener("change", (e) => {
      state.neckTagEnabled = e.target.checked;
      requestRender();
    });
    document.getElementById("neckTagTextInput").addEventListener("input", (e) => {
      state.neckTagText = e.target.value;
      requestRender();
    });
    document.getElementById("neckTagSubInput").addEventListener("input", (e) => {
      state.neckTagSub = e.target.value;
      requestRender();
    });
    document.getElementById("neckTagDarkToggle").addEventListener("change", (e) => {
      state.neckTagDark = e.target.checked;
      requestRender();
    });

    // Add Text Layer Button
    document.getElementById("addTextLayerBtn").addEventListener("click", addTextLayer);

    // Active Layer Inspector Controls
    document.getElementById("layerScaleSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.scale = +e.target.value / 100;
      document.getElementById("layerScaleVal").textContent = `${e.target.value}%`;
      requestRender();
    });

    document.getElementById("layerRotateSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.rotation = +e.target.value;
      document.getElementById("layerRotateVal").textContent = `${l.rotation}°`;
      requestRender();
    });

    document.getElementById("layerOpacitySlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.opacity = +e.target.value / 100;
      document.getElementById("layerOpacityVal").textContent = `${e.target.value}%`;
      requestRender();
    });

    document.getElementById("layerBlendSelect").addEventListener("change", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.blendMode = e.target.value;
      requestRender();
    });

    // Placement Presets
    document.querySelectorAll("[data-preset]").forEach((btn) => {
      btn.addEventListener("click", () => applyPlacementPreset(btn.dataset.preset));
    });

    // Flip / Center / Duplicate / Delete Buttons
    document.getElementById("flipHBtn").addEventListener("click", () => {
      const l = getActiveLayer();
      if (!l) return;
      l.flipX = !l.flipX;
      requestRender();
    });
    document.getElementById("flipVBtn").addEventListener("click", () => {
      const l = getActiveLayer();
      if (!l) return;
      l.flipY = !l.flipY;
      requestRender();
    });
    document.getElementById("centerHBtn").addEventListener("click", () => {
      const l = getActiveLayer();
      if (!l) return;
      l.x = 500;
      requestRender();
    });
    document.getElementById("duplicateLayerBtn").addEventListener("click", duplicateActiveLayer);
    document.getElementById("deleteLayerBtn").addEventListener("click", () => {
      const l = getActiveLayer();
      if (l) deleteLayer(l.id);
    });

    // Image Specific Filters (Background Knockout, Tint, Distress, Brightness/Contrast)
    document.getElementById("removeBgToggle").addEventListener("change", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.removeBg = e.target.checked;
      syncLayerInspectorValues();
      requestRender();
    });

    document.getElementById("bgKeyColorPicker").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.bgKeyColor = e.target.value;
      requestRender();
    });

    document.getElementById("bgToleranceSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.bgTolerance = +e.target.value;
      document.getElementById("bgToleranceVal").textContent = `${l.bgTolerance}%`;
      requestRender();
    });

    document.getElementById("tintGraphicToggle").addEventListener("change", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.tintEnabled = e.target.checked;
      requestRender();
    });

    document.getElementById("tintColorPicker").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.tintColor = e.target.value;
      l.tintEnabled = true;
      document.getElementById("tintGraphicToggle").checked = true;
      requestRender();
    });

    document.getElementById("distressSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.distress = +e.target.value;
      document.getElementById("distressVal").textContent = `${l.distress}%`;
      requestRender();
    });

    document.getElementById("brightnessSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.brightness = +e.target.value;
      requestRender();
    });

    document.getElementById("contrastSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l) return;
      l.contrast = +e.target.value;
      requestRender();
    });

    // Text Specific Controls
    document.getElementById("textContentInput").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l || l.type !== "text") return;
      l.text = e.target.value;
      l.name = e.target.value || "Typography";
      renderLayersList();
      requestRender();
    });

    document.getElementById("textColorPicker").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l || l.type !== "text") return;
      l.color = e.target.value;
      requestRender();
    });

    document.getElementById("textFontSelect").addEventListener("change", (e) => {
      const l = getActiveLayer();
      if (!l || l.type !== "text") return;
      l.fontFamily = e.target.value;
      requestRender();
    });

    document.getElementById("textCurveSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l || l.type !== "text") return;
      l.curve = +e.target.value;
      document.getElementById("textCurveVal").textContent = `${l.curve}°`;
      requestRender();
    });

    document.getElementById("textStrokeSlider").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l || l.type !== "text") return;
      l.strokeWidth = +e.target.value;
      requestRender();
    });

    document.getElementById("textStrokeColorPicker").addEventListener("input", (e) => {
      const l = getActiveLayer();
      if (!l || l.type !== "text") return;
      l.strokeColor = e.target.value;
      requestRender();
    });

    // Topbar Actions (Undo, Reset, Save Local, Export JSON, Import JSON, Tech Pack, Export PNG)
    document.getElementById("undoBtn").addEventListener("click", undo);

    document.getElementById("saveLibraryBtn").addEventListener("click", saveToLocalLibrary);

    document.getElementById("exportJsonBtn").addEventListener("click", () => {
      const dataStr =
        "data:text/json;charset=utf-8," +
        encodeURIComponent(JSON.stringify(serializeProject(), null, 2));
      const a = document.createElement("a");
      a.href = dataStr;
      a.download = `${slugify(state.projectName)}.teestudio.json`;
      a.click();
      showToast("Saved local project file (.teestudio.json)");
    });

    const jsonInput = document.getElementById("importJsonInput");
    document.getElementById("importJsonBtn").addEventListener("click", () => jsonInput.click());
    jsonInput.addEventListener("change", (e) => {
      const file = e.target.files?.[0];
      if (!file) return;
      const r = new FileReader();
      r.onload = (ev) => {
        try {
          const parsed = JSON.parse(ev.target.result);
          loadProjectObject(parsed);
          showToast(`Loaded project "${parsed.projectName}"`);
        } catch (err) {
          showToast("Invalid project JSON file");
        }
      };
      r.readAsText(file);
      jsonInput.value = "";
    });

    document.getElementById("techPackBtn").addEventListener("click", openTechPackModal);
    document.getElementById("closeTechPackBtn").addEventListener("click", () => {
      document.getElementById("techPackModal").classList.remove("open");
    });
    document.getElementById("downloadTechPackBtn").addEventListener("click", () => {
      const tpCanvas = document.getElementById("techPackCanvas");
      downloadCanvasAsPNG(tpCanvas, `${slugify(state.projectName)}-techpack-sheet.png`);
      showToast("Downloaded Front + Back Tech Pack Sheet!");
    });

    document.getElementById("exportMockupBtn").addEventListener("click", exportCurrentMockupPNG);
  }

  function bindKeyboardShortcuts() {
    window.addEventListener("keydown", (e) => {
      const tag = document.activeElement?.tagName;
      if (tag === "INPUT" || tag === "TEXTAREA" || tag === "SELECT") return;

      const active = getActiveLayer();
      if ((e.key === "Backspace" || e.key === "Delete") && active) {
        e.preventDefault();
        deleteLayer(active.id);
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        undo();
      } else if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === "d" && active) {
        e.preventDefault();
        duplicateActiveLayer();
      } else if (active && ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"].includes(e.key)) {
        e.preventDefault();
        const step = e.shiftKey ? 10 : 2;
        if (e.key === "ArrowUp") active.y -= step;
        if (e.key === "ArrowDown") active.y += step;
        if (e.key === "ArrowLeft") active.x -= step;
        if (e.key === "ArrowRight") active.x += step;
        requestRender();
      }
    });
  }

  // --------------------------------------------------------------------------
  // UTILITIES
  // --------------------------------------------------------------------------
  function shadeHexColor(hex, percent) {
    const { r, g, b } = hexToRgb(hex);
    const amt = Math.round(2.55 * percent);
    const nr = Math.max(0, Math.min(255, r + amt));
    const ng = Math.max(0, Math.min(255, g + amt));
    const nb = Math.max(0, Math.min(255, b + amt));
    return rgbToHex(nr, ng, nb);
  }

  function hexToRgb(hex) {
    const clean = (hex || "#000000").replace("#", "");
    const num = parseInt(clean, 16);
    return {
      r: (num >> 16) & 255,
      g: (num >> 8) & 255,
      b: num & 255
    };
  }

  function rgbToHex(r, g, b) {
    return "#" + [r, g, b].map((x) => x.toString(16).padStart(2, "0")).join("");
  }

  function downloadCanvasAsPNG(sourceCanvas, filename) {
    const link = document.createElement("a");
    link.download = filename;
    link.href = sourceCanvas.toDataURL("image/png");
    link.click();
  }

  function slugify(str) {
    return (
      (str || "tee-design")
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "") || "tee-design"
    );
  }

  function escapeHtml(s) {
    return String(s || "")
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;");
  }

  let toastTimer = null;
  function showToast(msg) {
    const el = document.getElementById("studioToast");
    el.textContent = msg;
    el.classList.add("visible");
    clearTimeout(toastTimer);
    toastTimer = setTimeout(() => el.classList.remove("visible"), 2600);
  }

  window.addEventListener("DOMContentLoaded", init);
})();
