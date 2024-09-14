import React from "react";
import {
  Alert,
  Box,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { ArrowLeft2 } from "iconsax-react";
import theme from "../../../theme";
import { useLowStockProducts } from "../../../api/dashboard/getLowStock";

const BankAccounts = () => {
  const { data, isLoading, error } = useLowStockProducts();

  if (isLoading) {
    return <Typography>در حال بارگذاری...</Typography>;
  }

  if (error) {
    return <Typography>خطا در بارگذاری داده‌ها</Typography>;
  }

  return (
    <Box
      component={Paper}
      className="px-8 py-6 h-full lg:col-span-2 overflow-auto"
    >
      <Box className="w-full justify-between items-center flex flex-row mb-4">
        <Typography variant="subtitle1" fontWeight={500}>
          کالاهای رو به اتمام
        </Typography>
        {/* <Button
          variant="text"
          size="small"
          sx={{ color: "#2C266A", columnGap: 1 }}
          endIcon={<ArrowLeft2 size={16} />}
        >
          مشاهده همه
        </Button> */}
      </Box>
      {data && data.length > 0 ? (
        <TableContainer sx={{ border: "none" }}>
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
              {data.map((product) => (
                <TableRow
                  key={product.barcode}
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
                    {product.barcode}
                  </TableCell>
                  <TableCell align="right">{product.name}</TableCell>
                  <TableCell
                    align="center"
                    sx={{
                      color:
                        product.stock === 0 ? theme.palette.error.main : "",
                    }}
                  >
                    {product.stock === 0
                      ? "ناموجود"
                      : product.stock.toLocaleString("fa-IR")}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      ) : (
        <Alert severity="info">محصولی یافت نشد</Alert>
      )}
    </Box>
  );
};

export default BankAccounts;
