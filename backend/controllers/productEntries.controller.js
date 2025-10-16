import { ProductEntriesService } from "../services/productEntries.service.js";

export class ProductEntriesController {
  static async createEntry(req, res) {
    try {
      const newEntry = await ProductEntriesService.create(req.body);
      res.status(201).json({
        message: "Entrada registrada correctamente",
        data: newEntry,
      });
    } catch (error) {
      res.status(400).json({ error: error.message });
    }
  }

  static async getAllEntries(req, res) {
    try {
      const entries = await ProductEntriesService.getAll();
      res.status(200).json(entries);
    } catch (error) {
      console.error(" Error al obtener entradas:", error);
      res.status(500).json({
        message: "Error al obtener las entradas de productos",
        error: error.message,
      });
    }
  }

  static async getEntryById(req, res) {
    try {
      const entry = await ProductEntriesService.getById(req.params.id);
      res.status(200).json(entry);
    } catch (error) {
      res.status(404).json({ error: error.message });
    }
  }
}