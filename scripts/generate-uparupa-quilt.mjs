import fs from "node:fs";
import path from "node:path";

const edgeSize = 200;
const rows = 5;
const cols = 5;

const colors = {
  sheepBg: "#c6cda2",
  sheepDark: "#191a18",
  sheepEye: "#d0d5c4",
  sheepBody: "#e8ebe1",
  alpacaBg: "#c7cd7b",
  alpacaBody: "#dfdbc0",
  alpacaDark: "#5a5850",
  chickBg: "#d9ce76",
  chickBody: "#e6bd35",
  chickDark: "#111110",
  cowBg: "#dabf6b",
  cowBody: "#dbd2c5",
  cowDark: "#504e4a",
  cowSpot: "#5a5850",
  pigBg: "#d59a5e",
  pigBody: "#be6b4f",
  pigDark: "#262221",
  pigAccent: "#d07152",
};

class Vec2D {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }

  get(index) {
    return index === 0 ? this.x : this.y;
  }

  add(other) {
    return new Vec2D(this.x + other.x, this.y + other.y);
  }
}

class SvgTurtle {
  constructor() {
    this.x = 0;
    this.y = 0;
    this.heading = 0;
    this.penDown = true;
    this.stroke = "#000";
    this.fill = "#000";
    this.strokeWidth = 1;
    this.filling = false;
    this.currentPoints = [];
    this.currentCircle = null;
    this.shapes = [];
  }

  speed() {}
  hideturtle() {}
  penup() {
    this.penDown = false;
  }
  pendown() {
    this.penDown = true;
  }
  goto(x, y) {
    this.x = x;
    this.y = y;
  }
  pos() {
    return new Vec2D(this.x, this.y);
  }
  pencolor(color) {
    this.stroke = color;
  }
  color(...args) {
    if (args.length === 1) {
      this.stroke = args[0];
      this.fill = args[0];
    } else if (args.length >= 2) {
      this.stroke = args[0];
      this.fill = args[1];
    }
  }
  pensize(size) {
    this.strokeWidth = size;
  }
  setheading(angle) {
    this.heading = angle;
  }
  right(angle) {
    this.heading -= angle;
  }
  left(angle) {
    this.heading += angle;
  }
  rt(angle) {
    this.right(angle);
  }
  lt(angle) {
    this.left(angle);
  }
  begin_fill() {
    if (this.filling) {
      this.end_fill();
    }
    this.filling = true;
    this.currentPoints = [];
    this.currentCircle = null;
  }
  end_fill() {
    if (this.currentCircle) {
      this.shapes.push(this.currentCircle);
    } else if (this.currentPoints.length) {
      this.shapes.push({
        kind: "polygon",
        points: [...this.currentPoints],
        fill: this.fill,
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      });
    }
    this.currentPoints = [];
    this.currentCircle = null;
    this.filling = false;
  }
  fd(distance) {
    const radians = (this.heading * Math.PI) / 180;
    const nx = this.x + Math.cos(radians) * distance;
    const ny = this.y + Math.sin(radians) * distance;
    this.#drawTo(nx, ny);
  }
  back(distance) {
    this.fd(-distance);
  }
  circle(radius) {
    const radians = (this.heading * Math.PI) / 180;
    const cx = this.x + -Math.sin(radians) * radius;
    const cy = this.y + Math.cos(radians) * radius;
    const shape = {
      kind: "circle",
      cx,
      cy,
      r: Math.abs(radius),
      fill: this.fill,
      stroke: this.stroke,
      strokeWidth: this.strokeWidth,
    };
    if (this.filling && !this.currentPoints.length) {
      this.currentCircle = shape;
    } else {
      this.shapes.push(shape);
    }
  }

  #drawTo(nx, ny) {
    const start = [this.x, this.y];
    const end = [nx, ny];
    if (this.filling) {
      if (!this.currentPoints.length) {
        this.currentPoints.push(start);
      }
      this.currentPoints.push(end);
    } else if (this.penDown) {
      this.shapes.push({
        kind: "line",
        x1: start[0],
        y1: start[1],
        x2: end[0],
        y2: end[1],
        stroke: this.stroke,
        strokeWidth: this.strokeWidth,
      });
    }
    this.x = nx;
    this.y = ny;
  }
}

