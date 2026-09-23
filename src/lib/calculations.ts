export type CalcInputs = Record<string, number>;
export type CalcResults = Record<string, number>;

export function calculate(slug: string, inputs: CalcInputs): CalcResults {
  switch (slug) {
    case "concrete-calculator":
      return calcConcrete(inputs);
    case "mulch-calculator":
      return calcMulch(inputs);
    case "gravel-calculator":
      return calcGravel(inputs);
    case "paint-calculator":
      return calcPaint(inputs);
    case "roofing-calculator":
      return calcRoofing(inputs);
    case "tile-calculator":
      return calcTile(inputs);
    case "lumber-calculator":
      return calcLumber(inputs);
    case "drywall-calculator":
      return calcDrywall(inputs);
    case "deck-calculator":
      return calcDeck(inputs);
    case "fence-calculator":
      return calcFence(inputs);
    case "flooring-calculator":
      return calcFlooring(inputs);
    case "roof-pitch-calculator":
      return calcRoofPitch(inputs);
    case "sand-calculator":
      return calcSand(inputs);
    case "stair-calculator":
      return calcStairs(inputs);
    case "brick-calculator":
      return calcBrick(inputs);
    case "sod-calculator":
      return calcSod(inputs);
    case "insulation-calculator":
      return calcInsulation(inputs);
    case "retaining-wall-calculator":
      return calcRetainingWall(inputs);
    case "paver-calculator":
      return calcPaver(inputs);
    case "rebar-calculator":
      return calcRebar(inputs);
    case "topsoil-calculator":
      return calcTopsoil(inputs);
    // HVAC
    case "btu-calculator":
      return calcBTU(inputs);
    case "ac-tonnage-calculator":
      return calcACTonnage(inputs);
    case "duct-size-calculator":
      return calcDuctSize(inputs);
    case "heat-loss-calculator":
      return calcHeatLoss(inputs);
    case "refrigerant-charge-calculator":
      return calcRefrigerant(inputs);
    // Electrical
    case "ohms-law-calculator":
      return calcOhmsLaw(inputs);
    case "voltage-drop-calculator":
      return calcVoltageDrop(inputs);
    case "wire-gauge-calculator":
      return calcWireGauge(inputs);
    case "circuit-breaker-calculator":
      return calcBreakerSize(inputs);
    case "electrical-load-calculator":
      return calcElectricalLoad(inputs);
    // Plumbing
    case "water-heater-calculator":
      return calcWaterHeater(inputs);
    case "pipe-size-calculator":
      return calcPipeSize(inputs);
    case "drain-slope-calculator":
      return calcDrainSlope(inputs);
    case "sump-pump-calculator":
      return calcSumpPump(inputs);
    case "fixture-unit-calculator":
      return calcFixtureUnit(inputs);
    case "water-pressure-calculator":
      return calcWaterPressure(inputs);
    default:
      return {};
  }
}

function calcConcrete(i: CalcInputs): CalcResults {
  const cubicFeet = (i.length || 0) * (i.width || 0) * ((i.depth || 0) / 12);
  const cubicYards = cubicFeet / 27;
  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    bags40: Math.ceil(cubicFeet / 0.30),
    bags60: Math.ceil(cubicFeet / 0.45),
    bags80: Math.ceil(cubicFeet / 0.60),
    cost: round(cubicYards * (i.pricePerYard || 125), 2),
  };
}

function calcMulch(i: CalcInputs): CalcResults {
  const cubicFeet = (i.length || 0) * (i.width || 0) * ((i.depth || 0) / 12);
  const cubicYards = cubicFeet / 27;
  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    bags2cf: Math.ceil(cubicFeet / 2),
    cost: round(cubicYards * (i.pricePerYard || 35), 2),
  };
}

function calcGravel(i: CalcInputs): CalcResults {
  const cubicFeet = (i.length || 0) * (i.width || 0) * ((i.depth || 0) / 12);
  const cubicYards = cubicFeet / 27;
  const tons = cubicYards * 1.4;
  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    tons: round(tons, 2),
    cost: round(tons * (i.pricePerTon || 50), 2),
  };
}

