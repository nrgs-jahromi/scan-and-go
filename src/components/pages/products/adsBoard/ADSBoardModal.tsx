import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  TextField,
} from "@mui/material";
import theme from "../../../../theme";
import { useAddBanner } from "../../../../api/adsBoard/addADS";

interface Props {
  open: boolean;
  onClose: () => void;
  barcode: string;
}

const AddBannerModal: React.FC<Props> = ({ open, onClose, barcode }) => {
  const [image, setImage] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const { mutate: addBanner, isLoading } = useAddBanner();

  const handleImageChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  const handleSubmit = () => {
    if (image) {
      addBanner({ barcode, image });
    }
  };
  
  useEffect(() => {
    if (open) {
      // Reset form when modal opens
      setImage(null);
      setImagePreview(null);
    }
  }, [open]);

  return (
    <Dialog
      scroll="body"
      open={open}
      onClose={onClose}
      aria-labelledby="add-banner-title"
      aria-describedby="add-banner-description"
      PaperProps={{
        sx: { padding: "24px" },
      }}
    >
      <DialogTitle>
        <Box className="min-w-80 flex justify-between gap-20">
          <Box className="flex align-middle items-center gap-3">
            <Divider
              orientation="vertical"
              variant="middle"
              className="w-1 rounded-sm"
              sx={{ bgcolor: theme.palette.primary.main }}
            />
            <Typography variant="h6">افزودن بنر تبلیغاتی</Typography>
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ gap: 3, marginY: 2 }} className="space-y-4">
        <Box className="flex justify-between w-full">
          <Typography variant="custom">بارکد محصول</Typography>
          <Typography variant="custom">{barcode}</Typography>
        </Box>
        <Box>
          <Typography variant="body2" color="textSecondary" align="right">
            نسبت تصویر باید 9x16 باشد
          </Typography>
          <TextField
            fullWidth
            type="file"
            inputProps={{ accept: "image/*" }}
            sx={{ mt: 2 }}
            onChange={handleImageChange}
          />
          {imagePreview && (
            <Box mt={2}>
              <img
                src={imagePreview}
                alt="Preview"
                style={{ width: "100%", borderRadius: 8 }}
              />
            </Box>
          )}
        </Box>
      </DialogContent>
      <DialogActions sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}>
        <Button fullWidth variant="contained" onClick={handleSubmit} disabled={isLoading}>
          {isLoading ? "در حال ارسال..." : "ثبت بنر"}
        </Button>
        <Button fullWidth variant="outlined" onClick={onClose}>
          بستن
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default AddBannerModal;
