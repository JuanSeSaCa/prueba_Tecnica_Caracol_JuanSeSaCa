const express = require("express");
const path = require("path");
const router = express.Router();
const data = require(path.join(__dirname, "../data/test.json"))

// API que devuelve los datos JSON
router.get("/api/data", (req, res) => {
  res.json(data);
});

// Renderiza la vista con Handlebars
router.get("/", (req, res) => {
  res.render("index", { data });
});

module.exports = router;
