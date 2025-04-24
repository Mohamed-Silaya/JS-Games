🧠 Memory Match Game
A fun and interactive Memory Match Game built using vanilla JavaScript, HTML, and CSS. Match pairs of cards (fruits or numbers), track your performance, and compete with yourself via the local high score board!

<!-- Replace with actual image if available -->

🚀 Features
🎮 Game Modes: Choose between Fruits or Numbers.

🔢 Grid Sizes: Select from 4x4, 6x6, or 8x8 layouts.

⏱️ Timer and Mistake Tracker

🏆 High Score Board saved in Local Storage

📱 Fully Responsive Design

😎 Stylish UI with animations and effects

📦 Technologies Used
HTML5

CSS3 (Custom styling + responsive design)

JavaScript (DOM manipulation, localStorage, logic)

🧩 How to Play
Enter your name.

Choose a grid size and game mode.

Click Start Game.

Flip two cards to try to match pairs.

The game ends when all pairs are matched.

Your time and wrong attempts are recorded.

🛠️ Setup & Usage
To run the game locally:

bash
Copy
Edit
# Clone the repo
git clone https://github.com/yourusername/memory-match-game.git

# Navigate into the project folder
cd memory-match-game

# Open the game in a browser
open index.html    # or just double-click the file
📂 Project Structure
bash
Copy
Edit
.
├── index.html       # Main HTML file
├── script.js        # JavaScript game logic
├── style.css        # Game styling
└── images/          # Game assets (icons for fruit mode)
📈 High Score Logic
Stores player name, time, mistakes, grid size, and mode.

Automatically keeps only the top 10 scores (least mistakes + time).

Scores are persistent using localStorage.

🖼️ Customization Tips
Add more game themes by editing the modeSelector in index.html.

Add new icons to the images/ folder (name them icon-1.png, icon-2.png, etc.).

Change fonts or animations easily via style.css.

📄 License
Feel free to use, modify, and distribute this project. A link back is appreciated!