function calcPaint(i: CalcInputs): CalcResults {
  const perimeter = 2 * ((i.roomLength || 0) + (i.roomWidth || 0));
  const wallArea = perimeter * (i.wallHeight || 0);
  const doorArea = (i.doors || 0) * 21;
  const windowArea = (i.windows || 0) * 15;
  const paintableArea = wallArea - doorArea - windowArea;
  const coats = i.coats || 2;
  const gallons = Math.ceil((paintableArea * coats) / 350);
  return {
    wallArea: round(wallArea, 0),
    paintableArea: round(Math.max(paintableArea, 0), 0),
    gallons: Math.max(gallons, 1),
  };
}

function calcRoofing(i: CalcInputs): CalcResults {
  const flatArea = (i.length || 0) * (i.width || 0);
  const pitch = i.pitch || 0;
  const multiplier = Math.sqrt(1 + (pitch / 12) ** 2);
  const roofArea = flatArea * multiplier * 2;
  const waste = 1 + (i.wastePercent || 10) / 100;
  const totalArea = roofArea * waste;
  const squares = totalArea / 100;
  return {
    flatArea: round(flatArea, 0),
    roofArea: round(roofArea, 0),
    squares: round(squares, 1),
    bundles: Math.ceil(squares * 3),
    underlayment: Math.ceil(totalArea / 400),
  };
}

function calcTile(i: CalcInputs): CalcResults {
  const totalArea = (i.areaLength || 0) * (i.areaWidth || 0);
  const tileArea = ((i.tileLength || 12) * (i.tileWidth || 12)) / 144;
  const waste = 1 + (i.wastePercent || 10) / 100;
  const tilesNeeded = Math.ceil((totalArea / tileArea) * waste);
  const boxes = Math.ceil(tilesNeeded / (i.tilesPerBox || 10));
  return {
    totalArea: round(totalArea, 0),
    tilesNeeded,
    boxes,
  };
}

function calcLumber(i: CalcInputs): CalcResults {
  const boardFeetEach = ((i.thickness || 1) * (i.width || 6) * (i.length || 8)) / 12;
  const qty = i.quantity || 1;
  const totalBoardFeet = boardFeetEach * qty;
  return {
    boardFeetEach: round(boardFeetEach, 2),
    totalBoardFeet: round(totalBoardFeet, 2),
    cost: round(totalBoardFeet * (i.pricePerBF || 5), 2),
  };
}

function calcDrywall(i: CalcInputs): CalcResults {
  const wallArea = 2 * ((i.roomLength || 0) + (i.roomWidth || 0)) * (i.wallHeight || 0);
  const ceilingArea = (i.doCeiling || 0) === 1 ? (i.roomLength || 0) * (i.roomWidth || 0) : 0;
  const totalArea = wallArea + ceilingArea;
  const sheetSize = i.sheetSize || 32;
  const sheets = Math.ceil((totalArea * 1.10) / sheetSize);
  return {
    wallArea: round(wallArea, 0),
    ceilingArea: round(ceilingArea, 0),
    totalArea: round(totalArea, 0),
    sheets,
    compound: round(totalArea * 0.053, 1),
    tape: round(totalArea, 0),
  };
}

function calcDeck(i: CalcInputs): CalcResults {
  const deckArea = (i.deckLength || 0) * (i.deckWidth || 0);
  const boardWidthFt = (i.boardWidth || 5.5) / 12;
  const boardLength = i.boardLength || 16;
  const boardsAcross = Math.ceil((i.deckWidth || 0) / boardWidthFt);
  const boardsLengthwise = Math.ceil((i.deckLength || 0) / boardLength);
  const deckingBoards = Math.ceil(boardsAcross * boardsLengthwise * 1.10);
  const joists = Math.ceil(((i.deckLength || 0) * 12) / 16) + 1;
  const posts = (Math.ceil((i.deckLength || 0) / 8) + 1) * (Math.ceil((i.deckWidth || 0) / 8) + 1);
  return {
    deckArea: round(deckArea, 0),
    deckingBoards,
    joists,
    posts,
    hangers: joists,
  };
}

