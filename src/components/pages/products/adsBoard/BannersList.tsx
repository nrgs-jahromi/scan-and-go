import React from "react";
import {
  Box,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Typography,
  CircularProgress,
} from "@mui/material";
import theme from "../../../../theme";
import BannerItem from "./BannerItem";
import { useBanners } from "../../../../api/adsBoard/getBanners";

interface Props {
  open: boolean;
  onClose: () => void;
}

const BannerListModal: React.FC<Props> = ({ open, onClose }) => {
    const { data: banners, isLoading, isError } = useBanners();


 
 

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
          <Box className=" align-middle items-center gap-3">
              <Typography variant="h6" fontWeight={"bold"}>بنرهای فروشگاه</Typography>
            
          </Box>
        </Box>
      </DialogTitle>
      <DialogContent sx={{ gap: 3, marginY: 2 }} className="space-y-4">
        
      {isLoading && <CircularProgress />}
        {isError && <Typography color="error">خطا در بارگذاری بنرها</Typography>}
        {!isLoading && !isError && banners?.length ? (
          banners.map((banner) => (
            <BannerItem
              key={banner.product_barcode}
              barcode={banner.product_barcode}
              image_url={banner.image_url}
              name={banner.product_name} 
            />
          ))
        ) : (
          <Typography>بنری یافت نشد</Typography>
        )}
      </DialogContent>
      <DialogActions
        sx={{ display: "flex", justifyContent: "space-between", gap: 2 }}
      >
        
      </DialogActions>
    </Dialog>
  );
};

export default BannerListModal;
