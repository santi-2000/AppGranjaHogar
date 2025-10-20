import { ReasonsService } from "../services/reasons.service.js";
import { validationResult } from "express-validator";

export const ReasonsController = {
  async getAll(req, res) {
    try {
      const result = await ReasonsService.getAll();
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  },

  async getById(req, res) {
    try {
      const result = await ReasonsService.getById(req.params.id);
      res.status(200).json(result);
    } catch (err) {
      console.error(err);
      res.status(404).json({ success: false, message: err.message });
    }
  },

  async create(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ success: false, errors: errors.array() });
    }

    try {
      const result = await ReasonsService.create(req.body);
      res.status(201).json(result);
    } catch (err) {
      console.error(err);
      res.status(500).json({ success: false, message: err.message });
    }
  },
};