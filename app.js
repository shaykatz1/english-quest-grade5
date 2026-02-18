const STORAGE_KEY = "englishQuestProgressV2";

function shuffleBySeed(items, seed) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = (seed * 17 + i * 13) % (i + 1);
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function buildOptions(correct, pool, seed) {
  const distractors = pool.filter((item) => item !== correct);
  const picked = [];

  for (let i = 0; i < distractors.length && picked.length < 3; i += 1) {
    const idx = (seed * 11 + i * 5) % distractors.length;
    const candidate = distractors[idx];
    if (!picked.includes(candidate)) picked.push(candidate);
  }

  return shuffleBySeed([correct, ...picked], seed);
}

function thirdPerson(verb) {
  if (verb.endsWith("y")) return `${verb.slice(0, -1)}ies`;
  if (verb.endsWith("s") || verb.endsWith("sh") || verb.endsWith("ch") || verb.endsWith("x")) return `${verb}es`;
  return `${verb}s`;
}

function buildStages() {
  const stage1Words = [
    { he: "חתול", en: "cat" },
    { he: "כלב", en: "dog" },
    { he: "בית", en: "house" },
    { he: "ספר", en: "book" },
    { he: "שולחן", en: "table" },
    { he: "כיסא", en: "chair" },
    { he: "שמש", en: "sun" },
    { he: "ירח", en: "moon" },
    { he: "מים", en: "water" },
    { he: "אוכל", en: "food" },
    { he: "תפוח", en: "apple" },
    { he: "בננה", en: "banana" },
    { he: "חבר", en: "friend" },
    { he: "בית ספר", en: "school" },
    { he: "מורה", en: "teacher" },
    { he: "משפחה", en: "family" },
    { he: "חלון", en: "window" },
    { he: "דלת", en: "door" },
    { he: "מחברת", en: "notebook" },
    { he: "תיק", en: "bag" },
  ];

  const stage2Opposites = [
    ["big", "small"],
    ["hot", "cold"],
    ["happy", "sad"],
    ["fast", "slow"],
    ["up", "down"],
    ["open", "closed"],
    ["old", "new"],
    ["early", "late"],
    ["clean", "dirty"],
    ["long", "short"],
    ["strong", "weak"],
    ["light", "dark"],
    ["near", "far"],
    ["full", "empty"],
    ["easy", "hard"],
    ["right", "left"],
    ["high", "low"],
    ["young", "old"],
    ["inside", "outside"],
    ["noisy", "quiet"],
  ];

  const stage3Grammar = [
    ["I", "go"],
    ["She", "play"],
    ["They", "eat"],
    ["He", "watch"],
    ["We", "read"],
    ["My sister", "study"],
    ["The boys", "run"],
    ["Tom", "wash"],
    ["You", "help"],
    ["The dog", "jump"],
    ["My friends", "sing"],
    ["Dad", "fix"],
    ["The girl", "carry"],
    ["I", "write"],
    ["Maya", "drink"],
    ["We", "clean"],
    ["He", "brush"],
    ["They", "walk"],
    ["My brother", "try"],
    ["You", "dance"],
  ];

  const stage4Time = [
    {
      prompt: "What day comes after Monday?",
      answer: "Tuesday",
      options: ["Sunday", "Tuesday", "Friday", "Saturday"],
      explanation: "The next day after Monday is Tuesday.",
    },
    {
      prompt: "What day comes before Friday?",
      answer: "Thursday",
      options: ["Thursday", "Wednesday", "Sunday", "Monday"],
      explanation: "Thursday comes before Friday.",
    },
    {
      prompt: "Which month comes after March?",
      answer: "April",
      options: ["May", "April", "June", "February"],
      explanation: "In the calendar: March, then April.",
    },
    {
      prompt: "Which month comes before December?",
      answer: "November",
      options: ["October", "November", "January", "September"],
      explanation: "November is right before December.",
    },
    {
      prompt: "How many days are in a week?",
      answer: "7",
      options: ["5", "6", "7", "8"],
      explanation: "A week has 7 days.",
    },
    {
      prompt: "How many months are in a year?",
      answer: "12",
      options: ["10", "11", "12", "13"],
      explanation: "A year has 12 months.",
    },
    {
      prompt: "School starts at 8:00. This is in the...",
      answer: "morning",
      options: ["night", "afternoon", "morning", "evening"],
      explanation: "8:00 is usually morning.",
    },
    {
      prompt: "We usually sleep at...",
      answer: "night",
      options: ["night", "noon", "morning", "break"],
      explanation: "Most people sleep at night.",
    },
    {
      prompt: "What comes first in the day?",
      answer: "morning",
      options: ["evening", "morning", "night", "afternoon"],
      explanation: "Morning is the first part of the day.",
    },
    {
      prompt: "What comes after afternoon?",
      answer: "evening",
      options: ["night", "morning", "evening", "breakfast"],
      explanation: "The order is morning, afternoon, evening, night.",
    },
    {
      prompt: "Sunday is a...",
      answer: "day",
      options: ["month", "year", "day", "hour"],
      explanation: "Sunday is a day of the week.",
    },
    {
      prompt: "January is a...",
      answer: "month",
      options: ["month", "day", "clock", "season"],
      explanation: "January is a month.",
    },
    {
      prompt: "12:00 at night is...",
      answer: "midnight",
      options: ["midnight", "morning", "sunrise", "break"],
      explanation: "12:00 at night is midnight.",
    },
    {
      prompt: "12:00 in the day is...",
      answer: "noon",
      options: ["midnight", "evening", "noon", "sunset"],
      explanation: "12:00 daytime is called noon.",
    },
    {
      prompt: "Which is a weekend day?",
      answer: "Saturday",
      options: ["Tuesday", "Wednesday", "Saturday", "Thursday"],
      explanation: "Saturday is part of the weekend.",
    },
    {
      prompt: "Which day is between Tuesday and Thursday?",
      answer: "Wednesday",
      options: ["Monday", "Wednesday", "Friday", "Sunday"],
      explanation: "Wednesday is between Tuesday and Thursday.",
    },
    {
      prompt: "The 5th month is...",
      answer: "May",
      options: ["March", "April", "May", "June"],
      explanation: "May is the fifth month.",
    },
    {
      prompt: "The 10th month is...",
      answer: "October",
      options: ["September", "October", "November", "August"],
      explanation: "October is month number 10.",
    },
    {
      prompt: "When do we eat breakfast?",
      answer: "morning",
      options: ["morning", "night", "late evening", "midnight"],
      explanation: "Breakfast is eaten in the morning.",
    },
    {
      prompt: "When does the sun usually set?",
      answer: "evening",
      options: ["morning", "noon", "evening", "midnight"],
      explanation: "Sunset is usually in the evening.",
    },
  ];

  const stage5Prepositions = [
    ["The book is ___ the table.", "on", ["under", "on", "between", "behind"]],
    ["The cat is ___ the chair.", "under", ["inside", "under", "next", "on"]],
    ["The ball is ___ the box.", "in", ["in", "on", "up", "to"]],
    ["The school is ___ my house.", "near", ["near", "inside", "under", "behind"]],
    ["The bank is ___ the supermarket and the park.", "between", ["over", "between", "after", "to"]],
    ["Dad is standing ___ me.", "behind", ["before", "behind", "under", "in"]],
    ["I sit ___ my friend in class.", "next to", ["up", "next to", "inside", "above"]],
    ["The bird flies ___ the tree.", "above", ["above", "below", "in", "under"]],
    ["The shoes are ___ the bed.", "under", ["on", "under", "by", "up"]],
    ["We walk ___ the street.", "on", ["on", "inside", "at", "below"]],
    ["My pencil is ___ my bag.", "in", ["at", "between", "in", "over"]],
    ["The picture is ___ the wall.", "on", ["on", "under", "between", "near"]],
    ["The dog is ___ the door.", "by", ["far", "by", "up", "off"]],
    ["The toy is ___ the sofa and the table.", "between", ["on", "to", "between", "after"]],
    ["The lamp is ___ my head.", "above", ["above", "inside", "behind", "between"]],
    ["The bus stops ___ the school.", "near", ["near", "under", "above", "inside"]],
    ["The apple is ___ the basket.", "in", ["at", "in", "between", "over"]],
    ["The teacher stands ___ the class.", "in front of", ["in front of", "under", "between", "inside"]],
    ["The park is ___ our house.", "behind", ["behind", "below", "inside", "on"]],
    ["The cookies are ___ the jar.", "in", ["over", "in", "by", "after"]],
  ];

  const stage6Questions = [
    ["___ is your name?", "What"],
    ["___ do you live?", "Where"],
    ["___ old are you?", "How"],
    ["___ is your best friend?", "Who"],
    ["___ do you go to school?", "When"],
    ["___ book is this?", "Whose"],
    ["___ many apples are there?", "How"],
    ["___ color do you like?", "What"],
    ["___ do birds fly?", "Why"],
    ["___ do you come to school, by bus or car?", "How"],
    ["___ do you eat lunch?", "Where"],
    ["___ do you play football?", "When"],
    ["___ is your teacher?", "Who"],
    ["___ is in your bag?", "What"],
    ["___ pencil is this, yours or mine?", "Whose"],
    ["___ do we wear a coat?", "Why"],
    ["___ do you start class?", "When"],
    ["___ are you happy?", "Why"],
    ["___ do you spell your name?", "How"],
    ["___ is your classroom?", "Where"],
  ];

  const stage7CorrectSentence = [
    ["She plays basketball every day.", ["She play basketball every day.", "She playing basketball every day.", "She plays basketball every day.", "She played basketball every day."]],
    ["I have two brothers.", ["I has two brothers.", "I having two brothers.", "I have two brothers.", "I haves two brothers."]],
    ["They are in the classroom.", ["They is in the classroom.", "They are in the classroom.", "They am in the classroom.", "They be in the classroom."]],
    ["He goes to school by bus.", ["He go to school by bus.", "He goes to school by bus.", "He going to school by bus.", "He gone to school by bus."]],
    ["We like pizza.", ["We likes pizza.", "We liking pizza.", "We like pizza.", "We liked pizza every day."]],
    ["My mother is a teacher.", ["My mother are a teacher.", "My mother is a teacher.", "My mother am a teacher.", "My mother be teacher."]],
    ["The dog is under the table.", ["The dog are under the table.", "The dog under the table is.", "The dog is under the table.", "The dog be under table."]],
    ["Tom and Dana are friends.", ["Tom and Dana is friends.", "Tom and Dana are friends.", "Tom and Dana am friends.", "Tom and Dana be friends."]],
    ["I can swim.", ["I can swims.", "I can swimming.", "I can swim.", "I can to swim."]],
    ["She does her homework.", ["She do her homework.", "She does her homework.", "She doing her homework.", "She done her homework."]],
    ["The boys run fast.", ["The boys runs fast.", "The boys run fast.", "The boys running fast.", "The boys is fast run."]],
    ["It is very cold today.", ["It are very cold today.", "It very cold today is.", "It is very cold today.", "It am very cold today."]],
    ["We are ready.", ["We is ready.", "We are ready.", "We am ready.", "We be ready."]],
    ["He has a blue bike.", ["He have a blue bike.", "He has a blue bike.", "He having a blue bike.", "He haves a blue bike."]],
    ["I am in grade five.", ["I is in grade five.", "I am in grade five.", "I are in grade five.", "I be in grade five."]],
    ["The sun is bright.", ["The sun are bright.", "The sun is bright.", "The sun bright is.", "The sun am bright."]],
    ["They watch TV at night.", ["They watches TV at night.", "They watch TV at night.", "They watching TV at night.", "They watched TV at night everyday."]],
    ["Maya writes in her notebook.", ["Maya write in her notebook.", "Maya writes in her notebook.", "Maya writing in her notebook.", "Maya wrote in her notebook every day."]],
    ["We go home at 2 o'clock.", ["We goes home at 2 o'clock.", "We go home at 2 o'clock.", "We going home at 2 o'clock.", "We gone home at 2 o'clock."]],
    ["My friends are kind.", ["My friends is kind.", "My friends are kind.", "My friends am kind.", "My friends be kind."]],
  ];

  const stage8Reading = [
    ["Dana has a red bag. What color is Dana's bag?", "Red", ["Blue", "Red", "Green", "Black"]],
    ["Tom has two cats and one dog. How many pets does he have?", "3", ["2", "3", "4", "5"]],
    ["The class starts at 8:00. Is 7:30 before class?", "Yes", ["No", "Yes", "Only Friday", "Maybe"]],
    ["Mia drinks water every morning. What does Mia drink?", "Water", ["Juice", "Milk", "Water", "Tea"]],
    ["The apple is on the table. Where is the apple?", "On the table", ["In the bag", "Under the bed", "On the table", "Near the door"]],
    ["Roi is 10 years old. Is Roi older than 12?", "No", ["Yes", "No", "Sometimes", "Unknown"]],
    ["Our teacher reads a story. Who reads the story?", "The teacher", ["The students", "The teacher", "The principal", "The dog"]],
    ["Neta goes to school by bus. How does Neta go to school?", "By bus", ["By car", "By bike", "By bus", "On foot"]],
    ["The birds fly in the sky. Where do birds fly?", "In the sky", ["In the water", "In the sky", "In a bag", "On the floor"]],
    ["We eat lunch at 12:30. When do we eat lunch?", "At 12:30", ["At 7:00", "At 12:30", "At 18:00", "At midnight"]],
    ["Lior has a pencil and an eraser. What two things does Lior have?", "A pencil and an eraser", ["A ruler and a pen", "A pencil and an eraser", "Two books", "A bag and a lunch box"]],
    ["The playground is behind the school. Where is the playground?", "Behind the school", ["In front of the school", "Behind the school", "Inside the class", "On the roof"]],
    ["Ella has English on Monday and Wednesday. Does she have English on Tuesday?", "No", ["Yes", "No", "Only in summer", "Twice on Tuesday"]],
    ["The weather is hot, so we wear a hat. Why do we wear a hat?", "Because it is hot", ["Because it is cold", "Because it is hot", "Because it is dark", "Because it is late"]],
    ["Noam can swim but cannot ride a bike. What can Noam do?", "Swim", ["Ride a bike", "Swim", "Drive", "Fly"]],
    ["There are five books on the shelf. Are there more than four books?", "Yes", ["Yes", "No", "Only one", "Unknown"]],
    ["The train leaves at 9:00. We arrive at 8:45. Are we on time?", "Yes", ["No", "Yes", "Too late", "Never"]],
    ["Yarden is taller than Amit. Who is taller?", "Yarden", ["Amit", "Yarden", "Both same", "No one"]],
    ["The class has 20 students. 10 are boys. How many are girls?", "10", ["8", "9", "10", "11"]],
    ["Avi reads before bed every night. When does Avi read?", "Before bed", ["At school only", "Before bed", "At lunch", "Never"]],
  ];

  const stage9Past = [
    ["Yesterday I ___ to the park.", "went", ["go", "went", "goes", "going"]],
    ["Last night we ___ a movie.", "watched", ["watch", "watches", "watched", "watching"]],
    ["She ___ her homework yesterday.", "finished", ["finish", "finished", "finishes", "finishing"]],
    ["They ___ lunch at 1:00.", "ate", ["eat", "ate", "eats", "eating"]],
    ["He ___ a letter to his friend.", "wrote", ["writes", "write", "wrote", "writing"]],
    ["I ___ my room on Saturday.", "cleaned", ["clean", "cleaned", "cleans", "cleaning"]],
    ["We ___ football after school.", "played", ["play", "played", "plays", "playing"]],
    ["Maya ___ a cake for her mom.", "made", ["make", "made", "makes", "making"]],
    ["The baby ___ all night.", "slept", ["sleep", "slept", "sleeps", "sleeping"]],
    ["Dad ___ the car yesterday.", "washed", ["wash", "washed", "washes", "washing"]],
    ["I ___ a new song.", "heard", ["hear", "heard", "hears", "hearing"]],
    ["They ___ to school early.", "came", ["come", "came", "comes", "coming"]],
    ["She ___ a blue dress.", "chose", ["choose", "chose", "chooses", "choosing"]],
    ["We ___ water after the game.", "drank", ["drink", "drank", "drinks", "drinking"]],
    ["Tom ___ his keys at home.", "left", ["leave", "left", "leaves", "leaving"]],
    ["The dog ___ very fast.", "ran", ["run", "ran", "runs", "running"]],
    ["I ___ my friend a gift.", "gave", ["give", "gave", "gives", "giving"]],
    ["They ___ a big sandwich.", "bought", ["buy", "bought", "buys", "buying"]],
    ["Nora ___ in the sea.", "swam", ["swim", "swam", "swims", "swimming"]],
    ["We ___ home at 5 o'clock.", "arrived", ["arrive", "arrived", "arrives", "arriving"]],
  ];

  const stage10Mixed = [
    ["Choose the correct spelling:", "beautiful", ["beautifull", "beatiful", "beautiful", "beutiful"]],
    ["Which is a fruit?", "orange", ["carrot", "orange", "bread", "rice"]],
    ["Which one is a verb?", "run", ["happy", "run", "table", "blue"]],
    ["Find the noun:", "teacher", ["quickly", "teacher", "read", "red"]],
    ["Complete: There ___ two cats in the garden.", "are", ["is", "are", "am", "be"]],
    ["Complete: I ___ not hungry.", "am", ["is", "are", "am", "be"]],
    ["Choose the correct question:", "Where are you from?", ["Where you are from?", "Where are you from?", "From where are you?", "Where from you are?"]],
    ["Which sentence uses punctuation correctly?", "I like apples, bananas, and grapes.", ["I like apples bananas and grapes", "I like apples, bananas, and grapes.", "I like apples bananas, and grapes", "I like apples bananas and, grapes"]],
    ["What is the plural of child?", "children", ["childs", "children", "childes", "childrens"]],
    ["What is the plural of mouse?", "mice", ["mouses", "mices", "mice", "mouse"]],
    ["Choose the correct article:", "an apple", ["a apple", "an apple", "the applees", "some apple"]],
    ["Choose the correct article:", "a book", ["an book", "a book", "the books", "some books"]],
    ["Which word is an adjective?", "happy", ["happiness", "happy", "happily", "happen"]],
    ["Choose the sentence in present continuous:", "She is reading now.", ["She reads now.", "She read now.", "She is reading now.", "She reading now."]],
    ["Choose the sentence in past tense:", "They visited grandma yesterday.", ["They visit grandma yesterday.", "They are visiting grandma yesterday.", "They visited grandma yesterday.", "They visits grandma yesterday."]],
    ["Which one is correct?", "I don't like milk.", ["I doesn't like milk.", "I don't like milk.", "I not like milk.", "I amn't like milk."]],
    ["Complete: Can you ___ me, please?", "help", ["helps", "help", "helped", "helping"]],
    ["Choose the best ending: Thank you ___.", "very much", ["very much", "very many", "too muches", "big thanks"]],
    ["Choose the polite request:", "Could you open the window, please?", ["Open window now!", "You open the window.", "Could you open the window, please?", "Window open."]],
    ["Complete: We ___ English every day.", "study", ["studies", "study", "studied", "studying"]],
  ];

  const stage1Pool = stage1Words.map((item) => item.en);
  const stage2Pool = stage2Opposites.map(([, opposite]) => opposite);
  const questionWordsPool = ["Who", "What", "Where", "When", "Why", "How", "Whose"];

  return [
    {
      title: "שלב 1: אוצר מילים בסיסי",
      questions: stage1Words.map((item, idx) => ({
        prompt: `בחר את התרגום לאנגלית: "${item.he}"`,
        answer: item.en,
        options: buildOptions(item.en, stage1Pool, idx + 1),
        explanation: `"${item.he}" באנגלית זה "${item.en}".`,
        points: 5,
      })),
    },
    {
      title: "שלב 2: מילים הפוכות",
      questions: stage2Opposites.map(([word, opposite], idx) => ({
        prompt: `What is the opposite of "${word}"?`,
        answer: opposite,
        options: buildOptions(opposite, stage2Pool, idx + 30),
        explanation: `The opposite of "${word}" is "${opposite}".`,
        points: 5,
      })),
    },
    {
      title: "שלב 3: דקדוק הווה פשוט",
      questions: stage3Grammar.map(([subject, verb], idx) => {
        const correct = subject === "He" || subject === "She" || subject === "Tom" || subject === "Dad" || subject === "Maya" || subject === "The dog" || subject === "The girl" || subject === "My brother" || subject === "My sister"
          ? thirdPerson(verb)
          : verb;
        const optionsBase = [verb, thirdPerson(verb), `${verb}ing`, `${verb}ed`];

        return {
          prompt: `Complete: ${subject} ___ every day.`,
          answer: correct,
          options: shuffleBySeed(optionsBase, idx + 70),
          explanation: `With "${subject}", the correct form is "${correct}" in present simple.`,
          points: 6,
        };
      }),
    },
    {
      title: "שלב 4: ימים, חודשים וזמנים",
      questions: stage4Time.map((item, idx) => ({
        prompt: item.prompt,
        answer: item.answer,
        options: shuffleBySeed(item.options, idx + 100),
        explanation: item.explanation,
        points: 6,
      })),
    },
    {
      title: "שלב 5: מילות יחס",
      questions: stage5Prepositions.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 120),
        explanation: `The correct preposition here is "${answer}".`,
        points: 6,
      })),
    },
    {
      title: "שלב 6: מילות שאלה",
      questions: stage6Questions.map(([prompt, answer], idx) => ({
        prompt,
        answer,
        options: buildOptions(answer, questionWordsPool, idx + 150),
        explanation: `The right question word is "${answer}".`,
        points: 6,
      })),
    },
    {
      title: "שלב 7: בחר את המשפט הנכון",
      questions: stage7CorrectSentence.map(([answer, options], idx) => ({
        prompt: "Which sentence is correct?",
        answer,
        options: shuffleBySeed(options, idx + 170),
        explanation: `Correct sentence: "${answer}".`,
        points: 7,
      })),
    },
    {
      title: "שלב 8: הבנת הנקרא קצרה",
      questions: stage8Reading.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 200),
        explanation: `Correct answer: ${answer}.`,
        points: 7,
      })),
    },
    {
      title: "שלב 9: עבר פשוט",
      questions: stage9Past.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 230),
        explanation: `The past form here is "${answer}".`,
        points: 8,
      })),
    },
    {
      title: "שלב 10: אתגר מסכם",
      questions: stage10Mixed.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 260),
        explanation: `Correct answer: "${answer}".`,
        points: 8,
      })),
    },
  ];
}