const turtle = new SvgTurtle();

function telep(x, y) {
  turtle.penup();
  turtle.goto(x, y);
  turtle.pendown();
}

function ratioPos(start, xRatio, yRatio) {
  return [start.x + edgeSize * xRatio, start.y - edgeSize * yRatio];
}

function filledCircle(start, xRatio, yRatio, radius, stroke, fill, heading = 0) {
  const [x, y] = ratioPos(start, xRatio, yRatio);
  turtle.pencolor(stroke);
  turtle.color(fill);
  telep(x, y);
  turtle.setheading(heading);
  turtle.begin_fill();
  turtle.circle(radius);
  turtle.end_fill();
}

function strokedSequence(start, xRatio, yRatio, stroke, width, heading, steps) {
  const [x, y] = ratioPos(start, xRatio, yRatio);
  turtle.pencolor(stroke);
  turtle.color(stroke);
  telep(x, y);
  turtle.setheading(heading);
  turtle.pensize(width);
  for (const [command, value] of steps) {
    turtle[command](value);
  }
}

function filledSequence(start, xRatio, yRatio, stroke, fill, heading, steps) {
  const [x, y] = ratioPos(start, xRatio, yRatio);
  turtle.pencolor(stroke);
  turtle.color(fill);
  telep(x, y);
  turtle.setheading(heading);
  turtle.begin_fill();
  for (const [command, value] of steps) {
    turtle[command](value);
  }
  turtle.end_fill();
}

function quiltLoopSquare() {
  for (let i = 0; i < 3; i += 1) {
    turtle.fd(edgeSize);
    turtle.rt(90);
  }
  turtle.fd(edgeSize);
}

function quiltBgFill(color) {
  turtle.pencolor(color);
  turtle.color(color);
  turtle.begin_fill();
  quiltLoopSquare();
  turtle.end_fill();
}

function sheep() {
  const start = turtle.pos();
  quiltBgFill(colors.sheepBg);

  turtle.pencolor(colors.sheepBody);
  turtle.color(colors.sheepBody);

  telep(...ratioPos(start, 0.4, 0.6));
  turtle.setheading(90);
  turtle.right(90);
  turtle.begin_fill();
  turtle.circle(edgeSize / 7);
  turtle.end_fill();

  telep(...ratioPos(start, 0.55, 0.25));
  turtle.right(90);
  turtle.right(90);
  turtle.begin_fill();
  turtle.circle(edgeSize / 7);
  turtle.end_fill();

  telep(...ratioPos(start, 0.647, 0.65));
  turtle.right(90);
  turtle.right(90);
  turtle.begin_fill();
  turtle.circle(edgeSize / 7);
  turtle.end_fill();

  turtle.pencolor(colors.sheepDark);
  turtle.color(colors.sheepDark);

  telep(...ratioPos(start, 0.8, 0.46));
  turtle.right(90);
  turtle.right(90);
  turtle.begin_fill();
  turtle.circle(edgeSize / 40);
  turtle.end_fill();

  telep(...ratioPos(start, 0.25, 0.55));
  turtle.right(90);
  turtle.right(90);
  turtle.begin_fill();
  turtle.circle(edgeSize / 12);
  turtle.end_fill();

  strokedSequence(start, 0.4, 0.6, colors.sheepDark, 3, 0, [["right", 105], ["fd", edgeSize * 0.1]]);
  strokedSequence(start, 0.34, 0.58, colors.sheepDark, 3, 0, [["right", 130], ["fd", edgeSize * 0.1]]);
  strokedSequence(start, 0.647, 0.65, colors.sheepDark, 2.7, 0, [["right", 80], ["fd", edgeSize * 0.03]]);
  strokedSequence(start, 0.69, 0.65, colors.sheepDark, 3, 0, [["right", 65], ["fd", edgeSize * 0.075]]);

  filledCircle(start, 0.23, 0.45, edgeSize / 90, colors.sheepEye, colors.sheepEye, 180);
  filledCircle(start, 0.21, 0.414, edgeSize / 40, colors.sheepBody, colors.sheepBody);
  filledCircle(start, 0.255, 0.41, edgeSize / 40, colors.sheepBody, colors.sheepBody);
  filledCircle(start, 0.3, 0.43, edgeSize / 40, colors.sheepBody, colors.sheepBody);

  telep(start.x + edgeSize, start.y);
  turtle.setheading(0);
}

