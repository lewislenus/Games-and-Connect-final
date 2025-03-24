import express from "express";
import { validationResult } from "express-validator";

const router = express.Router();

// @desc    Register a volunteer
// @route   POST /api/users/volunteer
// @access  Public
router.post("/volunteer", async (req, res) => {
  try {
    // Validate request data
    const { name, email, phone, interests, availability, experience, message } =
      req.body;

    if (!name || !email || !phone || !interests || !availability || !message) {
      return res
        .status(400)
        .json({
          success: false,
          message: "Please provide all required fields",
        });
    }

    // In a production app, you would save this data to your database
    // For now, we'll just log it and return a success message
    console.log("Volunteer application received:", req.body);

    // Return success response
    return res.status(201).json({
      success: true,
      message: "Volunteer application submitted successfully",
    });
  } catch (error) {
    console.error("Error in volunteer registration:", error);
    return res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
});

export default router;
