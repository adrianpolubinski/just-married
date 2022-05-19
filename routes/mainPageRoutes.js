const express = require("express");
const router = express.Router();
const galleryController = require("../controllers/galleryController");
const store = require("../middleware/upload");

router.get("/", galleryController.homepage);

router.get("/gallery", galleryController.gallery);

router.get("/login", galleryController.login);

router.get("/register", galleryController.register);

router.post("/calendarTerm", galleryController.calendarTerm);

router.post("/mailer", galleryController.mailer);

router.post("/upload", store.array("images", 12), galleryController.uploads);

router.all("*", (req, res) => {
  res.status(404).send("<h1>Error resource not found</h1>");
});

module.exports = router;
