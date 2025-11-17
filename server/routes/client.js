import express from "express";
import {
  getProducts,
  getCustomers,
  getTransactions,
  getGeography,
  getCompanies,
} from "../controllers/client.js";

const router = express.Router();

router.get("/companies", getCompanies); // Sử dụng function mới router.get("/products", getProducts);
router.get("/customers", getCustomers);
router.get("/transactions", getTransactions);
router.get("/geography", getGeography);

export default router;
