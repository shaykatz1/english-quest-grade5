const STORAGE_KEY = "englishQuestProgressV3";
const GAME_SCORES_KEY = "englishQuestGameScoresV1";
const GAME_ROUNDS = 8;

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

  const stage11Contractions = [
    ["I am", "I'm"],
    ["You are", "You're"],
    ["He is", "He's"],
    ["She is", "She's"],
    ["It is", "It's"],
    ["We are", "We're"],
    ["They are", "They're"],
    ["I have", "I've"],
    ["You have", "You've"],
    ["We have", "We've"],
    ["They have", "They've"],
    ["I will", "I'll"],
    ["You will", "You'll"],
    ["He will", "He'll"],
    ["She will", "She'll"],
    ["We will", "We'll"],
    ["They will", "They'll"],
    ["Do not", "Don't"],
    ["Can not", "Can't"],
    ["Is not", "Isn't"],
  ];

  const stage12Pronouns = [
    ["This is Dana. ___ is my friend.", "She", ["She", "He", "They", "It"]],
    ["This is Tom. ___ likes soccer.", "He", ["He", "She", "It", "We"]],
    ["My brother and I are students. ___ are in grade 5.", "We", ["We", "They", "He", "I"]],
    ["The dog is hungry. ___ wants food.", "It", ["It", "He", "They", "We"]],
    ["Maya and Noa are sisters. ___ are kind.", "They", ["They", "She", "It", "He"]],
    ["I have a blue bag. It is ___.", "mine", ["my", "mine", "me", "I"]],
    ["This is my pencil. It is ___.", "my", ["mine", "my", "me", "I"]],
    ["We love our class. The classroom is ___.", "ours", ["our", "ours", "us", "we"]],
    ["That bike belongs to Tom. It is ___.", "his", ["him", "his", "he", "hims"]],
    ["That book belongs to Maya. It is ___.", "hers", ["her", "she", "hers", "shes"]],
    ["Please help ___.", "me", ["I", "mine", "me", "my"]],
    ["The teacher gave ___ homework.", "us", ["we", "us", "our", "ours"]],
    ["I can see ___ in the mirror.", "myself", ["me", "myself", "mine", "my"]],
    ["The children cleaned the room by ___.", "themselves", ["them", "their", "themselves", "they"]],
    ["This is our house. The garden is ___.", "ours", ["our", "ours", "us", "we"]],
    ["Sam has a kite. The kite is ___.", "his", ["he", "him", "his", "himself"]],
    ["Nina has a doll. The doll is ___.", "hers", ["her", "hers", "she", "herself"]],
    ["My parents and I love music. ___ listen every day.", "We", ["They", "I", "We", "Us"]],
    ["The cat is black. ___ tail is long.", "Its", ["It", "Its", "It's", "It is"]],
    ["Roi and I did the project by ___.", "ourselves", ["our", "ourselves", "we", "us"]],
  ];

  const stage13Comparatives = [
    ["A lion is ___ than a cat.", "bigger", ["big", "bigger", "biggest", "more big"]],
    ["A mouse is ___ than an elephant.", "smaller", ["small", "smaller", "smallest", "more small"]],
    ["Summer is usually ___ than winter.", "hotter", ["hot", "hotter", "hottest", "more hot"]],
    ["A bicycle is ___ than a car.", "slower", ["slow", "slower", "slowest", "more slow"]],
    ["Mount Everest is the ___ mountain.", "highest", ["high", "higher", "highest", "most high"]],
    ["This math question is ___ than the last one.", "easier", ["easy", "easier", "easiest", "more easy"]],
    ["Today is the ___ day of the week for me.", "best", ["good", "better", "best", "goodest"]],
    ["My bag is ___ than your bag.", "heavier", ["heavy", "heavier", "heaviest", "more heavy"]],
    ["This road is ___ than that road.", "longer", ["long", "longer", "longest", "more long"]],
    ["A rabbit runs ___ than a turtle.", "faster", ["fast", "faster", "fastest", "more fast"]],
    ["This puzzle is the ___ in the book.", "hardest", ["hard", "harder", "hardest", "more hard"]],
    ["My room is ___ than last year.", "cleaner", ["clean", "cleaner", "cleanest", "more clean"]],
    ["Gold is ___ than silver.", "more expensive", ["expensive", "expensiver", "more expensive", "most expensive"]],
    ["This story is the ___ one here.", "funniest", ["funny", "funnier", "funniest", "more funny"]],
    ["The blue whale is the ___ animal.", "largest", ["large", "larger", "largest", "more large"]],
    ["Tea is usually ___ than coffee for kids.", "less strong", ["strong", "stronger", "less strong", "strongest"]],
    ["The second test was ___ than the first.", "harder", ["hard", "harder", "hardest", "more hard"]],
    ["My little brother is ___ than me.", "younger", ["young", "younger", "youngest", "more young"]],
    ["This is the ___ drawing in the class.", "most colorful", ["colorful", "more colorful", "most colorful", "colorfullest"]],
    ["A cheetah is the ___ land animal.", "fastest", ["fast", "faster", "fastest", "most fast"]],
  ];

  const stage14Should = [
    ["You have a test tomorrow. You ___ study tonight.", "should", ["should", "shouldn't", "can", "can't"]],
    ["It is raining. You ___ take an umbrella.", "should", ["should", "shouldn't", "is", "are"]],
    ["You feel sick. You ___ tell an adult.", "should", ["should", "shouldn't", "were", "did"]],
    ["You are very tired. You ___ sleep late every night.", "shouldn't", ["should", "shouldn't", "can", "do"]],
    ["You want to improve English. You ___ read every day.", "should", ["should", "shouldn't", "can't", "did"]],
    ["There is trash on the floor. We ___ throw it away.", "should", ["should", "shouldn't", "was", "have"]],
    ["You hurt your leg. You ___ run now.", "shouldn't", ["should", "shouldn't", "are", "is"]],
    ["To be polite, you ___ say thank you.", "should", ["should", "shouldn't", "can", "can't"]],
    ["If your friend is sad, you ___ laugh at him.", "shouldn't", ["should", "shouldn't", "must", "did"]],
    ["You forgot your homework. You ___ lie to the teacher.", "shouldn't", ["should", "shouldn't", "can", "were"]],
    ["You want strong teeth. You ___ brush twice a day.", "should", ["should", "shouldn't", "can't", "don't"]],
    ["In class, you ___ shout.", "shouldn't", ["should", "shouldn't", "have", "are"]],
    ["At the library, we ___ be quiet.", "should", ["should", "shouldn't", "did", "were"]],
    ["Before crossing the road, you ___ look both ways.", "should", ["should", "shouldn't", "can", "can't"]],
    ["You are late. You ___ hurry.", "should", ["should", "shouldn't", "has", "had"]],
    ["You have a fever. You ___ drink cold soda now.", "shouldn't", ["should", "shouldn't", "can", "are"]],
    ["You want to be healthy. You ___ eat vegetables.", "should", ["should", "shouldn't", "were", "did"]],
    ["When someone speaks, we ___ listen.", "should", ["should", "shouldn't", "can't", "don't"]],
    ["On the bus, you ___ push people.", "shouldn't", ["should", "shouldn't", "did", "was"]],
    ["To learn words, you ___ practice often.", "should", ["should", "shouldn't", "is", "are"]],
  ];

  const stage15CanCant = [
    ["Birds ___ fly.", "can", ["can", "can't", "should", "are"]],
    ["Fish ___ walk on land.", "can't", ["can", "can't", "should", "is"]],
    ["I ___ ride a bike.", "can", ["can", "can't", "was", "did"]],
    ["A baby ___ drive a car.", "can't", ["can", "can't", "should", "have"]],
    ["We ___ speak English in class.", "can", ["can", "can't", "were", "did"]],
    ["You ___ use your phone during the test.", "can't", ["can", "can't", "should", "are"]],
    ["My dad ___ cook very well.", "can", ["can", "can't", "does", "is"]],
    ["A turtle ___ run very fast.", "can't", ["can", "can't", "should", "do"]],
    ["She ___ swim 50 meters.", "can", ["can", "can't", "is", "are"]],
    ["Students ___ eat in the science lab.", "can't", ["can", "can't", "should", "were"]],
    ["I ___ help you with homework.", "can", ["can", "can't", "am", "did"]],
    ["We ___ be rude to others.", "can't", ["can", "can't", "is", "are"]],
    ["A chef ___ make many dishes.", "can", ["can", "can't", "should", "was"]],
    ["You ___ enter without permission.", "can't", ["can", "can't", "did", "were"]],
    ["My sister ___ draw beautiful pictures.", "can", ["can", "can't", "is", "has"]],
    ["Dogs ___ read books.", "can't", ["can", "can't", "have", "are"]],
    ["I ___ clean my room alone.", "can", ["can", "can't", "should", "was"]],
    ["We ___ cross on red light.", "can't", ["can", "can't", "did", "were"]],
    ["He ___ answer this easy question.", "can", ["can", "can't", "has", "had"]],
    ["A computer ___ think like a human.", "can't", ["can", "can't", "is", "are"]],
  ];

  const stage16Spelling = [
    ["Choose the correct spelling:", "because", ["becose", "because", "becaus", "beacause"]],
    ["Choose the correct spelling:", "favorite", ["favouritee", "favorite", "favrite", "faverite"]],
    ["Choose the correct spelling:", "school", ["scool", "school", "schol", "shcool"]],
    ["Choose the correct spelling:", "friend", ["freind", "friend", "frend", "friand"]],
    ["Choose the correct spelling:", "between", ["betwen", "between", "betwean", "btween"]],
    ["Choose the correct spelling:", "library", ["librery", "library", "libary", "librari"]],
    ["Choose the correct spelling:", "morning", ["mornig", "morning", "mroning", "morniing"]],
    ["Choose the correct spelling:", "important", ["impoortant", "important", "importent", "imprtant"]],
    ["Choose the correct spelling:", "kitchen", ["kichen", "kitchen", "kitcen", "kittchen"]],
    ["Choose the correct spelling:", "question", ["qustion", "question", "queston", "qestion"]],
    ["Choose the correct spelling:", "answer", ["anser", "answer", "answar", "awnser"]],
    ["Choose the correct spelling:", "holiday", ["holidy", "holiday", "holliday", "holidai"]],
    ["Choose the correct spelling:", "country", ["cuntry", "country", "contry", "countrey"]],
    ["Choose the correct spelling:", "different", ["diffrent", "different", "diferent", "differnt"]],
    ["Choose the correct spelling:", "mountain", ["mounten", "mountain", "moutain", "montain"]],
    ["Choose the correct spelling:", "together", ["togather", "together", "tohether", "togeder"]],
    ["Choose the correct spelling:", "enough", ["enouf", "enough", "enogh", "inough"]],
    ["Choose the correct spelling:", "minute", ["minit", "minute", "minutte", "menute"]],
    ["Choose the correct spelling:", "beautiful", ["beautifull", "beautiful", "beutiful", "beatiful"]],
    ["Choose the correct spelling:", "language", ["langauge", "language", "languge", "langige"]],
  ];

  const stage17Punctuation = [
    ["Which sentence is correct?", "Where are you going?", ["Where are you going.", "where are you going?", "Where are you going?", "Where are you going!"]],
    ["Which sentence is correct?", "I like pizza, salad, and soup.", ["I like pizza salad and soup.", "I like pizza, salad, and soup.", "I like, pizza salad and soup.", "I like pizza, salad and soup"]],
    ["Which sentence is correct?", "My name is Noa.", ["my name is Noa.", "My name is noa.", "My name is Noa.", "My name is Noa"]],
    ["Which sentence is correct?", "Do you have a pencil?", ["Do you have a pencil.", "Do you have a pencil?", "do you have a pencil?", "Do you have a pencil!"]],
    ["Which sentence is correct?", "We went to Tel Aviv on Sunday.", ["we went to Tel Aviv on Sunday.", "We went to tel aviv on Sunday.", "We went to Tel Aviv on Sunday.", "We went to Tel aviv on sunday."]],
    ["Which sentence is correct?", "Please close the door.", ["please close the door.", "Please close the door.", "Please close the door", "Please, close the door"]],
    ["Which sentence is correct?", "Wow! That is amazing!", ["Wow that is amazing!", "Wow! That is amazing!", "wow! that is amazing!", "Wow! that is amazing!"]],
    ["Which sentence is correct?", "He said, \"I am ready.\"", ["He said \"I am ready\".", "He said, \"I am ready.\"", "He said, I am ready.", "he said, \"I am ready.\""]],
    ["Which sentence is correct?", "The cat's tail is long.", ["The cats tail is long.", "The cat's tail is long.", "The cat tail's is long.", "The cat's tail is long"]],
    ["Which sentence is correct?", "It's a sunny day.", ["Its a sunny day.", "It's a sunny day.", "It's a sunny day", "its a sunny day."]],
    ["Which sentence is correct?", "Can I help you?", ["Can I help you.", "can I help you?", "Can I help you?", "Can I help you!"]],
    ["Which sentence is correct?", "We have math, science, and English today.", ["We have math science and English today.", "We have math, science, and English today.", "We have math,science and English today.", "we have math, science, and English today."]],
    ["Which sentence is correct?", "My birthday is in July.", ["My birthday is in july.", "My birthday is in July.", "my birthday is in July.", "My birthday is in July"]],
    ["Which sentence is correct?", "Where is my notebook?", ["Where is my notebook.", "Where is my notebook?", "where is my notebook?", "Where is my notebook!"]],
    ["Which sentence is correct?", "We cleaned the room.", ["We cleaned the room", "we cleaned the room.", "We cleaned the room.", "We cleaned, the room."]],
    ["Which sentence is correct?", "I can't find my keys.", ["I cant find my keys.", "I can't find my keys.", "I can't find my keys", "i can't find my keys."]],
    ["Which sentence is correct?", "No, I don't want juice.", ["No I don't want juice.", "No, I don't want juice.", "No, I dont want juice.", "No, I don't want juice"]],
    ["Which sentence is correct?", "Today is Monday.", ["today is Monday.", "Today is Monday.", "Today is monday.", "Today is Monday"]],
    ["Which sentence is correct?", "Let's play after homework.", ["Lets play after homework.", "Let's play after homework.", "Let's play after homework", "let's play after homework."]],
    ["Which sentence is correct?", "Please be quiet in class.", ["Please be quiet in class", "please be quiet in class.", "Please be quiet in class.", "Please, be quiet in class"]],
  ];

  const stage18Continuous = [
    ["Look! The baby ___ now.", "is sleeping", ["sleep", "is sleeping", "are sleeping", "slept"]],
    ["I ___ my homework right now.", "am doing", ["am doing", "do", "is doing", "did"]],
    ["They ___ football at the moment.", "are playing", ["is playing", "are playing", "play", "played"]],
    ["She ___ a book now.", "is reading", ["is reading", "reads", "are reading", "read"]],
    ["We ___ in class now.", "are sitting", ["are sitting", "is sitting", "sit", "sat"]],
    ["Tom ___ to his friend now.", "is talking", ["are talking", "is talking", "talks", "talked"]],
    ["The birds ___ in the sky.", "are flying", ["are flying", "is flying", "fly", "flew"]],
    ["I ___ water because I am thirsty.", "am drinking", ["am drinking", "is drinking", "drink", "drank"]],
    ["My parents ___ dinner now.", "are cooking", ["is cooking", "are cooking", "cook", "cooked"]],
    ["The dog ___ under the table now.", "is hiding", ["is hiding", "are hiding", "hide", "hid"]],
    ["You ___ very fast today.", "are running", ["is running", "are running", "run", "ran"]],
    ["It ___ outside right now.", "is raining", ["is raining", "are raining", "rains", "rained"]],
    ["The children ___ a song now.", "are singing", ["are singing", "is singing", "sing", "sang"]],
    ["Maya ___ her room now.", "is cleaning", ["are cleaning", "is cleaning", "cleans", "cleaned"]],
    ["I ___ to music at the moment.", "am listening", ["am listening", "are listening", "listen", "listened"]],
    ["The teacher ___ on the board now.", "is writing", ["is writing", "are writing", "writes", "wrote"]],
    ["We ___ a game now.", "are watching", ["is watching", "are watching", "watch", "watched"]],
    ["He ___ his teeth now.", "is brushing", ["are brushing", "is brushing", "brushes", "brushed"]],
    ["The cat ___ with a ball now.", "is playing", ["is playing", "are playing", "plays", "played"]],
    ["I ___ a sandwich now.", "am making", ["am making", "is making", "make", "made"]],
  ];

  const stage19Frequency = [
    ["I ___ eat breakfast before school.", "always", ["always", "never", "sometimes", "rarely"]],
    ["She ___ forgets her homework. It happens once a month.", "rarely", ["always", "often", "rarely", "usually"]],
    ["We ___ go to the park on Fridays.", "usually", ["never", "usually", "rarely", "almost never"]],
    ["He ___ drinks milk in the morning.", "often", ["often", "never", "rarely", "hardly"]],
    ["They ___ watch TV after homework.", "sometimes", ["never", "sometimes", "rarely", "hardly"]],
    ["I ___ play video games on school nights.", "never", ["always", "often", "sometimes", "never"]],
    ["My dad ___ drives to work.", "usually", ["usually", "never", "rarely", "hardly"]],
    ["The bus ___ arrives late.", "sometimes", ["always", "sometimes", "never", "rarely"]],
    ["We ___ clean our room on Saturday.", "always", ["always", "never", "rarely", "hardly"]],
    ["She ___ reads before bed.", "often", ["often", "never", "rarely", "hardly"]],
    ["I ___ eat candy for breakfast.", "never", ["always", "often", "sometimes", "never"]],
    ["They ___ visit grandma on weekends.", "usually", ["usually", "never", "rarely", "hardly"]],
    ["He ___ goes swimming in winter.", "rarely", ["always", "often", "sometimes", "rarely"]],
    ["We ___ speak English in class.", "always", ["always", "never", "rarely", "hardly"]],
    ["Maya ___ gets up at 7:00.", "usually", ["never", "usually", "rarely", "hardly"]],
    ["I ___ lose my pencil.", "sometimes", ["always", "sometimes", "never", "rarely"]],
    ["The teacher ___ checks homework.", "always", ["always", "never", "rarely", "hardly"]],
    ["He ___ eats vegetables.", "often", ["often", "never", "rarely", "hardly"]],
    ["We ___ arrive late to school.", "never", ["always", "often", "sometimes", "never"]],
    ["My friends ___ ride bikes after school.", "often", ["often", "never", "rarely", "hardly"]],
  ];

  const stage20Review = [
    ["Choose the correct sentence:", "She is reading a book.", ["She are reading a book.", "She is reading a book.", "She reading a book.", "She read a book now."]],
    ["Complete: Yesterday we ___ to the beach.", "went", ["go", "went", "goes", "going"]],
    ["Choose the correct spelling:", "different", ["diffrent", "different", "differnt", "difrent"]],
    ["What is the opposite of \"noisy\"?", "quiet", ["quick", "quiet", "loud", "hard"]],
    ["Complete: I ___ hungry now.", "am", ["is", "are", "am", "be"]],
    ["Which one is a noun?", "teacher", ["quickly", "teacher", "run", "happy"]],
    ["Complete: They ___ soccer every day.", "play", ["plays", "play", "playing", "played"]],
    ["Choose the correct punctuation:", "Can you help me?", ["Can you help me.", "can you help me?", "Can you help me?", "Can you help me!"]],
    ["Complete: The dog is ___ the table.", "under", ["on", "under", "between", "above"]],
    ["Choose the right word: Thank you ___.", "very much", ["very much", "many much", "much very", "big thank"]],
    ["Complete: My sister ___ a bike.", "has", ["have", "has", "having", "had"]],
    ["Choose the correct article:", "an orange", ["a orange", "an orange", "the orangee", "some orange"]],
    ["Complete: We ___ in grade five.", "are", ["is", "am", "are", "be"]],
    ["Which sentence is correct?", "Tom and I are friends.", ["Tom and I is friends.", "Tom and I are friends.", "Tom and I am friends.", "Tom and I be friends."]],
    ["Complete: I can ___ this question.", "answer", ["answers", "answer", "answered", "answering"]],
    ["What is the plural of \"child\"?", "children", ["childs", "children", "childes", "childrens"]],
    ["Complete: She ___ not like milk.", "does", ["do", "does", "is", "are"]],
    ["Choose the correct spelling:", "language", ["langauge", "language", "langige", "languaje"]],
    ["Complete: It ___ sunny today.", "is", ["am", "are", "is", "be"]],
    ["Choose the best final sentence:", "We should practice English every day.", ["We should practice English every day.", "We should practices English every day.", "We should practicing English every day.", "We should practiced English every day."]],
  ];

  const stage1Pool = stage1Words.map((item) => item.en);
  const stage2Pool = stage2Opposites.map(([, opposite]) => opposite);
  const questionWordsPool = ["Who", "What", "Where", "When", "Why", "How", "Whose"];

  return [
    {
      topic: "Vocabulary Basics",
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
      topic: "Vocabulary Basics",
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
      topic: "Grammar Foundations",
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
      topic: "Grammar Foundations",
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
      topic: "Grammar Foundations",
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
      topic: "Grammar Foundations",
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
      topic: "Sentence Skills",
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
      topic: "Sentence Skills",
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
      topic: "Sentence Skills",
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
      topic: "Sentence Skills",
      title: "שלב 10: אתגר מסכם",
      questions: stage10Mixed.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 260),
        explanation: `Correct answer: "${answer}".`,
        points: 8,
      })),
    },
    {
      topic: "Grammar Mastery",
      title: "שלב 11: קיצורי מילים (Contractions)",
      questions: stage11Contractions.map(([fullForm, answer], idx) => ({
        prompt: `Choose the contraction of "${fullForm}".`,
        answer,
        options: shuffleBySeed(
          [answer, fullForm, answer.replace("'", ""), `${fullForm.toLowerCase()}`],
          idx + 300
        ),
        explanation: `The contraction of "${fullForm}" is "${answer}".`,
        points: 8,
      })),
    },
    {
      topic: "Grammar Mastery",
      title: "שלב 12: כינויי גוף ושייכות",
      questions: stage12Pronouns.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 330),
        explanation: `The correct word is "${answer}".`,
        points: 9,
      })),
    },
    {
      topic: "Grammar Mastery",
      title: "שלב 13: השוואות ותארים",
      questions: stage13Comparatives.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 360),
        explanation: `The best form here is "${answer}".`,
        points: 9,
      })),
    },
    {
      topic: "Grammar Mastery",
      title: "שלב 14: Should / Shouldn't",
      questions: stage14Should.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 390),
        explanation: `In this situation, "${answer}" is correct.`,
        points: 9,
      })),
    },
    {
      topic: "Grammar Mastery",
      title: "שלב 15: Can / Can't",
      questions: stage15CanCant.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 420),
        explanation: `The correct modal here is "${answer}".`,
        points: 9,
      })),
    },
    {
      topic: "Advanced Literacy",
      title: "שלב 16: כתיב מתקדם",
      questions: stage16Spelling.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 450),
        explanation: `The correct spelling is "${answer}".`,
        points: 10,
      })),
    },
    {
      topic: "Advanced Literacy",
      title: "שלב 17: פיסוק ואות גדולה",
      questions: stage17Punctuation.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 480),
        explanation: `Correct sentence: "${answer}"`,
        points: 10,
      })),
    },
    {
      topic: "Advanced Literacy",
      title: "שלב 18: הווה ממושך",
      questions: stage18Continuous.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 510),
        explanation: `Use "${answer}" for an action happening now.`,
        points: 10,
      })),
    },
    {
      topic: "Advanced Literacy",
      title: "שלב 19: תדירות",
      questions: stage19Frequency.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 540),
        explanation: `The best frequency word here is "${answer}".`,
        points: 10,
      })),
    },
    {
      topic: "Advanced Literacy",
      title: "שלב 20: סופר אתגר",
      questions: stage20Review.map(([prompt, answer, options], idx) => ({
        prompt,
        answer,
        options: shuffleBySeed(options, idx + 570),
        explanation: `Correct answer: "${answer}".`,
        points: 12,
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
const completedCountLabel = document.getElementById("completedCountLabel");
const remainingCountLabel = document.getElementById("remainingCountLabel");
const stageMap = document.getElementById("stageMap");
const realGamesCatalog = document.getElementById("realGamesCatalog");
const realGameArena = document.getElementById("realGameArena");
const shareHint = document.getElementById("shareHint");
const stageContainer = document.getElementById("stageContainer");
const resetBtn = document.getElementById("resetBtn");
const shareBtn = document.getElementById("shareBtn");

const realGames = buildRealGames();

let state = loadState();
let pendingAnswer = null;
const realGameState = {
  activeGameId: realGames[0]?.id || null,
  round: 1,
  score: 0,
  locked: false,
  bestScores: loadGameScores(),
  challenge: null,
};

totalStagesLabel.textContent = String(stages.length);
render();
initRealGames();

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
  const waText = `${shareText} קישור למשחק: ${window.location.href}`;

  try {
    const blob = await createProgressImageBlob(stageReached, state.score);
    const fileUrl = URL.createObjectURL(blob);
    const downloadLink = document.createElement("a");
    downloadLink.href = fileUrl;
    downloadLink.download = "english-quest-progress.png";
    downloadLink.click();
    URL.revokeObjectURL(fileUrl);
    showShareHint("וואטסאפ נפתח עם טקסט מוכן. התמונה נשמרה - צרפו אותה להודעה.");
  } catch {
    showShareHint("וואטסאפ נפתח עם טקסט מוכן.");
  }

  openWhatsAppWithText(waText);
});

function buildRealGames() {
  return [
    { id: "wb-animals", title: "בניית מילים: חיות", topic: "Word Builder", type: "word_builder", data: [["dog", "כלב"], ["cat", "חתול"], ["lion", "אריה"], ["tiger", "נמר"], ["horse", "סוס"], ["monkey", "קוף"]] },
    { id: "wb-school", title: "בניית מילים: בית ספר", topic: "Word Builder", type: "word_builder", data: [["school", "בית ספר"], ["teacher", "מורה"], ["pencil", "עיפרון"], ["notebook", "מחברת"], ["eraser", "מחק"], ["classroom", "כיתה"]] },
    { id: "wb-food", title: "בניית מילים: אוכל", topic: "Word Builder", type: "word_builder", data: [["apple", "תפוח"], ["banana", "בננה"], ["bread", "לחם"], ["cheese", "גבינה"], ["salad", "סלט"], ["orange", "תפוז"]] },
    { id: "mem-basic", title: "זיכרון: מילים בסיסיות", topic: "Memory", type: "memory", data: [["sun", "שמש"], ["moon", "ירח"], ["water", "מים"], ["book", "ספר"], ["door", "דלת"], ["chair", "כיסא"]] },
    { id: "mem-house", title: "זיכרון: הבית", topic: "Memory", type: "memory", data: [["kitchen", "מטבח"], ["window", "חלון"], ["table", "שולחן"], ["bed", "מיטה"], ["room", "חדר"], ["garden", "גינה"]] },
    { id: "mem-time", title: "זיכרון: זמן", topic: "Memory", type: "memory", data: [["morning", "בוקר"], ["evening", "ערב"], ["night", "לילה"], ["week", "שבוע"], ["month", "חודש"], ["year", "שנה"]] },
    { id: "sent-present", title: "סידור משפט: הווה", topic: "Sentence Builder", type: "sentence_builder", data: ["I go to school every day.", "She plays with her friends.", "They read books in class.", "We eat lunch at noon.", "He writes in his notebook."] },
    { id: "sent-questions", title: "סידור משפט: שאלות", topic: "Sentence Builder", type: "sentence_builder", data: ["Where do you live?", "What is your name?", "When do you study English?", "Why are you happy today?", "How do you come to school?"] },
    { id: "type-verbs", title: "הקלדה מהירה: פעלים", topic: "Typing", type: "typing", data: [["ללכת", "go"], ["לאכול", "eat"], ["לקרוא", "read"], ["לכתוב", "write"], ["לשחק", "play"], ["לשתות", "drink"]] },
    { id: "type-past", title: "הקלדה מהירה: עבר", topic: "Typing", type: "typing", data: [["go (past)", "went"], ["eat (past)", "ate"], ["write (past)", "wrote"], ["buy (past)", "bought"], ["swim (past)", "swam"], ["come (past)", "came"]] },
    { id: "vowel-challenge", title: "חסר תנועות", topic: "Spelling", type: "vowel_fill", data: [["appl_", "apple"], ["hous_", "house"], ["tabl_", "table"], ["fri_nd", "friend"], ["stud_nt", "student"], ["writ_", "write"]] },
    { id: "mixed-challenge", title: "אתגר מעורב", topic: "Mixed", type: "mixed", data: [] },
  ];
}

function initRealGames() {
  if (!realGamesCatalog || !realGameArena || !realGames.length) return;
  renderRealGamesCatalog();
  startRealGame(realGames[0].id);
}

function renderRealGamesCatalog() {
  realGamesCatalog.innerHTML = realGames
    .map((game) => {
      const activeClass = game.id === realGameState.activeGameId ? "active" : "";
      const best = realGameState.bestScores[game.id] || 0;
      return `<button type="button" class="game-card-btn ${activeClass}" data-game-id="${game.id}"><span class="game-card-title">${escapeHtml(game.title)}</span><span class="game-card-topic">${escapeHtml(game.topic)} | שיא: ${best}</span></button>`;
    })
    .join("");

  realGamesCatalog.querySelectorAll(".game-card-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const gameId = button.dataset.gameId;
      if (!gameId) return;
      startRealGame(gameId);
    });
  });
}