const stages = buildStages();
const totalQuestions = stages.reduce((sum, stage) => sum + stage.questions.length, 0);

const stageLabel = document.getElementById("stageLabel");
const totalStagesLabel = document.getElementById("totalStagesLabel");
const stageQuestionLabel = document.getElementById("stageQuestionLabel");
const stageQuestionTotalLabel = document.getElementById("stageQuestionTotalLabel");
const scoreLabel = document.getElementById("scoreLabel");
const progressFill = document.getElementById("progressFill");
const stageContainer = document.getElementById("stageContainer");
const resetBtn = document.getElementById("resetBtn");
const shareBtn = document.getElementById("shareBtn");

let state = loadState();
let pendingAnswer = null;

totalStagesLabel.textContent = String(stages.length);
render();

resetBtn.addEventListener("click", () => {
  state = createInitialState();
  pendingAnswer = null;
  persistState();
  render();
});

shareBtn.addEventListener("click", async () => {
  const stageReached = Math.min(state.stageIndex + 1, stages.length);
  const shareText = state.finished
    ? `סיימתי את כל ${stages.length} השלבים ב-English Quest עם ${state.score} נקודות!`
    : `הגעתי לשלב ${stageReached} מתוך ${stages.length} ב-English Quest וצברתי ${state.score} נקודות!`;

  try {
    const blob = await createProgressImageBlob(stageReached, state.score);
    const file = new File([blob], "english-quest-progress.png", { type: "image/png" });

    if (navigator.share && navigator.canShare && navigator.canShare({ files: [file] })) {
      await navigator.share({
        title: "English Quest Progress",
        text: `${shareText}\n${window.location.href}`,
        files: [file],
      });
      return;
    }

    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "english-quest-progress.png";
    downloadLink.click();
    URL.revokeObjectURL(fileUrl);

    const waText = `${shareText}\n${window.location.href}\n(התמונה נשמרה - אפשר לצרף אותה לוואטסאפ)`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, "_blank", "noopener");
  } catch {
    const waText = `${shareText}\n${window.location.href}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(waText)}`, "_blank", "noopener");
  }
});

