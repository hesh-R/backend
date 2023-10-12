import { Request } from "express";
import multer from "multer";
import path from "path";

export default multer({
  storage: multer.diskStorage({}),
  fileFilter: (req: Request | any, file: Express.Multer.File, cb: any) => {
    let ext = path.extname(file.originalname);
    if (ext !== ".jpg" && ext !== ".jpeg" && ext !== ".png") {
      cb(new Error("Unsupported file type!"), false);
      return;
    }
    cb(null, true);
  },
});
