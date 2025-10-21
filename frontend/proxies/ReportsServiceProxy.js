import { API_BASE_URL } from '@env';
import * as SecureStore from 'expo-secure-store';

/**
 * ReportsProxy is a service that interacts with the backend API to fetch report data in different formats (PDF, XLSX).
 * @module proxies/ReportsServiceProxy
 * @description This module provides functions to interact with the reports API.
 * 
 * @author Yahir Alfredo Tapia Sifuentes
 * 
 * @returns {Object} An object containing the report fetching functions.
 * - `getPdfReport`: Fetches a PDF report.
 * - `getXLSXReport`: Fetches an XLSX report.
 * 
 * @example 
 * const { getPdfReport, getXLSXReport } = ReportsProxy();
 * const pdfReport = await getPdfReport(reportVo);
 * const xlsxReport = await getXLSXReport(reportVo);
 */

const ReportsProxy = () => {
    /**
     * Fetches the PDF report from the backend API.
     * @description This function sends a POST request to the backend with the provided `reportVo` object, which contains the necessary 
     * report parameters (date range, type). It retrieves a blob of data containing the PDF file.
     * 
     * @function getPdfReport
     * @param {ReportVO} reportVo - The report parameters, including the date range and report type.
     * @returns {Promise<Blob>} The blob of PDF report data.
     * @throws {Error} Throws an error if the response status is not OK or if the data is invalid.
     * 
     * @author Yahir Alfredo Tapia Sifuentes
     * 
     * @example
     * const pdfReport = await getPdfReport(reportVo);
     * // Handle the PDF blob
     */
    async function getPdfReport(reportVo) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/reports/pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(reportVo),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.blob();

        return data
    }

    /**
     * Fetches the XLSX report from the backend API.
     * @description This function sends a POST request to the backend with the provided `reportVo` object, which contains the necessary 
     * report parameters (date range, type). It retrieves a blob of data containing the XLSX file.
     * 
     * @function getXLSXReport
     * @param {ReportVO} reportVo - The report parameters, including the date range and report type.
     * @returns {Promise<Blob>} The blob of XLSX report data.
     * @throws {Error} Throws an error if the response status is not OK or if the data is invalid.
     * 
     * @author Yahir Alfredo Tapia Sifuentes
     * 
     * @example
     * const xlsxReport = await getXLSXReport(reportVo);
     * // Handle the XLSX blob
     */
    async function getXLSXReport(reportVo) {
        const token = await SecureStore.getItemAsync('token');

        const response = await fetch(API_BASE_URL + '/v1/reports/xlsx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(reportVo),
        });

        if (!response.ok) {
            if (response.status === 400) {
                throw new Error('Datos de entrada inválidos');
            } else if (response.status === 500) {
                throw new Error('Error al convertir');
            } else if (response.status === 503) {
                throw new Error('Servicio no disponible');
            } else {
                throw new Error('Error desconocido');
            }
        }

        const data = await response.blob();

        return data
    }

    return { getPdfReport, getXLSXReport };
};

export default ReportsProxy;