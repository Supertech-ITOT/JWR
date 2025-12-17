"use client"
import EnergyReport from '@/components/pdf/EnergyReportPdf';
import { Button } from '@/components/ui/button'
import { tableData } from '@/constant/model';
import { useFilter } from '@/context/FilterContext';
import { pdf } from '@react-pdf/renderer';
import { toPng } from 'html-to-image';
import { DownloadIcon } from 'lucide-react';
import React, { useMemo } from 'react'

const Download = ({ id }) => {
    const { roomCategory, parameter } = useFilter();

    const Data = useMemo(() => {
        if (!tableData || tableData.length === 0) return []
        return tableData
            .filter((item) => item.category === roomCategory)
            .map((item) => ({
                name: item.RoomName,
                value: item.energy,
            }));
    }, [roomCategory, parameter])
    const handleDownload = async () => {
        const chart = document.getElementById("energy-chart-visible");
        chart.style.display = "block";
        await new Promise((res) => setTimeout(res, 10));
        const dataUrl = await toPng(chart, {
            cacheBust: true,
            quality: 1,
        });
        chart.style.display = "none";
        const blob = await pdf(
            <EnergyReport data={Data} chartImg={dataUrl} category={roomCategory} />
        ).toBlob();

        const url = URL.createObjectURL(blob);
        const link = document.createElement("a");
        link.href = url;
        link.download = `EnergyReport${roomCategory}`;
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