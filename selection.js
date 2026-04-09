let initX, initY;
let exitX, exitY;

onmousedown = (event) => {
  initX = event.x;
  initY = event.y;
  console.log(event);
};

onmousemove = (event) => {
  // console.log(event);
};

onmouseup = (event) => {
  exitX = event.x;
  exitY = event.y;

  const box = document.createElement("div");
  box.classList.add("box");

  const isXReverse = initX < exitX;
  const isYReverse = initY < exitY;
  const boxWidht = isXReverse ? exitX - initX : initX - exitX;
  const boxHeight = isYReverse ? exitY - initY : initY - exitY;

  box.style.width = boxWidht + "px";
  box.style.height = boxHeight + "px";

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
};

setTimeout(() => {
  console.log(initX, initY, exitX, exitY);
}, [3000]);
