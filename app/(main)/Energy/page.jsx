import Filter from '@/components/filter';
import TableUI from './_components/TableUI';
import Chart from './_components/Chart';
import Download from './_components/Download';
import RoomTitle from './_components/RoomTitle';

import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

export const metadata = {
    title: "Energy Consumption",
    description: "",
};
const PowerPage = () => {
    return (
        <div
            className='h-full w-full bg-cardbackground rounded-xl shadow-xl p-6'>
            <h1 className='font-bold sm:text-6xl text-3xl text-primary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200'>{metadata.title} </h1>
            <RoomTitle />
            <div className='flex justify-end items-center gap-2 mt-4'>
                <Button className="h-8 bg-cardbackground text-primary border border-border">
                    <Calendar className='size-4 text-primary' />12 DEC 25 05:30 PM - 15 DEC 25 05:30 PM
                </Button>
                <Filter pageName="ColdRoom" isRoom={false} day={["Last 1 Hour", "Last 3 Hour", "Last 6 Hour", "Yesterday"]} />
                <Download />
            </div>
            <div className='mt-6 flex flex-col xl:flex-row gap-6 w-full '>
                <div className='flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px]'>

                    <Chart />
                    <div id='energy-chart-visible' className='hidden pointer-events-none' style={{ width: "1920px" }}>
                        <Chart isExport={true} />
                    </div>
                </div>
                <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden"> <TableUI /></div>
            </div>


        </div>
    )
}

export default PowerPage 