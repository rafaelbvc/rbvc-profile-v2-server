import { NextFunction } from "express";
import logEvents from "./logEvents";


const logger = (req, res, next: NextFunction) => {
  logEvents(`${req.method}\t${req.url}\t${req.headers.origin}`, "reqLog.log");
  console.log(`${req.method} ${req.logEvents}`);
  next();
};

export default logger;
