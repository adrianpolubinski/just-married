const multer = require("multer");
// set storage
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    // Image.jpg
    var ext = file.originalname.substr(file.originalname.lastindexOf("."));
    cb(null, file.filename + "-" + Date.now() + ext);
  },
});

module.exports = store = multer({ storage: storage });
