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

type Invoice = {
  id: number;
  invoice_number: number;
  date: string;
  time: string;
  customer: string;
  amount: number;
  payment_tracking_code: string;
};

type Item = {
  name: string;
  quantity: number;
  unit_price: number;
  discount: number;
};

interface InvoiceDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  selectedRow: Invoice | null;
}

// داده‌های فیک برای آیتم‌ها
const fakeItems: Item[] = [
  { name: "کالا ۱", quantity: 2, unit_price: 50000, discount: 5000 },
  { name: "کالا ۲", quantity: 1, unit_price: 120000, discount: 10000 },
  { name: "کالا ۳", quantity: 3, unit_price: 30000, discount: 0 },
];

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({
  open,
  handleClose,
  selectedRow,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      maxWidth="lg"
      PaperProps={{ sx: { padding: 2, width: 800 } }}
    >
      <DialogTitle
      // bgcolor={theme.palette.background.paper}
      >
        {selectedRow && (
          <Box
            component={Paper}
            className="grid grid-cols-2 p-5"
          >
            {/* شماره فاکتور */}
            <DialogContentText>
              شماره فاکتور: {selectedRow.invoice_number}
            </DialogContentText>

            {/* تاریخ و ساعت در یک خط */}
            <DialogContentText>
              تاریخ و ساعت: {selectedRow.date} - {selectedRow.time}
            </DialogContentText>

            {/* نام/شماره خریدار */}
            <DialogContentText>
              نام/شماره خریدار: {selectedRow.customer}
            </DialogContentText>

            {/* کد پیگیری پرداخت */}
            <DialogContentText>
              کد پیگیری پرداخت: {selectedRow.payment_tracking_code}
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
                <TableCell align="center">قیمت</TableCell>
                <TableCell align="center">تخفیف</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {fakeItems.map((item, index) => (
                <TableRow
                  key={index}
                  sx={{
                    "&:nth-of-type(odd)": {
                      backgroundColor: theme.palette.background.paper,
                    },
                  }}
                >
                  <TableCell align="right">{item.name}</TableCell>
                  <TableCell align="center">x{item.quantity}</TableCell>
                  <TableCell align="center">
                    {item.unit_price.toLocaleString()}
                  </TableCell>
                  <TableCell align="center">
                    {item.discount.toLocaleString()}
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <Box component={Paper} className="w-full grid grid-cols-4 items-center gap-5 p-5 mt-4">
          <Box className="flex items-center justify-between">
            <Typography variant="body2">تخفیف</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              1200000
            </Typography>
          </Box>
          <Box className="flex items-center justify-between">
            <Typography variant="body2">تخفیف</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              1200000
            </Typography>
          </Box>
          <Box className="flex items-center justify-between">
            <Typography variant="body2">تخفیف</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              1200000
            </Typography>
          </Box>
          <Box className="flex items-center justify-between">
            <Typography variant="body2">تخفیف</Typography>
            <Typography variant="body1" fontWeight={"bold"}>
              1200000
            </Typography>
          </Box>
        </Box>
      </DialogContent>
      
    </Dialog>
  );
};

export default InvoiceDetailsModal;
