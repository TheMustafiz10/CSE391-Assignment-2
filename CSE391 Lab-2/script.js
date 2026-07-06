
// STOPWATCH 
let timerInterval = null;
let currentSeconds = 0;
let isRunning = false;

const display = document.getElementById('stopwatchDisplay');
const startBtn = document.getElementById('startBtn');
const stopBtn = document.getElementById('stopBtn');
const resetBtn = document.getElementById('resetBtn');

function updateDisplay() {
  display.textContent = currentSeconds;
}

function stopTimer() {
  if (timerInterval) {
    clearInterval(timerInterval);
    timerInterval = null;
    isRunning = false;
  }
}

function startTimer() {
  if (isRunning) return;
  if (currentSeconds >= 30) {
    return;
  }
  isRunning = true;
  timerInterval = setInterval(function() {
    let next = currentSeconds + 3;
    if (next > 30) {
      next = 30;
    }
    currentSeconds = next;
    updateDisplay();
    if (currentSeconds >= 30) {
      stopTimer();
    }
  }, 3000);
}

startBtn.addEventListener('click', startTimer);
stopBtn.addEventListener('click', stopTimer);
resetBtn.addEventListener('click', function() {
  stopTimer();
  currentSeconds = 0;
  updateDisplay();
});







// TO-DO LIST 
const taskInput = document.getElementById('taskInput');
const addBtn = document.getElementById('addTaskBtn');
const todoList = document.getElementById('todoList');

let tasks = [];

function loadTasks() {
  const stored = localStorage.getItem('todoTasks');
  if (stored) {
    try {
      tasks = JSON.parse(stored);
    } catch (e) {
      tasks = [];
    }
  } else {
    tasks = [];
  }
  renderTasks();
}

function saveTasks() {
  localStorage.setItem('todoTasks', JSON.stringify(tasks));
}

function renderTasks() {
  todoList.innerHTML = '';
  tasks.forEach(function(task, index) {
    const li = document.createElement('li');
    const cb = document.createElement('input');
    cb.type = 'checkbox';
    cb.checked = task.done || false;
    cb.addEventListener('change', function() {
      tasks[index].done = cb.checked;
      saveTasks();
      renderTasks();
    });

    const span = document.createElement('span');
    span.className = 'task-text' + (task.done ? ' done' : '');
    span.textContent = task.text;

    const delBtn = document.createElement('button');
    delBtn.textContent = '✕';
    delBtn.setAttribute('aria-label', 'delete task');
    delBtn.addEventListener('click', function() {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(cb);
    li.appendChild(span);
    li.appendChild(delBtn);
    todoList.appendChild(li);
  });
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === '') {
    alert('Please write a task.');
    return;
  }
  tasks.push({ text: text, done: false });
  saveTasks();
  renderTasks();
  taskInput.value = '';
  taskInput.focus();
}

addBtn.addEventListener('click', addTask);
taskInput.addEventListener('keypress', function(e) {
  if (e.key === 'Enter') addTask();
});

loadTasks();









// FORTUNE GENERATOR 
const fortunes = [
  "True wisdom comes not from knowledge, but from understanding.",
  "The best time to plant a tree was 20 years ago. The second best time is now.",
  "An investment in knowledge pays the best interest.",
  "The only way to do great work is to love what you do.",
  "In the middle of difficulty lies opportunity.",
  "Life is what happens when you're busy making other plans.",
  "The journey of a thousand miles begins with a single step.",
  "What you get by achieving your goals is not as important as what you become.",
  "It does not matter how slowly you go as long as you do not stop.",
  "The mind is everything. What you think you become.",
  "Act as if what you do makes a difference. It does.",
  "Success is not final, failure is not fatal: it is the courage to continue that counts."
];

const fortuneBox = document.getElementById('fortuneBox');

function setRandomFortune() {
  const idx = Math.floor(Math.random() * fortunes.length);
  const selected = fortunes[idx];
  fortuneBox.textContent = selected;
  console.log('[Fortune] index: ' + idx + ', message: "' + selected + '"');
}
setRandomFortune();




let colorIndex = 0;
let bgIndex = 0;
let borderIndex = 0;
let styleIndex = 0;

const fontColors = ['#1f3c4f', '#a13333', '#2a6b4a', '#7d4e9e', '#b85a2b', '#005f8a'];
const bgColors = ['#ffffff', '#f0d9d0', '#d4e3d9', '#d6dce8', '#f7e3b4', '#e8d5f0'];
const borderColors = ['#2e4a62', '#b54b3f', '#3d7a5a', '#8b5f9e', '#b8863d', '#006080'];
const fontSizes = ['1.2rem', '1.4rem', '1.1rem', '1.3rem', '1.0rem', '1.5rem'];
const fontFamilies = [
  'Segoe UI, Roboto, sans-serif',
  'Georgia, serif',
  'Trebuchet MS, sans-serif',
  'Palatino, serif',
  'Verdana, sans-serif',
  'Courier New, monospace'
];






document.getElementById('fontColorBtn').addEventListener('click', function() {
  colorIndex = (colorIndex + 1) % fontColors.length;
  const newColor = fontColors[colorIndex];
  fortuneBox.style.color = newColor;
  this.style.background = '#2ecc71';
  console.log('Font color: ' + newColor);
});

document.getElementById('bgColorBtn').addEventListener('click', function() {
  bgIndex = (bgIndex + 1) % bgColors.length;
  const newColor = bgColors[bgIndex];
  fortuneBox.style.backgroundColor = newColor;
  this.style.background = '#f1c40f';
  if (newColor === '#ffffff') {
    this.style.borderColor = '#999';
  } else {
    this.style.borderColor = '#b8cddb';
  }
  console.log('Background: ' + newColor);
});

document.getElementById('borderColorBtn').addEventListener('click', function() {
  borderIndex = (borderIndex + 1) % borderColors.length;
  const newColor = borderColors[borderIndex];
  fortuneBox.style.borderColor = newColor;
  this.style.background = '#3498db';
  console.log('Border color: ' + newColor);
});



document.getElementById('fontStyleBtn').addEventListener('click', function() {
  styleIndex = (styleIndex + 1) % Math.max(fontSizes.length, fontFamilies.length);
  const newSize = fontSizes[styleIndex % fontSizes.length];
  const newFamily = fontFamilies[styleIndex % fontFamilies.length];
  fortuneBox.style.fontSize = newSize;
  fortuneBox.style.fontFamily = newFamily;
  this.style.background = '#e67e22';
  console.log('Font size: ' + newSize + ', family: ' + newFamily);
});

console.log('All features ready.');