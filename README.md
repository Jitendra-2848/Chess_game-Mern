## Chess_game-Mern

Chess_game-Mern is a real-time multiplayer chess application built with Node.js, Express, Socket.io, and Chess.js. The user interface is rendered on the server using EJS and styled with Tailwind CSS, providing a seamless chess experience without the need for a separate frontend framework.

## Table of Contents

- [Overview](#overview)  
- [Features](#features)  
- [Technology Stack](#technology-stack)    
- [Installation](#installation)  
- [Usage](#usage)  
- [Future Improvements](#future-improvements)  
- [Author](#author)  
- [License](#license)  

## Overview

The app runs on port 3000. The first two users to connect are assigned as White and Black players. Additional users can join as spectators, viewing the game in real-time. Chess rules, including move validation and check/checkmate detection, are handled on the server using Chess.js.

## Features

- Real-time multiplayer gameplay with Socket.io  
- Drag-and-drop piece movement  
- Full chess rules enforced with Chess.js  
- Automatic role assignment: White, Black, Spectator  
- Unlimited spectators can watch live  
- Server-rendered interface using EJS and Tailwind CSS  

## Technology Stack

- Node.js & Express.js  
- Socket.io  
- Chess.js  
- EJS templates  
- Tailwind CSS
  
bash
Copy code

## Installation

Clone the repository and install dependencies:

```bash
git clone https://github.com/Jitendra-2848/Chess_game-Mern.git
cd Chess_game-Mern
npm install
```
```bash
npm run dev
```

http://localhost:3000
Additional devices can connect to the same URL to join as the opponent or spectator.

## Usage
- First user connected = White
- Second user = Black
- Spectators join automatically
- Move pieces by dragging and dropping
- Moves are validated on the server; illegal moves are rejected
- All users see real-time updates of the game


## Future Improvements
- User authentication and profiles
- Multiple game rooms
- Timed games (blitz, rapid, classical)
- Move history and PGN export
- Enhanced UI with animations and sound effects

## Author
Jitendra Prajapati

## License
MIT License
