import { useNavigate } from "react-router";
import { useEffect, useState } from "react";
import EnhancedTable from "../../common/table/EnhancedTable";
import InvoiceDetailsModal from "./InvoiceDetail";
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
    id: "date",
    disablePadding: false,
    label: "تاریخ",
    type: "text",
  },
  {
    id: "time",
    disablePadding: false,
    label: "ساعت",
    type: "text",
  },
  {
    id: "customer",
    disablePadding: false,
    label: "نام/شماره خریدار",
    type: "text",
  },
  {
    id: "amount",
    disablePadding: false,
    label: "مبلغ",
    type: "number",
  },
];

type Order = "asc" | "desc";

const rows = [
  {
    id: 1,
    invoice_number: 1234,
    date: "1402/04/01",
    time: "14:00",
    customer: "علی رضایی",
    amount: 500000,
  },
  {
    id: 2,
    invoice_number: 1235,
    date: "1402/04/02",
    time: "15:30",
    customer: "مریم محمدی",
    amount: 750000,
  },
  {
    id: 3,
    invoice_number: 1236,
    date: "1402/04/03",
    time: "16:45",
    customer: "09121234567",
    amount: 300000,
  },
  {
    id: 4,
    invoice_number: 1237,
    date: "1402/04/04",
    time: "10:20",
    customer: "رضا احمدی",
    amount: 450000,
  },
  {
    id: 5,
    invoice_number: 1238,
    date: "1402/04/05",
    time: "12:50",
    customer: "فاطمه موسوی",
    amount: 600000,
  },
  {
    id: 6,
    invoice_number: 1239,
    date: "1402/04/06",
    time: "09:15",
    customer: "09351234567",
    amount: 350000,
  },
];

const InvoiceTable = () => {
  const navigate = useNavigate();
  // const [rows, setRows] = useState<Customer[]>([]);
  const [order, setOrder] = useState<Order>("asc");
  const [orderBy, setOrderBy] = useState<string>("registration_date");
  const [selected, setSelected] = useState<readonly number[]>([]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [open, setOpen] = useState(false);
  const [selectedRow, setSelectedRow] = useState<(typeof rows)[0] | null>(null);

  const handleClickOpen = (row: (typeof rows)[0]) => {
    setSelectedRow(row);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const actions = [
    {
      label: "مشاهده",
      function: (id: number) =>
        handleClickOpen(rows.find((row) => row.id === id)!),
    },
  ];

  useEffect(() => {
    console.log("rowsPerPage", rowsPerPage);
  }, [rowsPerPage]);

  return (
    <>
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
        totalSize={rows.length}
        setOrder={setOrder}
        setOrderBy={setOrderBy}
        setSelected={setSelected}
        setPage={setPage}
        setRowsPerPage={setRowsPerPage}
      />
      <InvoiceDetailsModal
        open={open}
        handleClose={handleClose}
        selectedRow={selectedRow}
      />
    </>
  );
};
export default InvoiceTable;