function startRealGame(gameId) {
  const game = realGames.find((item) => item.id === gameId);
  if (!game) return;
  realGameState.activeGameId = gameId;
  realGameState.round = 1;
  realGameState.score = 0;
  realGameState.locked = false;
  realGameState.challenge = buildRealGameChallenge(game);
  renderRealGamesCatalog();
  renderRealGame();
}

function buildRealGameChallenge(game) {
  if (game.type === "word_builder") {
    const [answer, clue] = pickRandom(game.data);
    return { mode: "word_builder", clue, answer, letters: shuffleRandom(answer.toUpperCase().split("")), picked: [] };
  }
  if (game.type === "memory") {
    const pairs = shuffleRandom(game.data).slice(0, 4);
    const cards = shuffleRandom(pairs.flatMap(([en, he], idx) => [{ key: idx, text: en }, { key: idx, text: he }]));
    return { mode: "memory", pairs, cards, open: [], matched: [] };
  }
  if (game.type === "sentence_builder") {
    const answer = pickRandom(game.data);
    return { mode: "sentence_builder", answer, words: shuffleRandom(answer.replace(/[.?]/g, "").split(" ")), picked: [] };
  }
  if (game.type === "typing") {
    const [clue, answer] = pickRandom(game.data);
    return { mode: "typing", clue, answer };
  }
  if (game.type === "vowel_fill") {
    const [prompt, answer] = pickRandom(game.data);
    return { mode: "vowel_fill", clue: prompt, answer };
  }
  return buildRealGameChallenge(pickRandom(realGames.filter((g) => g.type !== "mixed")));
}

