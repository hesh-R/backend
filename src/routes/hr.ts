import { Router } from "express";
import { createHR, loginHR } from "../controllers/hr";
import { createEmployee } from "../controllers/employee";
import { isHr } from "../utils/authorisation";
import { cloudinaryMiddleware } from "../utils/cloudinary";

const router = Router();

router.post("/register", createHR);
router.post("/register-staff", isHr, cloudinaryMiddleware, createEmployee);
router.post("/login", loginHR);

export default router;
