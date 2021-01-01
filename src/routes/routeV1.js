const router = require("express").Router();
const userController = require("../controllers/userController");
const authController = require("../controllers/authController");
const transactionController = require("../controllers/transactionController");
const postController = require("../controllers/postController");
const projectController = require("../controllers/projectController");
const followController = require("../controllers/followController");

const { auth } = require("../middleware/auth");
const parser = require("../middleware/imageUpload");

router.post("/login", authController.login);
router.post("/register", authController.register);

router.get("/posts", auth, postController.getPosts);
router.get("/post/:id", auth, postController.getPost);
router.post(
  "/post",
  (req, res, next) => {
    console.log(req), next();
  },
  auth,
  parser.array("photos"),
  postController.createPost
);

router.get("/user", auth, userController.getUser);
router.patch("/user", auth, parser.single("avatar"), userController.updateUser);
router.get("/user/:id", auth, userController.getUserById);
router.post(
  "/upload-arts",
  auth,
  parser.array("image"),
  userController.uploadArt
);

router.post("/followed", auth, followController.followed);
router.delete("/unfollowed", auth, followController.unfollowed);

router.post("/hired", auth, transactionController.order);
router.get("/transactions", auth, transactionController.getTransactions);
router.patch("/transaction/:id", auth, transactionController.updateTransaction);

router.post(
  "/project",
  auth,
  parser.array("photos"),
  projectController.createProject
);
router.get("/project/:id", auth, projectController.getProject);

// router.get("/", controller.index);
// router.get("/", controller.index);
// router.post("/", controller.store);
// router.put("/", controller.update);
// router.delete("/", controller.destroy);

module.exports = router;
