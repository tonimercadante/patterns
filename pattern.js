const app = document.getElementById("app");

const appBoxWidht = 500;
const appBoxHeight = 500;

app.style.width = appBoxWidht;
app.style.height = appBoxHeight;

const slashSize = 5;

const rowsQtd = appBoxWidht / slashSize;
const colsQtd = appBoxHeight / slashSize;

console.log("app", app);

function createSlash(x, y, direction) {
  const slash = document.createElement("div");
  slash.classList.add("slash");
  slash.style.left = x;
  slash.style.top = y;

  if (direction == "v") {
    slash.style.height = 5;
  }

  if (direction == "h") {
    slash.style.width = 5;
  }

  app.appendChild(slash);
}

const positions = [];

for (let i = 0; i < rowsQtd; i++) {
  let firstSlashDirV = i % 2 == 0;
  for (let j = 0; j < colsQtd; j++) {
    let direction;
    if (firstSlashDirV) {
      direction = j % 2 == 0 ? "v" : "h";
    } else {
      direction = j % 2 == 0 ? "h" : "v";
    }
    positions.push({ i, j, direction });
  }
}

// Fisher-Yates shuffle
for (let idx = positions.length - 1; idx > 0; idx--) {
  const j = Math.floor(Math.random() * (idx + 1));
  [positions[idx], positions[j]] = [positions[j], positions[idx]];
}

function randomColor() {
  const h = Math.floor(Math.random() * 360);
  const s = Math.floor(Math.random() * 100);
  const l = Math.floor(Math.random() * 80) + 10;
  return `hsl(${h}, ${s}%, ${l}%)`;
}

function complementaryColor(hslString) {
  const [h] = hslString.match(/\d+/g).map(Number);
  const newH = (h + 180) % 360;
  return `hsl(${newH}, 100%, 55%)`;
}

function createPattern(container, slashColor) {
  const appBoxWidht = container.offsetWidth;
  const appBoxHeight = container.offsetHeight;
  const slashSize = 5;
  const rowsQtd = appBoxWidht / slashSize;
  const colsQtd = appBoxHeight / slashSize;

  function createSlash(x, y, direction) {
    const slash = document.createElement("div");
    slash.classList.add("slash");
    slash.style.left = x + "px";
    slash.style.top = y + "px";
    slash.style.backgroundColor = slashColor;
    if (direction == "v") {
      slash.style.height = "5px";
    }
    if (direction == "h") {
      slash.style.width = "5px";
    }
    container.appendChild(slash);
  }

  const positions = [];
  for (let i = 0; i < rowsQtd; i++) {
    let firstSlashDirV = i % 2 == 0;
    for (let j = 0; j < colsQtd; j++) {
      let direction;
      if (firstSlashDirV) {
        direction = j % 2 == 0 ? "v" : "h";
      } else {
        direction = j % 2 == 0 ? "h" : "v";
      }
      positions.push({ i, j, direction });
    }
  }

  for (let idx = positions.length - 1; idx > 0; idx--) {
    const j = Math.floor(Math.random() * (idx + 1));
    [positions[idx], positions[j]] = [positions[j], positions[idx]];
  }

  let index = 0;
  function renderBatch() {
    const batchSize = 100;
    for (let i = 0; i < batchSize && index < positions.length; i++) {
      const { i: row, j: col, direction } = positions[index];
      createSlash(row * 5, col * 5, direction);
      index++;
    }
    if (index < positions.length) {
      requestAnimationFrame(renderBatch);
    }
  }
  renderBatch();
} // for (const { i, j, direction } of positions) {
//   createSlash(i * 5, j * 5, direction);
// }
//
// [
//   [], [], [],
//   [], [], [],
// ]
