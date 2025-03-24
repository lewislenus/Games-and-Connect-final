import mongoose from "mongoose";

const eventSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Event title is required"],
      trim: true,
    },
    date: {
      type: String,
      required: [true, "Event date is required"],
    },
    time: {
      type: String,
      required: [true, "Event time is required"],
    },
    location: {
      type: String,
      required: [true, "Event location is required"],
    },
    description: {
      type: String,
      required: [true, "Event description is required"],
    },
    image: {
      type: String,
      required: [true, "Event image is required"],
    },
    price: {
      type: String,
      required: [true, "Event price is required"],
    },
    capacity: {
      type: String,
      required: [true, "Event capacity is required"],
    },
    additionalInfo: {
      type: [String],
      default: [],
    },
    isPast: {
      type: Boolean,
      default: false,
    },
    registrations: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  { timestamps: true }
);

const Event = mongoose.model("Event", eventSchema);

export default Event;
