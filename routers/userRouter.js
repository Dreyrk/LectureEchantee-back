import router from "../router.js";
import hashPassword from "../auth/hashPassword.js";
import userControllers from "../controllers/userController.js";
import checkEmail from "../auth/checkEmail.js";
import verifyPassword from "../auth/verifyPassword.js";

const userRouter = router;

//AUTH
userRouter.post("/api/users/register", hashPassword, userControllers.create);
userRouter.post("/api/users/login", checkEmail, verifyPassword);

export default userRouter;
