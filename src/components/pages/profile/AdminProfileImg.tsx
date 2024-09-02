import React, { useEffect, useState } from "react";
import { Box, Paper, Typography, Divider, IconButton } from "@mui/material";
import theme from "../../../theme";
import { notif } from "../../common/notification/Notification";
import { useUpdateStoreInformation } from "../../../api/store/editStoreInfo";
import defaultProfile from "../../../assets/react.svg";
import { API_BASE_URL } from "../../../api/config";
import { Edit } from "iconsax-react";

type Props = {
  storeData: StoreT;
};
const StoreInfo: React.FC<Props> = ({ storeData }) => {
  const [uploadedImage, setUploadedImage] = useState<string | null>(
    storeData?.icon ?? null
  );
  const [isLoading, setIsLoading] = useState(false);

  const {
    mutate: updateAdminInfo,
    isSuccess: isChangeProfileSuccess,
    isError: isChangeProfileError,
    error: errorDescription,
  } = useUpdateStoreInformation();

  useEffect(() => {
    if (isChangeProfileSuccess) {
      notif("تصویر پروفایل با موفقیت تغییر کرد.", { variant: "success" });
      setIsLoading(false);
    } else if (isChangeProfileError) {
      notif(`${errorDescription}`, { variant: "error" });
      setIsLoading(false);
    }
  }, [isChangeProfileError, isChangeProfileSuccess]);

  return (
    <Box
      component={Paper}
      width={"100%"}
      height={"100%"}
      className="p-6 space-y-5"
      position="relative"
    >
      {/* <IconButton
        aria-label="edit"
        size="small"
        sx={{
          position: "absolute",
          top: theme.spacing(1),
          left: theme.spacing(1),
        }}
      >
        <Edit />
      </IconButton> */}
      <Box className="flex justify-start items-center gap-3">
        <Box width={88} height={88}>
          <img
            src={uploadedImage ? API_BASE_URL + uploadedImage : defaultProfile}
            alt="User"
            style={{
              width: "100%",
              height: "100%",
              borderRadius: "50%",
              border: `2px solid ${theme.palette.primary.light}`,
            }}
          />
        </Box>
        <Box className="flex flex-col justify-between">
          <Typography variant="h6" fontWeight={"bold"}>
            {storeData.name || "-"}
          </Typography>
          <Typography
            variant="caption"
            color={theme.palette.primary.main}
            fontWeight={"bold"}
          >
            {storeData.business_type || "-"}
          </Typography>
          <Typography variant="body2">{storeData.trade_name || "-"}</Typography>
        </Box>
      </Box>
      <Divider />
      <Box className="space-y-3">
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">نام مالک</Typography>
          <Typography variant="body2">{storeData.owner_name || "-"}</Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">کد ملی مالک</Typography>
          <Typography variant="body2">
            {storeData.owner_national_code || "-"}
          </Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">شماره همراه</Typography>
          <Typography variant="body2">{storeData.phone || "-"}</Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">تلفن</Typography>
          <Typography variant="body2">{storeData.phone || "-"}</Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">شماره ثبت</Typography>
          <Typography variant="body2">
            {storeData.registration_number || "-"}
          </Typography>
        </Box>
       
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">شماره مالیاتی</Typography>
          <Typography variant="body2">{storeData.tax_number || "-"}</Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">سیاست تخفیف</Typography>
          <Typography variant="body2">
            {storeData.discount_policy || "-"}
          </Typography>
        </Box>{" "} 
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">رنگ سازمانی</Typography>
          <Typography variant="body2">
            {storeData.s || "-"}
          </Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">کد پستی</Typography>
          <Typography variant="body2">
            {storeData.postal_code || "-"}
          </Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">شهر</Typography>
          <Typography variant="body2">{storeData.city || "-"}</Typography>
        </Box>
        <Box className="flex w-full justify-between items-center">
          <Typography variant="body1">آدرس</Typography>
          <Typography variant="body2">{storeData.address || "-"}</Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default StoreInfo;
