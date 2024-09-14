import React from "react";
import { Box, CircularProgress, Typography } from "@mui/material";
import StoreInfo from "./StoreInfo";
import QRCodeInfo from "./QRCodeInfo";
import BankInfo from "./BankInfo";
import MediaInfo from "./MediaInfo";
import WorkTimeInfo from "./WorkTimeInfo";
import { useStoreInformation } from "../../../api/store/getStoreInfo";

const StoreProfile = () => {
  const { data, isLoading, error  , refetch} = useStoreInformation();

  if (isLoading) {
    return <CircularProgress />;
  }

  if (error) {
    return <Typography color="error">خطا در بارگزاری اطلاعات</Typography>;
  }

//   const data: StoreT = {
//     store_id: "DPEP2T8D",
//     name: "فروشگاه نمونه",
//     trade_name: "فروشگاه بهترین‌ها",
//     registration_number: "1234567890",
//     owner_name: "احمد رضایی",
//     owner_national_code: "1234567890",
//     business_type: "خرده‌فروشی",
//     address: "تهران، خیابان ولی‌عصر، پلاک 100",
//     city: "تهران",
//     postal_code: "1111111111",
//     phone: "021-12345678",
//     email: "info@samplestore.com",
//     instagram: "@samplestore",
//     telegram: "@samplestore",
//     facebook: "facebook.com/samplestore",
//     bank_account_number: "9876543210",
//     bank_shaba_number: "IR123456789012345678901234567890",
//     bank_name: "بانک ملی ایران",
//     tax_number: "9876543210",
//     opening_hours: {
//         "شنبه": "09:00 - 18:00",
//         "یکشنبه": "09:00 - 18:00",
//         "دوشنبه": "09:00 - 18:00",
//         "سه‌شنبه": "09:00 - 18:00",
//         "چهارشنبه": "09:00 - 18:00",
//         "پنج‌شنبه": "09:00 - 18:00",
//         "جمعه": "تعطیل"
//     },
//     discount_policy: "10% تخفیف برای خریدهای بالای 100000 تومان",
//     security_certificates: "گواهینامه‌های امنیتی",
//     security_policy: "سیاست‌های امنیتی",
//     icon: "icon_url",
//     store_color: "#FF5733"
// };

  return (
    <Box
      sx={{
        display: 'grid',
        gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr', md: '1fr 1fr 1fr' },
        gap: 3,
        height: '100%',
        gridAutoRows: 'minmax(100px, auto)',
        overflow:"auto"
      }}
    >
      <Box
        sx={{
          gridColumn: '1 / span 1',
          display: 'flex',
          flexDirection: 'column',
          gap: 2,
        }}
      >
        <StoreInfo storeData={data} refetchStoreData={refetch} />
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '1 / span 1', sm: '2 / span 1' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
          justifyContent: "initial",
          width: "100%",
          alignItems: "start"
        }}
      >
        {/* <QRCodeInfo storeData={data} /> */}
        <MediaInfo storeData={data} />
        <WorkTimeInfo storeData={data} />
        {/* <BankInfo storeData={data} /> */}
      </Box>

      <Box
        sx={{
          gridColumn: { xs: '1 / span 1', sm: '3 / span 1' },
          display: 'flex',
          flexDirection: 'column',
          gap: 3,
        }}
      >
         <QRCodeInfo storeData={data} />
         <BankInfo storeData={data} />
        {/* <PersonalInformation userInfo={data} />
        <ChangePassword userInfo={data} /> */}
       </Box>
    </Box>
  );
};

export default StoreProfile;
