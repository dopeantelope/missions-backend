const Missions = require("../models/Missions");

module.exports = {
  getMission: async (req, res) => {
    try {
      const mission = await Missions.find()
      console.log("hereß")
      console.log(mission)

    } catch (err) {
      console.log(err);
    }
  },
}