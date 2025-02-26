const express = require("express");
const router = express.Router();
const data = require("./test.json");

// API que devuelve los datos JSON
router.get("/api/data", (req, res) => {
  res.json(data);
});

// Renderiza la vista con Handlebars
router.get("/", (req, res) => {
  res.render("index", { data });
});

module.exports = router;