function renderRealGame() {
  const game = realGames.find((item) => item.id === realGameState.activeGameId);
  if (!game || !realGameState.challenge) return;
  const best = realGameState.bestScores[game.id] || 0;
  const challenge = realGameState.challenge;

  let body = "";
  if (challenge.mode === "word_builder") {
    const built = challenge.picked.join("");
    body = `
      <p class="game-question">רמז: ${escapeHtml(challenge.clue)} | בנו את המילה באנגלית</p>
      <div class="built-word">${escapeHtml(built)}</div>
      <div class="letter-grid">${challenge.letters.map((l, i) => `<button type="button" class="letter-btn" data-letter-index="${i}" ${challenge.picked.length > i ? "disabled" : ""}>${l}</button>`).join("")}</div>
      <div class="game-actions"><button type="button" class="game-next-btn" id="checkWordBtn">בדיקה</button><button type="button" class="ghost-btn" id="clearWordBtn">ניקוי</button></div>
      <p class="game-feedback" id="realGameFeedback"></p>
    `;
  }
  if (challenge.mode === "memory") {
    body = `
      <p class="game-question">מצאו זוגות מתאימים (אנגלית + עברית)</p>
      <div class="memory-grid">${challenge.cards.map((card, idx) => {
        const isOpen = challenge.open.includes(idx) || challenge.matched.includes(card.key);
        return `<button type="button" class="memory-card ${isOpen ? "open" : ""}" data-card-index="${idx}">${isOpen ? escapeHtml(card.text) : "?"}</button>`;
      }).join("")}</div>
      <p class="game-feedback" id="realGameFeedback"></p>
    `;
  }
  if (challenge.mode === "sentence_builder") {
    body = `
      <p class="game-question">סדרו את המילים למשפט נכון</p>
      <div class="built-word">${escapeHtml(challenge.picked.join(" "))}</div>
      <div class="letter-grid">${challenge.words.map((w, i) => `<button type="button" class="letter-btn" data-word-index="${i}" ${challenge.picked.includes(w) ? "disabled" : ""}>${escapeHtml(w)}</button>`).join("")}</div>
      <div class="game-actions"><button type="button" class="game-next-btn" id="checkSentenceBtn">בדיקה</button><button type="button" class="ghost-btn" id="clearSentenceBtn">ניקוי</button></div>
      <p class="game-feedback" id="realGameFeedback"></p>
    `;
  }
  if (challenge.mode === "typing" || challenge.mode === "vowel_fill") {
    body = `
      <p class="game-question">הקלידו את התשובה הנכונה: ${escapeHtml(challenge.clue)}</p>
      <input id="typingInput" class="typing-input" type="text" dir="ltr" autocomplete="off" />
      <div class="game-actions"><button type="button" class="game-next-btn" id="checkTypingBtn">בדיקה</button></div>
      <p class="game-feedback" id="realGameFeedback"></p>
    `;
  }

  realGameArena.innerHTML = `
    <div class="game-top-row"><span>${escapeHtml(game.title)}</span><span>סיבוב: ${realGameState.round}/${GAME_ROUNDS}</span><span>ניקוד: ${realGameState.score}</span><span>שיא: ${best}</span></div>
    ${body}
  `;

  bindRealGameEvents(challenge, game);
}