function alpaca() {
  const start = turtle.pos();
  quiltBgFill(colors.alpacaBg);

  filledCircle(start, 0.74, 0.67, edgeSize / 25, colors.alpacaDark, colors.alpacaDark);

  [
    [0.4, 0.61, edgeSize / 8],
    [0.36, 0.31, edgeSize / 20],
    [0.34, 0.38, edgeSize / 20],
    [0.3, 0.4, edgeSize / 20],
    [0.3, 0.31, edgeSize / 20],
    [0.57, 0.59, edgeSize / 8],
    [0.65, 0.598, edgeSize / 9],
    [0.41, 0.72, edgeSize / 9],
    [0.57, 0.74, edgeSize / 9],
    [0.65, 0.72, edgeSize / 10],
  ].forEach(([x, y, r]) => {
    filledCircle(start, x, y, r, colors.alpacaBody, colors.alpacaBody);
  });

  [
    [0.64, 0.83],
    [0.4, 0.85],
    [0.56, 0.8],
    [0.46, 0.8],
  ].forEach(([x, y]) => {
    filledCircle(start, x, y, edgeSize / 46, colors.alpacaDark, colors.alpacaDark);
  });

  [
    [0.64, 0.78],
    [0.65, 0.8],
    [0.4, 0.78],
    [0.4, 0.82],
    [0.46, 0.77],
    [0.56, 0.77],
  ].forEach(([x, y]) => {
    filledCircle(start, x, y, edgeSize / 46, colors.alpacaBody, colors.alpacaBody);
  });

  filledCircle(start, 0.3, 0.3, edgeSize / 14, colors.alpacaDark, colors.alpacaDark);

  [
    [0.24, 0.204, edgeSize / 20],
    [0.295, 0.2, edgeSize / 20],
    [0.34, 0.22, edgeSize / 20],
    [0.38, 0.32, edgeSize / 30],
  ].forEach(([x, y, r]) => {
    filledCircle(start, x, y, r, colors.alpacaBody, colors.alpacaBody);
  });

  filledCircle(start, 0.26, 0.26, edgeSize / 120, colors.alpacaBody, colors.alpacaBody);

  telep(start.x + edgeSize, start.y);
  turtle.setheading(0);
}

function chicky() {
  const start = turtle.pos();
  quiltBgFill(colors.chickBg);

  filledSequence(start, 0.32, 0.33, colors.chickDark, colors.chickDark, 0, [
    ["right", 140],
    ["fd", edgeSize * 0.05],
    ["left", 155],
    ["fd", edgeSize * 0.05],
  ]);

  filledCircle(start, 0.5, 0.6, edgeSize / 7, colors.chickBody, colors.chickBody);
  filledCircle(start, 0.4, 0.4, edgeSize / 13, colors.chickBody, colors.chickBody);
  filledCircle(start, 0.38, 0.3, edgeSize / 150, colors.chickDark, colors.chickDark);
  filledCircle(start, 0.6, 0.5, edgeSize / 80, colors.chickDark, colors.chickDark);

  strokedSequence(start, 0.4, 0.58, colors.chickDark, 2.7, 0, [
    ["right", 125],
    ["fd", edgeSize * 0.125],
    ["right", 90],
    ["fd", edgeSize * 0.03],
    ["back", edgeSize * 0.03],
    ["left", 45],
    ["fd", edgeSize * 0.03],
    ["back", edgeSize * 0.03],
    ["left", 55],
    ["fd", edgeSize * 0.03],
  ]);

  strokedSequence(start, 0.6, 0.58, colors.chickDark, 2.7, 0, [
    ["right", 70],
    ["fd", edgeSize * 0.125],
    ["left", 40],
    ["fd", edgeSize * 0.03],
    ["back", edgeSize * 0.03],
    ["right", 35],
    ["fd", edgeSize * 0.03],
    ["back", edgeSize * 0.03],
    ["right", 40],
    ["fd", edgeSize * 0.03],
  ]);

  telep(start.x + edgeSize, start.y);
  turtle.setheading(0);
}

