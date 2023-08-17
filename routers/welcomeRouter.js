import router from "../router.js";

const welcomeRouter = router;

welcomeRouter.get("/", (req, res) => {
  res.send(
    "<style>body { font-size: 32px; font-weight: 600; }</style> Welcome to LectureEnchantee API ! <br/> <br/> Routes availables: <br/> -'/api/manhwa/' + all, random, completed, etc... <br/> <br/> And more..."
  );
});

export default welcomeRouter;
