import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";

import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import EnhancedTable from "../../../common/table/EnhancedTable";
type Customer = {
  id: number;
  registration_date: string;
  first_name: string;
  last_name: string;
  phone_number1: string;
  phone_number2: string;
};

const columns: TableColumnDef[] = [
  {
    id: "barcode",
    disablePadding: true,
    label: "کد محصول ",
    type: "number",
  },
  { id: "action", disablePadding: false, label: "عملیات", type: "text" },
  { id: "name", disablePadding: false, label: "نام", type: "text" },
  {
    id: "category",
    disablePadding: false,
    label: " دسته",
    type: "text",
  },
  {
    id: "count",
    disablePadding: false,
    label: "تعداد",
    type: "number",
  },
  {
    id: "price",
    disablePadding: false,
    label: "قیمت (ریال)",
    type: "number",
  },
];
type Order = "asc" | "desc";


const rows = [
  { id: 1, barcode: 123456, name: "خودکار آبی", category: "نوشت‌افزار", count: 50, price: 10000 },
  { id: 2, barcode: 123457, name: "دفتر 100 برگ", category: "دفتر و دفترچه", count: 30, price: 40000 },
  { id: 3, barcode: 123458, name: "مداد مشکی", category: "نوشت‌افزار", count: 100, price: 5000 },
  { id: 4, barcode: 123459, name: "پاک‌کن", category: "نوشت‌افزار", count: 75, price: 2000 },
  { id: 5, barcode: 123460, name: "خط‌کش 30 سانت", category: "لوازم هنری", count: 20, price: 15000 },
  { id: 6, barcode: 123461, name: "ماژیک رنگی", category: "لوازم هنری", count: 60, price: 12000 },
  { id: 7, barcode: 123462, name: "چسب نواری", category: "لوازم اداری", count: 40, price: 8000 },
  { id: 8, barcode: 123463, name: "گیره کاغذ", category: "لوازم اداری", count: 200, price: 3000 },
  { id: 9, barcode: 123464, name: "پوشه دکمه‌دار", category: "لوازم اداری", count: 35, price: 6000 },
  { id: 10, barcode: 123465, name: "دفترچه یادداشت", category: "دفتر و دفترچه", count: 45, price: 25000 },
  { id: 11, barcode: 123466, name: "ماژیک وایت‌برد", category: "نوشت‌افزار", count: 25, price: 7000 },
  { id: 12, barcode: 123467, name: "مدادتراش", category: "نوشت‌افزار", count: 80, price: 4000 },
  { id: 13, barcode: 123468, name: "کاغذ A4", category: "لوازم اداری", count: 500, price: 100000 },
];

const CustomerList = () => {
  const theme = useTheme();
const navigate = useNavigate();
// const [rows, setRows] = useState<Customer[]>([]);
const [order, setOrder] = useState<Order>("asc");
const [orderBy, setOrderBy] = useState<string>("registration_date");
const [selected, setSelected] = useState<readonly number[]>([]);
const [page, setPage] = useState(0);
const [rowsPerPage, setRowsPerPage] = useState(10);



const actions = [
  {
    label: "حذف",
    function: (id: number) =>
      console.log(`Delete user with ID: ${id}`,rows[id]),
  },
  {
    label: "ویرایش",
    function: (id: number) => {
      navigate(`${rows[id]}/`);
    },
  },
];


useEffect(() => {
  console.log("rowsPerPage", rowsPerPage);
}, [rowsPerPage]);

  return (
    <Box className=" w-full flex flex-col gap-5">
      <Box className="w-full flex justify-between">
        <Box className="flex align-middle items-center py-3 gap-3">
          <Divider
            orientation="vertical"
            variant="middle"
            className="w-1 rounded-sm"
            sx={{ bgcolor: theme.palette.primary.main }}
          />

          <Typography variant="h6">لیست محصولات</Typography>
        </Box>

        <Button variant="contained" sx={{ height: "48px", width: "120px", boxShadow: "none" }} onClick={()=>{navigate("/products/add")}}>
          افزودن محصول
        </Button>
      </Box>

      <EnhancedTable
          columns={columns}
          rows={rows}
          showCheckbox={true}
          actions={actions}
          order={order}
          orderBy={orderBy}
          selected={selected}
          page={page}
          isLoading={true}
          rowsPerPage={rowsPerPage}
          totalSize={rows.length}
          setOrder={setOrder}
          setOrderBy={setOrderBy}
          setSelected={setSelected}
          setPage={setPage}
          setRowsPerPage={setRowsPerPage}
        />
    </Box>
  );
};
export default CustomerList;
