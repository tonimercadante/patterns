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

//
// for (const { i, j, direction } of positions) {
//   createSlash(i * 5, j * 5, direction);
// }
//
// [
//   [], [], [],
//   [], [], [],
// ]
