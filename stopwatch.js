let startTime = 0;
let elapsed = 0;
let timerInterval = null;
let running = false;
let laps = [];

const display = document.getElementById('display');
const startBtn = document.getElementById('startBtn');
const pauseBtn = document.getElementById('pauseBtn');
const resetBtn = document.getElementById('resetBtn');
const lapBtn = document.getElementById('lapBtn');
const lapsList = document.getElementById('laps');

function formatTime(ms) {
  const centisec = Math.floor((ms % 1000) / 10);
  const sec = Math.floor((ms / 1000) % 60);
  const min = Math.floor((ms / 60000) % 60);
  const hr = Math.floor(ms / 3600000);
  return (
    (hr > 0 ? String(hr).padStart(2, '0') + ':' : '') +
    String(min).padStart(2, '0') + ':' +
    String(sec).padStart(2, '0') + '.' +
    String(centisec).padStart(2, '0')
  );
}

function updateDisplay() {
  display.textContent = formatTime(elapsed);
}

function start() {
  if (!running) {
    startTime = Date.now() - elapsed;
    timerInterval = setInterval(() => {
      elapsed = Date.now() - startTime;
      updateDisplay();
    }, 10);
    running = true;
    startBtn.disabled = true;
    pauseBtn.disabled = false;
    resetBtn.disabled = false;
    lapBtn.disabled = false;
  }
}

function pause() {
  if (running) {
    clearInterval(timerInterval);
    running = false;
    startBtn.disabled = false;
    pauseBtn.disabled = true;
    lapBtn.disabled = true;
  }
}

function reset() {
  clearInterval(timerInterval);
  running = false;
  elapsed = 0;
  laps = [];
  updateDisplay();
  renderLaps();
  startBtn.disabled = false;
  pauseBtn.disabled = true;
  resetBtn.disabled = true;
  lapBtn.disabled = true;
}

function lap() {
  if (running) {
    laps.push(elapsed);
    renderLaps();
  }
}

function renderLaps() {
  lapsList.innerHTML = '';
  laps.forEach((lapTime, idx) => {
    const li = document.createElement('li');
    li.innerHTML = `<span>Lap ${idx + 1}</span> <span>${formatTime(lapTime)}</span>`;
    lapsList.appendChild(li);
  });
}

startBtn.addEventListener('click', start);
pauseBtn.addEventListener('click', pause);
resetBtn.addEventListener('click', reset);
lapBtn.addEventListener('click', lap);