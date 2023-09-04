import { Router } from "express";
import {
  createNewMessages,
  deleteMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/messagesController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();
// router.use(verifyJWT);

router
  .route("/")
  .get(getAllMessages)
  .post(createNewMessages)
  .patch(updateMessage)
  .delete(deleteMessage);

export {router as messageRouter};
