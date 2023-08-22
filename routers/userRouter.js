import router from "../router.js";
import hashPassword from "../auth/hashPassword.js";
import userControllers from "../controllers/userController.js";
import checkEmail from "../auth/checkEmail.js";
import verifyPassword from "../auth/verifyPassword.js";
import verifyToken from "../auth/verifyToken.js";

const userRouter = router;

//AUTH
userRouter.post("/api/users/register", hashPassword, userControllers.create);
userRouter.post("/api/users/login", checkEmail, verifyPassword);

//PUT
userRouter.put(
  "/api/users/:id/bookmark",
  verifyToken,
  userControllers.bookmark
);
userRouter.put(
  "/api/users/:id/admin",
  verifyToken,
  userControllers.passToAdmin
);

//GET
userRouter.get("/api/users/id/:id", verifyToken, userControllers.getById);
userRouter.get("/api/users/all", userControllers.getAll);

export default userRouter;
