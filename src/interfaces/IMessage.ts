import { Document } from "mongoose";

export interface IMessage extends Document {
  user: string;
  title: string;
  message: string;
}
