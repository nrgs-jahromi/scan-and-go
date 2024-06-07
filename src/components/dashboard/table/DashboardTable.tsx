import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { Box, Button, Typography } from "@mui/material";
import { ArrowLeft2 } from "iconsax-react";

function createData(
  name: number,
  lastName: string,
  cost: number,
  time: string
) {
  return { name, lastName, cost, time };
}

const rows = [
  createData(8456892, "09138750959", 10657000, "10:30 "),
  createData(8456892, "09138750959", 10657000, "10:30"),
  createData(8456892, "09138750959", 10657000, "10:30 "),
  createData(8456892, "09138750959", 10657000, "10:30 "),
];

export default function BasicTable() {
  // const currentTime = moment().format("HH:mm");
  return (
    <Box
      component={Paper}
      className="px-8 py-6 h-full lg:col-span-3 overflow-auto"
    >
      <Box className="w-full  justify-between items-center flex flex-row mb-4 ">
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
                  // paddingRight: "64px",
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
            {rows.map((row) => (
              <TableRow
                key={row.name}
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
                  
                  {row.name}
                </TableCell>
                <TableCell align="center">{row.lastName}</TableCell>
                <TableCell align="center">
                  {row.cost.toLocaleString("fa-IR")}
                </TableCell>
                <TableCell align="center">{row.time}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
}
