// // DOM Elements Selection
// var playground = document.querySelector('.playground');
// var gridSizeSelect = document.querySelector('.chose_card_num');
// var timerDisplay = document.querySelector('.timer');
// var wrongTriesSpan = document.querySelector('.wrong');
// var model = document.querySelector('.model');
// var modelBtn = document.querySelector('.model_btn');
// var restartBtn = document.querySelector('.restart_btn');

// // Game State Variables
// var flippedCards = [];       // Stores currently flipped cards
// var matchedPairs = 0;        // Count of successfully matched pairs
// var wrongTries = 0;          // Count of incorrect matches
// var gameTimer;               // Reference to timer interval
// var isGameStarted = false;   // Track if game is in progress
// var totalPairs;              // Total number of pairs needed to win

// /** 
//  * Generates the game grid based on selected size
//  * Creates card elements with paired numbers and shuffles them
//  *
//  */
// function generateGrid() {
//     // Get selected grid size (e.g., 4 from "4*4")
//     var size = parseInt(gridSizeSelect.value.split('*')[0]);
//     var totalCards = size * size;
//     totalPairs = totalCards / 2;  // Calculate required pairs to win

//     // Create array of numbers and duplicate for pairs
//     var numbers = Array.from({ length: totalPairs }, function(_, i) { return i + 1; });
//     var pairs = numbers.concat(numbers);
//     shuffleArray(pairs);  // Randomize card positions

//     // Clear previous grid and setup new grid layout
//     playground.innerHTML = '';
//     playground.style.display = 'grid';
//     playground.style.gridTemplateColumns = 'repeat(' + size + ', 1fr)';
//     playground.style.gap = '10px';

//     // Create card elements and add to playground
//     pairs.forEach(function(number) {
//         var card = document.createElement('div');
//         card.className = 'card';
//         // Card structure with front (number) and back (cover)
//         card.innerHTML = 
//             '<div class="front">' + number + '</div>' +
//             '<div class="back"></div>';
//         card.addEventListener('click', handleCardClick);
//         playground.appendChild(card);
//     });
// }

// /**
//  * Fisher-Yates shuffle algorithm for randomizing array
//   - The array to shuffle
//  */
// function shuffleArray(array) {
//     for (var i = array.length - 1; i > 0; i--) {
//         var j = Math.floor(Math.random() * (i + 1));
//         var temp = array[i];
//         array[i] = array[j];
//         array[j] = temp;
//     }
// }


// function handleCardClick(e) {
//     var card = e.currentTarget;
    
//     // Prevent action if: card already flipped/matched, or two cards already selected
//     if (card.classList.contains('flipped') || 
//         card.classList.contains('matched') || 
//         flippedCards.length === 2) return;

//     // Start timer on first move
//     if (!isGameStarted) {
//         startTimer();
//         isGameStarted = true;
//     }

//     // Flip card and add to flipped cards
//     card.classList.add('flipped');
//     flippedCards.push(card);

//     // When two cards are flipped
//     if (flippedCards.length === 2) {
//         var firstCard = flippedCards[0];
//         var secondCard = flippedCards[1];
//         var firstValue = firstCard.querySelector('.front').textContent;
//         var secondValue = secondCard.querySelector('.front').textContent;

//         // Check for match
//         if (firstValue === secondValue) {
//             // Successful match
//             firstCard.classList.add('matched');
//             secondCard.classList.add('matched');
//             flippedCards = [];
//             matchedPairs++;

//             // Check win condition
//             if (matchedPairs === totalPairs) {
//                 clearInterval(gameTimer);
//                 showModal();
//             }
//         } else {
//             // Failed match
//             wrongTries++;
//             wrongTriesSpan.textContent = wrongTries;
//             // Flip back after 1 second
//             setTimeout(function() {
//                 firstCard.classList.remove('flipped');
//                 secondCard.classList.remove('flipped');
//                 flippedCards = [];
//             }, 1000);
//         }
//     }
// }

// /**
//  * Starts and updates the game timer
//  */
// function startTimer() {
//     clearInterval(gameTimer);  // Clear any existing timer
//     var startTime = Date.now();  // Get initial timestamp
    
