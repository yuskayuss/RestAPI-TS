import { Router } from "express";
import { login, register } from "../controllers/auth.controller";

const router = Router();

router.get("/test", (req, res) => {
  res.json({ message: "Auth route works!" });
});

router.post("/register", register);
router.post("/login", login); // loginKey = email / username

export default router;
