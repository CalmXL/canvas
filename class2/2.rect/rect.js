const oCan = document.getElementById('can');
const oColor = document.getElementById('color');
const ctx = oCan.getContext('2d');

const documentELement = document.documentElement;

oCan.width = documentELement.clientWidth;
oCan.height = documentELement.clientHeight;

const rectWrapper = [];
let rectInfo = null;
let type = 'stroke';

const init = () => {
  bindEvent();
}

function bindEvent () {
  oCan.addEventListener('mousedown', handleCanvasMouseDown, false);
  oColor.addEventListener('change', handleColorChange, false);
}

function handleCanvasMouseDown (e) {
  rectInfo = [e.clientX, e.clientY];

  oCan.addEventListener('mousemove', handleCanvasMouseMove, false);
  oCan.addEventListener('mouseup', handleCanvasMouseUp, false);
}

function handleColorChange (e) {
  // console.log(e.target.value);
  setStyleColor(e.target.value);
}

function setStyleColor (color) {
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleCanvasMouseMove (e) {
  createRect(rectInfo[0], rectInfo[1], e.clientX, e.clientY);

  clearRect(0, 0, oCan.width, oCan.height);

  switch (type) {
    case 'stroke':
      strokeRects();
      strokeRect(...rectInfo);
      break;
    case 'fill': 
      fillRects();
      fillRect(...rectInfo);
      break;
    default: 
      break;
  }
}

function handleCanvasMouseUp (e) {
  saveRect(rectInfo);
  oCan.removeEventListener('mousemove', handleCanvasMouseMove, false);
  oCan.removeEventListener('mouseup', handleCanvasMouseUp, false);
}

function createRect (x, y, x1, y1) {
  const w = x1 -x;
  const h = y1 - y;

  rectInfo = [x, y, w, h];
}

function clearRect (x, y, w, h) {
  ctx.clearRect(x, y, w, h);
}

function saveRect (rectInfo) {
  rectWrapper.push(rectInfo);
}

function strokeRect (x, y, w, h) {
  ctx.strokeRect(x, y, w, h);
}

function strokeRects () {
  rectWrapper.forEach(([x, y, w, h]) => {
    strokeRect(x, y, w, h);
  })
}

function fillRect (x, y, w, h) {
  ctx.fillRect(x, y, w, h);
}

function fillRects () {
  rectWrapper.forEach(([x, y, w, h]) => {
    fillRect(x, y, w, h);
  })
}
 
init();