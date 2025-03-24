import express from "express";
import { check } from "express-validator";
import {
  getEvents,
  getEvent,
  createEvent,
  updateEvent,
  deleteEvent,
  registerForEvent,
} from "../controllers/eventController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getEvents);
router.get("/:id", getEvent);

// Protected routes (require authentication)
router.post("/:id/register", protect, registerForEvent);

// Admin routes
router
  .route("/")
  .post(
    [
      protect,
      admin,
      [
        check("title", "Event title is required").not().isEmpty(),
        check("date", "Event date is required").not().isEmpty(),
        check("time", "Event time is required").not().isEmpty(),
        check("location", "Event location is required").not().isEmpty(),
        check("description", "Event description is required").not().isEmpty(),
        check("image", "Event image is required").not().isEmpty(),
        check("price", "Event price is required").not().isEmpty(),
        check("capacity", "Event capacity is required").not().isEmpty(),
      ],
    ],
    createEvent
  );

router
  .route("/:id")
  .put(protect, admin, updateEvent)
  .delete(protect, admin, deleteEvent);

export default router;
