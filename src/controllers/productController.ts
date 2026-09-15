import { Request, Response } from "express";
import { productRepository } from "../repositories/productRepository";
import {
  createProductSchema,
  updateProductSchema,
} from "../schemas/productSchema";

export const getProducts = async (_req: Request, res: Response) => {
  const { data, error } = await productRepository.findAll();

  if (error) {
    return res.status(500).json({
      message: "A termékek lekérése sikertelen.",
      error: error.message,
    });
  }

  return res.status(200).json(data);
};

export const getProductBySlug = async (req: Request, res: Response) => {
  const slug = req.params.slug as string;

  const { data, error } = await productRepository.findBySlug(slug);

  if (error || !data) {
    return res.status(404).json({
      message: "A termék nem található.",
    });
  }

  return res.status(200).json(data);
};

export const createProduct = async (req: Request, res: Response) => {
  const parsed = createProductSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Hibás termékadatok.",
      errors: parsed.error.flatten(),
    });
  }

  const { data, error } = await productRepository.create(parsed.data);

  if (error) {
    return res.status(500).json({
      message: "A termék létrehozása sikertelen.",
      error: error.message,
    });
  }

  return res.status(201).json(data);
};

export const updateProduct = async (req: Request, res: Response) => {
  const id = req.params.id as string;

  const parsed = updateProductSchema.safeParse(req.body);

  if (!parsed.success) {
    return res.status(400).json({
      message: "Hibás termékadatok.",
      errors: parsed.error.flatten(),
    });
  }

  const { data, error } = await productRepository.updateById(id, parsed.data);

  if (error || !data) {
    return res.status(404).json({
      message: "A termék nem található vagy nem módosítható.",
      error: error?.message,
    });
  }

  return res.status(200).json(data);
};
