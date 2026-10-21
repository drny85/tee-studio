// ============================================================================
// TEE STUDIO — GARMENT GEOMETRY, SHADING MAPS, SWATCHES & STARTER GRAPHICS
// All coordinates are authored in a 1000 x 1120 studio canvas space.
// ============================================================================

window. STUDIO_SWATCHES = [
  { name: "Pitch Black", hex: "#141416" },
  { name: "Vintage Washed Black", hex: "#27272a" },
  { name: "Heavy Charcoal", hex: "#3f3f46" },
  { name: "Heather Ash Grey", hex: "#9ca3af" },
  { name: "Chalk White", hex: "#f8fafc" },
  { name: "Unbleached Bone", hex: "#ebe6dc" },
  { name: "Warm Sand", hex: "#d6cbb9" },
  { name: "Espresso Brown", hex: "#43302b" },
  { name: "Washed Olive", hex: "#4b5338" },
  { name: "Forest Pine", hex: "#163828" },
  { name: "Sage Mist", hex: "#8da390" },
  { name: "Midnight Navy", hex: "#172554" },
  { name: "Cobalt Electric", hex: "#1d4ed8" },
  { name: "Slate Ice", hex: "#64748b" },
  { name: "Oxblood Burgundy", hex: "#5c1624" },
  { name: "Crimson Red", hex: "#b91c1c" },
  { name: "Terracotta Rust", hex: "#9a3412" },
  { name: "Sunfaded Mustard", hex: "#d97706" },
  { name: "Buttercream", hex: "#fef08a" },
  { name: "Acid Lime", hex: "#84cc16" },
  { name: "Dusty Rose", hex: "#cfa0a5" },
  { name: "Washed Lavender", hex: "#a78bfa" },
  { name: "Deep Plum", hex: "#4c1d95" },
  { name: "Cyber Magenta", hex: "#be185d" }
];

// Printable safe zone & preset anchor coordinates per garment
window.GARMENT_SPECS = {
  "classic-tee": {
    id: "classic-tee",
    name: "Classic Crew",
    fit: "Regular Fit • 220 GSM",
    printBox: { x: 295, y: 250, w: 410, h: 540 },
    presets: {
      centerChest: { x: 500, y: 410, scale: 0.55 },
      oversizedFront: { x: 500, y: 490, scale: 0.85 },
      leftPocket: { x: 605, y: 355, scale: 0.23 },
      rightChest: { x: 395, y: 355, scale: 0.23 },
      bottomHem: { x: 635, y: 845, scale: 0.22 },
      backYoke: { x: 500, y: 255, scale: 0.22 },
      fullBack: { x: 500, y: 485, scale: 0.85 }
    }
  },
  "boxy-tee": {
    id: "boxy-tee",
    name: "Boxy Heavy",
    fit: "Drop Shoulder • 300 GSM",
    printBox: { x: 270, y: 245, w: 460, h: 540 },
    presets: {
      centerChest: { x: 500, y: 410, scale: 0.6 },
      oversizedFront: { x: 500, y: 495, scale: 0.92 },
      leftPocket: { x: 615, y: 355, scale: 0.24 },
      rightChest: { x: 385, y: 355, scale: 0.24 },
      bottomHem: { x: 660, y: 830, scale: 0.24 },
      backYoke: { x: 500, y: 250, scale: 0.24 },
      fullBack: { x: 500, y: 490, scale: 0.92 }
    }
  },
  "ringer-tee": {
    id: "ringer-tee",
    name: "Ringer / Raglan",
    fit: "Contrast Trim • 240 GSM",
    printBox: { x: 295, y: 255, w: 410, h: 530 },
    presets: {
      centerChest: { x: 500, y: 410, scale: 0.54 },
      oversizedFront: { x: 500, y: 490, scale: 0.82 },
      leftPocket: { x: 605, y: 355, scale: 0.23 },
      rightChest: { x: 395, y: 355, scale: 0.23 },
      bottomHem: { x: 635, y: 845, scale: 0.22 },
      backYoke: { x: 500, y: 255, scale: 0.22 },
      fullBack: { x: 500, y: 485, scale: 0.84 }
    }
  },
  "longsleeve": {
    id: "longsleeve",
    name: "Long Sleeve",
    fit: "Ribbed Cuff • 260 GSM",
    printBox: { x: 300, y: 255, w: 400, h: 535 },
    presets: {
      centerChest: { x: 500, y: 410, scale: 0.54 },
      oversizedFront: { x: 500, y: 490, scale: 0.82 },
      leftPocket: { x: 600, y: 355, scale: 0.22 },
      rightChest: { x: 400, y: 355, scale: 0.22 },
      bottomHem: { x: 630, y: 845, scale: 0.22 },
      backYoke: { x: 500, y: 255, scale: 0.22 },
      fullBack: { x: 500, y: 485, scale: 0.84 }
    }
  },
  "hoodie": {
    id: "hoodie",
    name: "Street Hoodie",
    fit: "Heavy Fleece • 460 GSM",
    printBox: { x: 290, y: 290, w: 420, h: 365 },
    presets: {
      centerChest: { x: 500, y: 430, scale: 0.52 },
      oversizedFront: { x: 500, y: 455, scale: 0.72 },
      leftPocket: { x: 605, y: 380, scale: 0.22 },
      rightChest: { x: 395, y: 380, scale: 0.22 },
      bottomHem: { x: 640, y: 780, scale: 0.22 },
      backYoke: { x: 500, y: 295, scale: 0.22 },
      fullBack: { x: 500, y: 510, scale: 0.85 }
    }
  },
  "tank": {
    id: "tank",
    name: "Muscle Tank",
    fit: "Wide Cut • 210 GSM",
    printBox: { x: 305, y: 285, w: 390, h: 520 },
    presets: {
      centerChest: { x: 500, y: 430, scale: 0.54 },
      oversizedFront: { x: 500, y: 510, scale: 0.82 },
      leftPocket: { x: 595, y: 375, scale: 0.22 },
      rightChest: { x: 405, y: 375, scale: 0.22 },
      bottomHem: { x: 625, y: 845, scale: 0.22 },
      backYoke: { x: 500, y: 270, scale: 0.22 },
      fullBack: { x: 500, y: 500, scale: 0.84 }
    }
  }
};