function createInitialState() {
  return {
    stageIndex: 0,
    questionIndex: 0,
    answeredCount: 0,
    score: 0,
    view: "question",
    finished: false,
  };
}

function loadState() {
  const fallback = createInitialState();

  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return fallback;
    const parsed = JSON.parse(raw);

    if (
      typeof parsed.stageIndex !== "number" ||
      typeof parsed.questionIndex !== "number" ||
      typeof parsed.answeredCount !== "number" ||
      typeof parsed.score !== "number"
    ) {
      return fallback;
    }

    if (parsed.stageIndex < 0 || parsed.stageIndex >= stages.length) return fallback;
    if (parsed.questionIndex < 0 || parsed.questionIndex >= stages[parsed.stageIndex].questions.length) return fallback;
    if (parsed.answeredCount < 0 || parsed.answeredCount > totalQuestions) return fallback;

    return {
      stageIndex: parsed.stageIndex,
      questionIndex: parsed.questionIndex,
      answeredCount: parsed.answeredCount,
      score: parsed.score,
      view: parsed.view === "stageComplete" ? "stageComplete" : "question",
      finished: Boolean(parsed.finished),
    };
  } catch {
    return fallback;
  }
}

function persistState() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
}

function escapeHtml(text) {
  return text
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#39;");
}

