import router from "../router.js";
import manwhaControllers from "../controllers/manhwaControllers.js";

const manhwaRouter = router;

//GET
manhwaRouter.get("/api/manhwa/all", manwhaControllers.getAll);
manhwaRouter.get("/api/manhwa/id/:id", manwhaControllers.getById);
manhwaRouter.get("/api/manhwa/random", manwhaControllers.getRandom);
manhwaRouter.get("/api/manhwa/ongoing", manwhaControllers.getOngoing);
manhwaRouter.get("/api/manhwa/completed", manwhaControllers.getCompleted);
manhwaRouter.get("/api/manhwa/rating", manwhaControllers.getByRating);
manhwaRouter.get("/api/manhwa/title", manwhaControllers.getByTitle);

//POST
manhwaRouter.post("/api/manhwa/create", manwhaControllers.create);

export default manhwaRouter;
