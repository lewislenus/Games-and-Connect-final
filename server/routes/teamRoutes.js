import express from "express";
import { check } from "express-validator";
import {
  getTeams,
  getTeam,
  createTeam,
  updateTeam,
  deleteTeam,
} from "../controllers/teamController.js";
import { protect, admin } from "../middleware/auth.js";

const router = express.Router();

// Public routes
router.get("/", getTeams);
router.get("/:id", getTeam);

// Admin routes
router
  .route("/")
  .post(
    [
      protect,
      admin,
      [
        check("name", "Team name is required").not().isEmpty(),
        check("color", "Team color is required").not().isEmpty(),
        check("image", "Team image is required").not().isEmpty(),
        check("description", "Team description is required").not().isEmpty(),
        check("specialization", "Team specialization is required")
          .not()
          .isEmpty(),
      ],
    ],
    createTeam
  );

router
  .route("/:id")
  .put(protect, admin, updateTeam)
  .delete(protect, admin, deleteTeam);

export default router;
