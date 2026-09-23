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

function round(n: number, decimals: number): number {
  const f = 10 ** decimals;
  return Math.round(n * f) / f;
}