function calcFence(i: CalcInputs): CalcResults {
  const totalLength = i.totalLength || 0;
  const posts = Math.ceil(totalLength / 8) + 1;
  const sections = posts - 1;
  const fenceHeight = i.fenceHeight || 6;
  const rails = sections * (fenceHeight > 6 ? 3 : 2);
  const picketWidthFt = (i.picketWidth || 3.5) / 12;
  const gapFt = (i.picketGap || 0) / 12;
  const pickets = Math.ceil(totalLength / (picketWidthFt + gapFt));
  return {
    posts,
    rails,
    pickets,
    concreteBags: 1,
    totalConcrete: posts,
  };
}

function calcFlooring(i: CalcInputs): CalcResults {
  const roomArea = (i.roomLength || 0) * (i.roomWidth || 0);
  const waste = 1 + (i.wastePercent || 10) / 100;
  const totalNeeded = roomArea * waste;
  const boxes = Math.ceil(totalNeeded / (i.sqftPerBox || 20));
  return {
    roomArea: round(roomArea, 0),
    totalNeeded: round(totalNeeded, 0),
    boxes,
    cost: round(totalNeeded * (i.pricePerSqFt || 3), 2),
  };
}

function calcRoofPitch(i: CalcInputs): CalcResults {
  const rise = i.rise || 0;
  const run = i.run || 12;
  const ratio = rise / run;
  const pitch = ratio * 12;
  const degrees = Math.atan(ratio) * (180 / Math.PI);
  const multiplier = Math.sqrt(1 + ratio ** 2);
  return {
    pitch: round(pitch, 2),
    degrees: round(degrees, 1),
    slopePercent: round(ratio * 100, 1),
    multiplier: round(multiplier, 4),
  };
}

function calcSand(i: CalcInputs): CalcResults {
  const cubicFeet = (i.length || 0) * (i.width || 0) * ((i.depth || 0) / 12);
  const cubicYards = cubicFeet / 27;
  const tons = cubicYards * 1.35;
  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    tons: round(tons, 2),
    cost: round(tons * (i.pricePerTon || 30), 2),
  };
}

function calcStairs(i: CalcInputs): CalcResults {
  const totalRise = i.totalRise || 0;
  const desiredRiser = i.riserHeight || 7.5;
  const treadDepth = i.treadDepth || 10;
  const numRisers = Math.round(totalRise / desiredRiser);
  const actualRiser = numRisers > 0 ? totalRise / numRisers : 0;
  const numTreads = Math.max(numRisers - 1, 0);
  const totalRun = numTreads * treadDepth;
  const stringerLength = Math.sqrt(totalRise ** 2 + totalRun ** 2);
  return {
    numRisers,
    actualRiser: round(actualRiser, 3),
    numTreads,
    totalRun: round(totalRun, 1),
    stringerLength: round(stringerLength, 1),
  };
}

function calcBrick(i: CalcInputs): CalcResults {
  const wallArea = (i.wallLength || 0) * (i.wallHeight || 0);
  const brickL = i.brickLength || 8;
  const brickH = i.brickHeight || 2.25;
  const joint = i.mortarJoint || 0.375;
  const brickAreaSqIn = (brickL + joint) * (brickH + joint);
  const bricksPerSqFt = 144 / brickAreaSqIn;
  const waste = 1 + (i.wastePercent || 10) / 100;
  const bricksNeeded = Math.ceil(wallArea * bricksPerSqFt * waste);
  const mortarBags = Math.ceil(bricksNeeded / 37);
  return {
    wallArea: round(wallArea, 0),
    bricksNeeded,
    mortarBags,
  };
}

function calcSod(i: CalcInputs): CalcResults {
  const totalArea = (i.length || 0) * (i.width || 0);
  const waste = 1 + (i.wastePercent || 5) / 100;
  const sodNeeded = totalArea * waste;
  return {
    totalArea: round(totalArea, 0),
    sodNeeded: round(sodNeeded, 0),
    rolls: Math.ceil(sodNeeded / 10),
    pallets: round(sodNeeded / 450, 1),
    cost: round(sodNeeded * (i.pricePerSqFt || 0.45), 2),
  };
}

function calcInsulation(i: CalcInputs): CalcResults {
  const totalArea = (i.areaLength || 0) * (i.areaWidth || 0);
  const insulationArea = totalArea * 0.94; // subtract ~6% for framing
  const spacing = i.studSpacing || 16;
  const cavityWidth = (spacing - 1.5) / 12; // stud is 1.5" wide
  const cavities = Math.ceil(((i.areaLength || 0) * 12) / spacing);
  const rollsNeeded = Math.ceil(insulationArea / (i.rollCoverage || 40));
  return {
    totalArea: round(totalArea, 0),
    cavities,
    rollsNeeded,
  };
}

