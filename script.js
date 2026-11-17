
const questions = [
    {
        icon: "🧬",
        category: "KIMYOVIY ELEMENT",
        question: "Suvning kimyoviy formulasi qaysi?",
        answers: ["CO2", "H2O", "O2", "NaCl"],
        correct: "H2O"
    },
    {
        icon: "⚛️",
        category: "ELEMENTLAR",
        question: "Oltinning kimyoviy belgisi qaysi?",
        answers: ["Ag", "Au", "Fe", "Cu"],
        correct: "Au"
    },
    {
        icon: "🧪",
        category: "KIMYOVIY FORMULA",
        question: "Osh tuzining formulasi qaysi?",
        answers: ["HCl", "NaOH", "NaCl", "KCl"],
        correct: "NaCl"
    },
    {
        icon: "💨",
        category: "ELEMENTLAR",
        question: "Kislorodning belgisi qaysi?",
        answers: ["O", "N", "C", "H"],
        correct: "O"
    },
    {
        icon: "🔬",
        category: "ATOM",
        question: "Atom yadrosida qaysi zarrachalar bo‘ladi?",
        answers: [
            "Elektron va proton",
            "Proton va neytron",
            "Faqat elektron",
            "Faqat neytron"
        ],
        correct: "Proton va neytron"
    },
    {
        icon: "🌫️",
        category: "GAZLAR",
        question: "Karbonat angidrid formulasi qaysi?",
        answers: ["CO2", "CO", "O2", "H2"],
        correct: "CO2"
    },
    {
        icon: "🧂",
        category: "ELEMENTLAR",
        question: "Temirning kimyoviy belgisi qaysi?",
        answers: ["T", "Te", "Fe", "Ir"],
        correct: "Fe"
    },
    {
        icon: "💧",
        category: "MODDALAR",
        question: "Suv necha xil kimyoviy elementdan tashkil topgan?",
        answers: ["1", "2", "3", "4"],
        correct: "2"
    },
    {
        icon: "🧪",
        category: "KIMYOVIY FORMULA",
        question: "Kislorod gazi formulasi qaysi?",
        answers: ["O", "O2", "O3", "H2O"],
        correct: "O2"
    },
    {
        icon: "⚗️",
        category: "ELEMENTLAR",
        question: "Vodorodning belgisi qaysi?",
        answers: ["V", "H", "He", "Hy"],
        correct: "H"
    },
    {
        icon: "🔬",
        category: "ATOM",
        question: "Elektron qanday zaryadga ega?",
        answers: ["Musbat", "Manfiy", "Neytral", "Zaryadsiz emas"],
        correct: "Manfiy"
    },
    {
        icon: "💎",
        category: "ELEMENTLAR",
        question: "Olmosning asosiy tarkibiy elementi qaysi?",
        answers: ["Temir", "Uglerod", "Oltin", "Kislorod"],
        correct: "Uglerod"
    },
    {
        icon: "🧫",
        category: "MODDALAR",
        question: "Havoda eng ko‘p uchraydigan gaz qaysi?",
        answers: ["Kislorod", "Vodorod", "Azot", "Karbonat angidrid"],
        correct: "Azot"
    },
    {
        icon: "⚗️",
        category: "KIMYOVIY FORMULA",
        question: "Ammiak formulasi qaysi?",
        answers: ["NH3", "CH4", "HCl", "H2SO4"],
        correct: "NH3"
    },
    {
        icon: "🧬",
        category: "ELEMENTLAR",
        question: "Kumushning kimyoviy belgisi qaysi?",
        answers: ["Au", "Ag", "Cu", "Fe"],
        correct: "Ag"
    }
];

let score = 0;
let lives = 5;
let current = 0;
let time = 30;
let timerInterval;
let locked = false;

function startGame() {
    score = 0;
    lives = 5;
    current = 0;

    document.getElementById("score").textContent = score;
    document.getElementById("lives").textContent = lives;

    document.getElementById("home").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("game").classList.remove("hidden");

    showQuestion();
}

function showQuestion() {
    clearInterval(timerInterval);
    locked = false;

    if (current >= questions.length || lives <= 0) {
        endGame();
        return;
    }

    const q = questions[current];

    document.getElementById("level").textContent =
        ` ${current + 1}-BOSQICH`;

    document.getElementById("questionIcon").textContent = q.icon;
    document.getElementById("category").textContent = q.category;
    document.getElementById("question").textContent = q.question;
    document.getElementById("feedback").textContent = "";

    const answersBox = document.getElementById("answers");
    answersBox.innerHTML = "";

    q.answers.forEach(answer => {
        const btn = document.createElement("button");
        btn.className = "answer";
        btn.textContent = answer;

        btn.onclick = () => checkAnswer(btn, answer);

        answersBox.appendChild(btn);
    });

    time = 30;
    updateTimer();
    timerInterval = setInterval(countdown, 1000);
}

function checkAnswer(button, answer) {
    if (locked) return;

    locked = true;
    clearInterval(timerInterval);

    const q = questions[current];
    const feedback = document.getElementById("feedback");
    const buttons = document.querySelectorAll(".answer");

    buttons.forEach(btn => {
        btn.disabled = true;

        if (btn.textContent === q.correct) {
            btn.classList.add("correct");
        }
    });

    if (answer === q.correct) {
        score += 10;
        document.getElementById("score").textContent = score;
        feedback.textContent = "✅ To‘g‘ri! +10 ball";
        feedback.style.color = "#00ffa2";
    } else {
        button.classList.add("wrong");
        lives--;
        document.getElementById("lives").textContent = lives;
        feedback.textContent = "❌ Noto‘g‘ri! To‘g‘ri javob: " + q.correct;
        feedback.style.color = "#ff6485";
    }

    current++;
    updateProgress();

    setTimeout(showQuestion, 1500);
}

function countdown() {
    time--;
    updateTimer();

    if (time <= 0) {
        clearInterval(timerInterval);

        if (!locked) {
            locked = true;
            lives--;
            document.getElementById("lives").textContent = lives;

            const feedback = document.getElementById("feedback");
            feedback.textContent = "⏰ Vaqt tugadi!";
            feedback.style.color = "#ff6485";

            document.querySelectorAll(".answer").forEach(btn => {
                btn.disabled = true;
            });

            current++;
            updateProgress();
            setTimeout(showQuestion, 1500);
        }
    }
}

function updateTimer() {
    document.getElementById("timer").textContent = time;
    document.getElementById("progressBar").style.width =
        (time / 30 * 100) + "%";
}

function updateProgress() {
    const percent = (current / questions.length) * 100;
    document.getElementById("progressBar").style.width = percent + "%";
}

function endGame() {
    clearInterval(timerInterval);

    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.remove("hidden");

    document.getElementById("finalScore").textContent = score;

    let message = "";

    if (score >= 120) {
        message = "🌟 Ajoyib! Siz kimyo bilimdonisiz!";
    } else if (score >= 70) {
        message = "👏 Juda yaxshi natija!";
    } else {
        message = "📚 Yana mashq qiling! Siz uddalaysiz!";
    }

    document.getElementById("resultText").textContent = message;
}

function goHome() {
    clearInterval(timerInterval);

    document.getElementById("game").classList.add("hidden");
    document.getElementById("result").classList.add("hidden");
    document.getElementById("home").classList.remove("hidden");
}
