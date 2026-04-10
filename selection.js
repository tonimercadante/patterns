let initX, initY;
let exitX, exitY;
let isDragging = false;
let wasDrag = false;

onmousedown = (event) => {
  initX = event.x;
  initY = event.y;
  isDragging = true;
  wasDrag = false;
};

onmousemove = (event) => {};

onmouseup = (event) => {
  if (!isDragging) return;
  isDragging = false;

  exitX = event.x;
  exitY = event.y;

  const distance = Math.abs(exitX - initX) + Math.abs(exitY - initY);
  if (distance < 10) return;

  wasDrag = true;

  const box = document.createElement("div");
  box.classList.add("box");
  const isXReverse = initX < exitX;
  const isYReverse = initY < exitY;
  const boxWidht = isXReverse ? exitX - initX : initX - exitX;
  const boxHeight = isYReverse ? exitY - initY : initY - exitY;
  box.style.width = boxWidht + "px";
  box.style.height = boxHeight + "px";

  const boxColor = randomColor();
  const slashColor = complementaryColor(boxColor);
  box.style.backgroundColor = boxColor;

  if (isXReverse) {
    box.style.left = initX + "px";
  } else {
    box.style.left = exitX + "px";
  }
  if (isYReverse) {
    box.style.top = initY + "px";
  } else {
    box.style.top = exitY + "px";
  }

  app.appendChild(box);

  function handleClick() {
    if (wasDrag) {
      wasDrag = false;
      return;
    }
    createPattern(box, slashColor);
    box.removeEventListener("click", handleClick);
  }
  box.addEventListener("click", handleClick);
};
