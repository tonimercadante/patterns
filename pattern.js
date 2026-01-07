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

// ROWs
for (let i = 0; i < rowsQtd; i++) {
  let firstSlashDirV = i % 2 == 0;

  // COLs
  for (let j = 0; j < colsQtd; j++) {
    let direction;
    if (firstSlashDirV) {
      direction = j % 2 == 0 ? "v" : "h";
    } else {
      direction = j % 2 == 0 ? "h" : "v";
    }

    console.log(i, j, direction, firstSlashDirV, "firstSlashDirV");

    let row = (i / 500) * 100;

    createSlash(i * 5, j * 5, direction);
  }
}