function bindRealGameEvents(challenge, game) {
  if (challenge.mode === "word_builder") {
    realGameArena.querySelectorAll(".letter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.letterIndex);
        if (Number.isNaN(idx)) return;
        challenge.picked.push(challenge.letters[idx]);
        renderRealGame();
      });
    });
    document.getElementById("clearWordBtn")?.addEventListener("click", () => {
      challenge.picked = [];
      renderRealGame();
    });
    document.getElementById("checkWordBtn")?.addEventListener("click", () => {
      const correct = challenge.picked.join("").toLowerCase() === challenge.answer.toLowerCase();
      handleRealGameRoundEnd(correct, `התשובה היא "${challenge.answer}"`);
    });
    return;
  }

  if (challenge.mode === "memory") {
    const feedback = document.getElementById("realGameFeedback");
    realGameArena.querySelectorAll(".memory-card").forEach((btn) => {
      btn.addEventListener("click", () => {
        if (realGameState.locked) return;
        const idx = Number(btn.dataset.cardIndex);
        if (Number.isNaN(idx)) return;
        if (challenge.open.includes(idx)) return;
        if (challenge.matched.includes(challenge.cards[idx].key)) return;
        challenge.open.push(idx);
        renderRealGame();
        if (challenge.open.length === 2) {
          realGameState.locked = true;
          const [a, b] = challenge.open;
          const match = challenge.cards[a].key === challenge.cards[b].key;
          setTimeout(() => {
            if (match) {
              challenge.matched.push(challenge.cards[a].key);
              if (feedback) feedback.textContent = "זוג נכון!";
            } else if (feedback) {
              feedback.textContent = "לא זוג. נסו שוב.";
            }
            challenge.open = [];
            realGameState.locked = false;
            if (challenge.matched.length >= 4) {
              handleRealGameRoundEnd(true, "סיבוב זיכרון הושלם.");
              return;
            }
            renderRealGame();
          }, 550);
        }
      });
    });
    return;
  }

  if (challenge.mode === "sentence_builder") {
    realGameArena.querySelectorAll(".letter-btn").forEach((btn) => {
      btn.addEventListener("click", () => {
        const idx = Number(btn.dataset.wordIndex);
        if (Number.isNaN(idx)) return;
        const word = challenge.words[idx];
        if (challenge.picked.includes(word)) return;
        challenge.picked.push(word);
        renderRealGame();
      });
    });
    document.getElementById("clearSentenceBtn")?.addEventListener("click", () => {
      challenge.picked = [];
      renderRealGame();
    });
    document.getElementById("checkSentenceBtn")?.addEventListener("click", () => {
      const built = `${challenge.picked.join(" ")}.`.replace("?.", "?");
      const correct = built === challenge.answer;
      handleRealGameRoundEnd(correct, `המשפט הנכון: ${challenge.answer}`);
    });
    return;
  }

  if (challenge.mode === "typing" || challenge.mode === "vowel_fill") {
    document.getElementById("checkTypingBtn")?.addEventListener("click", () => {
      const input = document.getElementById("typingInput");
      if (!input) return;
      const value = input.value.trim().toLowerCase();
      const correct = value === challenge.answer.toLowerCase();
      handleRealGameRoundEnd(correct, `התשובה הנכונה: ${challenge.answer}`);
    });
  }
}

