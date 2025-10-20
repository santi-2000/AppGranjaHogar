import { reportsService } from "../services/reports.service.js";
import { catchAsync } from "../middlewares/catchAsync.middleware.js";

class ReportsController {
  constructor() {
    this.postReportPDF = catchAsync(this.postReportPDF.bind(this));
    this.postReportXLSX = catchAsync(this.postReportXLSX.bind(this));
  }

  async postReportXLSX(req, res) {
    const { initialDate, endDate, type } = req.body;
    await reportsService.postReportXLSXService(res, 1, initialDate, endDate, type);
  }

  async postReportPDF(req, res) {
    const { initialDate, endDate, type } = req.body;
    await reportsService.postReportPDFService(res, 1, initialDate, endDate, type)
  }
}

export const reportsController = new ReportsController();