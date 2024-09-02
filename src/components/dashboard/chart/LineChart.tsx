import * as React from "react";
import { useState, useMemo } from "react";
import { LineChart } from "@mui/x-charts/LineChart";
import { Box, Button, Paper, Typography } from "@mui/material";
import theme from "../../../theme";
import { ArrowDown2 } from "iconsax-react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "../../../assets/style/date-picker-style.css";
import { useDailySales } from "../../../api/dashboard/getStatisticPayments";

// Define the type for the data returned by the API
type DailySalesData = { date: string; amount: number }[];

const CustomLineChart = () => {
  const color = useMemo(
    () => ["#C2BDF5", "#675AE7", "#E1DEFA", "#191440"],
    []
  );

  const [values, setValues] = useState<DateObject[]>([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);

  const startDateGregorian = values[0]?.toDate().toISOString().split("T")[0] || "";
  const endDateGregorian = values[1]?.toDate().toISOString().split("T")[0] || "";

  const { data, isLoading, isError } = useDailySales(startDateGregorian, endDateGregorian);

  const shouldRenderChart = startDateGregorian && endDateGregorian && !isLoading && !isError && data;

  // Extract the day and month in Persian for each data point
  const chartLabels = data?.map((item) => {
    const date = new Date(item.date);
    const persianDate = new DateObject(date).setCalendar(persian).setLocale(persian_fa);
    return persianDate.format("D MMMM");
  }) || [];

  const seriesData = data?.map((item) => item.amount) || [];

  const formatDate = (date: DateObject) => {
    return date ? date.setLocale(persian_fa).format("D MMMM") : "";
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

  return (
    <Box component={Paper} className="py-6 px-8 lg:col-span-3 max-w-full overflow-auto" height={"100%"}>
      <Box className="w-full justify-between items-center flex flex-row">
        <Typography variant="subtitle1" fontWeight={500}>
          میزان سود پرداختی
        </Typography>
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

      {shouldRenderChart && (
        <LineChart
          xAxis={[{ scaleType: 'point', data: chartLabels }]}
          series={[
            {
              data: seriesData, 
            },
          ]}
          height={250}
          margin={{ right: 30, top: 30, bottom: 30 , left:70 }}
          grid={{ vertical: true, horizontal: true }}
          sx={{ direction: "ltr", minWidth: 1000, maxHeight: 500 }}
          colors={color}
        />
      )}
    </Box>
  );
};

export default CustomLineChart;
