/**
 * @class ReportVO
 * @description Value Object representing a report.
 *
 * @param {Object} reportData - Report data.
 * @param {string} reportData.initialDate - The starting date for the report.
 * @param {string} reportData.endDate - The ending date for the report.
 * @param {Array<number>} reportData.type - List of report types (e.g., [1, 2, 3]).

 * @author Yahir Alfredo Tapia Sifuentes
 */


export class ReportVO {
  constructor({ initialDate, endDate, type }) {
    this.initialDate = initialDate
    this.endDate = endDate
    this.type = type
  }
}