const mongoose = require("mongoose");

const MissionSchema = new mongoose.Schema({
  mission: {
    type: String,
    required: true,
  },
});

module.exports = mongoose.model("Mission", MissionSchema);