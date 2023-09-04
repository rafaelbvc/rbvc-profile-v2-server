import { Router } from "express";
import path from "path";

const router = Router();

router.get("^/$|/index(.html)?", (req, res) => {
  res.sendFile(path.join(__dirname, "..", "views", "index.html"));

});

export { router as rootRouter };

// setTimeout(function () {
//   res.redirect("https://rbvc-profile.netlify.app/");
// }, 3000);