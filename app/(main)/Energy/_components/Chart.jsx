"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tableData } from '@/constant/model';
import { useFilter } from '@/context/FilterContext';
import { BatteryCharging, House } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Chart = ({ isExport }) => {
  const [height, setHeight] = useState(260);
  const { roomCategory, setRoomCategory, parameter } = useFilter();

  const data = useMemo(() => {
    if (!tableData || tableData.length === 0) return []
    return tableData
      .filter((item) => item.category === roomCategory)
      .map((item) => ({
        name: item.RoomName,
        value: item.energy,
      }));
  }, [roomCategory, parameter])
  useEffect(() => {
    const updateHeight = () => {
      setHeight(window.innerWidth < 420 ? 260 : 550);
    };
    updateHeight();
    window.addEventListener("resize", updateHeight);
    return () => window.removeEventListener("resize", updateHeight);
  }, []);
  const CustomTooltip = ({ payload, active }) => {
    if (!active || !payload?.length) return null;
    const item = payload[0].payload;
    return (
      <div className='h-fit w-40 bg-cardbackground/80 border border-border rounded-xl p-2 text-sm'>
        <div className='flex gap-2 items-center'>
          <House className='text-primary size-4' />
          <span className='text-primary font-bold'>Room:</span>
          <strong className='text-secondary'>{item.name}</strong>
        </div>
        <div className='flex gap-2 items-center'>
          <BatteryCharging className='text-primary size-4' />
          <span className='text-primary font-bold'>Energy:</span>
          <strong className='text-secondary'>{item.value}Kwh</strong>
        </div>
      </div>
    )
  }
  const width = isExport ? 1920 : undefined;
  const ht = isExport ? 720 : undefined;

  const ChartBody = (
    <BarChart
      margin={{ bottom: 20, top: 20, right: 10 }}
      data={data}
      width={width}
      height={ht}

    >
      <CartesianGrid
        stroke="#03030314"
        strokeDasharray="0"
        vertical={false}
      />
      <XAxis
        dataKey="name"
        tick={{ className: "fill-current", fontSize: 12 }}
        tickMargin={10}
        interval={0}
        label={{
          value: "Room Name",
          position: "insideBottom",
          dy: 10,
          style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
          className: " fill-current",
        }}
      />
      <YAxis
        tick={{ className: " fill-current", fontSize: 12 }}
        label={{
          value: "Energry(KWH)",
          angle: -90,
          dx: 20,
          position: "insideLeft",
          style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
          className: "fill-current",
        }}
      />
      {isExport ? null : <Tooltip content={CustomTooltip} />}
      <Bar dataKey="value">
        {data.map((_, index) => {
          const color = index % 2 === 0 ? "#3dcd58" : "#3a80f6";
          return <Cell key={`cell-${index}`} fill={color} />;
        })}

        <LabelList
          dataKey="value"
          position="top"
          className=" fill-current"
          style={{ fontSize: 12 }}
        />
      </Bar>

    </BarChart >
  )


  return (
    <>
      <div className='mt-2 mr-2 flex justify-end gap-2'>
        <div className='w-[120px] h-fit rounded-xl overflow-hidden bg-cardbackground border-2 border-border'>
          <Select value={roomCategory} onValueChange={setRoomCategory}>
            <SelectTrigger className="w-full text-text text-xs bg-transparent" >
              <SelectValue placeholder="Select" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="+veRoom">
                +ve Room
              </SelectItem>
              <SelectItem value="-veRoom">
                -ve Room
              </SelectItem>
              <SelectItem value="Mezzanine">
                Mezzanine
              </SelectItem>
              <SelectItem value="Anteroom">
                Anteroom
              </SelectItem>
              <SelectItem value="Truckdock">
                Truckdock
              </SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      {isExport ? ChartBody : <ResponsiveContainer width="100%" height={height}>
        {ChartBody}
      </ResponsiveContainer>}

    </>
  )
}

export default Chart