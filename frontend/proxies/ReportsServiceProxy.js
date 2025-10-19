import { API_BASE_URL } from '@env';

const ReportsProxy = () => {
    async function getPdfReport(reportVo) {
        const response = await fetch(API_BASE_URL + '/v1/reports/pdf', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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

    async function getXLSXReport(reportVo) {
        const response = await fetch(API_BASE_URL + '/v1/reports/xlsx', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
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