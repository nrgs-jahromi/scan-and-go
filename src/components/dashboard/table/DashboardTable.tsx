import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography, CircularProgress } from "@mui/material";
import { ArrowLeft2 } from "iconsax-react";
import { useDailyInvoices } from "../../../api/dashboard/getTodayInvoices";
import moment from "jalali-moment";

export default function BasicTable() {
  const todayDate = new Date().toISOString().split("T")[0];

  const { data, isLoading, isError } = useDailyInvoices({ date: todayDate });

  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <CircularProgress />
      </Box>
    );
  }

  if (isError) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100%">
        <Typography color="error">خطا در دریافت اطلاعات</Typography>
      </Box>
    );
  }

  return (
    <Box
      component={Paper}
      className="px-8 py-6 max-h-fit lg:col-span-3 overflow-auto"
    >
      <Box className="w-full justify-between items-center flex flex-row mb-4">
        <Typography variant="subtitle1" fontWeight={500}>
          فاکتورهای امروز
        </Typography>
        <Button
          variant="text"
          size="small"
          sx={{ color: "#2C266A", columnGap: 1 }}
          endIcon={<ArrowLeft2 size={16} />}
        >
          مشاهده همه
        </Button>
      </Box>
      <TableContainer component={Paper} sx={{ border: "none" }}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{
                  color: "#A3A3A3",
                  borderBottom: "none",
                }}
              >
                شماره فاکتور
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#A3A3A3", borderBottom: "none" }}
              >
                شماره همراه
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#A3A3A3", borderBottom: "none" }}
              >
                مبلغ&nbsp;(ریال)
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#A3A3A3", borderBottom: "none" }}
              >
                زمان
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.slice(0,5 ).map((row) => (
              <TableRow
                key={row.invoice_number}
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  ":hover": {
                    bgcolor: "#F0EEFD",
                  },
                  borderRadius: "8px",
                }}
              >
                <TableCell
                  align="right"
                  sx={{
                    display: "flex",
                    flexDirection: "row",
                    gap: 1,
                    alignItems: "center",
                  }}
                >
                  {row.invoice_number}
                </TableCell>
                <TableCell align="center">{row.customer_mobile_number}</TableCell>
                <TableCell align="center">
                  {row.total_amount.toLocaleString("fa-IR")}
                </TableCell>
                <TableCell align="center">{ moment(row.create_time).locale("fa").format(" HH:mm ")}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
