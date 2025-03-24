import express from "express";
import { check } from "express-validator";
import {
  getGames,
  getGame,
  createGame,
  updateGame,
  deleteGame,
} from "../controllers/gameController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getGames);
router.get("/:id", getGame);

// Admin routes
router
  .route("/")
  .post(
    [
      protect,
      admin,
      [
        check("name", "Game name is required").not().isEmpty(),
        check("image", "Game image is required").not().isEmpty(),
        check("skillLevel", "Skill level is required").not().isEmpty(),
      ],
    ],
    createGame
  );

router
  .route("/:id")
  .put(protect, admin, updateGame)
  .delete(protect, admin, deleteGame);

export default router;
