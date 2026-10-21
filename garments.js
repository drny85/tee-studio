// ============================================================================
// TEE STUDIO — GARMENT GEOMETRY, ACID/MINERAL WASH MAPS, SWATCHES & STARTERS
// All coordinates are authored in a 1000 x 1120 studio canvas space.
// ============================================================================

window.STUDIO_SWATCHES = [
  { name: "Mineral Acid Black", hex: "#1b1c1f", washDefault: "acid-wash" },
  { name: "Vintage Washed Charcoal", hex: "#2a2b30", washDefault: "acid-wash" },
  { name: "Pitch Black", hex: "#121214" },
  { name: "Storm Grey Acid", hex: "#464952", washDefault: "acid-wash" },
  { name: "Heather Ash Grey", hex: "#9ca3af" },
  { name: "Chalk White", hex: "#f8fafc" },
  { name: "Unbleached Bone", hex: "#ebe6dc" },
  { name: "Warm Sand", hex: "#d6cbb9" },
  { name: "Washed Espresso", hex: "#382823", washDefault: "acid-wash" },
  { name: "Vintage Olive Wash", hex: "#3f4632", washDefault: "acid-wash" },
  { name: "Forest Pine", hex: "#163828" },
  { name: "Sage Mist", hex: "#8da390" },
  { name: "Midnight Navy Wash", hex: "#19233c", washDefault: "acid-wash" },
  { name: "Cobalt Electric", hex: "#1d4ed8" },
  { name: "Slate Ice", hex: "#64748b" },
  { name: "Oxblood Mineral", hex: "#4c1520", washDefault: "acid-wash" },
  { name: "Crimson Red", hex: "#b91c1c" },
  { name: "Terracotta Rust", hex: "#9a3412" },
  { name: "Sunfaded Mustard", hex: "#d97706" },
  { name: "Buttercream", hex: "#fef08a" },
  { name: "Acid Lime", hex: "#84cc16" },
  { name: "Dusty Rose Wash", hex: "#a6757b", washDefault: "acid-wash" },
  { name: "Washed Lavender", hex: "#a78bfa" },
  { name: "Deep Plum Acid", hex: "#381863", washDefault: "acid-wash" }
];

