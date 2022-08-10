const express = require("express");
const router = express.Router();
const { getItems } = require("../controllers/artistController");

router.get("/:searchQuery", getItems);

module.exports = router;
