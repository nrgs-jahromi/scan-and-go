import React from "react";
import {
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody,
  Box,
  Typography,
} from "@mui/material";
import theme from "../../../theme";
import { useInvoiceDetail } from "../../../api/invoice/getInvoiceDetail";

interface InvoiceDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  InvoiceId: string;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  open,
  handleClose,
  InvoiceId,
}) => {
  // استفاده از هوک useInvoiceDetail برای دریافت اطلاعات فاکتور
  const { data: invoiceData, isLoading, error } = useInvoiceDetail(InvoiceId);

  // نمایش لودینگ و خطا
  if (isLoading) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>در حال بارگذاری...</DialogContent>
      </Dialog>
    );
  }

  if (error) {
    return (
      <Dialog open={open} onClose={handleClose}>
        <DialogContent>خطا در دریافت اطلاعات فاکتور</DialogContent>
      </Dialog>
    );
  }
  console.log("invoiceData :",invoiceData);
  

  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      PaperProps={{ sx: { padding: 2, width: 800 } }}
    >
      <DialogTitle>
        {invoiceData && (
          <Box component={Paper} className="grid grid-cols-2 p-5">
            <DialogContentText >
              شماره فاکتور: {invoiceData.invoice_number}
            </DialogContentText>
            <DialogContentText >
              تاریخ و ساعت: {invoiceData.invoice_number}
            </DialogContentText>
            <DialogContentText >
              خریدار: {invoiceData.invoice_number}
            </DialogContentText>
            <DialogContentText >
              کد پیگری پرداخت: _
            </DialogContentText>
          </Box>
        )}
      </DialogTitle>
      <DialogContent sx={{ width: "100%" }}>
        <TableContainer component={Paper} sx={{ width: "100%" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell align="right">نام</TableCell>
                <TableCell align="center">تعداد</TableCell>
                <TableCell align="center">قیمت واحد</TableCell>
                <TableCell align="center">قیمت کل بدون تخفیف</TableCell>
                <TableCell align="center">قیمت کل با تخفیف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {invoiceData.items.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                >
                  <TableCell align="right">{item.product.name}</TableCell>
                  <TableCell align="center">x{item.quantity}</TableCell>
                  <TableCell align="center">
                    {item.product.price.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {item.total_price_without_discount.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {item.total_price_with_discount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box
          component={Paper}
          className="w-full grid grid-cols-2 items-center gap-5 p-5 mt-4"
        >
          <Box className="flex items-center justify-between">
            <Typography variant="body2">مبلغ کل بدون تخفیف:</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {invoiceData?.total_price_without_discount.toLocaleString()}
            </Typography>
          </Box>
          <Box className="flex items-center justify-between">
            <Typography variant="body2">مالیات:</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {invoiceData.tax.toLocaleString()}
            </Typography>
          </Box>
          <Box className="flex items-center justify-between">
            <Typography variant="body2">تخفیف</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {(
                invoiceData?.total_price_without_discount -
                invoiceData?.total_price_with_discount
              ).toLocaleString()}
            </Typography>
          </Box>
          <Box className="flex items-center justify-between">
            <Typography variant="body2">مبلغ پرداخت‌شده</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              {invoiceData?.payable_amount.toLocaleString()}
            </Typography>
          </Box>
        </Box>
      </DialogContent>
    </Dialog>
  );
};

export default InvoiceDetailsModal;