// Printable safe zone & preset anchor coordinates per garment
window.GARMENT_SPECS = {
  "acid-oversized": {
    id: "acid-oversized",
    name: "Acid Oversized",
    fit: "Drop Shoulder • Scallop Hem • 320 GSM Mineral Wash",
    printBox: { x: 255, y: 235, w: 490, h: 650 },
    presets: {
      centerChest: { x: 500, y: 420, scale: 0.62 },
      oversizedFront: { x: 500, y: 535, scale: 1.05 },
      leftPocket: { x: 615, y: 355, scale: 0.24 },
      rightChest: { x: 385, y: 355, scale: 0.24 },
      bottomHem: { x: 655, y: 850, scale: 0.24 },
      backYoke: { x: 500, y: 245, scale: 0.24 },
      fullBack: { x: 500, y: 525, scale: 1.02 }
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

// Build Path2D geometry for each garment style & view
window.buildGarmentPaths = function (styleId, view) {
  const torso = new Path2D();
  const leftSleeve = new Path2D();
  const rightSleeve = new Path2D();
  const collarTrim = new Path2D();
  const sleeveTrim = new Path2D();
  const innerNeck = new Path2D();
  const extraDetail = new Path2D();
  const seamLines = new Path2D();
  const abrasionSeams = new Path2D(); // Stone-washed raised seam ridges

  const isFront = view === "front";
  const neckDip = isFront ? 222 : 172;

  if (styleId === "acid-oversized") {
    // Vintage Acid-Wash Oversized Streetwear Tee (Matches Reference Photo:
    // Wide drop shoulders, elbow-length wide sleeves, thick ribbed crew collar,
    // and curved / scalloped double-stitched bottom hem)
    leftSleeve.moveTo(222, 212);
    leftSleeve.quadraticCurveTo(130, 290, 52, 472);
    leftSleeve.lineTo(208, 535);
    leftSleeve.quadraticCurveTo(232, 465, 248, 412);
    leftSleeve.closePath();

    rightSleeve.moveTo(778, 212);
    rightSleeve.quadraticCurveTo(870, 290, 948, 472);
    rightSleeve.lineTo(792, 535);
    rightSleeve.quadraticCurveTo(768, 465, 752, 412);
    rightSleeve.closePath();

    const acidNeck = isFront ? 224 : 170;
    torso.moveTo(402, 138);
    torso.quadraticCurveTo(500, acidNeck, 598, 138);
    torso.quadraticCurveTo(695, 168, 778, 212);
    torso.quadraticCurveTo(750, 315, 752, 412);
    torso.lineTo(760, 825);
    // Curved / Scalloped Vintage Streetwear Hem
    torso.bezierCurveTo(760, 962, 240, 962, 240, 825);
    torso.lineTo(248, 412);
    torso.quadraticCurveTo(250, 315, 222, 212);
    torso.quadraticCurveTo(305, 168, 402, 138);
    torso.closePath();

    innerNeck.moveTo(402, 138);
    innerNeck.quadraticCurveTo(500, 168, 598, 138);
    innerNeck.quadraticCurveTo(500, acidNeck, 402, 138);
    innerNeck.closePath();

    // Thick Heavyweight Vintage Ribbed Collar
    collarTrim.moveTo(374, 149);
    collarTrim.quadraticCurveTo(500, acidNeck + 32, 626, 149);
    collarTrim.lineTo(598, 138);
    collarTrim.quadraticCurveTo(500, acidNeck, 402, 138);
    collarTrim.closePath();

    // Twin-needle seam lines + collar rib ridges
    seamLines.moveTo(222, 212);
    seamLines.quadraticCurveTo(250, 315, 248, 412);
    seamLines.moveTo(778, 212);
    seamLines.quadraticCurveTo(750, 315, 752, 412);

    // Curved twin-needle bottom hem stitch
    seamLines.moveTo(241, 804);
    seamLines.bezierCurveTo(241, 938, 759, 938, 759, 804);
    seamLines.moveTo(241, 812);
    seamLines.bezierCurveTo(241, 946, 759, 946, 759, 812);

    // Twin-needle sleeve cuffs
    seamLines.moveTo(60, 453);
    seamLines.lineTo(214, 515);
    seamLines.moveTo(940, 453);
    seamLines.lineTo(786, 515);

    // Shoulder slope seams
    seamLines.moveTo(374, 149);
    seamLines.quadraticCurveTo(295, 176, 222, 212);
    seamLines.moveTo(626, 149);
    seamLines.quadraticCurveTo(705, 176, 778, 212);

    // Abrasion seams (receive extra stone-washed chalky highlight)
    abrasionSeams.addPath(seamLines);
    abrasionSeams.addPath(collarTrim);

  } else if (styleId === "classic-tee" || styleId === "ringer-tee") {
    leftSleeve.moveTo(272, 185);
    leftSleeve.quadraticCurveTo(155, 235, 92, 342);
    leftSleeve.lineTo(182, 434);
    leftSleeve.quadraticCurveTo(232, 378, 266, 350);
    leftSleeve.closePath();

    rightSleeve.moveTo(728, 185);
    rightSleeve.quadraticCurveTo(845, 235, 908, 342);
    rightSleeve.lineTo(818, 434);
    rightSleeve.quadraticCurveTo(768, 378, 734, 350);
    rightSleeve.closePath();

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

    innerNeck.moveTo(400, 145);
    innerNeck.quadraticCurveTo(500, 174, 600, 145);
    innerNeck.quadraticCurveTo(500, neckDip, 400, 145);
    innerNeck.closePath();

    collarTrim.moveTo(382, 151);
    collarTrim.quadraticCurveTo(500, neckDip + 22, 618, 151);
    collarTrim.lineTo(600, 145);
    collarTrim.quadraticCurveTo(500, neckDip, 400, 145);
    collarTrim.closePath();

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

    seamLines.moveTo(272, 185);
    seamLines.quadraticCurveTo(288, 275, 266, 350);
    seamLines.moveTo(728, 185);
    seamLines.quadraticCurveTo(712, 275, 734, 350);
    seamLines.moveTo(266, 898);
    seamLines.quadraticCurveTo(500, 914, 734, 898);
    seamLines.moveTo(106, 324);
    seamLines.lineTo(195, 417);
    seamLines.moveTo(894, 324);
    seamLines.lineTo(805, 417);

    abrasionSeams.addPath(seamLines);
    abrasionSeams.addPath(collarTrim);

  } else if (styleId === "boxy-tee") {
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

    abrasionSeams.addPath(seamLines);
    abrasionSeams.addPath(collarTrim);

  } else if (styleId === "longsleeve") {
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

    abrasionSeams.addPath(seamLines);
    abrasionSeams.addPath(collarTrim);

  } else if (styleId === "hoodie") {
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

      seamLines.moveTo(335, 675);
      seamLines.lineTo(665, 675);
      seamLines.lineTo(705, 785);
      seamLines.lineTo(680, 868);
      seamLines.lineTo(320, 868);
      seamLines.lineTo(295, 785);
      seamLines.closePath();
    } else {
      collarTrim.moveTo(348, 172);
      collarTrim.bezierCurveTo(325, 45, 425, 25, 500, 25);
      collarTrim.bezierCurveTo(575, 25, 675, 45, 652, 172);
      collarTrim.quadraticCurveTo(500, 260, 348, 172);
      collarTrim.closePath();
    }

    sleeveTrim.moveTo(255, 868);
    sleeveTrim.quadraticCurveTo(500, 880, 745, 868);
    sleeveTrim.lineTo(725, 935);
    sleeveTrim.quadraticCurveTo(500, 948, 275, 935);
    sleeveTrim.closePath();

    seamLines.moveTo(255, 200);
    seamLines.quadraticCurveTo(275, 290, 262, 385);
    seamLines.moveTo(745, 200);
    seamLines.quadraticCurveTo(725, 290, 738, 385);

    abrasionSeams.addPath(seamLines);
    abrasionSeams.addPath(sleeveTrim);

  } else if (styleId === "tank") {
    const tankNeck = isFront ? 275 : 205;
    torso.moveTo(395, 145);
    torso.quadraticCurveTo(500, tankNeck, 605, 145);
    torso.lineTo(675, 162);
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
    abrasionSeams.addPath(seamLines);
    abrasionSeams.addPath(collarTrim);
  }

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
    abrasionSeams,
    fullSilhouette
  };
};

// ============================================================================
// PROCEDURAL ACID WASH / MINERAL SNOW WASH GENERATOR
// Synthesizes multi-octave organic marble/cloud mineral mottled patterns
// matching heavy vintage street tees.
// ============================================================================
window.generateAcidWashTexture = function (width, height, scaleMode = "medium") {
  const c = document.createElement("canvas");
  c.width = width;
  c.height = height;
  const ctx = c.getContext("2d");

  // Render noise at 250x280 and upscale with bicubic/bilinear smoothing + sharp mineral grain pass
  const nw = 250;
  const nh = 280;
  const off = document.createElement("canvas");
  off.width = nw;
  off.height = nh;
  const oCtx = off.getContext("2d");
  const imgData = oCtx.createImageData(nw, nh);
  const data = imgData.data;

  // Deterministic 2D hash & smooth value noise (Fractal Brownian Motion + Ridged Turbulence)
  function hash(ix, iy) {
    let n = ix * 374761393 + iy * 668265263;
    n = (n ^ (n >> 13)) * 1274126177;
    return ((n ^ (n >> 16)) >>> 0) / 4294967295;
  }

  function smoothNoise(x, y) {
    const ix = Math.floor(x);
    const iy = Math.floor(y);
    const fx = x - ix;
    const fy = y - iy;
    const ux = fx * fx * (3 - 2 * fx);
    const uy = fy * fy * (3 - 2 * fy);

    const a = hash(ix, iy);
    const b = hash(ix + 1, iy);
    const c0 = hash(ix, iy + 1);
    const d = hash(ix + 1, iy + 1);

    return a + (b - a) * ux + (c0 - a) * uy + (a - b - c0 + d) * ux * uy;
  }

  function fbm(x, y) {
    let val = 0;
    let amp = 0.52;
    let freq = 1;
    for (let o = 0; o < 5; o++) {
      // Ridged / marbled mineral crease modulation
      const n = smoothNoise(x * freq, y * freq);
      const ridge = 1 - Math.abs(n * 2 - 1);
      val += (n * 0.65 + ridge * ridge * 0.35) * amp;
      freq *= 2.15;
      amp *= 0.5;
    }
    return val;
  }

  const baseFreq = scaleMode === "fine" ? 0.085 : scaleMode === "bold" ? 0.032 : 0.052;

  for (let y = 0; y < nh; y++) {
    for (let x = 0; x < nw; x++) {
      const idx = (y * nw + x) * 4;
      // Domain warping for authentic tumbled drum mineral wash swirls
      const qx = fbm(x * baseFreq, y * baseFreq);
      const qy = fbm(x * baseFreq + 5.2, y * baseFreq + 1.3);
      let m = fbm(x * baseFreq + 1.8 * qx, y * baseFreq + 1.8 * qy);

      // Contrast S-curve so dark valleys stay deep and mineral peaks pop chalky grey
      m = Math.max(0, Math.min(1, (m - 0.28) * 1.95));
      m = m * m * (3 - 2 * m);

      // Micro pumice stone speckle
      const grain = (hash(x * 3, y * 3) - 0.5) * 0.22;
      const lum = Math.max(0, Math.min(255, Math.round((m + grain) * 255)));

      data[idx] = lum;
      data[idx + 1] = lum;
      data[idx + 2] = lum + 4; // Slight cool mineral cast
      data[idx + 3] = 255;
    }
  }

  oCtx.putImageData(imgData, 0, 0);

  ctx.imageSmoothingEnabled = true;
  ctx.imageSmoothingQuality = "high";
  ctx.drawImage(off, 0, 0, width, height);
  return c;
};

// Procedural Starter PNG Graphics (including "Good Luck UFO Abduction" from reference!)
window.generateStarterGraphics = function () {
  const starters = [];

  function makeGraphic(name, category, drawFn) {
    const c = document.createElement("canvas");
    c.width = 700;
    c.height = 820;
    const ctx = c.getContext("2d");
    drawFn(ctx, 700, 820);
    starters.push({
      id: "preset-" + name.toLowerCase().replace(/[^a-z0-9]/g, "-"),
      name,
      category,
      dataUrl: c.toDataURL("image/png")
    });
  }

  // 1. "Good Luck" UFO Abduction Graphic (Inspired directly by the user's photo!)
  makeGraphic("Good Luck UFO Beam", "Acid Vintage", (ctx, w, h) => {
    ctx.save();

    // Starfield dust
    ctx.fillStyle = "rgba(255,255,255,0.75)";
    for (let i = 0; i < 140; i++) {
      const sx = ((Math.sin(i * 91.3) + 1) * 0.5) * (w - 80) + 40;
      const sy = ((Math.cos(i * 47.7) + 1) * 0.5) * 520 + 110;
      const sr = (i % 3 === 0) ? 2 : 1;
      ctx.fillRect(sx, sy, sr, sr);
    }

    // Arched Gothic / Old-English Style "Good Luck" Header
    const text = "Good Luck";
    ctx.save();
    ctx.translate(w / 2, 370);
    const radius = 290;
    const startAngle = -0.34 * Math.PI;
    const endAngle = 0.34 * Math.PI;
    for (let i = 0; i < text.length; i++) {
      const t = i / (text.length - 1);
      const angle = startAngle + t * (endAngle - startAngle);
      ctx.save();
      ctx.rotate(angle);
      ctx.translate(0, -radius);
      ctx.font = "900 84px Georgia, 'Times New Roman', serif";
      ctx.textAlign = "center";
      ctx.lineWidth = 8;
      ctx.strokeStyle = "#090a0d";
      ctx.strokeText(text[i], 0, 0);
      ctx.fillStyle = "#f4f4f6";
      ctx.fillText(text[i], 0, 0);
      // Gothic spike serif accents
      ctx.fillRect(-3, -64, 6, 12);
      ctx.restore();
    }
    ctx.restore();

    // Tractor Beam Cone
    const beamGrad = ctx.createLinearGradient(w / 2, 195, w / 2, 705);
    beamGrad.addColorStop(0, "rgba(255, 255, 255, 0.98)");
    beamGrad.addColorStop(0.35, "rgba(219, 234, 254, 0.78)");
    beamGrad.addColorStop(0.85, "rgba(255, 255, 255, 0.92)");
    beamGrad.addColorStop(1, "rgba(255, 255, 255, 0)");

    ctx.fillStyle = beamGrad;
    ctx.beginPath();
    ctx.moveTo(w / 2 - 28, 195);
    ctx.lineTo(w / 2 + 28, 195);
    ctx.lineTo(w / 2 + 125, 695);
    ctx.lineTo(w / 2 - 125, 695);
    ctx.closePath();
    ctx.fill();

    // Vertical speed rays inside tractor beam
    ctx.strokeStyle = "rgba(255,255,255,0.65)";
    ctx.lineWidth = 1.5;
    for (let r = -85; r <= 85; r += 12) {
      ctx.beginPath();
      ctx.moveTo(w / 2 + r * 0.25, 200);
      ctx.lineTo(w / 2 + r, 665);
      ctx.stroke();
    }

    // Metallic Flying Saucer (UFO) at top of beam
    ctx.save();
    ctx.translate(w / 2, 185);
    // Saucer outer disc
    ctx.fillStyle = "#18181b";
    ctx.strokeStyle = "#e4e4e7";
    ctx.lineWidth = 3.5;
    ctx.beginPath();
    ctx.ellipse(0, 0, 108, 30, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.stroke();

    // Saucer glowing rim lights
    ctx.fillStyle = "#ffffff";
    for (let a = 0; a < 10; a++) {
      const ang = (a / 10) * Math.PI * 2;
      ctx.beginPath();
      ctx.arc(Math.cos(ang) * 86, Math.sin(ang) * 20, 3.5, 0, Math.PI * 2);
      ctx.fill();
    }

    // Glowing core aperture
    ctx.fillStyle = "#ffffff";
    ctx.beginPath();
    ctx.ellipse(0, 8, 36, 10, 0, 0, Math.PI * 2);
    ctx.fill();
    ctx.restore();

    // Floating Debris / Silhouettes being abducted inside beam
    ctx.fillStyle = "#090a0d";
    const debris = [
      { x: 350, y: 390, w: 18, h: 26, rot: 0.3 },
      { x: 325, y: 445, w: 24, h: 16, rot: -0.4 },
      { x: 375, y: 470, w: 16, h: 28, rot: 0.5 },
      { x: 342, y: 520, w: 28, h: 20, rot: -0.2 },
      { x: 315, y: 565, w: 20, h: 30, rot: 0.6 },
      { x: 382, y: 560, w: 22, h: 24, rot: -0.5 },
      { x: 355, y: 600, w: 16, h: 16, rot: 0.1 }
    ];
    debris.forEach((d) => {
      ctx.save();
      ctx.translate(d.x, d.y);
      ctx.rotate(d.rot);
      ctx.fillRect(-d.w / 2, -d.h / 2, d.w, d.h);
      ctx.restore();
    });

    // Vintage Sedan Car Silhouette at Base of Beam
    ctx.save();
    ctx.translate(w / 2, 665);
    // Ground glow
    const groundGlow = ctx.createRadialGradient(0, 10, 10, 0, 15, 220);
    groundGlow.addColorStop(0, "rgba(255,255,255,0.95)");
    groundGlow.addColorStop(0.6, "rgba(255,255,255,0.28)");
    groundGlow.addColorStop(1, "rgba(255,255,255,0)");
    ctx.fillStyle = groundGlow;
    ctx.beginPath();
    ctx.ellipse(0, 18, 220, 52, 0, 0, Math.PI * 2);
    ctx.fill();

    // Car body
    ctx.fillStyle = "#090a0d";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(-105, 10);
    ctx.lineTo(-98, -14);
    ctx.lineTo(-55, -18);
    ctx.lineTo(-36, -42);
    ctx.lineTo(42, -42);
    ctx.lineTo(64, -16);
    ctx.lineTo(105, -10);
    ctx.lineTo(108, 12);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Car windows
    ctx.fillStyle = "#e4e4e7";
    ctx.beginPath();
    ctx.moveTo(-32, -37);
    ctx.lineTo(0, -37);
    ctx.lineTo(0, -18);
    ctx.lineTo(-46, -18);
    ctx.closePath();
    ctx.fill();

    ctx.beginPath();
    ctx.moveTo(6, -37);
    ctx.lineTo(38, -37);
    ctx.lineTo(54, -18);
    ctx.lineTo(6, -18);
    ctx.closePath();
    ctx.fill();

    // Wheels
    ctx.fillStyle = "#090a0d";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 3;
    [-64, 64].forEach((wx) => {
      ctx.beginPath();
      ctx.arc(wx, 14, 18, 0, Math.PI * 2);
      ctx.fill();
      ctx.stroke();
    });
    ctx.restore();

    ctx.restore();
  });

  // 2. Acid Cyber Chrome Star Emblem
  makeGraphic("Cyber Star Emblem", "Streetwear", (ctx, w, h) => {
    ctx.save();
    ctx.translate(w / 2, h / 2);
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 10;
    ctx.beginPath();
    ctx.arc(0, 0, 220, 0, Math.PI * 2);
    ctx.stroke();

    ctx.lineWidth = 3;
    ctx.beginPath();
    ctx.arc(0, 0, 195, 0, Math.PI * 2);
    ctx.stroke();

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

  // 3. Tokyo Heavy Industries Brutalist Box
  makeGraphic("Heavy Dept Box", "Brutalist", (ctx, w, h) => {
    ctx.translate(50, 110);
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

  // 4. Retro Sunset Wave
  makeGraphic("Retro Sunset Wave", "Vintage", (ctx, w, h) => {
    ctx.translate(50, 110);
    ctx.save();
    ctx.beginPath();
    ctx.arc(300, 280, 210, 0, Math.PI * 2);
    ctx.clip();

    const grad = ctx.createLinearGradient(0, 70, 0, 490);
    grad.addColorStop(0, "#fb7185");
    grad.addColorStop(0.45, "#fb923c");
    grad.addColorStop(1, "#facc15");
    ctx.fillStyle = grad;

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

  // 5. Minimalist Atelier Crest
  makeGraphic("Atelier Minimal Crest", "Luxury", (ctx, w, h) => {
    ctx.translate(50, 110);
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

  // 6. Technical Barcode Spec Patch
  makeGraphic("Tech Spec Barcode", "Utility", (ctx, w, h) => {
    ctx.translate(50, 110);
    ctx.fillStyle = "#ffffff";
    ctx.strokeStyle = "#ffffff";
    ctx.lineWidth = 4;
    ctx.strokeRect(80, 130, 440, 340);

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
