function launchGame(game) {
  alert(`Launching ${game.toUpperCase()}... (to be implemented)`);
}

function startVoice() {
  const recognition = new (window.SpeechRecognition || window.webkitSpeechRecognition)();
  recognition.lang = "en-US";
  recognition.start();
  recognition.onresult = (event) => {
    const transcript = event.results[0][0].transcript;
    const textarea = document.getElementById("note");
    textarea.value += transcript + " ";
  };
}

// Save note to Firebase
function saveNote() {
  const note = document.getElementById("note").value;
  db.ref("notes/notedpad").set({
    content: note,
    timestamp: Date.now()
  });
  alert("Note saved to cloud ☁️");
}

// Load note from Firebase
function loadNote() {
  db.ref("notes/notedpad").once("value").then(snapshot => {
    const data = snapshot.val();
    if (data?.content) {
      document.getElementById("note").value = data.content;
    }
  });
}

const explodeContainer = document.getElementById("explode-text");
  const headingText = "VINTAGE CLOUD";

  const neonColors = [
    "#00ffff", // cyan
    "#ff00ff", // magenta
    "#ffff00", // yellow
    "#00ff00", // lime
    "#ff4444", // red
    "#ff8800", // orange
    "#ffffff", // white
  ];

  headingText.split("").forEach((char) => {
    const span = document.createElement("span");
    span.classList.add("explode-letter");
    span.textContent = char === " " ? "\u00A0" : char;

    span.addEventListener("mouseenter", () => {
      span.style.setProperty('--dx', (Math.random() - 0.5) * 200);
      span.style.setProperty('--dy', (Math.random() - 0.5) * 200);
      span.style.setProperty('--r', (Math.random() - 0.5) * 720);

      const randomColor = neonColors[Math.floor(Math.random() * neonColors.length)];
      span.style.color = randomColor;

      span.classList.add("explode");

      setTimeout(() => {
        span.classList.remove("explode");
        span.style.color = ""; // Reset to default
      }, 400);
    });

    explodeContainer.appendChild(span);
  });