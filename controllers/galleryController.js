require("../models/database");
const Test = require("../models/Test");
const Image = require("../models/UploadFile");
const fs = require("fs");
/**
 * GET /
 * Homepage
 */
exports.homepage = async (req, res) => {
  try {
    const limitNumber = 5;
    console.log("Rendered from Controller");
    res.render("index", { title: "JustMarried Page - Home" });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /gallery
 * GALLERY
 */
exports.gallery = async (req, res) => {
  try {
    const limitNumber = 5;
    console.log("Rendered from Controller");
    res.status(200).send("DUPADUPA");
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
/**
 * GET /login
 * LOGIN
 *
 */
exports.login = async (req, res) => {
  try {
    const limitNumber = 5;
    console.log("Rendered from Controller");
    res.status(200).send("Login page");
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * GET /register
 * Register
 */

exports.register = async (req, res) => {
  try {
    const limitNumber = 5;
    console.log("Rendered from Controller");
    res.status(200).send("Register Page");
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};

/**
 * POST /send
 * SEND
 */
exports.mailer = async (req, res) => {
  try {
    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;
    const message = req.body.message;

    let transporter = nodemailer.createTransport({
      host: "smtp.gmail.com",
      port: 587,
      secure: false, // true for 465, false for other ports
      auth: {
        user: "jmhelper186@gmail.com", // generated ethereal user
        pass: "azrfoclbjqlgtsrk", // generated ethereal password
      },
    });

    transporter.sendMail({
      from: '"Fotobudka JM 👻" <jmhelper186@gmail.com>',
      to: email, // list of receivers
      subject: "Potwierdzenie wysłania wiadomości.", // Subject line
      text: "Witaj,\n twoja wiadomość została poprawnie wysłana do naszego supportu. Oczekuj odpowiedzi od naszego pracownika w najbliższym czasie.",
    });

    transporter.sendMail({
      from: `"Formularz Kontaktowy" <plgoguspl@gmail.com>`,
      to: "jmhelper186@gmail.com", // list of receivers
      subject: `${name} <${email}> Tel.${phone}`, // Subject line
      html: message,
    });
    res.redirect("/");
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
/**
 * POST /calendarTerm
 * CALENDARTERM
 */
exports.calendarTerm = async (req, res) => {
  try {
    console.log("post Term in calendar");
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
/**
 * POST /upload
 * UPLOAD
 */
exports.uploads = async (req, res, next) => {
  try {
    const files = req.files;

    if (!files) {
      const error = new Error("Prosze wybrać pliki");
      error.httpStatusCode = 400;
      return next(error);
    }
    let imgArray = files.map((file) => {
      let img = fs.readFileSync(file.path);

      return (encode_image = img.toString("base64"));
    });
    let result = imgArray.map((src, index) => {
      //create object to store data in coll
      let finalImg = {
        filename: files[index].originalname,
        contentType: files[index].mimetype,
        imageBase64: src,
      };
      let newUpload = new Image(finalImg);

      return newUpload
        .save()
        .then(() => {
          return { msg: `${files[index].originalname} uploaded successfully!` };
        })
        .catch((error) => {
          if (error) {
            if (error.name === "MongoError" && error.code === 11000) {
              return Promise.reject({
                error: `Duplicate ${files[index].originalname} already exists`,
              });
            }
            return Promise.reject({
              error:
                error.message || `Cannot upload ${files[index].originalname}`,
            });
          }
        });
    });
    Promise.all(result).then((msg) => {
      res.redirect("/");
    });
  } catch (error) {
    res.status(500).send({ message: error.message || "Error Occured" });
  }
};