function cow() {
  const start = turtle.pos();
  quiltBgFill(colors.cowBg);

  filledSequence(start, 0.16, 0.4, colors.cowDark, colors.cowDark, 0, [
    ["fd", edgeSize * 0.1],
    ["rt", 90],
    ["fd", edgeSize * 0.17],
    ["rt", 90],
    ["fd", edgeSize * 0.1],
    ["rt", 90],
    ["fd", edgeSize * 0.17],
  ]);

  strokedSequence(start, 0.4, 0.68, colors.cowDark, 4, 0, [["right", 100], ["fd", edgeSize * 0.05]]);
  strokedSequence(start, 0.34, 0.68, colors.cowDark, 4, 0, [["right", 115], ["fd", edgeSize * 0.07]]);
  strokedSequence(start, 0.627, 0.68, colors.cowDark, 4, 0, [["right", 115], ["fd", edgeSize * 0.07]]);
  strokedSequence(start, 0.67, 0.68, colors.cowDark, 4, 0, [["right", 100], ["fd", edgeSize * 0.1]]);
  strokedSequence(start, 0.76, 0.6, colors.cowDark, 4, 0, [["right", 30], ["fd", edgeSize * 0.05]]);

  filledSequence(start, 0.17, 0.36, colors.cowDark, colors.cowDark, 0, [
    ["fd", edgeSize * 0.015],
    ["rt", 90],
    ["fd", edgeSize * 0.05],
    ["rt", 90],
    ["fd", edgeSize * 0.015],
    ["rt", 90],
    ["fd", edgeSize * 0.05],
  ]);

  filledSequence(start, 0.22, 0.36, colors.cowDark, colors.cowDark, 0, [
    ["fd", edgeSize * 0.015],
    ["rt", 90],
    ["fd", edgeSize * 0.05],
    ["rt", 90],
    ["fd", edgeSize * 0.015],
    ["rt", 90],
    ["fd", edgeSize * 0.05],
  ]);

  filledSequence(start, 0.27, 0.4, colors.cowBody, colors.cowBody, 0, [
    ["fd", edgeSize * 0.47],
    ["rt", 90],
    ["fd", edgeSize * 0.28],
    ["rt", 90],
    ["fd", edgeSize * 0.47],
    ["rt", 90],
    ["fd", edgeSize * 0.28],
  ]);

  filledCircle(start, 0.2, 0.46, edgeSize / 60, colors.cowBody, colors.cowBody);

  [
    [0.45, 0.64, edgeSize / 13],
    [0.66, 0.52, edgeSize / 22],
    [0.6, 0.65, edgeSize / 40],
    [0.36, 0.46, edgeSize / 40],
  ].forEach(([x, y, r]) => {
    filledCircle(start, x, y, r, colors.cowSpot, colors.cowSpot);
  });

  telep(start.x + edgeSize, start.y);
  turtle.setheading(0);
}

