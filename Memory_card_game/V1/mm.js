// Main game variables
const cardsContainer = document.querySelector(".playground")
const gridSizeSelector = document.querySelector(".chose_card_num")
const restartBtn = document.querySelector(".restart_btn")
const modalRestartBtn = document.querySelector(".model_btn")
const gameModal = document.querySelector(".model")
const wrongTriesElement = document.querySelector(".wrong")
const timerMinutes = document.querySelector(".timer span:first-child")
const timerSeconds = document.querySelector(".timer span:last-child")
const modalTimeElement = document.querySelector(".model_time")

// Game state variables
let cards = []
let flippedCards = []
let matchedPairs = 0
let wrongTries = 0
let isPlaying = false
let timerInterval
let startTime
let gridSize = 4 // Default 4x4 grid

// Card images - using emoji characters for simplicity
const emojis = [
  "🐶",
  "🐱",
  "🐭",
  "🐹",
  "🐰",
  "🦊",
  "🐻",
  "🐼",
  "🐨",
  "🐯",
  "🦁",
  "🐮",
  "🐷",
  "🐸",
  "🐵",
  "🐔",
  "🐧",
  "🐦",
  "🐤",
  "🦆",
  "🦅",
  "🦉",
  "🦇",
  "🐺",
  "🐗",
  "🐴",
  "🦄",
  "🐝",
  "🐛",
  "🦋",
  "🐌",
  "🐞",
]

// Initialize the game
function initGame() {
  // Reset game state
  cards = []
  flippedCards = []
  matchedPairs = 0
  wrongTries = 0
  isPlaying = true
  wrongTriesElement.textContent = wrongTries

  // Clear the timer
  clearInterval(timerInterval)
  timerMinutes.textContent = "00"
  timerSeconds.textContent = "00"

  // Hide the modal if it's visible
  gameModal.style.display = "none"

  // Get grid size from selector
  const selectedSize = gridSizeSelector.value
  if (selectedSize === "4*4") gridSize = 4
  else if (selectedSize === "6*6") gridSize = 6
  else if (selectedSize === "8*8") gridSize = 8

  // Create cards
  createCards()

  // Start the timer
  startTimer()
}

// Create cards based on grid size
function createCards() {
  // Clear the container
  cardsContainer.innerHTML = ""

  // Calculate total cards (pairs)
  const totalPairs = Math.floor((gridSize * gridSize) / 2)

  // Create array of pairs
  let cardValues = []
  for (let i = 0; i < totalPairs; i++) {
    cardValues.push(emojis[i])
    cardValues.push(emojis[i])
  }

  // Shuffle the array
  cardValues = shuffleArray(cardValues)

  // Set grid template based on size
  cardsContainer.style.gridTemplateColumns = `repeat(${gridSize}, 1fr)`
  cardsContainer.style.gap = "10px" // Explicitly set gap to 10px

  // Create card elements
  cardValues.forEach((value, index) => {
    const card = document.createElement("div")
    card.classList.add("card")
    card.dataset.value = value
    card.dataset.index = index

    // Create front and back of card
    const cardFront = document.createElement("div")
    cardFront.classList.add("card-front")

    const cardBack = document.createElement("div")
    cardBack.classList.add("card-back")
    cardBack.textContent = value

    // Add front and back to card
    card.appendChild(cardFront)
    card.appendChild(cardBack)

    // Add click event
    card.addEventListener("click", flipCard)

    // Add to container
    cardsContainer.appendChild(card)

    // Add to cards array
    cards.push(card)
  })
}

// Shuffle array (Fisher-Yates algorithm)
function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[array[i], array[j]] = [array[j], array[i]]
  }
  return array
}

// Handle card flip
function flipCard() {
  // Ignore if game not active or card already flipped/matched
  if (!isPlaying || this.classList.contains("flipped") || this.classList.contains("matched")) {
    return
  }

  // Ignore if two cards already flipped
  if (flippedCards.length === 2) {
    return
  }

  // Flip the card
  this.classList.add("flipped")
  flippedCards.push(this)

  // Check for match if two cards flipped
  if (flippedCards.length === 2) {
    checkForMatch()
  }
}

// Check if flipped cards match
function checkForMatch() {
  const [card1, card2] = flippedCards

  if (card1.dataset.value === card2.dataset.value) {
    // Cards match
    setTimeout(() => {
      card1.classList.add("matched")
      card2.classList.add("matched")
      flippedCards = []

      // Increment matched pairs
      matchedPairs++

      // Check if game is complete
      if (matchedPairs === cards.length / 2) {
        endGame()
      }
    }, 500)
  } else {
    // Cards don't match
    setTimeout(() => {
      card1.classList.remove("flipped")
      card2.classList.remove("flipped")
      flippedCards = []

      // Increment wrong tries
      wrongTries++
      wrongTriesElement.textContent = wrongTries
    }, 1000)
  }
}

// Start the timer
function startTimer() {
  startTime = new Date()

  timerInterval = setInterval(() => {
    const currentTime = new Date()
    const elapsedTime = Math.floor((currentTime - startTime) / 1000)

    const minutes = Math.floor(elapsedTime / 60)
    const seconds = elapsedTime % 60

    timerMinutes.textContent = minutes < 10 ? `0${minutes}` : minutes
    timerSeconds.textContent = seconds < 10 ? `0${seconds}` : seconds
  }, 1000)
}

