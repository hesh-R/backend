import { Router } from "express";
import {
  firstLogin,
  loginEmployee,
  updatePassword,
} from "../controllers/employee";
import { isEmployee } from "../utils/authorisation";

const router = Router();

router.post("/login", isEmployee, loginEmployee);
router.post("/firstlogin", firstLogin);
router.put("/password-update/:staffId", updatePassword);

export default router;
