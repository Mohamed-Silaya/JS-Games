# Memory Game

## Introduction
The Memory Game is a classic card-matching game where players flip cards to find matching pairs. This project is built using HTML, CSS, and ES5 JavaScript, ensuring broad browser compatibility. It features a responsive design, engaging card-flipping animations, and a results modal, making it both fun and user-friendly.

### Features
- **Grid Size Options:** Choose from 4x4, 6x6, or 8x8 grids.
- **Mode Selection:** Play with either symbols (images) or numbers on the cards.
- **Timer:** Tracks the time taken to complete the game.
- **High Score Tracking:** Saves and displays the top 10 scores based on wrong attempts and time.

## Setup and Running the Game
To get started with the Memory Game, follow these steps:

 **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/memory-game.git
```

## Game Play

Here are some screenshots of the game in action:

![Game Board for numbers](https://github.com/Mohamed-Silaya/JS-Games/blob/main/Memory_card_game/numbers.png)
*Screenshot of the game board for numbers.*

![High Score Window](https://github.com/Mohamed-Silaya/JS-Games/blob/main/Memory_card_game/high%20score%20window.png)
*High score window display.*

![Game Board for symbols](https://github.com/Mohamed-Silaya/JS-Games/blob/main/Memory_card_game/symbols.png)  
*Screenshot of the game board for SymbolsCurrent score display during.*

## HTML Structure
The page1.html file defines the game's structure with the following key elements:

- Container: Wraps all game components.
- Player Name Input: Allows players to enter their name for high score tracking.
- Grid Size Selector: Dropdown menu to select the grid size (4x4, 6x6, or 8x8).
- Mode Selector: Dropdown to switch between symbols or numbers on the cards.
- Playground: The grid area where cards are displayed.
- Modal: A hidden overlay that appears at the end to show game results.
- Features: Includes the timer display and a restart button.

## CSS Styling
The style.css file enhances the game's appearance and usability:

- Responsive Design: Adapts the layout to various screen sizes.
- Card Flipping Animations: Uses 3D CSS transformations for smooth card flips.
- Modal Styling: Centers a translucent modal for displaying results.
- CSS Variables: Ensures consistency in colors, spacing, and animation timing.


## JavaScript Logic
The script.js file contains the game’s logic, written in ES5 JavaScript:

- Initialization: Sets up the game by creating cards and arranging them in the grid.
- Card Click Handling: Manages card flips, checks for matches, and updates the attempt counter.
- Timer: Starts on the first card click and updates every second.
- Game End Logic: Detects when all pairs are matched, stops the timer, and displays the results modal.
- High Score Tracking: Stores scores in local storage, sorts them, and shows the top 10.
### Key Functions
- initGame(cardsNumber): Initializes the game with the chosen number of cards.
- shuffleArray(array): Randomly shuffles card positions.
- handleCardClick(): Handles card clicks, flipping, matching, and attempt tracking.
- checkGameEnd(): Checks for game completion and triggers the results modal.
- setTime(): Manages the timer’s start and updates.
- showHighScores(): Displays the top 10 scores in the modal.
## Functionality Details
#### Grid Size Options:
- Players select the grid size (4x4, 6x6, or 8x8) via a dropdown.
- The playground adjusts dynamically using CSS Grid, supporting 16, 36, or 64 cards respectively.
#### Mode Selection
- Choose between "symbols" (images) or "numbers" for the card fronts.
- The selected mode determines the content displayed on each card.
#### Timer
- Begins counting when the first card is clicked.
- Updates every second, showing minutes and seconds.
#### High Scores
- Scores include player name, time, wrong attempts, date, grid size, and mode.
- Stored in local storage, sorted by wrong attempts (ascending) and then time (ascending).
- Only the top 10 scores are retained and displayed.
##### Dependencies
- Built entirely with vanilla JavaScript, HTML, and CSS.
- No external libraries or frameworks are required.


