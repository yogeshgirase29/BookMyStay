const express = require("express");
const router = express.Router();


//Index - posts
router.get("/", (req, res) => {
  res.send("GET for posts");
});

//show - posts
router.get("/:id", (req, res) => {
  res.send("GET for post id");
});

//POST - posts
router.post("/", (req, res) => {
  res.send("POST for posts");
});

//DELETE - posts
router.delete("/:id", (req, res) => {
  res.send("DELETE for post id");
});

module.exports = router;