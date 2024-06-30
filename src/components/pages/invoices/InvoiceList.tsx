import PageHeader from "../pageHeader/PageHeader";
import { ArrowDown2 } from "iconsax-react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import DatePicker, { DateObject } from "react-multi-date-picker";
import "../../../assets/style/date-picker-style.css";
import { useState } from "react";
import { Box, Button, Paper } from "@mui/material";
import theme from "../../../theme";
import InvoiceTable from "./InvoiceTable";

const InvoiceList = () => {
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
    } else {
      return [];
    }
  };

  const formatDate = (date: DateObject) => {
    if (date) {
      return date.setLocale(persian_fa).format(" D  MMMM  ");
    } else {
      return "";
    }
  };

  const handleDateChange = (
    date: DateObject | DateObject[] | null,
    options: {
      validatedValue: string | string[];
      input: HTMLElement;
      isTyping: boolean;
    }
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
    <Box className=" w-full flex flex-col gap-5">

      <PageHeader
        title="فاکتورها"
        showSearchBar={true}
        buttons={[
          {
            text: "",
            onClick: () => {}, // Add default onClick
            customComponent: (
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
                    // size="small"
                    variant="contained"
                    endIcon={<ArrowDown2 size={16} />}
                    sx={{ gap: 1, height: "48px" }}
                  >{`${formatDate(values[0])} - ${formatDate(
                    values[1]
                  )}`}</Button>
                }
              />
            ),
          },
        ]}
      />
      
        <InvoiceTable />
      </Box>
   
  );
};

export default InvoiceList;
