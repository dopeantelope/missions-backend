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
  allocateMissions(randomizedMissions, room)
}

function allocateMissions(randomizedMissions, room) {
  let users = getUsers(room)

  for (let i = 0; i < users.length; i++) {
    users[i].missions = randomizedMissions.splice(0, 6)
  }

  console.log(users)






  // let userMissions = []

  // console.log(randomizedMissions.length)

  // for (let i = 0; i < randomizedMissions.length; i++) {
  //   if (userMissions.length < 6) {
  //     userMissions.push(randomizedMissions[i])
  //   } else {
  //     console.log('push usermissions to user')
  //     userMissions = []
  //   }
  // }
  // console.log(userMissions)
}


module.exports = getMissions