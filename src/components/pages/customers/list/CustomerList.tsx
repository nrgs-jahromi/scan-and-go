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
  { id: 1, name: "Cupcake", calories: 305, fat: 3.7, carbs: 67, protein: 4.3 },
  { id: 2, name: "Donut", calories: 452, fat: 25.0, carbs: 51, protein: 4.9 },
  { id: 3, name: "Eclair", calories: 262, fat: 16.0, carbs: 24, protein: 6.0 },
  {
    id: 4,
    name: "Frozen yoghurt",
    calories: 159,
    fat: 6.0,
    carbs: 24,
    protein: 4.0,
  },
  {
    id: 5,
    name: "Gingerbread",
    calories: 356,
    fat: 16.0,
    carbs: 49,
    protein: 3.9,
  },
  {
    id: 6,
    name: "Honeycomb",
    calories: 408,
    fat: 3.2,
    carbs: 87,
    protein: 6.5,
  },
  {
    id: 7,
    name: "Ice cream sandwich",
    calories: 237,
    fat: 9.0,
    carbs: 37,
    protein: 4.3,
  },
  {
    id: 8,
    name: "Jelly Bean",
    calories: 375,
    fat: 0.0,
    carbs: 94,
    protein: 0.0,
  },
  { id: 9, name: "KitKat", calories: 518, fat: 26.0, carbs: 65, protein: 7.0 },
  {
    id: 10,
    name: "Lollipop",
    calories: 392,
    fat: 0.2,
    carbs: 98,
    protein: 0.0,
  },
  {
    id: 11,
    name: "Marshmallow",
    calories: 318,
    fat: 0,
    carbs: 81,
    protein: 2.0,
  },
  { id: 12, name: "Nougat", calories: 360, fat: 19.0, carbs: 9, protein: 37.0 },
  { id: 13, name: "Oreo", calories: 437, fat: 18.0, carbs: 63, protein: 4.0 },
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