// Helper to build Path2D objects for each garment style & view
window.buildGarmentPaths = function(styleId, view) {
  const torso = new Path2D();
  const leftSleeve = new Path2D();
  const rightSleeve = new Path2D();
  const collarTrim = new Path2D();
  const sleeveTrim = new Path2D();
  const innerNeck = new Path2D();
  const extraDetail = new Path2D(); // Kangaroo pocket / hood / cuffs
  const seamLines = new Path2D();

  const isFront = view === "front";
  const neckDip = isFront ? 222 : 172;

  if (styleId === "classic-tee" || styleId === "ringer-tee") {
    // Left Sleeve (viewer's left)
    leftSleeve.moveTo(272, 185);
    leftSleeve.quadraticCurveTo(155, 235, 92, 342);
    leftSleeve.lineTo(182, 434);
    leftSleeve.quadraticCurveTo(232, 378, 266, 350);
    leftSleeve.closePath();

    // Right Sleeve (viewer's right)
    rightSleeve.moveTo(728, 185);
    rightSleeve.quadraticCurveTo(845, 235, 908, 342);
    rightSleeve.lineTo(818, 434);
    rightSleeve.quadraticCurveTo(768, 378, 734, 350);
    rightSleeve.closePath();

    // Main Torso
    torso.moveTo(400, 145);
    torso.quadraticCurveTo(500, neckDip, 600, 145);
    torso.quadraticCurveTo(668, 162, 728, 185);
    torso.quadraticCurveTo(712, 275, 734, 350);
    torso.quadraticCurveTo(726, 610, 735, 918);
    torso.quadraticCurveTo(500, 934, 265, 918);
    torso.quadraticCurveTo(274, 610, 266, 350);
    torso.quadraticCurveTo(288, 275, 272, 185);
    torso.quadraticCurveTo(332, 162, 400, 145);
    torso.closePath();

    // Inner Neck Opening (visible behind front collar)
    innerNeck.moveTo(400, 145);
    innerNeck.quadraticCurveTo(500, 174, 600, 145);
    innerNeck.quadraticCurveTo(500, neckDip, 400, 145);
    innerNeck.closePath();

    // Ribbed Collar Band
    collarTrim.moveTo(382, 151);
    collarTrim.quadraticCurveTo(500, neckDip + 22, 618, 151);
    collarTrim.lineTo(600, 145);
    collarTrim.quadraticCurveTo(500, neckDip, 400, 145);
    collarTrim.closePath();

    // Sleeve Cuffs (for Ringer or subtle hem)
    sleeveTrim.moveTo(92, 342);
    sleeveTrim.lineTo(106, 324);
    sleeveTrim.lineTo(195, 417);
    sleeveTrim.lineTo(182, 434);
    sleeveTrim.closePath();

    sleeveTrim.moveTo(908, 342);
    sleeveTrim.lineTo(894, 324);
    sleeveTrim.lineTo(805, 417);
    sleeveTrim.lineTo(818, 434);
    sleeveTrim.closePath();

    // Seam lines (Armholes + Bottom Hem)
    seamLines.moveTo(272, 185);
    seamLines.quadraticCurveTo(288, 275, 266, 350);
    seamLines.moveTo(728, 185);
    seamLines.quadraticCurveTo(712, 275, 734, 350);
    seamLines.moveTo(266, 898);
    seamLines.quadraticCurveTo(500, 914, 734, 898);

  } else if (styleId === "boxy-tee") {
    // Oversized Drop-Shoulder Boxy Streetwear Tee
    leftSleeve.moveTo(230, 205);
    leftSleeve.lineTo(55, 358);
    leftSleeve.lineTo(165, 480);
    leftSleeve.lineTo(246, 392);
    leftSleeve.closePath();

    rightSleeve.moveTo(770, 205);
    rightSleeve.lineTo(945, 358);
    rightSleeve.lineTo(835, 480);
    rightSleeve.lineTo(754, 392);
    rightSleeve.closePath();

    const boxyNeck = isFront ? 216 : 170;
    torso.moveTo(405, 142);
    torso.quadraticCurveTo(500, boxyNeck, 595, 142);
    torso.lineTo(770, 205);
    torso.quadraticCurveTo(748, 305, 754, 392);
    torso.lineTo(762, 895);
    torso.quadraticCurveTo(500, 908, 238, 895);
    torso.lineTo(246, 392);
    torso.quadraticCurveTo(252, 305, 230, 205);
    torso.closePath();

    innerNeck.moveTo(405, 142);
    innerNeck.quadraticCurveTo(500, 170, 595, 142);
    innerNeck.quadraticCurveTo(500, boxyNeck, 405, 142);
    innerNeck.closePath();

    // Thick 1.25" Mock-Neck Heavyweight Ribbing
    collarTrim.moveTo(380, 151);
    collarTrim.quadraticCurveTo(500, boxyNeck + 28, 620, 151);
    collarTrim.lineTo(595, 142);
    collarTrim.quadraticCurveTo(500, boxyNeck, 405, 142);
    collarTrim.closePath();

    seamLines.moveTo(230, 205);
    seamLines.quadraticCurveTo(252, 305, 246, 392);
    seamLines.moveTo(770, 205);
    seamLines.quadraticCurveTo(748, 305, 754, 392);
    seamLines.moveTo(239, 872);
    seamLines.quadraticCurveTo(500, 885, 761, 872);
    seamLines.moveTo(152, 466);
    seamLines.lineTo(68, 344);
    seamLines.moveTo(848, 466);
    seamLines.lineTo(932, 344);

  } else if (styleId === "longsleeve") {
    // Long Sleeve Tee
    leftSleeve.moveTo(272, 185);
    leftSleeve.quadraticCurveTo(175, 295, 95, 845);
    leftSleeve.lineTo(182, 868);
    leftSleeve.quadraticCurveTo(242, 540, 268, 355);
    leftSleeve.closePath();

    rightSleeve.moveTo(728, 185);
    rightSleeve.quadraticCurveTo(825, 295, 905, 845);
    rightSleeve.lineTo(818, 868);
    rightSleeve.quadraticCurveTo(758, 540, 732, 355);
    rightSleeve.closePath();

    torso.moveTo(400, 145);
    torso.quadraticCurveTo(500, neckDip, 600, 145);
    torso.quadraticCurveTo(668, 162, 728, 185);
    torso.quadraticCurveTo(712, 275, 732, 355);
    torso.lineTo(735, 915);
    torso.quadraticCurveTo(500, 932, 265, 915);
    torso.lineTo(268, 355);
    torso.quadraticCurveTo(288, 275, 272, 185);
    torso.closePath();

    innerNeck.moveTo(400, 145);
    innerNeck.quadraticCurveTo(500, 174, 600, 145);
    innerNeck.quadraticCurveTo(500, neckDip, 400, 145);
    innerNeck.closePath();

    collarTrim.moveTo(382, 151);
    collarTrim.quadraticCurveTo(500, neckDip + 22, 618, 151);
    collarTrim.lineTo(600, 145);
    collarTrim.quadraticCurveTo(500, neckDip, 400, 145);
    collarTrim.closePath();

    // Ribbed Wrist Cuffs
    sleeveTrim.moveTo(95, 845);
    sleeveTrim.lineTo(102, 795);
    sleeveTrim.lineTo(188, 818);
    sleeveTrim.lineTo(182, 868);
    sleeveTrim.closePath();

    sleeveTrim.moveTo(905, 845);
    sleeveTrim.lineTo(898, 795);
    sleeveTrim.lineTo(812, 818);
    sleeveTrim.lineTo(818, 868);
    sleeveTrim.closePath();

    seamLines.moveTo(272, 185);
    seamLines.quadraticCurveTo(288, 275, 268, 355);
    seamLines.moveTo(728, 185);
    seamLines.quadraticCurveTo(712, 275, 732, 355);
    seamLines.moveTo(266, 895);
    seamLines.quadraticCurveTo(500, 912, 734, 895);

  } else if (styleId === "hoodie") {
    // Streetwear Pullover Hoodie
    // Hood shape at top
    extraDetail.moveTo(355, 175);
    extraDetail.bezierCurveTo(325, 45, 425, 25, 500, 25);
    extraDetail.bezierCurveTo(575, 25, 675, 45, 645, 175);
    extraDetail.closePath();

    leftSleeve.moveTo(255, 200);
    leftSleeve.quadraticCurveTo(155, 315, 88, 845);
    leftSleeve.lineTo(188, 868);
    leftSleeve.quadraticCurveTo(245, 550, 262, 385);
    leftSleeve.closePath();

    rightSleeve.moveTo(745, 200);
    rightSleeve.quadraticCurveTo(845, 315, 912, 845);
    rightSleeve.lineTo(812, 868);
    rightSleeve.quadraticCurveTo(755, 550, 738, 385);
    rightSleeve.closePath();

    torso.moveTo(355, 170);
    torso.quadraticCurveTo(500, isFront ? 235 : 190, 645, 170);
    torso.lineTo(745, 200);
    torso.quadraticCurveTo(725, 290, 738, 385);
    torso.lineTo(745, 865);
    torso.lineTo(725, 935);
    torso.quadraticCurveTo(500, 948, 275, 935);
    torso.lineTo(255, 865);
    torso.lineTo(262, 385);
    torso.quadraticCurveTo(275, 290, 255, 200);
    torso.closePath();

    if (isFront) {
      innerNeck.moveTo(375, 168);
      innerNeck.bezierCurveTo(360, 70, 440, 52, 500, 52);
      innerNeck.bezierCurveTo(560, 52, 640, 70, 625, 168);
      innerNeck.quadraticCurveTo(500, 232, 375, 168);
      innerNeck.closePath();

      // Kangaroo Pocket on Front
      seamLines.moveTo(335, 675);
      seamLines.lineTo(665, 675);
      seamLines.lineTo(705, 785);
      seamLines.lineTo(680, 868);
      seamLines.lineTo(320, 868);
      seamLines.lineTo(295, 785);
      seamLines.closePath();
    } else {
      // Back Hood Overlap
      collarTrim.moveTo(348, 172);
      collarTrim.bezierCurveTo(325, 45, 425, 25, 500, 25);
      collarTrim.bezierCurveTo(575, 25, 675, 45, 652, 172);
      collarTrim.quadraticCurveTo(500, 260, 348, 172);
      collarTrim.closePath();
    }

    // Ribbed Waistband + Cuffs
    sleeveTrim.moveTo(255, 868);
    sleeveTrim.quadraticCurveTo(500, 880, 745, 868);
    sleeveTrim.lineTo(725, 935);
    sleeveTrim.quadraticCurveTo(500, 948, 275, 935);
    sleeveTrim.closePath();

    seamLines.moveTo(255, 200);
    seamLines.quadraticCurveTo(275, 290, 262, 385);
    seamLines.moveTo(745, 200);
    seamLines.quadraticCurveTo(725, 290, 738, 385);

  } else if (styleId === "tank") {
    // Muscle Tank Top
    const tankNeck = isFront ? 275 : 205;
    torso.moveTo(395, 145);
    torso.quadraticCurveTo(500, tankNeck, 605, 145);
    torso.lineTo(675, 162);
    // Deep cut armholes
    torso.quadraticCurveTo(645, 315, 732, 415);
    torso.lineTo(735, 918);
    torso.quadraticCurveTo(500, 935, 265, 918);
    torso.lineTo(268, 415);
    torso.quadraticCurveTo(355, 315, 325, 162);
    torso.closePath();

    innerNeck.moveTo(395, 145);
    innerNeck.quadraticCurveTo(500, 185, 605, 145);
    innerNeck.quadraticCurveTo(500, tankNeck, 395, 145);
    innerNeck.closePath();

    collarTrim.moveTo(380, 150);
    collarTrim.quadraticCurveTo(500, tankNeck + 20, 620, 150);
    collarTrim.lineTo(605, 145);
    collarTrim.quadraticCurveTo(500, tankNeck, 395, 145);
    collarTrim.closePath();

    seamLines.moveTo(266, 898);
    seamLines.quadraticCurveTo(500, 914, 734, 898);
  }

  // Combined silhouette path for clipping graphics & fabric shading
  const fullSilhouette = new Path2D();
  fullSilhouette.addPath(extraDetail);
  fullSilhouette.addPath(leftSleeve);
  fullSilhouette.addPath(rightSleeve);
  fullSilhouette.addPath(torso);

  return {
    torso,
    leftSleeve,
    rightSleeve,
    collarTrim,
    sleeveTrim,
    innerNeck,
    extraDetail,
    seamLines,
    fullSilhouette
  };
};

