import { Box, Button, Paper, Typography } from "@mui/material";
import { Import } from "iconsax-react";
import UserAvatar from "./UserAvatar";

const GlobalInfo = () => {
  return (
    <Box
      component={Paper}
      height={"100%"}
      className="col-span-1 py-6 px-4 flex flex-col gap-8"
    >
      <Box className="w-full flex flex-col items-center">
        <UserAvatar />
        <Typography variant="body1" fontWeight={"500"}>
          لوازم التحریی سعید
        </Typography>
      </Box>
      <Box className="flex flex-col gap-3">
        <Typography variant="body1" fontWeight={"500"}>
          مشخصات فروشگاه{" "}
        </Typography>
        <Typography variant="body2"> نوع فروشگاه:</Typography>
        <Typography variant="body2">شماره تماس :</Typography>
        <Typography variant="body2"> ایمیل:</Typography>
        <Typography variant="body2"> شهر:</Typography>
        <Typography variant="body2"> استان:</Typography>
        <Typography variant="body2">آدرس :</Typography>
      </Box>
      <Box className="flex flex-col gap-3">
        <Typography variant="body1" fontWeight={"500"}>
          اشتراک{" "}
        </Typography>

        <Typography variant="body2">نوع طرح:</Typography>
        <Typography variant="body2">تاریخ شروع:</Typography>
        <Typography variant="body2">تاریخ پایان:</Typography>
        <Typography variant="body2"> روز باقی‌مانده:</Typography>

      </Box>
        <Button
          fullWidth
          variant="outlined"
          //   startIcon={<Import />}
        >
          تمدید اشتراک
        </Button>
    </Box>
  );
};
export default GlobalInfo;
