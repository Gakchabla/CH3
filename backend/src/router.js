/* eslint-disable no-unused-vars */
const express = require("express");
const fs = require("fs");

const cloudinary = require("cloudinary").v2;

const multer = require("multer");

const upload = multer({ dest: "uploads/" });

const router = express.Router();

const uploadPicture = async (req, res, next) => {
  const photo = req.file;

  const uploadImage = await cloudinary.uploader.upload(photo.path);
  req.body.url = uploadImage.secure_url;
  const removeImage = await fs.unlink(photo.path, (err) => {
    if (err) throw err;
  });
  next();
};

const userControllers = require("./controllers/userController");
const authControllers = require("./controllers/authController");
const pictureControllers = require("./controllers/pictureController");

const {
  hashPassword,
  verifyPassword,
  verifyToken,
} = require("./services/auth");

router.get("/api/users", verifyToken, userControllers.browse);
router.get(
  "/api/liked/users/:userId",
  verifyToken,
  userControllers.alreadyLiked
);

router.get(
  "/api/userswithpicture",
  verifyToken,
  userControllers.browseWithPicture
);

router.get("/api/users/:id", verifyToken, userControllers.read);

router.post("/api/register", hashPassword, userControllers.add);
router.post(
  "/api/login",
  authControllers.getUserByEmailWithPasswordAndPassToNext,
  verifyPassword
);
router.put("/api/description/:id", verifyToken, userControllers.changeUserBio);

router.delete(
  "/api/users/:id",
  verifyToken,
  authControllers.isUserAllowed,
  userControllers.destroy
);

// photos

router.get("/api/photos", verifyToken, pictureControllers.browse);
router.get(
  "/api/pictures/users/:id",
  verifyToken,
  pictureControllers.browseByUser
);
router.post(
  "/api/photos/:userId",
  upload.single("photo"),
  uploadPicture,
  pictureControllers.addAtRegistration
);

router.put(
  "/api/photos/:userId",
  verifyToken,
  upload.single("photo"),
  uploadPicture,
  pictureControllers.changeUserPicture
);

// likes

router.get("/api/likes", verifyToken, userControllers.browseLike);
router.get("/api/match", verifyToken, userControllers.checkMatch);
router.get("/api/getusermatches/:id", verifyToken, userControllers.getMatches);

router.post("/api/likes", verifyToken, userControllers.addLike);
router.post(
  "/api/checkmatch",
  verifyToken,
  userControllers.addLikeAndNext,
  userControllers.checkMatch
);

module.exports = router;
