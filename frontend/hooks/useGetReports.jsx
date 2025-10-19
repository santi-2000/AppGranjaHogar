import { useState } from 'react';
import ReportsProxy from '../proxies/ReportsServiceProxy.js';
import { ReportVO } from '../valueobjects/reports/ReportVO.jsx';
import * as FileSystem from 'expo-file-system/legacy';
import * as Sharing from 'expo-sharing';


const useGetReports = () => {
    const [datesSelected, setDatesSelected] = useState({});
    const [typesSelected, setTypesSelected] = useState([]);
    const [error, setError] = useState('');
    const { getPdfReport, getXLSXReport } = ReportsProxy();

    function selectDate(date) {
        let temporalDate = { ...datesSelected };
        console.log(date)

        if (Object.keys(temporalDate).length <= 0) {
            temporalDate[date.dateString] = { selected: true, color: "#00568F", timestamp: date.timestamp };
        } else if (Object.keys(temporalDate).length === 1) {
            temporalDate[date.dateString] = { selected: true, color: "#00568F", timestamp: date.timestamp };
        } else if (Object.keys(temporalDate).length > 1 || temporalDate[date.dateString]) {
            temporalDate = {};
        }

        setDatesSelected(temporalDate);
    }

    async function fetchFile(type) {
        try {
            let initialDate;
            let endDate;

            if (Object.keys(datesSelected).length != 2) return setError('Seleccione un rango de fechas válido');

            if (datesSelected[Object.keys(datesSelected)[0]].timestamp < datesSelected[Object.keys(datesSelected)[1]].timestamp) {
                initialDate = Object.keys(datesSelected)[0];
                endDate = Object.keys(datesSelected)[1];
            } else {
                initialDate = Object.keys(datesSelected)[1];
                endDate = Object.keys(datesSelected)[0];
            }

            if (typesSelected.length === 0) return setError('Seleccione al menos un tipo de reporte');

            if (Object.keys(datesSelected).length !== 2) {
                setError('Seleccione un rango de fechas válido');
                return false;
            }

            if (typesSelected.length === 0) {
                setError('Seleccione al menos un tipo de reporte');
                return false;
            }

            const reportVo = new ReportVO({
                initialDate,
                endDate,
                type: typesSelected
            });

            await getFile(type, reportVo);

        } catch (error) {
            console.log(error.message);
            setError(error.message);
        }

    }

    async function getFile(type, reportVo) {
        if (type === 'pdf') {
            const blob = await getPdfReport(reportVo)

            const base64data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            const fileUri = FileSystem.cacheDirectory + 'report.pdf';

            await FileSystem.writeAsStringAsync(fileUri, base64data, {
                encoding: 'base64',
            });

            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                alert('Compartir no está disponible en este dispositivo');
                return;
            }

            await Sharing.shareAsync(fileUri);
            console.log('PDF report shared successfully:', fileUri);
        } if (type === 'xlsx') {
            const blob = await getXLSXReport(reportVo)

            const base64data = await new Promise((resolve, reject) => {
                const reader = new FileReader();
                reader.onloadend = () => resolve(reader.result.split(',')[1]);
                reader.onerror = reject;
                reader.readAsDataURL(blob);
            });

            const fileUri = FileSystem.cacheDirectory + 'report.xlsx';

            await FileSystem.writeAsStringAsync(fileUri, base64data, {
                encoding: 'base64',
            });

            const isAvailable = await Sharing.isAvailableAsync();
            if (!isAvailable) {
                alert('Compartir no está disponible en este dispositivo');
                return;
            }

            await Sharing.shareAsync(fileUri);
            console.log('Excel report shared successfully:', fileUri);
        }
    }

    function validateSelections() {
        let initialDate;
        let endDate;

        if (Object.keys(datesSelected).length != 2) return setError('Seleccione un rango de fechas válido');

        if (datesSelected[Object.keys(datesSelected)[0]].timestamp < datesSelected[Object.keys(datesSelected)[1]].timestamp) {
            initialDate = Object.keys(datesSelected)[0];
            endDate = Object.keys(datesSelected)[1];
        } else {
            initialDate = Object.keys(datesSelected)[1];
            endDate = Object.keys(datesSelected)[0];
        }

        if (typesSelected.length === 0) return setError('Seleccione al menos un tipo de reporte');

        if (Object.keys(datesSelected).length !== 2) {
            setError('Seleccione un rango de fechas válido');
            return false;
        }

        if (typesSelected.length === 0) {
            setError('Seleccione al menos un tipo de reporte');
            return false;
        }

        return { initialDate, endDate };
    }

    return { selectDate, fetchFile, datesSelected, typesSelected, setTypesSelected, error }
}

export default useGetReports;