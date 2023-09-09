import { Router } from "express";

const path = require("path");

const router = Router();

router.get("^/$|/index(.html)?", (req, res) => {
  // res.sendFile(path.join(__dirname, "..", "views", "index.html"));
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));
});

export { router as rootRouter };
