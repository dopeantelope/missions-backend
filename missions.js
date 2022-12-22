const missions = require("./controllers/missions");
const Missions = require("./models/Missions");
const { users, getUsers } = require('./users')

async function getMissions(room) {
  try {
    const missions = await Missions.find()
    await randomizeCorrectNumberOfMissions(missions, room)

  } catch (err) {
    console.log(err);
  }
}

function randomizeCorrectNumberOfMissions(missions, room) {
  let numOfMissions = getUsers(room).length * 6
  let randomizedMissions = []
  
  for (let i = 0; i < numOfMissions; i++) {
    let random = Math.floor(Math.random() * ((missions.length) - 1))
    if (!randomizedMissions.includes(missions[random].mission)) {
      randomizedMissions.push(missions[random].mission)
    } else {
      i--
    }
  } 
  allocateMissions(randomizedMissions)
}

function allocateMissions(randomizedMissions) {
  let allMissions = []
  let sixMissions = []

  for (let i = 0; i < randomizedMissions.length; i++) {
    if (sixMissions.length < 6) {
      sixMissions.push(randomizedMissions[i])
    } else {
      allMissions.push(sixMissions)
      sixMissions = []
    }
  }

  console.log(allMissions)
}


module.exports = getMissions