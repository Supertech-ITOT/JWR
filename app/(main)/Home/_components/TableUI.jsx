"use client";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { tableData } from "@/constant/model";
import { useFilter } from "@/context/FilterContext";
import { useRouter } from "next/navigation";

const TableUI = () => {

    const router = useRouter();
    const { roomCategory, parameter, setSelectedRoom } = useFilter();
    const data = tableData.filter((item) => item.category === roomCategory);

    return (
        <>
            <Table className="w-full h-[50px]">
                <TableHeader>
                    <TableRow className="bg-primary text-white">
                        <TableHead className="text-center w-[84px]">SR NO</TableHead>
                        <TableHead className="text-center w-[100px]">ROOM NAME</TableHead>
                        {roomCategory === "+veRoom" && parameter === "Temperature" && <TableHead className="text-center w-[100px]">TEMP °C</TableHead>}
                        {roomCategory !== "+veRoom" && <TableHead className="text-center w-[100px]">TEMP °C</TableHead>}
                        {roomCategory === "+veRoom" && parameter === "Rh" && <TableHead className="text-center w-[100px]">RH%</TableHead>}
                    </TableRow>
                </TableHeader>
            </Table>
            <div className="overflow-auto h-[550px] ">
                <Table className="w-full">
                    <TableBody>
                        {data?.map((row, index) => (
                            <TableRow
                                key={index}
                                className={index % 2 === 0 ? "bg-muted/50" : "bg-background"}
                            >
                                <TableCell className="w-[84px] text-center" >
                                    <div className="w-6 h-6 rounded-full flex justify-center items-center bg-secondary text-white mx-auto">
                                        {index + 1}
                                    </div>
                                </TableCell>

                                <TableCell className="text-center w-[100px]">
                                    <Button variant="link" onClick={() => {
                                        router.push(`/ColdRoom/${row.RoomName}`);
                                        setSelectedRoom(row.RoomName);
                                    }}>
                                        {row.RoomName}
                                    </Button>
                                </TableCell>
                                {roomCategory === "+veRoom" && parameter === "Temperature" && <TableCell className="text-center w-[100px]">{row.avgTemp}</TableCell>}
                                {roomCategory !== "+veRoom" && <TableCell className="text-center w-[100px]">{row.avgTemp}</TableCell>}
                                {roomCategory === "+veRoom" && parameter === "Rh" && < TableCell className="text-center w-[100px]">{row.rh}</TableCell>}
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </div >
        </>
    );
}



export default TableUI;