function calcRetainingWall(i: CalcInputs): CalcResults {
  const wallArea = (i.wallLength || 0) * (i.wallHeight || 0);
  const blockL = i.blockLength || 12;
  const blockH = i.blockHeight || 4;
  const rows = Math.ceil(((i.wallHeight || 0) * 12) / blockH);
  const blocksPerRow = Math.ceil(((i.wallLength || 0) * 12) / blockL);
  const blocksNeeded = Math.ceil(rows * blocksPerRow * 1.05);
  const baseGravel = ((i.wallLength || 0) * 2 * 0.5) / 27; // 6" deep, 2' wide
  return {
    wallArea: round(wallArea, 0),
    blocksNeeded,
    rows,
    capStones: blocksPerRow,
    baseGravel: round(baseGravel, 2),
  };
}

function calcPaver(i: CalcInputs): CalcResults {
  const totalArea = (i.areaLength || 0) * (i.areaWidth || 0);
  const paverArea = ((i.paverLength || 8) * (i.paverWidth || 4)) / 144;
  const waste = 1 + (i.wastePercent || 10) / 100;
  const paversNeeded = Math.ceil((totalArea / paverArea) * waste);
  const gravelNeeded = (totalArea * (4 / 12)) / 27;
  const sandNeeded = (totalArea * (1 / 12)) / 27;
  return {
    totalArea: round(totalArea, 0),
    paversNeeded,
    gravelNeeded: round(gravelNeeded, 2),
    sandNeeded: round(sandNeeded, 2),
  };
}

function calcRebar(i: CalcInputs): CalcResults {
  const slabL = i.slabLength || 0;
  const slabW = i.slabWidth || 0;
  const spacing = i.spacing || 12;
  const weightPerFoot = i.rebarSize || 0.668; // default #4
  const lengthBars = Math.floor((slabW * 12) / spacing) + 1;
  const widthBars = Math.floor((slabL * 12) / spacing) + 1;
  const totalBars = lengthBars + widthBars;
  const totalLength = lengthBars * slabL + widthBars * slabW;
  return {
    lengthBars,
    widthBars,
    totalBars,
    totalLength: round(totalLength, 0),
    totalWeight: round(totalLength * weightPerFoot, 1),
  };
}

function calcTopsoil(i: CalcInputs): CalcResults {
  const cubicFeet = (i.length || 0) * (i.width || 0) * ((i.depth || 0) / 12);
  const cubicYards = cubicFeet / 27;
  const tons = cubicYards * 1.1;
  return {
    cubicFeet: round(cubicFeet, 2),
    cubicYards: round(cubicYards, 2),
    tons: round(tons, 2),
    cost: round(cubicYards * (i.pricePerYard || 30), 2),
  };
}

// ===== HVAC =====

function calcBTU(i: CalcInputs): CalcResults {
  const sqft = i.squareFootage || 0;
  const ceilingMult = (i.ceilingHeight || 8) / 8;
  const climateFactor = i.climateZone || 25;
  const insulationMult = i.insulation || 1.0;
  const sunMult = i.sunExposure || 1.0;
  const extraOccupants = Math.max(0, (i.occupants || 2) - 2);
  const btu = sqft * climateFactor * ceilingMult * insulationMult * sunMult + extraOccupants * 600;
  const tonnage = btu / 12000;
  return {
    btuNeeded: round(btu, 0),
    tonnage: round(tonnage, 1),
    furnaceMBH: round(btu / 1000, 0),
  };
}

function calcACTonnage(i: CalcInputs): CalcResults {
  const sqft = i.squareFootage || 0;
  const sqftPerTon = i.climateZone || 500;
  const ceilingMult = (i.ceilingHeight || 8) / 8;
  const exactTons = (sqft / sqftPerTon) * ceilingMult;
  const btu = exactTons * 12000;
  // Round to nearest standard size
  const sizes = [1.5, 2, 2.5, 3, 3.5, 4, 5];
  let recommended = 5;
  for (const s of sizes) {
    if (s >= exactTons) { recommended = s; break; }
  }
  return {
    btu: round(btu, 0),
    exactTons: round(exactTons, 2),
    recommendedTons: recommended,
  };
}

