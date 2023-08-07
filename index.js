import express from "express";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();

const port = process.env.PORT || 5000;
const app = express();

app.use(cors());
app.use(express.json());

app.listen(port, () => {
  console.log(`API launched on port ${port}`);
  try {
    main();
  } catch (e) {
    console.error(e);
  }
});