// End the game
function endGame() {
  isPlaying = false
  clearInterval(timerInterval)

  // Calculate final time
  const endTime = new Date()
  const totalSeconds = Math.floor((endTime - startTime) / 1000)
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60

  // Update modal
  modalTimeElement.innerHTML = `<span>Time Spent: ${minutes < 10 ? "0" + minutes : minutes}min ${seconds < 10 ? "0" + seconds : seconds}sec</span>`
  wrongTriesElement.textContent = wrongTries

  // Save score to local storage
  const currentScore = {
    time: totalSeconds,
    wrongTries,
    gridSize: gridSizeSelector.value,
    date: new Date().toISOString(),
  }

  const scores = saveScore(totalSeconds, wrongTries, gridSizeSelector.value)

  // Show modal with scores
  setTimeout(() => {
    displayScores(scores, currentScore)
    gameModal.style.display = "flex"
  }, 500)
}

// Save score to local storage
function saveScore(time, wrongTries, gridSizeStr) {
  // Get existing scores or initialize empty array
  let scores = JSON.parse(localStorage.getItem("memoryGameScores")) || []

  // Create new score object
  const newScore = {
    time,
    wrongTries,
    gridSize: gridSizeStr,
    date: new Date().toISOString(),
  }

  // Add new score
  scores.push(newScore)

  // Sort scores by time (ascending)
  scores.sort((a, b) => a.time - b.time)

  // Keep only top 10 scores
  if (scores.length > 10) {
    scores = scores.slice(0, 10)
  }

  // Save back to local storage
  localStorage.setItem("memoryGameScores", JSON.stringify(scores))

  // Return all scores
  return scores
}

// Format time from seconds to MM:SS
function formatTime(totalSeconds) {
  const minutes = Math.floor(totalSeconds / 60)
  const seconds = totalSeconds % 60
  return `${minutes < 10 ? "0" + minutes : minutes}:${seconds < 10 ? "0" + seconds : seconds}`
}

// Display scores in the modal
function displayScores(scores, currentScore) {
  // Create scores HTML
  let scoresHTML =
    '<h3>Top Scores</h3><table class="scores-table"><tr><th>Grid</th><th>Time</th><th>Wrong Tries</th></tr>'

  scores.forEach((score, index) => {
    const isCurrentScore =
      currentScore &&
      score.time === currentScore.time &&
      score.wrongTries === currentScore.wrongTries &&
      score.date === currentScore.date

    scoresHTML += `<tr class="${isCurrentScore ? "current-score" : ""}">
                    <td>${score.gridSize}</td>
                    <td>${formatTime(score.time)}</td>
                    <td>${score.wrongTries}</td>
                  </tr>`
  })

  scoresHTML += "</table>"

  // Add scores section to modal if it doesn't exist
  if (!document.querySelector(".scores-section")) {
    const scoresSection = document.createElement("div")
    scoresSection.classList.add("scores-section")
    document.querySelector(".model_content").appendChild(scoresSection)
  }

  // Update scores section
  document.querySelector(".scores-section").innerHTML = scoresHTML
}

// Event listeners
gridSizeSelector.addEventListener("change", initGame)
restartBtn.addEventListener("click", initGame)
modalRestartBtn.addEventListener("click", initGame)

// Initialize game on load
window.addEventListener("load", initGame)

// Add CSS for cards (since CSS was cut off in your message)
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
  .playground {
    display: grid;
    gap: 10px;
    margin: 20px 0;
  }
  
  .card {
    position: relative;
    height: 80px;
    cursor: pointer;
    transform-style: preserve-3d;
    transition: transform 0.5s;
  }
  
  .card.flipped {
    transform: rotateY(180deg);
  }
  
  .card-front, .card-back {
    position: absolute;
    width: 100%;
    height: 100%;
    backface-visibility: hidden;
    display: flex;
    justify-content: center;
    align-items: center;
    border-radius: 5px;
  }
  
  .card-front {
    background-color: #27548A;
  }
  
  .card-back {
    background-color: #DDA853;
    transform: rotateY(180deg);
    font-size: 2rem;
  }
  
  .card.matched .card-back {
    background-color: #183B4E;
    color: white;
  }
  
  .model {
    display: none;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.7);
    justify-content: center;
    align-items: center;
    z-index: 10;
  }
  
  .model_content {
    background-color: #F5EEDC;
    padding: 20px;
    border-radius: 10px;
    text-align: center;
    width: 80%;
    max-width: 400px;
  }
  
  .btn {
    background-color: #27548A;
    color: white;
    border: none;
    padding: 10px 20px;
    border-radius: 5px;
    cursor: pointer;
    margin-top: 15px;
  }
  
  .btn:hover {
    background-color: #183B4E;
  }
  
  .features {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 15px;
  }
  
  .timer {
    font-size: 1.2rem;
  }
</style>
`,
)

// Add CSS for scores table
document.head.insertAdjacentHTML(
  "beforeend",
  `
<style>
  .scores-section {
    margin-top: 15px;
    max-height: 200px;
    overflow-y: auto;
  }
  
  .scores-table {
    width: 100%;
    border-collapse: collapse;
    margin-top: 10px;
  }
  
  .scores-table th, .scores-table td {
    padding: 5px;
    text-align: center;
    border-bottom: 1px solid #ddd;
  }
  
  .scores-table th {
    background-color: #27548A;
    color: white;
  }
  
  .current-score {
    background-color: rgba(221, 168, 83, 0.3);
    font-weight: bold;
  }
</style>
`,
)

