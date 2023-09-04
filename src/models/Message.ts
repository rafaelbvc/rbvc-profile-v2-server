import mongoose, { Schema } from "mongoose";
import { IMessage } from "../interfaces/IMessage";
// import Inc from "mongoose-sequence";

// //@ts-ignore
// const AutoIncrement = Inc(mongoose);

const messageSchema = new Schema(
  {
    user: {
      type: Schema.Types.ObjectId,
      required: true,
      ref: "User",
    },
    title: {
      type: String,
      required: false,
      min: 3,
      max: 30,
    },
    message: {
      type: String,
      required: false,
      min: 3,
      max: 5000,
    },
  },
  {
    timestamps: true,
  }
);

// // @ts-ignore
// messageSchema.plugin(AutoIncrement, {
//   inc_field: "messageId",
//   id: "MessageNums",
//   start_seq: 500,
// });

const Message = mongoose.model<IMessage>("Message", messageSchema);

export { Message, messageSchema };
