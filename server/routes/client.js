import express from "express";
import {
  getUser,
  getCompanies,
} from "../controllers/client.js";
import { getJobPosts } from "../controllers/management.js";

const router = express.Router();

router.get("/companies", getCompanies); // Sử dụng function mới router.get("/products", getProducts);
router.get('/jobposts', getJobPosts)

router.get("/users", getUser);

export default router;