//     gameTimer = setInterval(function() {
//         var elapsed = Date.now() - startTime;
//         // Calculate minutes and seconds with leading zeros
//         var minutes = Math.floor(elapsed / 60000).toString().padStart(2, '0');
//         var seconds = Math.floor((elapsed % 60000) / 1000).toString().padStart(2, '0');
//         // Update timer display
//         timerDisplay.children[0].textContent = minutes;
//         timerDisplay.children[1].textContent = seconds;
//     }, 1000);  // Update every second
// }

// /**
//  * Displays game over modal with final stats
//  */
// function showModal() {
//     // Get current timer values
//     var minutes = timerDisplay.children[0].textContent;
//     var seconds = timerDisplay.children[1].textContent;
    
//     // Show modal and update content
//     model.style.visibility = 'visible';
//     model.style.opacity = '1';
//     document.querySelector('.model_time span').textContent = 
//         'Time Spent: ' + minutes + 'min ' + seconds + 'sec';
// }

// /**
//  * Resets game state and UI for new game
//  */
// function resetGame() {
//     // Reset game variables
//     flippedCards = [];
//     matchedPairs = 0;
//     wrongTries = 0;
//     isGameStarted = false;
    
//     // Clear timer and reset displays
//     clearInterval(gameTimer);
//     timerDisplay.children[0].textContent = '00';
//     timerDisplay.children[1].textContent = '00';
//     wrongTriesSpan.textContent = '0';
//     model.style.visibility = 'hidden';
//     model.style.opacity = '0';
    
//     // Generate new grid
//     generateGrid();
// }

