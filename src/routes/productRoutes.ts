import { Router } from "express";

import {
  createProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "../controllers/productController";

import { requireAdmin } from "../middleware/authMiddleware";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

router.post("/", requireAdmin, createProduct);
router.patch("/:id", requireAdmin, updateProduct);

export default router;
