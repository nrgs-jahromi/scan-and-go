import React, { useCallback, useEffect, useState } from "react";
import {
  Box,
  Button,
  CircularProgress,
  Typography,
  useTheme,
} from "@mui/material";
import { useNavigate } from "react-router";
import DatePicker, { DateObject } from "react-multi-date-picker";
import { ArrowDown2 } from "iconsax-react";
import persian from "react-date-object/calendars/persian";
import persian_fa from "react-date-object/locales/persian_fa";
import EnhancedTable from "../../common/table/EnhancedTable";
import PageHeader from "../pageHeader/PageHeader";
import InvoiceDetailsModal from "./InvoiceDetail";
import { useInvoices } from "../../../api/invoice/getInvoices";
import moment from "jalali-moment";
import _ from "lodash";

type InvoiceData = {
  id: number;
  invoice_number: string;
  customer_phone: string;
  date_time: string;
  total_price: number;
};
const columns: TableColumnDef<InvoiceData>[] = [
  {
    id: "action",
    disablePadding: false,
    label: "عملیات",
    type: "text",
  },
  {
    id: "invoice_number",
    disablePadding: true,
    label: "شماره فاکتور",
    type: "number",
  },
  {
    id: "date_time",
    disablePadding: false,
    label: "تاریخ",
    type: "text",
    accessorFn: (v) => moment(v.date_time).locale("fa").format(" D MMMM "),
  },
  {
    id: "date_time",
    disablePadding: false,
    label: "ساعت",
    type: "text",
    accessorFn: (v) => moment(v.date_time).locale("fa").format(" HH:mm "),
  },
  {
    id: "customer_phone",
    disablePadding: false,
    label: "نام/شماره خریدار",
    type: "text",
  },
  {
    id: "total_price",
    disablePadding: false,
    label: "مبلغ",
    type: "number",
    accessorFn: (v) => v.total_price?.toLocaleString() || "-",
  },
];

type Order = "asc" | "desc";

const InvoiceList = () => {
  const navigate = useNavigate();
  const theme = useTheme();
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue, setDebouncedSearchValue] = useState("");
  const [rows, setRows] = useState<InvoiceData[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("invoice_number");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [values, setValues] = useState<DateObject[]>([
    new DateObject().subtract(4, "days"),
    new DateObject().add(4, "days"),
  ]);
  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<InvoiceData | null>(null);

  const formatDate = (date: DateObject) => {
    if (date) {
      return date.setLocale(persian_fa).format(" D  MMMM  ");
    } else {
      return "";
    }
  };
  const debounceSearch = useCallback(
    _.debounce((query) => {
      setDebouncedSearchValue(query);
    }, 1000),
    []
  );

  const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(event.target.value);
    debounceSearch(event.target.value);
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

  const startDate = values[0]?.toDate().toISOString().split("T")[0];
  const endDate = values[1]?.toDate().toISOString().split("T")[0];

  const { data, isLoading, isError, isSuccess } = useInvoices({
    params: {
      page: page + 1,
      page_size: rowsPerPage,
      create_time__gte: startDate,
      create_time__lte: endDate,
      search: debouncedSearchValue,
    },
  });

  const handleClickOpen = (row: InvoiceData) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actions: ActionTableT[] = [
    {
      label: "مشاهده",
      onClick: (id: number) => {
        handleClickOpen(rows[id]);
      },
    },
    {
      label: "ویرایش",
      onClick: (id: number) => {
        navigate(`/invoices/edit/${id}/`);
      },
    },
  ];

  useEffect(() => {
    if (isSuccess) {
      if (Array.isArray(data.results)) {
        const updatedRows = data.results.map((invoice, index) => ({
          id: index, // Use invoice.id for unique identification
          invoice_number: invoice.invoice_number,
          date_time: invoice.date_time,
          customer_phone: invoice.customer_phone,
          total_price: invoice.total_price,
        }));
        setRows(updatedRows);
        console.log("Updated rows:", updatedRows);
      } else {
        console.error(
          "Expected data.results to be an array, but got:",
          data.results
        );
      }
    }
  }, [data, isSuccess]);

  if (isLoading) return <CircularProgress />;
  if (isError) return <Typography>خطایی رخ داده است.</Typography>;

  return (
    <Box className="w-full flex flex-col gap-5">
      <PageHeader
        title="فاکتورها"
        showSearchBar={true}
        searchValue={searchValue}
        onSearchChange={handleSearchChange}
        buttons={[
          {
            text: "",
            onClick: () => {},
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
                    variant="contained"
                    endIcon={<ArrowDown2 size={16} />}
                    sx={{ gap: 1, height: "48px" }}
                  >
                    {`${formatDate(values[0])} - ${formatDate(values[1])}`}
                  </Button>
                }
              />
            ),
          },
        ]}
      />
      <EnhancedTable
        columns={columns}
        rows={rows}
        showCheckbox={false}
        actions={actions}
        order={order}
        orderBy={orderBy}
        selected={selected}
        page={page}
        isLoading={true}
        rowsPerPage={rowsPerPage}
        totalSize={data.count}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setSelected={setSelected}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
        onRowDoubleClick={(row) => {
          handleClickOpen(row);
        }}
      />
      {selectedRow && (
        <InvoiceDetailsModal
          open={open}
          handleClose={handleClose}
          InvoiceId={selectedRow?.invoice_number}
        />
      )}
    </Box>
  );
};

export default InvoiceList;
