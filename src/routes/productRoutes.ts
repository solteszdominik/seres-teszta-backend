import { Router } from "express";
import {
  createProduct,
  getProductBySlug,
  getProducts,
  updateProduct,
} from "../controllers/productController";

const router = Router();

router.get("/", getProducts);
router.get("/:slug", getProductBySlug);

router.post("/", createProduct);
router.patch("/:id", updateProduct);

export default router;
