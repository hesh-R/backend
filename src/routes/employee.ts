import { Router } from "express";
import {
  firstLogin,
  loginEmployee,
  updateEmployeeAvatar,
  updatePassword,
} from "../controllers/employee";
import { isEmployee } from "../utils/authorisation";

const router = Router();

router.post("/login", loginEmployee);
router.post("/firstlogin", firstLogin);
router.put("/password-update/:staffId", updatePassword);
router.put("/update", isEmployee, updateEmployeeAvatar);

export default router;
