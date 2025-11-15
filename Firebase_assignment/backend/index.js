import express from "express";
import { verifyToken } from "./middleware/auth.js";
import cors from "cors";

const app = express();

app.use(express.json());
app.use(cors());

app.get("/secure-data", verifyToken, (req, res) => {
  const firstName = req.user.name.split(" ")[0];
  const secretData = {
    user: req.user,
    message: "Your secrets are safe with us",
    firstName,
  };
  res.json(secretData);
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));
