import { Readable } from "stream";
import cloudinary from "../config/cloudinaryConfig";
import { upload } from "../config/multerConfig";

export const cloudinaryMiddleware = upload.single("avatar");

export const uploadToCloudinary = async (file: Express.Multer.File) => {
  return new Promise<string>((resolve, reject) => {
    const stream = cloudinary.uploader.upload_stream(
      { folder: "my-uploads" },
      (error, result: any) => {
        if (error) {
          reject(error);
        } else {
          resolve(result?.secure_url);
        }
      }
    );

    const readableStream = new Readable();
    readableStream.push(file.buffer);
    readableStream.push(null);
    readableStream.pipe(stream);
  });
};
