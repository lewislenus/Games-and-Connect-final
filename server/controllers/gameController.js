import Game from "../models/Game.js";
import { validationResult } from "express-validator";

// @desc    Get all games
// @route   GET /api/games
// @access  Public
export const getGames = async (req, res) => {
  try {
    const { skillLevel, featured } = req.query;
    let filter = {};

    // Filter by skill level if specified
    if (skillLevel) {
      filter.skillLevel = skillLevel;
    }

    // Filter by featured if specified
    if (featured !== undefined) {
      filter.featured = featured === "true";
    }

    const games = await Game.find(filter).sort({ name: 1 });

    res.status(200).json({
      success: true,
      count: games.length,
      data: games,
    });
  } catch (error) {
    console.error("Error fetching games:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Get single game
// @route   GET /api/games/:id
// @access  Public
export const getGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id).populate("events");

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error fetching game:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Create new game
// @route   POST /api/games
// @access  Private/Admin
export const createGame = async (req, res) => {
  try {
    // Check for validation errors
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        errors: errors.array(),
      });
    }

    const game = await Game.create(req.body);

    res.status(201).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error creating game:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Update game
// @route   PUT /api/games/:id
// @access  Private/Admin
export const updateGame = async (req, res) => {
  try {
    let game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    game = await Game.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error updating game:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Delete game
// @route   DELETE /api/games/:id
// @access  Private/Admin
export const deleteGame = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    await game.deleteOne();

    res.status(200).json({
      success: true,
      data: {},
    });
  } catch (error) {
    console.error("Error deleting game:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};

// @desc    Toggle game featured status
// @route   PUT /api/games/:id/toggle-featured
// @access  Private/Admin
export const toggleFeatured = async (req, res) => {
  try {
    const game = await Game.findById(req.params.id);

    if (!game) {
      return res.status(404).json({
        success: false,
        message: "Game not found",
      });
    }

    // Toggle featured status
    game.featured = !game.featured;
    await game.save();

    res.status(200).json({
      success: true,
      data: game,
    });
  } catch (error) {
    console.error("Error toggling featured status:", error);
    res.status(500).json({
      success: false,
      message: "Server Error",
      error: process.env.NODE_ENV === "production" ? null : error.message,
    });
  }
};
