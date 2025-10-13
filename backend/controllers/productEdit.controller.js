import { validationResult } from "express-validator";
import { ProductEditService } from "../services/productEdit.service";

export const UpdateProduct = async (req, res) => {
    const errors = validationResult(req);
      if (!errors.isEmpty()) return res.status(400).json({ ok: false, errors: errors.array() });
      
      try {
    
        const user = await ProductEditService(req.body);
        return res.status(201).json({ ok: true, message: "Producto actualizado", user });
    
      } catch (err) {
    
        if (err.code === "BAD_INPUT") return res.status(400).json({ ok: false, message: err.message });
        
        console.error("ProductEdit error:", err);
        return res.status(500).json({ ok: false, message: "Error interno del servidor" });
    
      }
    };

