import express from "express";
import {
     getUser,
     getJobPortalDashboardStats,
     loginAdmin,
} from "../controllers/general.js";

const router = express.Router();

router.post("/auth/login", loginAdmin);
router.get("/user/:id", getUser);
router.get("/dashboard", getJobPortalDashboardStats);
// router.get("/users:id", getUser);

export default router;
