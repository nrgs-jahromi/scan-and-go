import { Box, Divider, Paper, useMediaQuery } from "@mui/material";
import ShortReportCard from "./ShortReportCard";
import {
  ArchiveTick,
  BuyCrypto,
  Category2,
} from "iconsax-react";
import CustomLineChart from "./chart/LineChart";
import CustomPieChart from "./chart/PieChart";
import BasicTable from "./table/DashboardTable";
import BankAccounts from "./accounts/BankAccounts";
import { useStatistics } from "../../api/dashboard/getDashboardStatistics";

const Dashboard = () => {
  const isLargeScreen = useMediaQuery("(min-width: 640px)");
  const { data, isLoading, isError, error } = useStatistics();

  return (
    <Box className="h-full w-full flex flex-col gap-6">
      <Box
        component={Paper}
        width={"100%"}
        className="sm:flex items-center p-3 justify-between overflow-auto gap-4"
      >
        <ShortReportCard
          name="کالاهای موجود"
          report_value={data?.total_products}
          Icon={<Category2 />}
        />
        {isLargeScreen && <Divider orientation="vertical" variant="middle" sx={{ m: 0 }} />}
        <ShortReportCard
          name="فاکتورهای ثبت شده "
          report_value={data?.total_invoices}
          Icon={<ArchiveTick />}
        />
        {isLargeScreen && <Divider orientation="vertical" variant="middle" sx={{ m: 0 }} />}
        <ShortReportCard
          name="فروش کل"
          report_value={data?.total_revenue}
          unit="تومان"
          Icon={<BuyCrypto />}
        />
      </Box>
     
      <Box className="grid grid-rows-1 lg:grid-cols-5 gap-6 w-full ">
        <CustomLineChart />
        <CustomPieChart />
      </Box>
      <Box className="grid lg:grid-cols-5 gap-6 w-full h-fit ">
        <BasicTable />
        <BankAccounts />
      </Box>
    </Box>
  );
};

export default Dashboard;
