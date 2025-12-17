"use client"
import SensorReportPDF from '@/components/pdf/sensorReportpdf';
import { Button } from '@/components/ui/button'
import { SensorData } from '@/constant/model';
import { useFilter } from '@/context/FilterContext';
import { pdf } from '@react-pdf/renderer';
import { toPng } from 'html-to-image';
import { DownloadIcon } from 'lucide-react';
import React from 'react'

const Download = ({ id }) => {
    const { roomCategory } = useFilter();
    const handleDownload = async () => {
        const chart = document.getElementById("sensor-chart-visible");
        chart.style.display = "block";
        await new Promise((res) => setTimeout(res, 10));
        const dataUrl = await toPng(chart, {
            cacheBust: true,
            quality: 1,
        });
        chart.style.display = "none";
        const blob = await pdf(
            <SensorReportPDF data={SensorData} roomName={id} chartImg={dataUrl} category={roomCategory} />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `SensorReport${id}`;
        link.click();
        URL.revokeObjectURL(url);
    }
    return (
        <div className='size-8 '>
            <Button className=' rounded-md shadow  border border-border w-full h-full bg-primary' onClick={handleDownload} >
                <DownloadIcon className='size-4' />
            </Button>
        </div>
    )
}

export default Download