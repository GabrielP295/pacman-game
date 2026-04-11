# pacman-game

```
pacman-game/
│
├── game-map/
│   ├── Grid-System/
│   │   ├── gridLoader.js         - loads the grid, loads next grid, populates coins in new grid
│   │   ├── grids.js              - stores all grids for the game
│   │   └── gridUtils.js          - grid helper functions
│   │
│   ├── draw-board.js
│   ├── grid.js
│   └── starting-elements.js
│
├── models-movement/
│   ├── pacman-movement.js
│   ├── ghost-movement.js
│   └── movement.js               - shared movement logic / helper functions
│
├── tests/
│   ├── Grid&Coin-Logic-Testing/
│   │   ├── coin-eating-Detection.test.js
│   │   ├── fillSpacesWithCoins.test.js
│   │   └── hasNoCoinsRemaining.test.js
│   ├── Pacman-Movement-Testing/
│   │   └── pacman-movement.test.js
│   ├── Scoring-Testing/
│   │   └── score-calculator.test.js
│   ├── pacman-ghost-collision.test.js
│   ├── sample.test.js
│   └── testSample.js
│
├── index.html
├── pacman.js
├── map.css
├── jest.config.js
├── package.json
└── ReadMe.md
```

---

### Planned (not yet implemented)

```
├── score-logic/
│   ├── scoreCalculator.js    - calculates and returns the score
│   └── scoreUtil.js          - helper functions for score calculator
│
├── audio-manager/
│   ├── background-music/
│   └── sound-effects/
│
└── game-state-management/
    ├── manageState.js        - sets screen/play state: "Start Game", "Playing", "Game Over"
    └── manageStateUI.js
```
