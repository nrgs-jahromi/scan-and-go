import { Box, Divider, Typography, IconButton } from "@mui/material";
import { FC, useState } from "react";
import { API_BASE_URL } from "../../../../api/config";
import DeleteIcon from '@mui/icons-material/Delete';
import { useDeleteBanner } from "../../../../api/adsBoard/removeBanner";

type BannerT = {
  barcode: number;
  name: string;
  image_url: string;
};

const BannerItem: FC<BannerT> = ({ barcode, name, image_url }) => {
  const [isHovered, setIsHovered] = useState(false);
  const { mutate: deleteBanner } = useDeleteBanner();

  const handleDelete = () => {
    deleteBanner({ product_barcode: barcode.toString(), image_url }, {
      onSuccess: () => {
        console.log("Banner deleted successfully");
      },
      onError: (error) => {
        console.error("Error deleting banner:", error);
      },
    });
  };

  return (
    <Box
      className={`w-full ${isHovered ? 'bg-gray-200' : 'bg-white'} transition-colors duration-200`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        padding: 2,
        borderRadius: "8px",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {isHovered && (
        <Box
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            zIndex: 10,
            backgroundColor: "rgba(255, 255, 255, 0.8)",
            borderRadius: "50%",
          }}
        >
          <IconButton
            onClick={handleDelete}
            sx={{ color: "red" }}
          >
            <DeleteIcon />
          </IconButton>
        </Box>
      )}
      <Box className="flex w-full justify-between mb-2">
        <Typography variant="body1" fontWeight={"bold"} align="right">
          {name}
        </Typography>
        <Typography variant="body1" fontWeight={"bold"} align="left">
          {barcode}
        </Typography>
      </Box>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          aspectRatio: "16 / 9",
          borderRadius: "16px",
        }}
      >
        <img
          src={API_BASE_URL + image_url}
          alt="بنر تبلیغاتی"
          style={{
            cursor: "pointer",
            borderRadius: "16px",
            width: "100%",
            height: "100%",
            objectFit: "cover",
          }}
        />
      </Box>
      <Divider sx={{ my: 4 }} />
    </Box>
  );
};

export default BannerItem;
