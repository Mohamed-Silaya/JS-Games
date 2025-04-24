document.addEventListener("DOMContentLoaded", () => {
  // DOM Elements
  var selectCellsNumber = document.querySelector(".select-cells-number")
  var playground = document.querySelector(".playground")
  var model = document.querySelector(".model")
  var modelBtn = document.querySelector(".model-btn")
  var wrongAttempts = document.querySelector(".wrong")
  var restartBtn = document.querySelector(".restart-btn")
  var timerElement = document.querySelector(".timer")
  var modelTime = document.querySelector(".model-time")
  var modelContent = model.querySelector(".model-content")
  var playerNameInput = document.querySelector(".player-name")
  var highScoresBtn = document.createElement("button")
  var modeSelector = document.querySelector(".mode-selector")
  
  // Game Variables
  var cards = []
  var attempts = {
    correct: 0,
    wrong: 0,
    click: 0,
  }
  var prevCard = null
  var startClock = true
  var timeInterval
  var currentGame = null
  var prevGame = null
  var scores = JSON.parse(localStorage.getItem("memoryGameScores")) || []
  var gameMode = modeSelector.value // Get initial mode
  
  // Add high scores button if it doesn't exist
  if (!document.querySelector(".high-scores-btn")) {
    highScoresBtn.className = "btn high-scores-btn"
    highScoresBtn.textContent = "View High Scores"
    document.querySelector(".features").appendChild(highScoresBtn)
  } else {
    highScoresBtn = document.querySelector(".high-scores-btn")
  }
  
  // Initialize game
  function initGame(cardsNumber) {
    // Reset game state
    playground.innerHTML = ""
    attempts = { correct: 0, wrong: 0, click: 0 }
    prevCard = null
    startClock = true
    if (timeInterval) clearInterval(timeInterval)
    timerElement.innerHTML = "<span>00</span>min <span>00</span>sec"
  
    // Create cards
    var cardsIndex = [] 
    for (var i = 1; i <= cardsNumber; i++) {
      if (i <= cardsNumber / 2) {
        cardsIndex.push(i);
      } else {
        cardsIndex.push(i - cardsNumber / 2);
      }
    }
    cardsIndex = shuffleArray(cardsIndex)
  
    // Set up playground grid
    var gridSize = Math.sqrt(cardsNumber)
    playground.style.gridTemplateRows = "repeat(" + gridSize + ", 1fr)"
    playground.style.gridTemplateColumns = "repeat(" + gridSize + ", 1fr)"
  
    // Create card elements based on mode [fruit/ numbers]
    cards = []
    gameMode = modeSelector.value
  
    for (var j = 0; j < cardsIndex.length; j++) {
    var index = cardsIndex[j]
    var card = document.createElement("div")
    card.className = "card"
    card.setAttribute("data-index", index)
  
    // Create card inner container for flip effect
    var cardInner = document.createElement("div")
    cardInner.className = "card-inner"
  
    // Create front and back of card
    var cardFront = document.createElement("div")
    cardFront.className = "card-front"
  
    var cardBack = document.createElement("div")
    cardBack.className = "card-back"
  
    // Add content based on game mode
    if (gameMode === "numbers") {
      var number = document.createElement("div")
      number.className = "number"
      number.textContent = index
      cardFront.appendChild(number)
    } else {
      var img = document.createElement("img")
      img.src = "images/icon-" + index + ".png"
      cardFront.appendChild(img)
    }
  
    // Assemble the card
    cardInner.appendChild(cardFront)
    cardInner.appendChild(cardBack)
    card.appendChild(cardInner)
  
    playground.appendChild(card)
    card.addEventListener("click", handleCardClick)
    cards.push(card)
    }
  
    currentGame = {
    stopTime: () => {
      if (timeInterval) clearInterval(timeInterval)
    },
    }
  }
  
  // Shuffle array
  function shuffleArray(array) {
    for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1))
    var temp = array[i]
    array[i] = array[j]
    array[j] = temp
    }
    return array
  }
  
  // Handle card click
  function handleCardClick() {
    if (this.classList.contains("pause") || this.classList.contains("stop")) return
  
    if (startClock) {
    setTime()
    startClock = false
    }
  
    attempts.click++
    this.classList.add("change")
  
    if (attempts.click === 2) {
    // Disable all cards temporarily
    for (var i = 0; i < cards.length; i++) {
      cards[i].classList.add("pause")
    }
  
    setTimeout(() => {
      for (var i = 0; i < cards.length; i++) {
      cards[i].classList.remove("pause")
      }
    }, 1000)
  
    // Check for match
    if (prevCard.dataset.index === this.dataset.index) {
      attempts.correct++
      this.classList.add("stop")
      prevCard.classList.add("stop")
    } else {
      attempts.wrong++;
      ((card, prevCard) => {
      setTimeout(() => {
        card.classList.remove("change")
        prevCard.classList.remove("change")
      }, 1000)
      })(this, prevCard)
    }
  
    attempts.click = 0
    checkGameEnd()
    } else {
    prevCard = this
    }
  }
  
  // Check if game has ended
  function checkGameEnd() {
    if (attempts.correct === Number.parseInt(selectCellsNumber.value) / 2) {
    startClock = true
    if (timeInterval) clearInterval(timeInterval)
  
    // Save score
    var playerName = playerNameInput.value.trim() || "Anonymous"
    var score = {
      name: playerName,
      time: timerElement.textContent,
      wrongAttempts: attempts.wrong,
      date: new Date().toISOString().split("T")[0],
      gridSize: selectCellsNumber.value,
      mode: gameMode,
    }
  
    scores.push(score)
    scores.sort(
      (a, b) =>
      a.wrongAttempts - b.wrongAttempts ||
      Number.parseInt(a.time.replace(/\D/g, "")) - Number.parseInt(b.time.replace(/\D/g, "")),
    )
  
    // Keep only top 10 scores
    if (scores.length > 10) {
      scores = scores.slice(0, 10)
    }
  
    localStorage.setItem("memoryGameScores", JSON.stringify(scores))
  
    // Show model with results
    model.style.cssText = "visibility: visible; opacity: 1;"
    var timerClone = timerElement.cloneNode(true)
    modelTime.innerHTML = "<span>Time Spent: </span>"
    modelTime.appendChild(timerClone)
    wrongAttempts.textContent = attempts.wrong
  
    modelBtn.onclick = () => {
      location.reload()
    }
    }
  }
  
  // Set up timer
  function setTime() {
    var int = 1
    timeInterval = setInterval(() => {
    var seconds = int % 60
    timerElement.children[1].innerHTML = seconds > 9 ? seconds : "0" + seconds
    var minutes = Math.floor(int / 60)
    timerElement.children[0].innerHTML = minutes > 9 ? minutes : "0" + minutes
    int++
    }, 1000)
  }
  
  // Restart game handler
  function setupRestartGame() {
    restartBtn.onclick = () => {
    model.style.cssText = "visibility: visible; opacity: 1; transition: opacity .5s;"
    modelContent.innerHTML =
      "<h2 class='model-text'>Do you want to quit the game?</h2>" +
      "<div>" +
      "<button class='btn yes-btn'>Yes</button>" +
      "<button class='btn cancel-btn'>Cancel</button>" +
      "</div>"
  
    modelContent.querySelector(".cancel-btn").onclick = () => {
      model.style.cssText = "visibility: hidden; opacity: 0; transition: opacity .5s;"
    }
  
    modelContent.querySelector(".yes-btn").onclick = () => {
      location.reload()
    }
    }
  }
  
  // Show high scores
  function showHighScores() {
    var scoresModel = document.createElement("div")
    scoresModel.className = "model"
    scoresModel.innerHTML =
    '<div class="model-content">' +
    '<h2 class="model-heading">High Scores</h2>' +
    '<div class="scores-list">' +
    '<div class="score-header">' +
    "<span>Name</span>" +
    "<span>Mode</span>" +
    "<span>Grid</span>" +
    "<span>Time</span>" +
    "<span>Wrong</span>" +
    "<span>Date</span>" +
    "</div>" +
    "</div>" +
    '<button class="btn close-btn">Close</button>' +
    "</div>"
  
    document.body.appendChild(scoresModel)
    var scoresList = scoresModel.querySelector(".scores-list")
  
    // Populate scores
    for (var i = 0; i < scores.length; i++) {
    var score = scores[i]
    var scoreElement = document.createElement("div")
    scoreElement.className = "score-item"
    scoreElement.innerHTML =
      "<span>" +
      score.name +
      "</span>" +
      "<span>" +
      score.mode +
      "</span>" +
      "<span>" +
      score.gridSize +
      "</span>" +
      "<span>" +
      score.time +
      "</span>" +
      "<span>" +
      score.wrongAttempts +
      "</span>" +
      "<span>" +
      score.date +
      "</span>"
    scoresList.appendChild(scoreElement)
    }
  
    scoresModel.style.cssText = "visibility: visible; opacity: 1;"
    scoresModel.querySelector(".close-btn").onclick = () => {
    scoresModel.remove()
    }
  }
  
  // Handle grid size change
   selectCellsNumber.addEventListener("change", (e) => {
    playground.innerHTML = ""
  
    if (currentGame && currentGame.stopTime) {
    currentGame.stopTime()
    }
    timerElement.innerHTML = "<span>00</span>min <span>00</span>sec"
  
    if (prevGame && prevGame.stopTime) {
    prevGame.stopTime()
    }
    if (prevGame && prevGame.timerElement) {
    prevGame.timerElement.innerHTML = "<span>00</span>min <span>00</span>sec"
    }
  
    initGame(Number.parseInt(e.target.value))
    prevGame = currentGame
  })
  
  // Handle mode change
  modeSelector.addEventListener("change", () => {
    playground.innerHTML = ""
    if (currentGame && currentGame.stopTime) {
    currentGame.stopTime()
    }
    timerElement.innerHTML = "<span>00</span>min <span>00</span>sec"
    initGame(Number.parseInt(selectCellsNumber.value))
  })
  
  // Initialize the game
  initGame(Number.parseInt(selectCellsNumber.value))
  setupRestartGame()
  
  // High scores button click
  highScoresBtn.addEventListener("click", showHighScores)
  })
