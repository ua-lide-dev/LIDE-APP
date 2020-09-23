const express = require("express");
const router = express.Router();

// Controllers

/* --- Routes --- */
router.get("/", (req, res) => {
  res.send("Hello World!");
});

module.exports = router;