function pig() {
  const start = turtle.pos();
  quiltBgFill(colors.pigBg);

  strokedSequence(start, 0.4, 0.68, colors.pigDark, 4, 0, [["right", 120], ["fd", edgeSize * 0.1]]);
  strokedSequence(start, 0.5, 0.68, colors.pigDark, 4, 0, [["right", 120], ["fd", edgeSize * 0.05]]);
  strokedSequence(start, 0.627, 0.68, colors.pigDark, 4, 0, [["right", 66], ["fd", edgeSize * 0.05]]);
  strokedSequence(start, 0.65, 0.68, colors.pigDark, 4, 0, [["right", 45], ["fd", edgeSize * 0.1]]);

  [
    [0.23, 0.45, edgeSize / 45],
    [0.25, 0.42, edgeSize / 45],
  ].forEach(([x, y, r]) => {
    filledCircle(start, x, y, r, colors.pigAccent, colors.pigAccent);
  });

  filledCircle(start, 0.53, 0.7, edgeSize / 5, colors.pigBody, colors.pigBody);
  filledCircle(start, 0.3, 0.5, edgeSize / 15, colors.pigBody, colors.pigBody);
  strokedSequence(start, 0.7, 0.6, colors.pigBody, 4, 0, [["right", 30], ["fd", edgeSize * 0.05]]);

  [
    [0.35, 0.48, edgeSize / 45],
    [0.345, 0.44, edgeSize / 45],
    [0.25, 0.48, edgeSize / 50],
  ].forEach(([x, y, r]) => {
    filledCircle(start, x, y, r, colors.pigAccent, colors.pigAccent);
  });

  [
    [0.258, 0.48, edgeSize / 200],
    [0.241, 0.47, edgeSize / 200],
    [0.258, 0.41, edgeSize / 400],
    [0.28, 0.43, edgeSize / 400],
  ].forEach(([x, y, r]) => {
    filledCircle(start, x, y, r, colors.pigDark, colors.pigDark);
  });

  telep(start.x + edgeSize, start.y);
  turtle.setheading(0);
}

function drawQuilt(index) {
  if (index === 0) sheep();
  if (index === 1) alpaca();
  if (index === 2) chicky();
  if (index === 3) cow();
  if (index === 4) pig();
}

function buildPattern() {
  const width = edgeSize * cols;
  const height = edgeSize * rows;
  const startX = width * -0.5;
  const startY = height * 0.5;
  let rowCursor = new Vec2D(startX, startY);

  telep(startX, startY);

  for (let row = 0; row < rows; row += 1) {
    for (let col = 0; col < cols; col += 1) {
      rowCursor = turtle.pos();
      telep(rowCursor.get(0), rowCursor.get(1));
      drawQuilt(((col - row) % 5 + 5) % 5);
      rowCursor = rowCursor.add(new Vec2D(edgeSize, 0));
    }
    telep(startX, rowCursor.get(1) - edgeSize);
  }

  const toSvgX = (x) => x + width / 2;
  const toSvgY = (y) => height / 2 - y;

  const svg = [`<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${width} ${height}" fill="none">`];

  for (const shape of turtle.shapes) {
    if (shape.kind === "circle") {
      svg.push(
        `<circle cx="${toSvgX(shape.cx).toFixed(3)}" cy="${toSvgY(shape.cy).toFixed(3)}" r="${shape.r.toFixed(3)}" fill="${shape.fill}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth.toFixed(3)}" />`,
      );
    }
    if (shape.kind === "line") {
      svg.push(
        `<path d="M ${toSvgX(shape.x1).toFixed(3)} ${toSvgY(shape.y1).toFixed(3)} L ${toSvgX(shape.x2).toFixed(3)} ${toSvgY(shape.y2).toFixed(3)}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth.toFixed(3)}" stroke-linecap="round" />`,
      );
    }
    if (shape.kind === "polygon") {
      const points = shape.points
        .map(([x, y]) => `${toSvgX(x).toFixed(3)},${toSvgY(y).toFixed(3)}`)
        .join(" ");
      svg.push(
        `<polygon points="${points}" fill="${shape.fill}" stroke="${shape.stroke}" stroke-width="${shape.strokeWidth.toFixed(3)}" stroke-linejoin="round" />`,
      );
    }
  }

  svg.push("</svg>");
  return svg.join("\n");
}

const outFile = path.resolve("public/assets/uparupa-portal-pattern.svg");
fs.mkdirSync(path.dirname(outFile), { recursive: true });
fs.writeFileSync(outFile, buildPattern(), "utf8");
console.log(`Generated ${outFile}`);
