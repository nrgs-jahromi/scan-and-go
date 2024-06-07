import { Box } from "@mui/material";
import ShortReportCard from "./ShortReportCard";
import { ArchiveTick, BuyCrypto, CardTick1, Category2, ConvertCard, Import, Profile2User } from "iconsax-react";
import CustomLineChart from "./chart/LineChart";
import CustomPieChart from "./chart/PieChart";
import BasicTable from "./table/DashboardTable";
import BankAccounts from "./accounts/BankAccounts";

const Dashboard = () => {
  return (
    <Box className=" h-full w-full  flex flex-col gap-6">
      <Box className="flex w-full gap-6 overflow-auto ">
        <ShortReportCard
          name="کالاهای موجود"
          report_value={2500}
         
          Icon={<Category2 />}
        />
        <ShortReportCard
          name="فاکتورهای ثبت شده "
          report_value={20100}
          Icon={<ArchiveTick />}
        />
        <ShortReportCard
          name=" فروش کل"
          report_value={100000000000}
          unit="تومان"
          Icon={<BuyCrypto />}
        />
        {/* <ShortReportCard
          name="سرمایه گذاری خاتمه یافته"
          report_value={1800000}
          Icon={<CardTick1 />}
        /> */}
      </Box>
      <Box className="grid grid-rows-1 lg:grid-cols-5 gap-6 w-full ">
        <CustomLineChart />
        <CustomPieChart />
       
      </Box><Box className="grid  lg:grid-cols-5 gap-6 w-full h-fit ">
      <BasicTable />
        <BankAccounts/>
      </Box>
    </Box>
  );
};
export default Dashboard;
