import * as React from "react";
import {
  PieChart,
} from "@mui/x-charts/PieChart";
import { Box, List, Paper, Stack, Typography, useMediaQuery } from "@mui/material";

import theme from "../../../theme";


const pieParams = {  margin: { right: 5 } };
const CustomPieChart = () => {
  const color = React.useMemo(
    () => ["#E1DEFA", "#C2BDF5", "#675AE7", "#191440", "#8B80E0"],
    []
  );
  const chartData = [
    { id: 0, value: 10, label: "کالای 1", color: "#E1DEFA" },
    { id: 1, value: 15, label: "کالای 2", color: "#C2BDF5" },
    { id: 2, value: 20, label: "کالای 3", color: "#675AE7" },
    { id: 3, value: 20, label: "کالای 4", color: "#191440" },
    { id: 4, value: 25, label: "کالای 5", color: "#8B80E0" },
  ];
  return (
    <Box
      component={Paper}
      className="py-6 px-8 row-span-1  md:col-span-2  w-full min-w-fit overflow-auto"
     height={"100%"}
    >
      <Box className="w-full text-right" flexGrow={1}>
        <Typography variant="subtitle1" fontWeight={500}>
          طرح سرمایه گذاری
        </Typography>
      </Box>
      <PieChart
        {...pieParams}
        series={[
          {
            data: chartData,
            innerRadius: "50%",
            outerRadius: "70%",
            cx:'50%',
            
            cornerRadius: 5,
          },
        ]}
        slotProps={{
          legend: {
            direction: "row",
            position: { vertical: "bottom", horizontal: "middle" },
           padding:5,
            itemGap: 20,
            hidden:true
           
          },
        }}
       
        height={210}
      />
      <Box className="w-full text-right flex flex-wrap justify-between gap-2" flexGrow={1}>
      {chartData.map((data)=>(
        <Box className="flex gap-1">
        <Box className="rounded-full w-4 h-4" bgcolor={data.color}/>
        <Typography variant="caption" >{data.label}</Typography>
      
      </Box>
      ))}
       
      </Box>

      {/* <Stack direction="row" width="100%" textAlign="center" spacing={2}>
      <Box flexGrow={1}>
        <Typography>Default</Typography>
        <PieChart
          series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }]  , innerRadius: "65%",
          outerRadius: "90%",
          // paddingAngle: 1,
         
         }]}
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography>Palette</Typography>
        <PieChart
          colors={palette}
          series={[{ data: [{ value: 10 }, { value: 15 }, { value: 20 }] }]}
          {...pieParams}
        />
      </Box>
      <Box flexGrow={1}>
        <Typography>Item</Typography>
        <PieChart
          series={[
            { data: [{ value: 10, color: 'orange' }, { value: 15 }, { value: 20 }] },
          ]}
          {...pieParams}
        />
      </Box>
    </Stack> */}
    </Box>
  );
};
export default CustomPieChart;