function handleRealGameRoundEnd(correct, explanation) {
  const feedback = document.getElementById("realGameFeedback");
  if (feedback) feedback.innerHTML = correct ? `נכון! ${renderBiDiText(explanation)}` : `לא נכון. ${renderBiDiText(explanation)}`;
  if (correct) realGameState.score += 1;

  const goNext = () => {
    if (realGameState.round === GAME_ROUNDS) {
      finishRealGame();
      return;
    }
    realGameState.round += 1;
    realGameState.challenge = buildRealGameChallenge(realGames.find((g) => g.id === realGameState.activeGameId));
    renderRealGame();
  };

  if (correct) {
    setTimeout(goNext, 850);
    return;
  }

  const next = document.createElement("button");
  next.type = "button";
  next.className = "game-next-btn";
  next.textContent = realGameState.round === GAME_ROUNDS ? "סיום משחק" : "לסיבוב הבא";
  next.addEventListener("click", goNext);
  if (feedback) {
    feedback.after(next);
  } else {
    realGameArena.append(next);
  }
}

function finishRealGame() {
  const game = realGames.find((item) => item.id === realGameState.activeGameId);
  if (!game) return;
  const best = realGameState.bestScores[game.id] || 0;
  if (realGameState.score > best) {
    realGameState.bestScores[game.id] = realGameState.score;
    persistGameScores(realGameState.bestScores);
  }
  renderRealGamesCatalog();
  realGameArena.innerHTML = `
    <div class="stage-complete">
      <div class="success-mark">🎯</div>
      <h2 class="stage-title">סיימת את המשחק: ${escapeHtml(game.title)}</h2>
      <p class="question">תוצאה: <strong>${realGameState.score}</strong> מתוך <strong>${GAME_ROUNDS}</strong></p>
      <button type="button" class="game-next-btn" id="replayRealGameBtn">שחק שוב</button>
    </div>
  `;
  document.getElementById("replayRealGameBtn")?.addEventListener("click", () => startRealGame(game.id));
}

