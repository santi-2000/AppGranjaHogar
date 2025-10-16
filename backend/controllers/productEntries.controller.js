import productEntriesService from "../services/productEntries.service.js";

exports.createEntry = async (req, res) => {
    try{ const newEntry = await productEntriesService.create(req.body);
        res.status(201).json({
            message: "Entrada de producto creada exitosamente",
            entry: newEntry,
        });
    }
    catch(error){
        console.error("Error al crear la entrada de producto:", error);
        res.status(400).json({ message: error.message });
    } 
}

exports.getAllEntries = async (req, res) => {
    try {
        const entries = await productEntriesService.getAll(req.body);
        res.status(200).json(entries);
    }
    catch(error) {
        res.status(500).json({ message: "Error al obtener las entradas de productos" });
    }
}

exports.getEntryById = async (req, res) => {
    try{
        const entry = await productEntriesService.getById(req.params.id);
        if(!entry){
            return res.status(404).json({ message: "Entrada de producto no encontrada" });
        }
        res.status(200).json(entry);
    }
    catch(error) {
        res.status(500).json({ message: "Error al obtener la entrada de producto" });
    }
}



