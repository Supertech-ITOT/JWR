"use client";

import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from "@/components/ui/table";
import { SensorData } from "@/constant/model";
import { format } from "date-fns";

const TableUI = () => {
    const Data = [...SensorData].sort(
        (a, b) => new Date(b.timestamp) - new Date(a.timestamp)
    );

    return (
        <div className="w-full overflow-x-auto">
            <div className="min-w-[400px]">
                {/* Header */}
                <Table>
                    <TableHeader>
                        <TableRow className="bg-primary text-white">
                            <TableHead className="text-center min-w-[100px]">DATE</TableHead>
                            <TableHead className="text-center min-w-[100px]">TIME</TableHead>
                            <TableHead className="text-center min-w-[100px]">TEMP °C</TableHead>
                            <TableHead className="text-center min-w-[100px]">RH%</TableHead>
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
                                        {format(row.timestamp, "dd MMM yyyy")}
                                    </TableCell>
                                    <TableCell className="text-center min-w-[100px]">
                                        {format(row.timestamp, "hh:mm:ss a")}
                                    </TableCell>
                                    <TableCell className="text-center min-w-[100px]">
                                        {row.avgTemp}
                                    </TableCell>
                                    <TableCell className="text-center min-w-[100px]">
                                        {row.rh}
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