function render() {
  if (state.finished) {
    renderFinal();
    return;
  }

  const currentStage = stages[state.stageIndex];
  stageLabel.textContent = String(state.stageIndex + 1);
  stageQuestionTotalLabel.textContent = String(currentStage.questions.length);
  stageQuestionLabel.textContent = String(Math.min(state.questionIndex + 1, currentStage.questions.length));
  scoreLabel.textContent = String(state.score);
  progressFill.style.width = `${(state.answeredCount / totalQuestions) * 100}%`;

  if (state.view === "stageComplete") {
    renderStageComplete();
    return;
  }

  renderQuestion();
}

function renderQuestion() {
  const stage = stages[state.stageIndex];
  const question = stage.questions[state.questionIndex];
  pendingAnswer = null;

  stageContainer.innerHTML = `
    <h2 class="stage-title">${stage.title}</h2>
    <p class="question">${escapeHtml(question.prompt)}</p>
    <div class="option-grid">
      ${question.options
        .map((option) => `<button type="button" class="option-btn" data-option="${escapeHtml(option)}">${escapeHtml(option)}</button>`)
        .join("")}
    </div>
    <p id="feedback" class="feedback"></p>
  `;

  const buttons = stageContainer.querySelectorAll(".option-btn");
  const feedback = document.getElementById("feedback");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (pendingAnswer) return;

      const picked = button.dataset.option;
      const correct = picked === question.answer;

      buttons.forEach((b) => {
        b.disabled = true;
        if (b.dataset.option === question.answer) b.classList.add("correct");
      });

      if (!correct) button.classList.add("wrong");

      pendingAnswer = {
        points: correct ? question.points : 0,
      };

      if (correct) {
        feedback.textContent = `נכון! ${question.explanation}`;
        feedback.className = "feedback good";
      } else {
        feedback.textContent = `לא נכון. התשובה הנכונה היא "${question.answer}". ${question.explanation}`;
        feedback.className = "feedback bad";
      }

      addNextButton();
    });
  });
}

