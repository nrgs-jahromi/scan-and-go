import { Box, Button, Divider, IconButton, Typography, useTheme } from "@mui/material";
import EnhancedTable from "../../../common/table/EnhancedTable";
import { useNavigate } from "react-router";

// const columns: GridColDef<(typeof rows)[number]>[] = [
//   { field: "date", headerName: "تاریخ ثبت", minWidth: 130, align: "right" },
//   {
//     field: "action",
//     headerName: "عملیات",
//     width: 90,

//     align: "right",
//     renderCell: (params) => (
//       <ActionMenu id={params.id} />
//     )
//   },

//   {
//     field: "name",
//     headerName: "نام ",
//     minWidth: 150,

//     align: "right",
//   },
//   {
//     field: "lastName",
//     headerName: "نام خانوادگی",
//     minWidth: 150,

//     align: "right",
//   },
//   {
//     field: "nationalId",
//     headerName: "کد ملی",

//     minWidth: 110,

//     align: "right",
//   },
//   {
//     field: "nationalId",
//     headerName: "کد ملی",

//     minWidth: 110,

//     align: "right",
//   },
//   {
//     field: "phoneNumber",
//     headerName: " شماره تماس",

//     minWidth: 110,

//     align: "right",
//   },
//   {
//     field: "guardian",
//     headerName: " قیم",

//     minWidth: 110,

//     align: "right",
//   },
//   {
//     field: "heirs",
//     headerName: " وارث",

//     minWidth: 110,

//     align: "right",
//     renderCell: (params) => (

//       <div>
//       {params.value.map((heir:string, index:number) => (
//         <Typography key={index}>{heir}</Typography>
//       ))}
//     </div>

//     )
//   },
//   {
//     field: "heirsShare",
//     headerName: "  سهم وارث (%)",

//     minWidth: 110,

//     align: "center",
//     renderCell: (params) => (

//       <div>
//       {params.value.map((share:number, index:number) => (
//         <Typography key={index}>{share}</Typography>
//       ))}
//     </div>

//     )
//   },
// ];

// const rows = [
//   {
//     id: "1",
//     date: "1403/03/10",
//     action: "مشاهده",
//     name: "علی",
//     lastName: "رضایی",
//     nationalId: "0012345678",
//     phoneNumber: "09123456789",
//     guardian: "مریم رضایی",
//     heirs: ["محمد رضایی", "فاطمه رضایی"],
//     heirsShare: [50, 50],
//   },
//   {
//     id: "2",
//     date: "1403/03/11",
//     action: "ویرایش",
//     name: "زهرا",
//     lastName: "احمدی",
//     nationalId: "0098765432",
//     phoneNumber: "09987654321",
//     guardian: "حسن احمدی",
//     heirs: ["علی احمدی"],
//     heirsShare: [100],
//   },
//   {
//     id: "3",
//     date: "1403/03/12",
//     action: "حذف",
//     name: "مینا",
//     lastName: "کریمی",
//     nationalId: "0076543210",
//     phoneNumber: "09121234567",
//     guardian: "نرگس کریمی",
//     heirs: ["فاطمه کریمی", "حسین کریمی"],
//     heirsShare: [60, 40],
//   },
// ];

const columns = [
  {
    id: "name",
    numeric: false,
    disablePadding: true,
    label: "Dessert (100g serving)",
  },
  { id: "action", numeric: true, disablePadding: false, label: "فعالیت" },
  { id: "calories", numeric: true, disablePadding: false, label: "Calories" },
  { id: "fat", numeric: true, disablePadding: false, label: "Fat (g)" },
  { id: "carbs", numeric: true, disablePadding: false, label: "Carbs (g)" },
  { id: "protein", numeric: true, disablePadding: false, label: "Protein (g)" },
];

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
const navigate = useNavigate()
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

      <EnhancedTable columns={columns} rows={rows} showCheckbox={true} />
    </Box>
  );
};
export default CustomerList;
