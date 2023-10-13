import { Request } from "express";
import multer from "multer";

const storage = multer.memoryStorage();

const fileFilter = (req: Request | any, file: Express.Multer.File, cb: any) => {
  if (file.mimetype.startsWith("image/")) {
    cb(null, true);
  } else {
    cb(new Error("Only image files are allowed."), false);
  }
};

export const upload = multer({ storage, fileFilter });
