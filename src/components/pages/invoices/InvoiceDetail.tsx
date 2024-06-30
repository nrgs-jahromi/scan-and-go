import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, Box } from "@mui/material";
import theme from "../../../theme";

type Invoice = {
  id: number;
  invoice_number: number;
  date: string;
  time: string;
  customer: string;
  amount: number;
};

interface InvoiceDetailsModalProps {
  open: boolean;
  handleClose: () => void;
  selectedRow: Invoice | null;
}

const InvoiceDetailsModal: React.FC<InvoiceDetailsModalProps> = ({ open, handleClose, selectedRow }) => {
  return (
    <Dialog open={open} onClose={handleClose} maxWidth="lg" PaperProps={{sx:{padding:2   , width:800}}}>
      <DialogTitle bgcolor={theme.palette.primary.light} borderRadius={1}>
        <Box >ln</Box>
      </DialogTitle>
      <DialogContent sx={{width:"100%"}} >
        {selectedRow && (
          <>
            <DialogContentText>شماره فاکتور: {selectedRow.invoice_number}</DialogContentText>
            <DialogContentText>تاریخ: {selectedRow.date}</DialogContentText>
            <DialogContentText>ساعت: {selectedRow.time}</DialogContentText>
            <DialogContentText>نام/شماره خریدار: {selectedRow.customer}</DialogContentText>
            <DialogContentText>مبلغ: {selectedRow.amount}</DialogContentText>
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="primary">بستن</Button>
      </DialogActions>
    </Dialog>
  );
};

export default InvoiceDetailsModal;