// Procedural Starter PNG Graphics (100% local, zero network needed)
window.generateStarterGraphics = function() {
  const starters = [];

  // Helper to create data URL from a custom 500x500 canvas drawing
  function makeGraphic(name, category, drawFn) {
    const c = document.createElement("canvas");
    c.width = 600;
    c.height = 600;
    const ctx = c.getContext("2d");
    drawFn(ctx, 600, 600);
    starters.push({
      id: "preset-" + name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      category,
      dataUrl: c.toDataURL("image/png")
    });
  }

  // 1. Acid Cyber Chrome Star Emblem
  makeGraphic("Cyber Star Emblem", "Streetwear", (ctx, w, h) => {
    ctx.save();
    ctx.translate(w / 2, h / 2);
    // Outer ring
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 195, 0, Math.PI * 2);
    ctx.stroke();

    // 8-point Y2K star
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    for (let i = 0; i < 8; i++) {
      const angle = (i * Math.PI) / 4;
      const rOuter = i % 2 === 0 ? 185 : 110;
      const x = Math.cos(angle) * rOuter;
      const y = Math.sin(angle) * rOuter;
      if (i === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
      const nextAngle = angle + Math.PI / 8;
      ctx.lineTo(Math.cos(nextAngle) * 32, Math.sin(nextAngle) * 32);
    }
    ctx.closePath();
    ctx.fill();

    // Knockout center
    ctx.globalCompositeOperation = "destination-out";
    ctx.beginPath();
    ctx.arc(0, 0, 42, 0, Math.PI * 2);
    ctx.fill();
    ctx.globalCompositeOperation = "source-over";

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 28px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("STUDIO ARCHIVE // 2026", 0, 265);
    ctx.restore();
  });

  // 2. Tokyo Heavy Industries Brutalist Box
  makeGraphic("Heavy Dept Box", "Brutalist", (ctx, w, h) => {
    ctx.fillStyle = "#f43f5e";
    ctx.fillRect(60, 140, 480, 320);

    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 8;
    ctx.strokeRect(80, 160, 440, 280);

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 68px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("HEAVYWEIGHT", 300, 265);

    ctx.font = "700 32px monospace";
    ctx.fillText("GARMENT RESEARCH LAB", 300, 325);

    ctx.fillStyle = "#000000";
    ctx.fillRect(110, 355, 380, 55);
    ctx.fillStyle = "#ffffff";
    ctx.font = "700 24px monospace";
    ctx.fillText("LOT NO. 0049-X // 100% COTTON", 300, 390);
  });

  // 3. Retro Sunset Surf / Skate Crest
  makeGraphic("Retro Sunset Wave", "Vintage", (ctx, w, h) => {
    ctx.save();
    ctx.beginPath();
    ctx.arc(300, 280, 210, 0, Math.PI * 2);
    ctx.clip();

    const grad = ctx.createLinearGradient(0, 70, 0, 490);
    grad.addColorStop(0, "#fb7185");
    grad.addColorStop(0.45, "#fb923c");
    grad.addColorStop(1, "#facc15");
    ctx.fillStyle = grad;

    // Horizontal vintage sun stripes
    for (let y = 70; y < 490; y += 26) {
      const stripeH = Math.max(6, 22 - (y - 70) * 0.03);
      ctx.fillRect(70, y, 460, stripeH);
    }
    ctx.restore();

    ctx.fillStyle = "#ffffff";
    ctx.font = "900 44px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("PACIFIC COAST", 300, 545);
    ctx.font = "600 22px monospace";
    ctx.fillText("ENDLESS SUMMER ARCHIVE", 300, 580);
  });

  // 4. Minimalist Atelier Crest
  makeGraphic("Atelier Minimal Crest", "Luxury", (ctx, w, h) => {
    ctx.strokeStyle = "#ffffff";
    ctx.fillStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(90, 160, 420, 280);

    ctx.font = "300 24px Inter, sans-serif";
    ctx.textAlign = "center";
    ctx.fillText("MAISON DE COUTURE", 300, 225);

    ctx.font = "900 64px Georgia, serif";
    ctx.fillText("ATELIER", 300, 310);

    ctx.font = "500 20px monospace";
    ctx.fillText("PARIS  •  NEW YORK  •  TOKYO", 300, 365);
    ctx.fillText("COLLECTION N° 01", 300, 410);
  });

  // 5. Acid Smile Emblem
  makeGraphic("Acid Melted Smile", "Streetwear", (ctx, w, h) => {
    ctx.save();
    ctx.translate(300, 300);
    ctx.fillStyle = "#fde047";
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 16;
    ctx.beginPath();
    ctx.arc(0, 0, 210, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Eyes
    ctx.fillStyle = "#000000";
    ctx.beginPath();
    ctx.ellipse(-70, -55, 22, 48, 0, 0, Math.PI * 2);
    ctx.ellipse(70, -55, 22, 48, 0, 0, Math.PI * 2);
    ctx.fill();

    // Smile arc
    ctx.beginPath();
    ctx.arc(0, 15, 130, 0.15 * Math.PI, 0.85 * Math.PI);
    ctx.stroke();
    ctx.restore();
  });

  // 6. Technical Barcode Spec Patch
  makeGraphic("Tech Spec Barcode", "Utility", (ctx, w, h) => {
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 130, 440, 340);

    // Draw barcode bars
    const weights = [8, 4, 12, 4, 4, 10, 6, 4, 14, 6, 4, 8, 12, 4, 6, 10, 4, 8, 14, 4, 6, 8];
    let x = 115;
    weights.forEach((bw, idx) => {
      ctx.fillRect(x, 165, bw, 150);
      x += bw + (idx % 3 === 0 ? 10 : 6);
    });

    ctx.font = "700 26px monospace";
    ctx.textAlign = "left";
    ctx.fillText("SPEC // TYPE-09 HEAVY TEE", 115, 360);
    ctx.font = "500 20px monospace";
    ctx.fillText("SERIAL: 8849-2026-LOCAL", 115, 395);
    ctx.fillText("MANUFACTURED IN STUDIO", 115, 430);
  });

  return starters;
};
