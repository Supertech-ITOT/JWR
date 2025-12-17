import Filter from '@/components/filter';
import TableUI from './_components/TableUI';
import Chart from './_components/Chart';
import FrequencyBtn from '@/components/FrequencyBtn';
import Download from './_components/Download';
import RoomTitle from './_components/RoomTitle';

export const metadata = {
    title: "Cold Room",
    description: "",
};
const ColdRoomPage = async ({ params }) => {
    const { id } = await params;

    return (
        <div
            className='h-full w-full bg-cardbackground rounded-xl shadow-xl p-6'>
            <h1 className='font-bold sm:text-6xl text-3xl text-primary tracking-[2px] uppercase animate-in slide-in-from-top-100 duration-1200'>{metadata.title} </h1>
            <RoomTitle id={id} />
            <div className='flex justify-end gap-2 mt-4'>
                <FrequencyBtn />
                <Filter pageName="ColdRoom" />
                <Download id={id} />
            </div>
            <div className='mt-6 flex flex-col xl:flex-row gap-6 w-full '>
                <div className='flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px]'>

                    <Chart />
                    <div id='sensor-chart-visible' className='hidden pointer-events-none' style={{ width: "1920px" }}>
                        <Chart isExport={true} />
                    </div>
                </div>
                <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px] flex flex-col overflow-hidden"> <TableUI /></div>
            </div>


        </div>
    )
}

export default ColdRoomPage 