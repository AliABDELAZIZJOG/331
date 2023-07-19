Javascript
const express = require('express');
const app = express();

let room = {};
room = {
  isOpen: true,
};


function closeRoom() {
  console.log('Room closed.');
  room.isOpen = false;
  // Add any other necessary room closure logic
}

function startCountdown(minutes) {
  const countdownSeconds = minutes * 60;
  let remainingSeconds = countdownSeconds;

  const timer = setInterval(() => {
    const minutes = Math.floor(remainingSeconds / 60);
    const seconds = remainingSeconds % 60;

    console.log(`Time remaining: ${minutes} minutes ${seconds} seconds`);

    if (remainingSeconds === 0) {
      clearInterval(timer);
      closeRoom();
    } else {
      remainingSeconds--;
    }
  }, 1000);
}

app.post('/create-room', (req, res) => {

  const roomCode = generateRoomCode();

  // room and room code creation
  room[roomCode] = {
    players: [4],
    //time limit?
    //room data (time limit maybe 12 minutes)
  };

  res.json({ roomCode });
});

app.post('/join-room/:roomCode', (req, res) => {
  const roomCode = req.params.roomCode;

  // Check if the room exists
  if (room.exists(roomCode)) {
    // Add the player to the existing room
    room[roomCode].players.push(/* Player data */);

    res.json({ message: 'Successfully joined the room.' });
  } else {
    res.json({ message: 'Room does not exist.' });
  }
});

function generateRoomCode() {
  // Generate a unique room code using any desired algorithm
  // For example, you can generate a random alphanumeric string
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
  let roomCode = '';

  for (let i = 0; i < 6; i++) {
    roomCode += characters.charAt(Math.floor(Math.random() * characters.length));
  }

  return roomCode;
}

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});