import { Router } from "express";
import {
  updateUser,
  deleteUser,
  getAllUsers,
  createNewUser,
} from "../controllers/usersController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();
// router.use(verifyJWT);

router
  .route("/")
  .get(getAllUsers)
  .post(createNewUser)
  .patch(updateUser)
  .delete(deleteUser);

export { router as userRouter };
