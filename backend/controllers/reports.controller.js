import { validationResult } from 'express-validator'
import { postReportPDFService, postReportXLSXService } from "../services/reports.service.js";
import db from "../models/index.js"

export const postReportXLSX = async (req, res) => {
  try {
    let result = validationResult(req);
    if (result.errors.length > 0) throw new BadRequestError(result);


    const { initialDate, endDate, type } = req.body;
    
    await postReportXLSXService(res, 1, initialDate, endDate, type);

  } catch (error) {
    console.log(error);
    res.status(500).send('Error generating Excel');
  }
} 

export const postReportPDF = async (req, res) => {
  try {
    let result = validationResult(req);
    console.log(req.body)

    if (result.errors.length > 0) return res.status(400).json({ success: false, error: result });

    const { initialDate, endDate, type } = req.body;

    await postReportPDFService(res, 1, initialDate, endDate, type)

  } catch (error) {
    console.log(error);
    res.status(500).send('Error generating PDF');
  }
}