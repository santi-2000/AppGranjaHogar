import { ProductOutService } from "../services/productOuts.service.js";
import { validationResult } from 'express-validator';

export const ProductOutController = {
  async getAll(req, res) {
    try {
      const data = await ProductOutService.getAll();
      res.json(data);
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async getById(req, res) {
    try {
      const data = await ProductOutService.getById(req.params.id);
      res.json(data);
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    try {
      const id = await ProductOutService.create(req.body);
      res.status(201).json({ message: 'Producto de salida creado' });
    } catch (err) {
      res.status(500).json({ error: err.message });
    }
  },

  async update(req, res) {
    try {
      await ProductOutService.update(req.params.id, req.body);
      res.json({ message: 'Registro actualizado' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  },

  async remove(req, res) {
    try {
      await ProductOutService.remove(req.params.id);
      res.json({ message: 'Registro eliminado' });
    } catch (err) {
      res.status(404).json({ error: err.message });
    }
  }
};
