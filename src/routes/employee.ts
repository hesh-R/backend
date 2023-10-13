import { Router } from "express";
import {
  firstLogin,
  loginEmployee,
  updateEmployeeAvatar,
  updatePassword,
} from "../controllers/employee";
import { isEmployee } from "../utils/authorisation";
import { cloudinaryMiddleware } from "../utils/cloudinary";

const router = Router();

router.post("/login", loginEmployee);
router.post("/firstlogin", firstLogin);
router.put("/password-update", isEmployee, updatePassword);
router.put("/update", isEmployee, cloudinaryMiddleware, updateEmployeeAvatar);

export default router;
