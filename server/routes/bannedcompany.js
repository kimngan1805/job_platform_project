import express from "express";
import { getBannedCompanies, unbanCompany } from "../controllers/bannedcompany.js";

const router = express.Router();

// GET /bannedcompany/bannedcompanies
router.get("/bannedcompanies", getBannedCompanies);

// POST /bannedcompany/unban/:id
router.post("/unban/:id", unbanCompany);

export default router;