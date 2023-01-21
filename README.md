# missions-backend

# Missions (WIP)
The backend for a party game app where players compete to complete secret missions against their friends.


![Alt Text](https://i.ibb.co/BwS1NPM/Screenshot-2023-01-06-at-11-59-45.png)

## How It's Made
Users are able to 'Create Game' which will create a room using Socket.IO and generate a randomized 4 letter room code. Other players are able to join the game by entering the room code. The users will then join that game's lobby where it displays a list of all users connected and the host is able to 'Start game'. Users are then allocated randomized missions from the database that they must complete before the other players. The frontend uses React, Tailwind and Socket.IO.

**Tech used:** JavaScript, React, Node.js, MongoDB, Mongoose, Tailwind, Socket.IO


## Optimizations

Further optimizations include adding categories for missions that users can toggle depending on their environment and the kind of game they want to play. Ability to add custom missions, settings for user to choose number of missions and mission resets. Adding a hard mode where players must complete missions against a certain user instead of any player.

## Lessons Learned:

- [x] Socketio
