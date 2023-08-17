import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

//DB Connection
import main from "./db.js";
//Routers
import manhwaRouter from "./routers/manhwaRouter.js";
import userRouter from "./routers/userRouter.js";
import welcomeRouter from "./routers/welcomeRouter.js";

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.use(welcomeRouter);
app.use(userRouter);
app.use(manhwaRouter);

app.listen(port, () => {
  console.log(`API launched on port ${port}`);
  try {
    main();
  } catch (e) {
    console.error(e);
  } finally {
    console.log("MongoDB is connected");
  }
});
