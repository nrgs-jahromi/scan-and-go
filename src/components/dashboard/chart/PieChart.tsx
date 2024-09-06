import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";
import { Box, Paper, Typography } from "@mui/material";
import { useTopSellingProducts } from "../../../api/dashboard/getTopProducts";

const pieParams = { margin: { right: 5 } };

const CustomPieChart = () => {
  const { data: chartData = [], isLoading, error } = useTopSellingProducts();

  const colorPalette = React.useMemo(
    () => ["#E1DEFA", "#C2BDF5", "#675AE7", "#191440", "#8B80E0"],
    []
  );

  const formattedData = React.useMemo(
    () =>
      chartData.map((product, index) => ({
        id: index,
        value: product.total_sold,
        label: product.name,
        color: colorPalette[index % colorPalette.length],
      })),
    [chartData, colorPalette]
  );

  if (isLoading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  if (error) {
    return <Typography>خطا در بارگذاری داده‌ها</Typography>;
  }

  return (
    <Box
      component={Paper}
      className="py-6 px-8 row-span-1 md:col-span-2 w-full min-w-fit overflow-auto"
      height={"100%"}
    >
      <Box className="w-full text-right" flexGrow={1}>
        <Typography variant="subtitle1" fontWeight={500}>
          پرفروش‌ترین‌ها
        </Typography>
      </Box>
      <PieChart
        {...pieParams}
        series={[
          {
            data: formattedData,
            innerRadius: "30%",
            outerRadius: "80%",
            cx: "40%",
            cornerRadius:5,
            paddingAngle:5,
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
            padding: 5,
            itemGap: 20,
            hidden: true,
          },
        }}
        height={210}
      />
      <Box
        className="w-full text-right flex flex-wrap justify-between gap-2"
        flexGrow={1}
      >
        {formattedData.map((data) => (
          <Box key={data.id} className="flex gap-1">
            <Box className="rounded-full w-4 h-4" bgcolor={data.color} />
            <Typography variant="caption">{data.label}</Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default CustomPieChart;