function addNextButton() {
  if (stageContainer.querySelector(".next-btn")) return;

  const stage = stages[state.stageIndex];
  const isLastQuestionInStage = state.questionIndex === stage.questions.length - 1;

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "next-btn";
  nextBtn.textContent = isLastQuestionInStage ? "סיום השלב" : "לשאלה הבאה";

  nextBtn.addEventListener("click", () => {
    if (!pendingAnswer) return;

    state.answeredCount += 1;
    state.score += pendingAnswer.points;

    if (isLastQuestionInStage) {
      if (state.stageIndex === stages.length - 1) {
        state.finished = true;
      } else {
        state.view = "stageComplete";
      }
    } else {
      state.questionIndex += 1;
    }

    pendingAnswer = null;
    persistState();
    render();
  });

  stageContainer.append(nextBtn);
}

function renderStageComplete() {
  const completedStageNumber = state.stageIndex + 1;
  stageQuestionLabel.textContent = String(stages[state.stageIndex].questions.length);

  stageContainer.innerHTML = `
    <div class="stage-complete">
      <div class="success-mark">✓</div>
      <h2 class="stage-title">סיימת את שלב ${completedStageNumber} בהצלחה!</h2>
      <p class="question">ניקוד נוכחי: <strong>${state.score}</strong> נקודות</p>
      <button type="button" class="next-btn" id="continueStageBtn">מעבר לשלב הבא</button>
    </div>
  `;

  document.getElementById("continueStageBtn").addEventListener("click", () => {
    state.stageIndex += 1;
    state.questionIndex = 0;
    state.view = "question";
    persistState();
    render();
  });
}