function calcDuctSize(i: CalcInputs): CalcResults {
  const cfm = i.cfm || 0;
  const velocity = i.velocity || 650;
  const areaSqIn = (cfm / velocity) * 144 * 60; // convert FPM to ft/sec, area in sq inches
  // Simpler: area (sq ft) = CFM / velocity (ft/min). duct area sq in = area * 144
  const areaSqFt = cfm / velocity;
  const areaIn = areaSqFt * 144;
  const diameter = Math.sqrt((4 * areaIn) / Math.PI);
  const totalCFM = (i.systemTons || 0) * 400;
  // Round up to nearest standard duct size (4,5,6,7,8,9,10,12,14,16,18,20)
  const stdSizes = [4, 5, 6, 7, 8, 9, 10, 12, 14, 16, 18, 20];
  let roundedDia = 20;
  for (const s of stdSizes) {
    if (s >= diameter) { roundedDia = s; break; }
  }
  const actualArea = Math.PI * (roundedDia / 2) ** 2;
  const actualVel = cfm > 0 ? (cfm / (actualArea / 144)) : 0;
  return {
    diameter: roundedDia,
    ductArea: round(actualArea, 1),
    actualVelocity: round(actualVel, 0),
    totalCFM: totalCFM > 0 ? totalCFM : 0,
  };
}

function calcHeatLoss(i: CalcInputs): CalcResults {
  const dt = (i.indoorTemp || 70) - (i.outdoorTemp || 5);
  const wallU = 1 / (i.wallRValue || 15);
  const windowU = 1 / (i.windowType || 2);
  const ceilingU = 1 / (i.ceilingRValue || 38);
  const wallLoss = wallU * (i.wallArea || 0) * dt;
  const windowLoss = windowU * (i.windowArea || 0) * dt;
  const ceilingLoss = ceilingU * (i.ceilingArea || 0) * dt;
  const volume = (i.floorArea || 0) * (i.ceilingHeight || 8);
  const ach = 0.5; // average home
  const infiltrationLoss = 0.018 * volume * ach * dt;
  const totalLoss = wallLoss + windowLoss + ceilingLoss + infiltrationLoss;
  return {
    wallLoss: round(wallLoss, 0),
    windowLoss: round(windowLoss, 0),
    ceilingLoss: round(ceilingLoss, 0),
    infiltrationLoss: round(infiltrationLoss, 0),
    totalLoss: round(totalLoss, 0),
    furnaceMBH: round(totalLoss / 1000, 0),
  };
}

function calcRefrigerant(i: CalcInputs): CalcResults {
  // Simplified P-T chart approximation for R-410A
  const refrigType = i.refrigerant || 1;
  let evapSat = 0;
  let condSat = 0;
  if (refrigType === 1) {
    // R-410A: approx T = (P - 70) / 3.2 for suction range, T = (P + 50) / 4.5 for liquid range
    evapSat = ((i.suctionPressure || 0) - 70) / 3.2 + 20;
    condSat = ((i.liquidPressure || 0) + 50) / 4.5 + 10;
  } else if (refrigType === 2) {
    // R-22: approx
    evapSat = ((i.suctionPressure || 0) - 30) / 1.8 + 10;
    condSat = ((i.liquidPressure || 0) - 100) / 2.2 + 60;
  } else {
    // R-134a: approx
    evapSat = ((i.suctionPressure || 0) - 10) / 1.2 + 10;
    condSat = ((i.liquidPressure || 0) - 50) / 1.8 + 50;
  }
  const superheat = (i.suctionTemp || 0) - evapSat;
  const subcooling = condSat - (i.liquidTemp || 0);
  return {
    evapSatTemp: round(evapSat, 1),
    superheat: round(superheat, 1),
    condSatTemp: round(condSat, 1),
    subcooling: round(subcooling, 1),
  };
}

// ===== ELECTRICAL =====

