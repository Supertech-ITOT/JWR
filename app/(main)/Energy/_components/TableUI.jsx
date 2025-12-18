"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { tableData } from "@/constant/model";
import { useFilter } from "@/context/FilterContext";
import { useMemo } from "react";

const TableUI = () => {
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
    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[400px]">
                {/* Header */}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary text-white">
                            <TableHead className="text-center min-w-[100px]">ROOM NAME</TableHead>
                            <TableHead className="text-center min-w-[100px]">ENERGY(kWH)</TableHead>
                        </TableRow>
                    </TableHeader>
                </Table>

                {/* Body scroll Y only */}
                <div className="h-[550px] overflow-y-auto">
                    <Table>
                        <TableBody>
                            {Data.map((row, index) => (
                                <TableRow
                                    key={index}
                                    className={index % 2 === 0 ? "bg-muted/50" : "bg-background"}
                                >

                                    <TableCell className="text-center min-w-[100px]">
                                        {row.name}
                                    </TableCell>
                                    <TableCell className="text-center min-w-[100px]">
                                        {row.value}
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                </div>
            </div>
        </div>
    );
};

export default TableUI;
