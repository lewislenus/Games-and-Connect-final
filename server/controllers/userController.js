import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";
import { validationResult } from "express-validator";

// @desc    Register a new user
// @route   POST