function renderFinal() {
  stageLabel.textContent = String(stages.length);
  stageQuestionLabel.textContent = String(stages[stages.length - 1].questions.length);
  stageQuestionTotalLabel.textContent = String(stages[stages.length - 1].questions.length);
  scoreLabel.textContent = String(state.score);
  progressFill.style.width = "100%";

  stageContainer.innerHTML = `
    <div class="stage-complete">
      <div class="success-mark">🏆</div>
      <h2 class="stage-title">אלופים! סיימתם 200 שאלות!</h2>
      <p class="question">צברתם <strong>${state.score}</strong> נקודות במסלול המלא.</p>
      <p class="question">לחצו על "שיתוף בוואטסאפ" כדי לשתף את ההתקדמות בתמונה מעוצבת.</p>
    </div>
  `;
}

async function createProgressImageBlob(stageReached, score) {
  const canvas = document.createElement("canvas");
  canvas.width = 1080;
  canvas.height = 1080;
  const ctx = canvas.getContext("2d");

  const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
  gradient.addColorStop(0, "#d9f1ff");
  gradient.addColorStop(0.5, "#c6f7d0");
  gradient.addColorStop(1, "#ffe6a3");
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  ctx.fillStyle = "rgba(255,255,255,0.82)";
  roundRect(ctx, 90, 160, 900, 760, 36);
  ctx.fill();

  ctx.fillStyle = "#1d3557";
  ctx.font = "700 68px Rubik, sans-serif";
  ctx.textAlign = "center";
  ctx.fillText("English Quest", canvas.width / 2, 290);

  ctx.font = "500 42px Rubik, sans-serif";
  ctx.fillStyle = "#2e4f74";
  ctx.fillText("התקדמות בתרגול אנגלית", canvas.width / 2, 350);

  ctx.font = "700 58px Rubik, sans-serif";
  ctx.fillStyle = "#168f4f";
  ctx.fillText(`שלב ${stageReached} מתוך ${stages.length}`, canvas.width / 2, 470);

  ctx.font = "700 54px Rubik, sans-serif";
  ctx.fillStyle = "#d97706";
  ctx.fillText(`ניקוד: ${score}`, canvas.width / 2, 560);

  const percent = Math.round((Math.min(state.answeredCount, totalQuestions) / totalQuestions) * 100);
  ctx.fillStyle = "#e8eff7";
  roundRect(ctx, 220, 640, 640, 50, 25);
  ctx.fill();

  ctx.fillStyle = "#2eb872";
  roundRect(ctx, 220, 640, Math.max(30, (640 * percent) / 100), 50, 25);
  ctx.fill();

  ctx.font = "500 34px Rubik, sans-serif";
  ctx.fillStyle = "#1d3557";
  ctx.fillText(`${percent}% הושלם`, canvas.width / 2, 740);

  ctx.font = "500 30px Rubik, sans-serif";
  ctx.fillStyle = "#3d5a80";
  ctx.fillText("תמשיכו להתקדם. אתם עושים עבודה מעולה!", canvas.width / 2, 840);

  return new Promise((resolve) => {
    canvas.toBlob((blob) => resolve(blob || new Blob()), "image/png", 1);
  });
}

function roundRect(ctx, x, y, width, height, radius) {
  ctx.beginPath();
  ctx.moveTo(x + radius, y);
  ctx.lineTo(x + width - radius, y);
  ctx.quadraticCurveTo(x + width, y, x + width, y + radius);
  ctx.lineTo(x + width, y + height - radius);
  ctx.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
  ctx.lineTo(x + radius, y + height);
  ctx.quadraticCurveTo(x, y + height, x, y + height - radius);
  ctx.lineTo(x, y + radius);
  ctx.quadraticCurveTo(x, y, x + radius, y);
  ctx.closePath();
}
