import mongoose from "mongoose";

const teamSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Team name is required"],
      trim: true,
    },
    color: {
      type: String,
      required: [true, "Team color is required"],
    },
    image: {
      type: String,
      required: [true, "Team image is required"],
    },
    description: {
      type: String,
      required: [true, "Team description is required"],
    },
    activeMembers: {
      type: Number,
      default: 0,
    },
    eventVictories: {
      type: Number,
      default: 0,
    },
    specialization: {
      type: String,
      required: [true, "Team specialization is required"],
    },
    members: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Team = mongoose.model("Team", teamSchema);

export default Team;
