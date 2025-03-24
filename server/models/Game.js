import mongoose from "mongoose";

const gameSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Game name is required"],
      trim: true,
    },
    image: {
      type: String,
      required: [true, "Game image is required"],
    },
    skillLevel: {
      type: String,
      enum: ["Beginner", "Intermediate", "Advanced"],
      required: [true, "Skill level is required"],
    },
    description: {
      type: String,
      default: "",
    },
    featured: {
      type: Boolean,
      default: false,
    },
    events: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Event",
      },
    ],
  },
  { timestamps: true }
);

const Game = mongoose.model("Game", gameSchema);

export default Game;
