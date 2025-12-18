"use client";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { tableData } from '@/constant/model';
import { useFilter } from '@/context/FilterContext';
import { Cloud, House, Settings, Thermometer } from 'lucide-react';
import React, { useEffect, useMemo, useState } from 'react'
import { Bar, BarChart, CartesianGrid, Cell, LabelList, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts'

const Chart = () => {
  const [height, setHeight] = useState(260);
  const { roomCategory, setRoomCategory, parameter, setParameter } = useFilter();

  const data = useMemo(() => {
    if (!tableData || tableData.length === 0) return []
    return tableData
      .filter((item) => item.category === roomCategory)
      .map((item) => ({
        name: item.RoomName,
        value: parameter === "Temperature" ? item.avgTemp : item.rh,
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
          {parameter === "Temperature" ? <Thermometer className='text-primary size-4' /> : <Cloud className='text-primary size-4' />}
          <span className='text-primary font-bold'>{parameter?.slice(0, 4)}:</span>
          <strong className='text-secondary'>{item.value}</strong>
        </div>
      </div>
    )
  }
  const ChartBody = (
    <BarChart
      margin={{ bottom: 20, top: 10, right: 10 }}
      data={data}
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
          value: "Tag Name",
          position: "insideBottom",
          dy: 20,
          style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
          className: " fill-current",
        }}
      />
      <YAxis
        tick={{ className: " fill-current", fontSize: 12 }}
        label={{
          value: "Temperature",
          angle: -90,
          dx: 20,
          position: "insideLeft",
          style: { textAnchor: "middle", fontSize: 12, fontWeight: "bold" },
          className: "fill-current",
        }}
      />
      <Tooltip content={CustomTooltip} />
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
  const FilterSelect = (
    <div className='w-[120px] h-fit rounded-xl overflow-hidden bg-cardbackground border-2 border-border'>
      <Select value={parameter} onValueChange={setParameter}>
        <SelectTrigger className="w-full text-text text-xs bg-transparent" >
          {parameter === "Temperature" ? <Thermometer className='size-4 text-primary' /> : <Cloud className='size-4 text-primary' />}
          <SelectValue placeholder="Select" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="Temperature">
            Temp
          </SelectItem>
          <SelectItem value="Rh">
            RH%
          </SelectItem>
        </SelectContent>
      </Select>
    </div>
  );

  return (
    <>
      <div className='mt-2 mr-2 flex justify-end gap-2'>
        {roomCategory === "+veRoom" && FilterSelect}
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
      <ResponsiveContainer width="100%" height={height}>
        {ChartBody}
      </ResponsiveContainer>
    </>
  )
}

export default Chart