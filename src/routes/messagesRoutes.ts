import { Router } from "express";
import {
  createNewMessage,
  deleteMessage,
  getAllMessages,
  updateMessage,
} from "../controllers/messagesController";
import verifyJWT from "../middleware/verifyJWT";

const router = Router();
router.use(verifyJWT);

router
  .route("/")
  .get(getAllMessages)
  .post(createNewMessage)
  .patch(updateMessage)
  .delete(deleteMessage);

export {router as messageRouter};
