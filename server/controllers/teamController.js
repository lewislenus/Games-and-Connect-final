import Team from "../models/Team.js";
import { validationResult } from "express-validator";

// @desc    Get all teams
// @route   GET /api/teams
// @access  Public
export const getTeams = async (req, res) => {
  try {
    const teams = await Team.find().sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: teams.length,
      data: teams,
    });
  } catch (error) {
    console.error("Error fetching teams:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Get single team
// @route   GET /api/teams/:id
// @access  Public
export const getTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id).populate("members");

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Error fetching team:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Create new team
// @route   POST /api/teams
// @access  Private/Admin
export const createTeam = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const team = await Team.create(req.body);

    res.status(201).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Error creating team:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Update team
// @route   PUT /api/teams/:id
// @access  Private/Admin
export const updateTeam = async (req, res) => {
  try {
    let team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    team = await Team.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: team,
    });
  } catch (error) {
    console.error("Error updating team:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Delete team
// @route   DELETE /api/teams/:id
// @access  Private/Admin
export const deleteTeam = async (req, res) => {
  try {
    const team = await Team.findById(req.params.id);

    if (!team) {
      return res.status(404).json({
        success: false,
        message: "Team not found",
      });
    }

    await team.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting team:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};
