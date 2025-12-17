"use client";

import { Button } from "@/components/ui/button";
import { room, tableData } from "@/constant/model";
import { useFilter } from "@/context/FilterContext";
import { BatteryCharging, Cloud, Thermometer, Zap } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";

const RoomPage = () => {
    const pathname = usePathname();
    const router = useRouter();
    const { setSelectedRoom, setRoomCategory } = useFilter();

    const category = pathname.split("/")[2];
    const isEnergyPage = category === "energy";

    const [data, setData] = useState([]);
    const [inCategory, setInCategory] = useState(false);

    useEffect(() => {
        if (isEnergyPage) {
            const categoryData = Object.values(
                tableData.reduce((acc, item) => {
                    if (!acc[item.category]) {
                        acc[item.category] = {
                            category: item.category,
                            avgEnergy: item.avgEnergy,
                        };
                    }
                    return acc;
                }, {})
            );

            setData(categoryData);

        } else {
            setData(tableData.filter((item) => item.category === category));
        }
    }, [isEnergyPage, category]);

    const title = isEnergyPage ? "Room Energy" : room[category];

    const handleRoute = (value) => {
        if (isEnergyPage) {
            if (!inCategory) {
                setInCategory(true);
                setRoomCategory(value.category);
                setData(tableData.filter((item) => item.category === value.category));
            } else {
                setSelectedRoom(value.RoomName)
                router.push(`/PowerRoom/${value.RoomName}`);
            }
        } else {
            setSelectedRoom(value.RoomName);
            router.push(`/ColdRoom/${value.RoomName}`);
        }
    };

    return (
        <div className="h-full w-full rounded-2xl bg-cardbackground border border-border p-6">
            {/* Header */}
            <div className="mb-8">
                <h1 className="sm:text-6xl font-bold tracking-[2px] text-3xl text-primary">
                    {title}
                </h1>
                <p className="text-xl text-textsecondary font-semibold mt-1">
                    Select a room to view details
                </p>
            </div>

            {/* Grid */}
            <div className="grid gap-6 grid-cols-2 sm:grid-cols-3 md:grid-cols-6 xl:grid-cols-6 ">
                {data.map((item, idx) => (
                    <Button
                        key={idx}
                        onClick={() => handleRoute(item)}
                        variant="default"
                        className="h-28 w-full rounded-xl border border-border bg-background/80  transition-all flex flex-col items-start justify-between p-6 hover:scale-95 cursor-pointer"
                    >
                        {/* Title */}
                        <span className="text-lg font-bold  text-primary">
                            {isEnergyPage && !inCategory && item.category}
                            {isEnergyPage && inCategory && item.RoomName}
                            {!isEnergyPage && item.RoomName}
                        </span>

                        {/* Footer info */}
                        <div className="flex w-full justify-between text-sm text-text font-semibold">
                            <div className="flex justify-center items-center gap-2">
                                {!isEnergyPage && <Thermometer className="size-6 text-primary" />}
                                <span>
                                    {!isEnergyPage && `${item.avgTemp}°C`}
                                </span>
                            </div>
                            {!isEnergyPage && item.rh != null && (
                                <div className="flex justify-center items-center gap-2">
                                    <Cloud className="size-6 text-primary" />
                                    <span>{item.rh}% RH</span>
                                </div>
                            )}
                        </div>
                    </Button>
                ))}
            </div>
        </div>
    );
};

export default RoomPage;
