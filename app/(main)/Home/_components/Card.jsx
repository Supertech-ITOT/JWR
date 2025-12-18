"use client";

import React from 'react'
import { Leaf, Snowflake, Sun } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useRouter } from 'next/navigation';
import { useFilter } from '@/context/FilterContext';


const stat = [

    {
        label: "Total Power",
        value: "254.66 Kwh", category: "energy",
        icon: <Leaf className="size-6" style={{ color: "#166534" }} />,
        color: "#E9FBEF"
    },
    {
        label: "Running +ve Room",
        value: "26/30", category: "+veRoom",
        icon: <Sun className="size-6" style={{ color: "#C2410C" }} />,
        color: "#FFF5E8"
    },
    {
        label: "Running -ve Room",
        value: "15/17", category: "-veRoom",
        icon: <Snowflake className="size-6" style={{ color: "#1E40AF" }} />,
        color: "#E8F1FF"

    },

];

const Card = () => {
    const router = useRouter();
    const { setRoomCategory } = useFilter();
    return (
        <>
            {stat.map((item) => (
                <Button key={item.label} onClick={() => {
                    router.push(`Room/${item.category}`);
                    setRoomCategory(item.category)
                }} className="min-w-[300px] h-[120px] shadow-xl p-4 rounded-xl border border-border bg-cardbackground hover:bg-cardhover flex items-center gap-4">
                    <div style={{ backgroundColor: item.color }} className="rounded-full size-16 flex justify-center items-center">
                        {item.icon}
                    </div>
                    <div className="flex flex-col justify-start">
                        <strong className="font-bold text-text text-sm sm:text-xl">{item.value}</strong>
                        <span className="font-semibold text-textsecondary text-xs sm:text-lg ">{item.label}</span>
                    </div>
                </Button>
            ))
            }
        </>
    )
}

export default Card