// // Event Listeners
// gridSizeSelect.addEventListener('change', resetGame);  // Grid size change
// restartBtn.addEventListener('click', resetGame);      // Restart button
// modelBtn.addEventListener('click', resetGame);        // Modal restart button
(function() {
    'use strict';
  
    // Game configuration variables
    var config = {
      gridSize: '4*4',
      duration: 1000, // Card flip duration in ms
      cardsFlippedLimit: 2,
      symbols: [
        '🍎', '🍌', '🍒', '🍇', '🍊', '🍓', '🍑', '🍍', 
        '🥝', '🥥', '🍉', '🍈', '🥭', '🍋', '🥑', '🍐', 
        '🍏', '🍅', '🥦', '🥕', '🌽', '🥬', '🥒', '🌶️', 
        '🍄', '🥜', '🌰', '🍞', '🥐', '🥖', '🥨', '🥯'
      ],
      isGameRunning: false,
      timer: null,
      startTime: 0,
      flippedCards: [],
      matchedPairs: 0,
      totalPairs: 0,
      wrongTries: 0,
      // Default style settings (these can be customized by the player)
      cardStyle: {
        backgroundColor: '#fff',
        border: '2px solid #000',
        fontFamily: 'Arial, sans-serif'
      },
      timerStyle: {
        color: '#333',
        fontSize: '24px'
      },
      playAgainButtonStyle: {
        backgroundColor: '#28a745',
        color: '#fff',
        border: 'none',
        padding: '10px 20px',
        borderRadius: '5px',
        cursor: 'pointer',
        fontSize: '16px'
      }
    };
  
    // DOM elements
    var elements = {
      gridSizeSelector: document.querySelector('.chose_card_num'),
      playground: document.querySelector('.playground'),
      modal: document.querySelector('.model'),
      modalTimeSpan: document.querySelector('.model_time span'),
      wrongTriesSpan: document.querySelector('.wrong'),
      modalRestartBtn: document.querySelector('.model_btn'),
      timerMinutes: document.querySelector('.timer span:first-child'),
      timerSeconds: document.querySelector('.timer span:last-child'),
      restartBtn: document.querySelector('.restart_btn'),
      container: document.querySelector('.container'),
      features: document.querySelector('.features'),
      bestScoreDisplay: document.querySelector('.best_score') // Element for displaying best score
    };
  
    // --- Load Saved Settings & Scores ---
  
    function loadSavedSettings() {
      // Load card style settings from localStorage if available
      var savedCardStyle = localStorage.getItem('memoryGame_cardStyle');
      if (savedCardStyle) {
        try {
          config.cardStyle = JSON.parse(savedCardStyle);
        } catch(e) {
          console.error('Error parsing saved card style.', e);
        }
      }
      // Load timer style settings
      var savedTimerStyle = localStorage.getItem('memoryGame_timerStyle');
      if (savedTimerStyle) {
        try {
          config.timerStyle = JSON.parse(savedTimerStyle);
        } catch(e) {
          console.error('Error parsing saved timer style.', e);
        }
      }
      // Load play again button style settings
      var savedButtonStyle = localStorage.getItem('memoryGame_playAgainButtonStyle');
      if (savedButtonStyle) {
        try {
          config.playAgainButtonStyle = JSON.parse(savedButtonStyle);
        } catch(e) {
          console.error('Error parsing saved button style.', e);
        }
      }
    }
  
    // Save style settings to localStorage (if a UI later lets the player change them)
    function saveStyleSettings() {
      localStorage.setItem('memoryGame_cardStyle', JSON.stringify(config.cardStyle));
      localStorage.setItem('memoryGame_timerStyle', JSON.stringify(config.timerStyle));
      localStorage.setItem('memoryGame_playAgainButtonStyle', JSON.stringify(config.playAgainButtonStyle));
    }
  
    // Apply timer styles to timer elements
    function applyTimerStyles() {
      if (elements.timerMinutes && elements.timerSeconds) {
        elements.timerMinutes.style.color = config.timerStyle.color;
        elements.timerMinutes.style.fontSize = config.timerStyle.fontSize;
        elements.timerSeconds.style.color = config.timerStyle.color;
        elements.timerSeconds.style.fontSize = config.timerStyle.fontSize;
      }
    }
  
    // Apply play again button styles
    function applyPlayAgainButtonStyles() {
      if (elements.restartBtn) {
        elements.restartBtn.style.backgroundColor = config.playAgainButtonStyle.backgroundColor;
        elements.restartBtn.style.color = config.playAgainButtonStyle.color;
        elements.restartBtn.style.border = config.playAgainButtonStyle.border;
        elements.restartBtn.style.padding = config.playAgainButtonStyle.padding;
        elements.restartBtn.style.borderRadius = config.playAgainButtonStyle.borderRadius;
        elements.restartBtn.style.cursor = config.playAgainButtonStyle.cursor;
        elements.restartBtn.style.fontSize = config.playAgainButtonStyle.fontSize;
      }
    }
  
    // --- Initialize the Game ---
  
    function init() {
      loadSavedSettings();
      fixLayout();
      attachEventListeners();
      applyTimerStyles();
      applyPlayAgainButtonStyles();
      startGame();
      displayBestScore();
    }
  
    // --- Layout Fixes ---
  
    function fixLayout() {
      // Container layout
      elements.container.style.display = 'flex';
      elements.container.style.flexDirection = 'column';
      elements.container.style.justifyContent = 'center';
      elements.container.style.alignItems = 'center';
      elements.container.style.gap = 'var(--gap)';
      elements.container.style.width = '100%';
  
      // Playground layout
      elements.playground.style.display = 'flex';
      elements.playground.style.justifyContent = 'center';
      elements.playground.style.alignItems = 'center';
      elements.playground.style.width = '100%';
      elements.playground.style.minHeight = '75vh'; // Allows room for cards
      elements.playground.style.height = 'auto';
  
      // Feature section layout
      elements.features.style.position = 'relative';
      elements.features.style.marginTop = 'var(--gap)';
      elements.features.style.width = '90vw';
      elements.features.style.justifyContent = 'space-between';
  
      // Grid size selector styling
      elements.gridSizeSelector.style.padding = '8px';
      elements.gridSizeSelector.style.borderRadius = '5px';
      elements.gridSizeSelector.style.fontSize = '16px';
      elements.gridSizeSelector.style.marginBottom = 'var(--gap)';
    }
  
    // --- Event Listeners ---
  
    function attachEventListeners() {
      // Change grid size event
      elements.gridSizeSelector.addEventListener('change', function() {
        config.gridSize = this.value;
        startGame();
      });
  
      // Restart game button click event
      elements.restartBtn.addEventListener('click', function() {
        startGame();
      });
  
      // Modal restart button click event
      elements.modalRestartBtn.addEventListener('click', function() {
        hideModal();
        startGame();
      });
    }
  
    // --- Game Start / Reset / End Functions ---
  
    function startGame() {
      resetGame();
      generateCards();
      startTimer();
      config.isGameRunning = true;
    }
  
    function resetGame() {
      stopTimer();
      elements.playground.innerHTML = '';
      elements.timerMinutes.textContent = '00';
      elements.timerSeconds.textContent = '00';
      elements.wrongTriesSpan.textContent = '0';
      config.flippedCards = [];
      config.matchedPairs = 0;
      config.wrongTries = 0;
      hideModal();
    }
  
    // --- Generate Cards ---
  
    function generateCards() {
      var sizeParts = config.gridSize.split('*');
      var rows = parseInt(sizeParts[0], 10);
      var cols = parseInt(sizeParts[1], 10);
      var totalCards = rows * cols;
      
      // Ensure even number of cards
      if (totalCards % 2 !== 0) {
        totalCards -= 1;
      }
      config.totalPairs = totalCards / 2;
      
      // Create array of symbol pairs
      var cardSymbols = [];
      for (var i = 0; i < config.totalPairs; i++) {
        var symbol = config.symbols[i % config.symbols.length];
        cardSymbols.push(symbol, symbol);
      }
      
      // Shuffle the symbols
      shuffleArray(cardSymbols);
      
      // Set CSS grid columns via a variable
      document.documentElement.style.setProperty('--grid-cell', cols);
      
      // Create grid container
      var gridContainer = document.createElement('div');
      gridContainer.style.display = 'grid';
      gridContainer.style.gridTemplateColumns = 'repeat(' + cols + ', 1fr)';
      gridContainer.style.gridTemplateRows = 'repeat(' + rows + ', 1fr)';
      gridContainer.style.gap = 'var(--gap)';
      gridContainer.style.width = '100%';
      gridContainer.style.padding = 'var(--gap)';
      // Remove fixed max sizes so the grid fits naturally
      // gridContainer.style.maxWidth = '90vh';
      // gridContainer.style.maxHeight = '70vh';
      
      // Create individual cards
      for (var j = 0; j < totalCards; j++) {
        var card = createCard(j, cardSymbols[j]);
        gridContainer.appendChild(card);
      }
      
      elements.playground.appendChild(gridContainer);
      adjustCardFontSize(cols);
    }
    
    function adjustCardFontSize(cols) {
      var cards = document.querySelectorAll('.card .front');
      var fontSize;
      if (cols === 4) {
        fontSize = '60px';
      } else if (cols === 6) {
        fontSize = '40px';
      } else if (cols === 8) {
        fontSize = '30px';
      }
      for (var i = 0; i < cards.length; i++) {
        cards[i].style.fontSize = fontSize;
      }
    }
  
    function createCard(index, symbol) {
      var card = document.createElement('div');
      card.className = 'card';
      card.dataset.index = index;
      // Apply card style from config
      card.style.backgroundColor = config.cardStyle.backgroundColor;
      card.style.border = config.cardStyle.border;
      card.style.fontFamily = config.cardStyle.fontFamily;
  
      var front = document.createElement('div');
      front.className = 'front';
      front.textContent = symbol;
      
      var back = document.createElement('div');
      back.className = 'back';
      
      card.appendChild(front);
      card.appendChild(back);
      
      card.addEventListener('click', handleCardClick);
      
      return card;
    }
  
    // --- Game Interaction Functions ---
  
    function handleCardClick() {
      if (!config.isGameRunning ||
          this.classList.contains('flipped') ||
          this.classList.contains('matched') ||
          config.flippedCards.length >= config.cardsFlippedLimit) {
        return;
      }
      
      this.classList.add('flipped');
      config.flippedCards.push(this);
      
      if (config.flippedCards.length === config.cardsFlippedLimit) {
        checkForMatch();
      }
    }
  
    function checkForMatch() {
      var card1 = config.flippedCards[0];
      var card2 = config.flippedCards[1];
      
      var symbol1 = card1.querySelector('.front').textContent;
      var symbol2 = card2.querySelector('.front').textContent;
      
      if (symbol1 === symbol2) {
        setTimeout(function() {
          markCardsAsMatched();
          config.flippedCards = [];
          config.matchedPairs++;
          if (config.matchedPairs === config.totalPairs) {
            endGame();
          }
        }, 500);
      } else {
        config.wrongTries++;
        elements.wrongTriesSpan.textContent = config.wrongTries;
        
        setTimeout(function() {
          resetFlippedCards();
          config.flippedCards = [];
        }, config.duration);
      }
    }
  
    function markCardsAsMatched() {
      for (var i = 0; i < config.flippedCards.length; i++) {
        config.flippedCards[i].classList.add('matched');
        config.flippedCards[i].removeEventListener('click', handleCardClick);
      }
    }
  
    function resetFlippedCards() {
      for (var i = 0; i < config.flippedCards.length; i++) {
        config.flippedCards[i].classList.remove('flipped');
      }
    }
  
    function endGame() {
      config.isGameRunning = false;
      stopTimer();
      
      var totalTime = Math.floor((Date.now() - config.startTime) / 1000);
      var minutes = Math.floor(totalTime / 60);
      var seconds = totalTime % 60;
      
      elements.modalTimeSpan.textContent =
        'Time Spent: ' +
        (minutes < 10 ? '0' + minutes : minutes) +
        'min ' +
        (seconds < 10 ? '0' + seconds : seconds) +
        'sec';
      
      elements.wrongTriesSpan.textContent = config.wrongTries;
      
      // Update and save best score in localStorage
      updateBestScore(totalTime, config.wrongTries);
      showModal();
    }
  
    function updateBestScore(currentTime, currentWrongTries) {
      var bestTime = localStorage.getItem('memoryGame_bestTime');
      var bestWrongTries = localStorage.getItem('memoryGame_bestWrongTries');
      var newBest = false;
  
      if (!bestTime || currentTime < parseInt(bestTime, 10)) {
        localStorage.setItem('memoryGame_bestTime', currentTime);
        newBest = true;
      }
      if (!bestWrongTries || currentWrongTries < parseInt(bestWrongTries, 10)) {
        localStorage.setItem('memoryGame_bestWrongTries', currentWrongTries);
        newBest = true;
      }
      if (newBest) {
        displayBestScore();
      }
    }
  
    function displayBestScore() {
      var bestTime = localStorage.getItem('memoryGame_bestTime');
      var bestWrongTries = localStorage.getItem('memoryGame_bestWrongTries');
      if (elements.bestScoreDisplay) {
        elements.bestScoreDisplay.textContent =
          'Best Time: ' +
          (bestTime ? bestTime + ' sec' : 'N/A') +
          ' | Fewest Errors: ' +
          (bestWrongTries ? bestWrongTries : 'N/A');
      }
    }
  
    // --- Timer Functions ---
  
    function startTimer() {
      config.startTime = Date.now();
      if (config.timer) {
        clearInterval(config.timer);
      }
      config.timer = setInterval(function() {
        updateTimer();
      }, 1000);
    }
  
    function updateTimer() {
      var totalSeconds = Math.floor((Date.now() - config.startTime) / 1000);
      var minutes = Math.floor(totalSeconds / 60);
      var seconds = totalSeconds % 60;
      
      elements.timerMinutes.textContent = minutes < 10 ? '0' + minutes : minutes;
      elements.timerSeconds.textContent = seconds < 10 ? '0' + seconds : seconds;
    }
  
    function stopTimer() {
      if (config.timer) {
        clearInterval(config.timer);
        config.timer = null;
      }
    }
  
    // --- Modal Functions ---
  
    function showModal() {
      elements.modal.style.visibility = 'visible';
      elements.modal.style.opacity = '1';
    }
  
    function hideModal() {
      elements.modal.style.visibility = 'hidden';
      elements.modal.style.opacity = '0';
    }
  
    // --- Utility Functions ---
  
    // Fisher-Yates Shuffle
    function shuffleArray(array) {
      for (var i = array.length - 1; i > 0; i--) {
        var j = Math.floor(Math.random() * (i + 1));
        var temp = array[i];
        array[i] = array[j];
        array[j] = temp;
      }
      return array;
    }
  
    // Handle window resize to adjust card font sizes
    function handleResize() {
      if (elements.gridSizeSelector.value) {
        var cols = parseInt(elements.gridSizeSelector.value.split('*')[1], 10);
        adjustCardFontSize(cols);
      }
    }
  
    window.addEventListener('resize', handleResize);
  
    // Initialize when DOM is ready
    document.addEventListener('DOMContentLoaded', init);
  })();
  