function pickRandom(items) {
  return items[Math.floor(Math.random() * items.length)];
}

function shuffleRandom(items) {
  const arr = [...items];
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function loadGameScores() {
  try {
    const raw = localStorage.getItem(GAME_SCORES_KEY);
    if (!raw) return {};
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object") return {};
    return parsed;
  } catch {
    return {};
  }
}

function persistGameScores(scores) {
  localStorage.setItem(GAME_SCORES_KEY, JSON.stringify(scores));
}

function createInitialState() {
  return {
    stageIndex: 0,
    stageProgress: stages.map(() => 0),
    completedStages: stages.map(() => false),
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
      typeof parsed.answeredCount !== "number" ||
      typeof parsed.score !== "number" ||
      !Array.isArray(parsed.stageProgress) ||
      !Array.isArray(parsed.completedStages)
    ) {
      return fallback;
    }

    if (parsed.stageIndex < 0 || parsed.stageIndex >= stages.length) return fallback;
    if (parsed.stageProgress.length !== stages.length || parsed.completedStages.length !== stages.length) return fallback;
    for (let i = 0; i < stages.length; i += 1) {
      if (typeof parsed.stageProgress[i] !== "number") return fallback;
      if (parsed.stageProgress[i] < 0 || parsed.stageProgress[i] >= stages[i].questions.length) return fallback;
      if (typeof parsed.completedStages[i] !== "boolean") return fallback;
    }
    if (parsed.answeredCount < 0 || parsed.answeredCount > totalQuestions) return fallback;

    return {
      stageIndex: parsed.stageIndex,
      stageProgress: parsed.stageProgress,
      completedStages: parsed.completedStages,
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

function isMostlyEnglish(text) {
  return /[A-Za-z]/.test(text);
}

function renderBiDiText(text) {
  const safe = escapeHtml(text);
  if (isMostlyEnglish(text)) {
    return `<span class="ltr-text" dir="ltr">${safe}</span>`;
  }
  return `<span class="rtl-text" dir="rtl">${safe}</span>`;
}

function showShareHint(message) {
  if (shareHint) shareHint.textContent = message;
}

function openWhatsAppWithText(text) {
  const encoded = encodeURIComponent(text);
  const appLink = `whatsapp://send?text=${encoded}`;
  const webLink = `https://wa.me/?text=${encoded}`;

  window.location.href = appLink;
  setTimeout(() => {
    if (document.visibilityState === "visible") {
      window.location.href = webLink;
    }
  }, 700);
}

function render() {
  renderStageMap();

  if (state.finished) {
    renderFinal();
    return;
  }

  const currentStage = stages[state.stageIndex];
  const currentQuestionIndex = state.stageProgress[state.stageIndex];
  stageLabel.textContent = String(state.stageIndex + 1);
  stageQuestionTotalLabel.textContent = String(currentStage.questions.length);
  stageQuestionLabel.textContent = String(Math.min(currentQuestionIndex + 1, currentStage.questions.length));
  scoreLabel.textContent = String(state.score);
  progressFill.style.width = `${Math.min(100, (state.answeredCount / totalQuestions) * 100)}%`;

  if (state.view === "stageComplete") {
    renderStageComplete();
    return;
  }

  renderQuestion();
}

function renderQuestion() {
  const stage = stages[state.stageIndex];
  const questionIndex = state.stageProgress[state.stageIndex];
  const question = stage.questions[questionIndex];
  pendingAnswer = null;

  stageContainer.innerHTML = `
    <h2 class="stage-title">${stage.title}</h2>
    <p class="question">${renderBiDiText(question.prompt)}</p>
    <div class="option-grid">
      ${question.options
        .map(
          (option, optionIndex) =>
            `<button type="button" class="option-btn" data-option-index="${optionIndex}">${renderBiDiText(option)}</button>`
        )
        .join("")}
    </div>
    <p id="feedback" class="feedback"></p>
  `;

  const buttons = stageContainer.querySelectorAll(".option-btn");
  const feedback = document.getElementById("feedback");

  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      if (pendingAnswer) return;

      const picked = question.options[Number(button.dataset.optionIndex)];
      const correct = picked === question.answer;

      buttons.forEach((b) => {
        b.disabled = true;
        const optionAtIndex = question.options[Number(b.dataset.optionIndex)];
        if (optionAtIndex === question.answer) b.classList.add("correct");
      });

      if (!correct) button.classList.add("wrong");

      pendingAnswer = {
        points: correct ? question.points : 0,
      };

      if (correct) {
        feedback.innerHTML = `כל הכבוד! ${renderBiDiText(question.explanation)}`;
        feedback.className = "feedback good";
        setTimeout(() => advanceStageQuestion(), 800);
      } else {
        feedback.innerHTML = `לא נכון. התשובה הנכונה היא ${renderBiDiText(question.answer)}. ${renderBiDiText(question.explanation)}`;
        feedback.className = "feedback bad";
        addNextButton();
      }
    });
  });
}

