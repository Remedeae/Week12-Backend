import express from "express";
import { verifyToken } from "./middleware/auth.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/secure-data", verifyToken, (req, res) => {
  res.json({
    message: "This is protected data",
    user: req.user,
  });
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
