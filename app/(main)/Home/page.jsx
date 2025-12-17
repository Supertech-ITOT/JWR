import Card from "./_components/Card";
import Chart from "./_components/Chart";
import TableUI from "./_components/TableUI";


export const metadata = {
  title: "Overview",
  description: "",
};

export default function UsersTable() {
  return (
    <div className="h-full w-full bg-cardbackground rounded-xl shadow-xl p-6">
      <h1 className="sm:text-6xl font-bold  tracking-[2px] text-3xl text-primary">Overview</h1>
      {/* Card */}
      <div className="w-full flex flex-row gap-6 items-center mt-6 overflow-x-auto">
        <Card />


      </div>
      <div className="flex xl:flex-row flex-col w-full gap-6 mt-6">
        {/* Chart */}
        <div className="flex-2 bg-cardbackground border border-border rounded-xl shadow-xl w-full h-[600px] ">
          <Chart />
        </div>
        {/* Table */}
        <div className="flex-1 bg-cardbackground border border-border rounded-xl shadow-xl w-full xl:w-1/3 h-[600px]  flex flex-col overflow-hidden">
          <TableUI />
        </div>
      </div>
    </div>
  );
}