function calcOhmsLaw(i: CalcInputs): CalcResults {
  let v = i.voltage || 0;
  let a = i.current || 0;
  let r = i.resistance || 0;
  let p = i.power || 0;
  const known = (v > 0 ? 1 : 0) + (a > 0 ? 1 : 0) + (r > 0 ? 1 : 0) + (p > 0 ? 1 : 0);
  if (known >= 2) {
    if (v > 0 && a > 0) { r = v / a; p = v * a; }
    else if (v > 0 && r > 0) { a = v / r; p = v * v / r; }
    else if (v > 0 && p > 0) { a = p / v; r = v * v / p; }
    else if (a > 0 && r > 0) { v = a * r; p = a * a * r; }
    else if (a > 0 && p > 0) { v = p / a; r = p / (a * a); }
    else if (r > 0 && p > 0) { v = Math.sqrt(p * r); a = Math.sqrt(p / r); }
  }
  return {
    voltage: round(v, 2),
    current: round(a, 4),
    resistance: round(r, 2),
    power: round(p, 2),
  };
}

function calcVoltageDrop(i: CalcInputs): CalcResults {
  const voltage = i.voltage || 120;
  const current = i.current || 0;
  const distance = i.distance || 0;
  const rPer1000 = i.wireGauge || 1.98; // default 12 AWG
  const phase = i.phase || 1;
  const multiplier = phase === 3 ? 1.732 : 2;
  const vDrop = (multiplier * distance * current * rPer1000) / 1000;
  const vDropPercent = voltage > 0 ? (vDrop / voltage) * 100 : 0;
  return {
    vDrop: round(vDrop, 2),
    vDropPercent: round(vDropPercent, 2),
    voltageAtLoad: round(voltage - vDrop, 2),
    compliant: vDropPercent <= 3 ? 1 : 0,
  };
}

function calcWireGauge(i: CalcInputs): CalcResults {
  const current = i.current || 0;
  const voltage = i.voltage || 120;
  const distance = i.distance || 0;
  const contFactor = i.continuous || 1.0;
  const requiredAmpacity = current * contFactor;

  // NEC ampacity table: [AWG label number, ampacity, resistance/1000ft]
  const wireTable: [string, number, number][] = [
    ["14", 15, 3.14], ["12", 20, 1.98], ["10", 30, 1.24],
    ["8", 40, 0.778], ["6", 55, 0.491], ["4", 70, 0.308],
    ["2", 95, 0.194], ["1", 110, 0.154], ["1/0", 125, 0.122],
    ["2/0", 145, 0.0967], ["3/0", 165, 0.0768], ["4/0", 195, 0.0608],
  ];

  // Find by ampacity
  let ampacityGauge = "4/0";
  for (const [gauge, amp] of wireTable) {
    if (amp >= requiredAmpacity) { ampacityGauge = gauge; break; }
  }

  // Find by voltage drop (≤3%)
  let vdropGauge = "14";
  const maxVDrop = voltage * 0.03;
  for (const [gauge, , r] of wireTable) {
    const drop = (2 * distance * current * r) / 1000;
    if (drop <= maxVDrop) { vdropGauge = gauge; break; }
    vdropGauge = gauge;
  }

  // Recommend the larger (more conservative)
  const ampIdx = wireTable.findIndex(([g]) => g === ampacityGauge);
  const vdIdx = wireTable.findIndex(([g]) => g === vdropGauge);
  const recIdx = Math.max(ampIdx, vdIdx);
  const recommended = wireTable[recIdx][0];

  // Calculate vdrop at recommended
  const recR = wireTable[recIdx][2];
  const actualDrop = (2 * distance * current * recR) / 1000;
  const vdropPct = voltage > 0 ? (actualDrop / voltage) * 100 : 0;

  return {
    ampacityGauge: Number(ampacityGauge.replace("/0", "")) || 0,
    vdropGauge: Number(vdropGauge.replace("/0", "")) || 0,
    recommended: Number(recommended.replace("/0", "")) || 0,
    vdropPercent: round(vdropPct, 2),
  };
}

