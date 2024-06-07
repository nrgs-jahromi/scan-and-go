import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Typography,
} from "@mui/material";
import { CloseCircle, TickCircle } from "iconsax-react";
import { FC } from "react";
import theme from "../../theme";

type Props = {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  description?: string;
  cancelButtonLabel?: string;
  confirmButtonLabel?: string;
  onCancelClick?: () => void;
  onConfirmClick: () => void;
  mode?: "error" | "info" | "success" | "primary";
  isConfirmLoading?: boolean;
};

const ConfirmationModal: FC<Props> = ({
  isOpen,
  onClose,
  title,
  description = "Are you sure?",
  cancelButtonLabel = "Cancel",
  confirmButtonLabel = "Confirm",
  onCancelClick,
  onConfirmClick,
  mode = "primary",
  isConfirmLoading,
}) => {
  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
      sx={{ padding: "32px" }}
    >
      {title && <DialogTitle id="alert-dialog-title">{title}</DialogTitle>}
      <DialogContent
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          gap: 3,
          marginY: 2,
        }}
      >
        {mode === "success" ? (
          <TickCircle
            variant="Bold"
            size={96}
            color={theme.palette.success.main}
          />
        ) : mode === "error" ? (
          <CloseCircle
            variant="Bold"
            size={96}
            color={theme.palette.error.main}
          />
        ) : (
          <></>
        )}
        <DialogContentText id="alert-dialog-description">
          <Typography variant="h5" align="center">{description}</Typography>
        </DialogContentText>
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        <Button
          fullWidth
          variant="outlined"
          onClick={onCancelClick || onClose}
          autoFocus
        >
          {cancelButtonLabel}
        </Button>
        <Button
          fullWidth
          disabled={isConfirmLoading}
          color="primary"
          // color={mode === "error" ? mode : "primary"}
          variant="contained"
          onClick={onConfirmClick || onClose}
        >
          {confirmButtonLabel}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ConfirmationModal;
