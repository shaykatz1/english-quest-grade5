const STORAGE_KEY = "englishQuestProgressV1";

const stages = [
  {
    title: "שלב 1: צבעים",
    question: "What color is the sun?",
    options: ["Blue", "Green", "Yellow", "Black"],
    answer: "Yellow",
    points: 10,
    success: "מעולה! Yellow זה נכון.",
    fail: "כמעט! The sun is usually yellow.",
  },
  {
    title: "שלב 2: חיות",
    question: "Which animal says 'meow'?",
    options: ["Dog", "Cat", "Cow", "Duck"],
    answer: "Cat",
    points: 15,
    success: "נכון מאוד! Cat אומר meow.",
    fail: "תשובה נכונה: Cat.",
  },
  {
    title: "שלב 3: משפטים",
    question: "Complete: I ___ to school every day.",
    options: ["go", "goes", "going", "gone"],
    answer: "go",
    points: 20,
    success: "אלוף! אומרים: I go to school.",
    fail: "התשובה הנכונה היא go.",
  },
];

const stageLabel = document.getElementById("stageLabel");
const scoreLabel = document.getElementById("scoreLabel");
const progressFill = document.getElementById("progressFill");
const stageContainer = document.getElementById("stageContainer");
const resetBtn = document.getElementById("resetBtn");

let state = loadState();
render();

resetBtn.addEventListener("click", () => {
  state = { index: 0, score: 0, finished: false };
  persistState();
  render();
});

function loadState() {
  const fallback = { index: 0, score: 0, finished: false };
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);
    if (typeof parsed.index !== "number" || typeof parsed.score !== "number") {
      return fallback;
    }
    if (parsed.index < 0 || parsed.index > stages.length) return fallback;
    return {
      index: parsed.index,
      score: parsed.score,
      finished: Boolean(parsed.finished),
    };
  } catch {
    return fallback;
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function render() {
  const currentStageNumber = Math.min(state.index + 1, stages.length);
  stageLabel.textContent = String(currentStageNumber);
  scoreLabel.textContent = String(state.score);
  progressFill.style.width = `${(state.index / stages.length) * 100}%`;

  if (state.index >= stages.length || state.finished) {
    renderFinal();
    return;
  }

  const stage = stages[state.index];
  stageContainer.innerHTML = `
    <h2 class="stage-title">${stage.title}</h2>
    <p class="question">${stage.question}</p>
    <div class="option-grid">
      ${stage.options
        .map(
          (option) =>
            `<button type="button" class="option-btn" data-option="${option}">${option}</button>`
        )
        .join("")}
    </div>
    <p id="feedback" class="feedback"></p>
  `;

  const buttons = stageContainer.querySelectorAll(".option-btn");
  const feedback = document.getElementById("feedback");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const picked = button.dataset.option;
      const correct = picked === stage.answer;

      buttons.forEach((b) => {
        b.disabled = true;
        const isRightAnswer = b.dataset.option === stage.answer;
        if (isRightAnswer) b.classList.add("correct");
      });

      if (!correct) {
        button.classList.add("wrong");
      }

      if (correct) {
        state.score += stage.points;
        feedback.textContent = stage.success;
        feedback.className = "feedback good";
      } else {
        feedback.textContent = stage.fail;
        feedback.className = "feedback bad";
      }

      persistState();
      addNextButton();
    });
  });
}

function addNextButton() {
  if (stageContainer.querySelector(".next-btn")) return;
  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "next-btn";
  nextBtn.textContent = state.index === stages.length - 1 ? "סיום המשחק" : "לשלב הבא";

  nextBtn.addEventListener("click", () => {
    state.index += 1;
    if (state.index >= stages.length) {
      state.finished = true;
    }
    persistState();
    render();
  });

  stageContainer.append(nextBtn);
}

function renderFinal() {
  progressFill.style.width = "100%";
  stageContainer.innerHTML = `
    <h2 class="stage-title">כל הכבוד! סיימת את המסע 🎉</h2>
    <p class="question">צברת <strong>${state.score}</strong> נקודות.</p>
    <p class="question">רוצה לשפר שיא? לחץ על "איפוס התקדמות" והתחל מחדש.</p>
  `;
}
