import * as React from "react";
import { Box, Button, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material";
import { ArrowLeft2 } from "iconsax-react";
import theme from "../../../theme";

function createData(
  name: number,
  lastName: string,
  cost: number,
  
) {
  return { name, lastName, cost };
}

const rows = [
  createData(123456, "محصول A", 0 ), 
  createData(789012, "محصول B", 5),
  createData(345678, "محصول C", 12),
  createData(901234, "محصول D", 0), 
]
const BankAccounts = () => {
  return (
    <Box
      component={Paper}
      className="px-8 py-6 h-full lg:col-span-2 overflow-auto"
    >
      <Box className="w-full justify-between items-center flex flex-row mb-4">
        <Typography variant="subtitle1" fontWeight={500}>
          کالاهای رو به اتمام
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
        <Table aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell
                align="right"
                sx={{
                  color: "#A3A3A3",
                  borderBottom: "none",
                }}
              >
                کد کالا
              </TableCell>
              <TableCell
                align="right"
                sx={{ color: "#A3A3A3", borderBottom: "none" }}
              >
                نام
              </TableCell>
              <TableCell
                align="center"
                sx={{ color: "#A3A3A3", borderBottom: "none" }}
              >
                تعداد
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
                <TableCell align="right">{row.lastName}</TableCell>
                <TableCell align="center" sx={{color:row.cost === 0 ? theme.palette.error.main:""}} >
                  {row.cost === 0 ? "ناموجود" : row.cost.toLocaleString("fa-IR")}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default BankAccounts;
