import * as React from "react";
import { useState  , useMemo} from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "../../../theme";
import { ArrowDown2 } from "iconsax-react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "../../../assets/style/date-picker-style.css";
const CustomLineChart = () => {
  const color = useMemo(
    () => ["#C2BDF5", "#675AE7", "#E1DEFA", "#191440"],
    []
  );

  const [values, setValues] = useState<DateObject[]>([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  const generateRandomData = (length) => {
    return Array.from({ length }, () => Math.floor(Math.random() * 100) + 1);
  };

  const calculateDaysInInterval = () => {
    if (values[0] && values[1]) {
      const daysInInterval = []; 
      const startDate = values[0].toDate(); 
      const endDate = values[1].toDate(); 

      const currentDate = new Date(startDate); 
      while (currentDate <= endDate) {
        daysInInterval.push(currentDate.getDate()); // اضافه کردن روز به مقدار محور X
        currentDate.setDate(currentDate.getDate() + 1); // رفتن به روز بعدی
      }
      return daysInInterval;
    }
    else{
      return []
    }
  };

  const formatDate = (date: DateObject) => {
    if (date) {
      console.log("returnDataL", calculateDaysInInterval());
      return date.setLocale(persian_fa).format(" D  MMMM  ");
    } else {
      return "";
    }
  };

  const handleDateChange = (
    date: DateObject | DateObject[] | null,
    options: { validatedValue: string | string[]; input: HTMLElement; isTyping: boolean; }
  ) => {
    if (Array.isArray(date)) {
      setValues(date);
    } else if (date !== null) {
      setValues([date]);
    }
  };
  const daysInInterval = calculateDaysInInterval();
  const randomData = generateRandomData(daysInInterval.length);

  return (
    <Box component={Paper} className="py-6 px-8  lg:col-span-3 max-w-full overflow-auto"
    height={"100%"}>
      <Box className="w-full justify-between items-center flex flex-row">
        <Typography variant="subtitle1" fontWeight={500}>
          میزان فروش 
        </Typography>
        {/* Render the DatePicker input */}
        <DatePicker
          className="teal"
          value={values}
          onChange={handleDateChange}
          range
          calendar={persian}
          locale={persian_fa}
          calendarPosition="bottom-right"
          dateSeparator=" - "
          render={
            <Button
              size="small"
              endIcon={<ArrowDown2 size={16} />}
              sx={{ gap: 1, color: theme.palette.text.primary }}
            >{`${formatDate(values[0])} - ${formatDate(values[1])}`}</Button>
          }
        />
      </Box>

    {/* <Box className="w-full overflow-auto"> */}
    {/* <Box className="min-w-96 "> */}
     <LineChart
        xAxis={[{ data: calculateDaysInInterval() }]}
        series={[
          {
            data:randomData ,
          },
        ]}
        height={250}
        margin={{ right: 30, top: 30, bottom: 30 }}
        grid={{ vertical: true, horizontal: true }}
        sx={{ direction: "ltr"  , minWidth: 1000 , maxHeight:500 }}
        colors={color}
       
      />
     {/* </Box> */}
    </Box>
    // </Box>
  );
};

export default CustomLineChart;
