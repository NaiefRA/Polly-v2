const express = require("express");
const {
  createPoll,
  getAll,
  getPoll,
  deletePoll,
  updatePoll,
} = require("../controllers/pollController.js");
const router = express.Router();

// GET all
router.get("/", getAll);

// GET one
router.get("/:id", getPoll);

// POST
router.post("/", createPoll);

// DELETE
router.delete("/:id", deletePoll);

// PATCH
router.patch("/:id", updatePoll);

module.exports = router;