function calcBreakerSize(i: CalcInputs): CalcResults {
  const watts = i.loadWatts || 0;
  const voltage = i.voltage || 120;
  const contFactor = i.continuous || 1.0;
  const loadAmps = watts / voltage;
  const requiredAmps = loadAmps * contFactor;
  const stdBreakers = [15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 90, 100, 125, 150, 200];
  let breakerSize = 200;
  for (const b of stdBreakers) {
    if (b >= requiredAmps) { breakerSize = b; break; }
  }
  // Wire gauge for breaker
  const wireMap: Record<number, string> = {
    15: "14", 20: "12", 25: "10", 30: "10", 35: "8", 40: "8",
    45: "6", 50: "6", 60: "4", 70: "4", 80: "2", 90: "2",
    100: "1", 125: "1/0", 150: "2/0", 200: "4/0",
  };
  return {
    loadAmps: round(loadAmps, 1),
    requiredAmps: round(requiredAmps, 1),
    breakerSize,
    wireGauge: Number((wireMap[breakerSize] || "12").replace("/0", "")) || 0,
  };
}

function calcElectricalLoad(i: CalcInputs): CalcResults {
  const sqft = i.squareFootage || 0;
  const saCircuits = i.smallApplianceCircuits || 2;
  const laundryCircuits = i.laundryCircuits || 1;
  const generalLoad = sqft * 3 + saCircuits * 1500 + laundryCircuits * 1500;
  const adjustedGeneral = Math.min(generalLoad, 10000) + Math.max(0, generalLoad - 10000) * 0.4;
  const rangeDemand = (i.rangeWatts || 0) <= 12000 ? Math.min(i.rangeWatts || 0, 8000) : (i.rangeWatts || 0);
  const dryerDemand = Math.max(i.dryerWatts || 0, 5000 * ((i.dryerWatts || 0) > 0 ? 1 : 0));
  const hvacDemand = i.hvacWatts || 0;
  const waterHeater = i.waterHeaterWatts || 0;
  const evCharger = i.evChargerWatts || 0;
  const totalDemand = adjustedGeneral + rangeDemand + dryerDemand + hvacDemand + waterHeater + evCharger;
  const serviceAmps = totalDemand / 240;
  const stdSizes = [100, 150, 200, 400];
  let serviceSize = 400;
  for (const s of stdSizes) {
    if (s >= serviceAmps) { serviceSize = s; break; }
  }
  return {
    generalLoad: round(generalLoad, 0),
    adjustedGeneral: round(adjustedGeneral, 0),
    totalDemand: round(totalDemand, 0),
    serviceAmps: round(serviceAmps, 0),
    serviceSize,
  };
}

// ===== PLUMBING =====

function calcWaterHeater(i: CalcInputs): CalcResults {
  const occupants = i.occupants || 4;
  const showers = i.showers || 1;
  const inTemp = i.incomingTemp || 50;
  const outTemp = i.outputTemp || 120;
  const dt = outTemp - inTemp;
  const peakDemand = occupants * 12; // 12 gal/person peak hour
  // Tank sizing
  const tankSizes = [30, 40, 50, 65, 80];
  let tankSize = 80;
  for (const t of tankSizes) {
    if (t * 0.7 >= peakDemand * 0.7) { tankSize = t; break; }
  }
  // Tankless sizing
  const showerGPM = 2.0;
  const sinkGPM = 1.0;
  const tanklessGPM = showers * showerGPM + sinkGPM;
  const tanklessBTU = tanklessGPM * 500 * dt;
  return {
    peakDemand: round(peakDemand, 0),
    tankSize,
    tanklessGPM: round(tanklessGPM, 1),
    tanklessBTU: round(tanklessBTU, 0),
    tempRise: dt,
  };
}

function calcPipeSize(i: CalcInputs): CalcResults {
  const gpm = i.flowRate || 0;
  const maxVel = i.maxVelocity || 8;
  // Q (cfs) = GPM / 449. A = Q / V. d = sqrt(4A/pi) * 12
  const qCFS = gpm / 449;
  const areaSqFt = maxVel > 0 ? qCFS / maxVel : 0;
  const dInches = Math.sqrt((4 * areaSqFt) / Math.PI) * 12;
  // Standard sizes
  const stdSizes = [0.5, 0.75, 1, 1.25, 1.5, 2, 2.5, 3];
  const stdIDs = [0.62, 0.82, 1.05, 1.38, 1.61, 2.07, 2.47, 3.07];
  let nominalSize = 3;
  let actualID = 3.07;
  for (let idx = 0; idx < stdSizes.length; idx++) {
    if (stdIDs[idx] >= dInches) {
      nominalSize = stdSizes[idx];
      actualID = stdIDs[idx];
      break;
    }
  }
  const actualArea = Math.PI * (actualID / 2 / 12) ** 2;
  const actualVel = actualArea > 0 ? qCFS / actualArea : 0;
  return {
    minDiameter: round(dInches, 2),
    nominalSize,
    actualVelocity: round(actualVel, 1),
  };
}

