const express = require('express');
const router = express.Router();
const authcontroller = require("../controllers/auth-controller");
const validate = require("../middelware/validate")
const signupSchema = require("../validator/auth-validator")
const authmiddleware = require("../middelware/authmiddelware")
const upload = require("../middelware/upload")

router.route("/registration").post(validate(signupSchema), authcontroller.Registration);
router.route("/login").post(authcontroller.Login);
router.route("/user").get(authmiddleware, authcontroller.user)
router.route("/file/upload").post(upload.single("file"), authcontroller.uploadImage)
router.route("/file/:filename").get(authcontroller.getImage)
router.route("/create").post(authmiddleware, authcontroller.create)
router.route("/post").get(authmiddleware, authcontroller.post)
router.route("/posts/:id").get(authmiddleware, authcontroller.posts)
router.route("/update/:id").put(authmiddleware, authcontroller.update)
router.route("/delete/:id").delete(authmiddleware, authcontroller.deletePost)
router.route("/comments").post( authcontroller.comments)
router.route("/comments/:id").get( authcontroller.commentsData)



module.exports = router;
