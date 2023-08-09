import router from "../router.js";
import manwhaControllers from "../controllers/manhwaControllers.js";

const manhwaRouter = router;

//GET
manhwaRouter.get("/api/manhwa/all", manwhaControllers.getAll);

export default manhwaRouter;