function calcDrainSlope(i: CalcInputs): CalcResults {
  const runLength = i.runLength || 0;
  const slope = i.customSlope || i.pipeSize || 0.25;
  const totalFall = slope * runLength;
  const gradePercent = (slope / 12) * 100;
  const angleDeg = Math.atan(slope / 12) * (180 / Math.PI);
  return {
    slopeInPerFt: round(slope, 4),
    totalFall: round(totalFall, 2),
    totalFallFt: round(totalFall / 12, 2),
    gradePercent: round(gradePercent, 2),
    angleDeg: round(angleDeg, 2),
  };
}

function calcSumpPump(i: CalcInputs): CalcResults {
  const area = i.drainageArea || 0;
  const rainfall = i.rainfallRate || 2;
  const inflowCFH = (area * rainfall) / 12;
  const inflowGPH = inflowCFH * 7.48;
  const inflowGPM = inflowGPH / 60;
  const vertLift = i.verticalLift || 0;
  const pipeLength = i.dischargePipeLength || 0;
  const frictionLoss = pipeLength * 0.10;
  const tdh = vertLift + frictionLoss;
  const requiredGPM = inflowGPM * 1.5;
  // HP recommendation
  let hp = 0.25;
  if (requiredGPM > 20 && tdh > 10) hp = 0.33;
  if (requiredGPM > 40 && tdh > 15) hp = 0.5;
  if (requiredGPM > 60 && tdh > 20) hp = 0.75;
  if (requiredGPM > 80 || tdh > 25) hp = 1.0;
  return {
    inflowGPM: round(inflowGPM, 1),
    tdh: round(tdh, 1),
    requiredGPM: round(requiredGPM, 1),
    recommendedHP: hp,
  };
}

function calcFixtureUnit(i: CalcInputs): CalcResults {
  const totalDFU =
    (i.toilets || 0) * 4 +
    (i.showers || 0) * 3 +
    (i.bathroomSinks || 0) * 1 +
    (i.kitchenSink || 0) * 2 +
    (i.dishwasher || 0) * 2 +
    (i.washingMachine || 0) * 3 +
    (i.floorDrains || 0) * 2;
  // Branch drain sizing
  let branchSize = 1.5;
  if (totalDFU > 3) branchSize = 2;
  if (totalDFU > 6 || (i.toilets || 0) > 0) branchSize = 3;
  if (totalDFU > 20) branchSize = 4;
  // Building drain
  let buildingDrain = 3;
  if (totalDFU > 21) buildingDrain = 4;
  if (totalDFU > 180) buildingDrain = 6;
  // Stack
  let stackSize = 3;
  if (totalDFU > 20) stackSize = 3;
  if (totalDFU > 160) stackSize = 4;
  return {
    totalDFU,
    branchSize,
    buildingDrain,
    stackSize,
  };
}

function calcWaterPressure(i: CalcInputs): CalcResults {
  const supplyPSI = i.supplyPressure || 60;
  const pipeLen = i.pipeLength || 0;
  const pipeD = i.pipeDiameter || 0.82; // 3/4" default
  const gpm = i.flowRate || 0;
  const elevRise = i.elevationRise || 0;
  // Simplified Hazen-Williams, C=130 for copper
  const c = 130;
  const frictionPer100 = gpm > 0 && pipeD > 0
    ? (4.52 * Math.pow(gpm, 1.852)) / (Math.pow(c, 1.852) * Math.pow(pipeD, 4.87))
    : 0;
  const frictionLoss = frictionPer100 * (pipeLen / 100) * 1.15; // 15% for fittings
  const elevationLoss = elevRise * 0.433;
  const totalDrop = frictionLoss + elevationLoss;
  const fixturePressure = supplyPSI - totalDrop;
  return {
    frictionLoss: round(frictionLoss, 1),
    elevationLoss: round(elevationLoss, 1),
    totalDrop: round(totalDrop, 1),
    fixturePressure: round(fixturePressure, 1),
  };
}

function round(n: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}
