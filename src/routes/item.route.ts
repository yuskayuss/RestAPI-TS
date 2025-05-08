import { Router } from "express";
import { createItem } from "../controllers/item.controller"; // Pastikan impor sudah benar

const router = Router();

// Menambahkan endpoint POST untuk menyimpan item dengan kode unik
router.post("/items", createItem);

export default router;