function advanceStageQuestion() {
  if (!pendingAnswer) return;

  const stage = stages[state.stageIndex];
  const questionIndex = state.stageProgress[state.stageIndex];
  const isLastQuestionInStage = questionIndex === stage.questions.length - 1;

  state.answeredCount += 1;
  state.score += pendingAnswer.points;

  if (isLastQuestionInStage) {
    state.completedStages[state.stageIndex] = true;
    state.stageProgress[state.stageIndex] = 0;

    if (state.completedStages.every(Boolean)) {
      state.finished = true;
    } else {
      state.view = "stageComplete";
    }
  } else {
    state.stageProgress[state.stageIndex] += 1;
  }

  pendingAnswer = null;
  persistState();
  render();
}

function addNextButton() {
  if (stageContainer.querySelector(".next-btn")) return;

  const nextBtn = document.createElement("button");
  nextBtn.type = "button";
  nextBtn.className = "next-btn";
  nextBtn.textContent = "הבנתי, לשאלה הבאה";

  nextBtn.addEventListener("click", () => {
    advanceStageQuestion();
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
      <button type="button" class="next-btn" id="continueStageBtn">מעבר לשלב לא הושלם הבא</button>
    </div>
  `;

  document.getElementById("continueStageBtn").addEventListener("click", () => {
    const nextStage = state.completedStages.findIndex((isDone) => !isDone);
    if (nextStage === -1) {
      state.finished = true;
      persistState();
      render();
      return;
    }
    state.stageIndex = nextStage;
    state.view = "question";
    persistState();
    render();
  });
}

function renderFinal() {
  renderStageMap();
  stageLabel.textContent = String(stages.length);
  stageQuestionLabel.textContent = String(stages[stages.length - 1].questions.length);
  stageQuestionTotalLabel.textContent = String(stages[stages.length - 1].questions.length);
  scoreLabel.textContent = String(state.score);
  progressFill.style.width = "100%";

  stageContainer.innerHTML = `
    <div class="stage-complete">
      <div class="success-mark">🏆</div>
      <h2 class="stage-title">אלופים! סיימתם ${totalQuestions} שאלות!</h2>
      <p class="question">צברתם <strong>${state.score}</strong> נקודות במסלול המלא.</p>
      <p class="question">לחצו על "שיתוף בוואטסאפ" כדי לשתף את ההתקדמות בתמונה מעוצבת.</p>
    </div>
  `;
}

function renderStageMap() {
  const completedCount = state.completedStages.filter(Boolean).length;
  const remainingCount = stages.length - completedCount;
  completedCountLabel.textContent = String(completedCount);
  remainingCountLabel.textContent = String(remainingCount);

  const byTopic = new Map();
  stages.forEach((stage, index) => {
    if (!byTopic.has(stage.topic)) byTopic.set(stage.topic, []);
    byTopic.get(stage.topic).push({ ...stage, index });
  });

  stageMap.innerHTML = [...byTopic.entries()]
    .map(([topic, topicStages]) => {
      const stageButtons = topicStages
        .map((stage) => {
          const isDone = state.completedStages[stage.index];
          const isCurrent = state.stageIndex === stage.index && !state.finished;
          const statusClass = isDone ? "done" : "todo";
          const currentClass = isCurrent ? "current" : "";
          const statusText = isDone ? "הושלם" : "לא הושלם";
          return `<button type="button" class="stage-jump-btn ${statusClass} ${currentClass}" data-stage-index="${stage.index}">שלב ${stage.index + 1}: ${statusText}</button>`;
        })
        .join("");
      return `<div class="topic-group"><p class="topic-title">${escapeHtml(topic)}</p><div class="topic-stages">${stageButtons}</div></div>`;
    })
    .join("");

  stageMap.querySelectorAll(".stage-jump-btn").forEach((button) => {
    button.addEventListener("click", () => {
      const nextIndex = Number(button.dataset.stageIndex);
      if (Number.isNaN(nextIndex)) return;
      jumpToStage(nextIndex);
    });
  });
}

function jumpToStage(index) {
  if (index < 0 || index >= stages.length) return;
  state.stageIndex = index;
  state.view = state.completedStages[index] ? "stageComplete" : "question";
  state.finished = false;
  persistState();
  render();
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
