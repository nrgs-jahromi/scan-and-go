import { Box, Paper, Typography, useTheme } from "@mui/material";
import { useFormikContext } from "formik";

const ConfirmInformation = () => {
  const { values } = useFormikContext<CustomerFormT>();
  const theme = useTheme();

  const customerInfo: { key: keyof CustomerInfoT, label: string }[] = [
    { key: "customer_registration_date", label: "تاریخ ثبت" },
    { key: "customer_first_name", label: "نام" },
    { key: "customer_last_name", label: "نام خانوادگی" },
    { key: "customer_birth_date", label: "تاریخ تولد" },
    { key: "customer_national_code", label: "کد ملی" },
    { key: "customer_id_number", label: "شماره شناسنامه" },
    { key: "customer_father_name", label: "نام پدر" },
    { key: "customer_job_title", label: "شغل" },
    { key: "customer_phone_number2", label: "تلفن ثابت" },
    { key: "customer_phone_number1", label: "شماره همراه" },
    { key: "customer_zip_code", label: "کد پستی" },
    { key: "customer_state", label: "استان" },
    { key: "customer_address", label: "آدرس" },
  ];

  const HeiresInfo: { key: keyof HeirInfoT, label: string }[] = [
    { key: "heir1_first_name", label: "نام" },
    { key: "heir1_last_name", label: "نام خانوادگی" },
    { key: "heir1_relation", label: " نسبت" },
    { key: "heir1_national_code", label: "کد ملی" },
    { key: "heir1_phone_number", label: "شماره همراه" },
    { key: "heir1_share_percentage", label: "میزان سهم " },
    { key: "heir1_address", label: "آدرس" },
  ];

  const GuardianInfo: { key: keyof GuardianInfoT, label: string }[] = [
    { key: "guardian1_first_name", label: "نام" },
    { key: "guardian1_last_name", label: "نام خانوادگی" },
    { key: "guardian1_relation", label: " نسبت" },
    { key: "guardian1_national_code", label: "کد ملی" },
    { key: "guardian1_phone_number", label: "شماره همراه" },
    { key: "guardian1_zip_code", label: " کد پستی " },
    { key: "guardian1_address", label: "آدرس" },
  ];

  const ReferInfo: { key: keyof RefererInfoT, label: string }[] = [
    { key: "referer1_first_name", label: "نام" },
    { key: "referer1_last_name", label: "نام خانوادگی" },
    { key: "referer1_national_code", label: "کد ملی" },
    { key: "referer1_phone_number", label: "شماره همراه" },
  ];

  const BankInfo: { key: keyof BankInfoT, label: string }[] = [
    { key: "bank1_first_name", label: "نام" },
    { key: "bank1_last_name", label: "نام خانوادگی" },
    { key: "bank1_account_number", label: "شماره حساب" },
    { key: "bank1_card_number", label: "شماره کارت" },
    { key: "bank1_iban_number", label: "شماره شبا" },
    { key: "bank1_name", label: "نام بانک" },
  ];
  

  return (
    <Box
      component={Paper}
      className="w-full h-full bg-red-200 "
      height={"100%"}
     
    >
      <Box
        sx={{
         
          top: 0,
          borderRadius: "8px  8px 0 0",
          width: "100%",
          bgcolor: theme.palette.primary.light,
          height: "64px",
          paddingX: "24px",
          display: "flex",
          alignItems: "center",
        }}
      >
        <Typography variant="h6"> تایید اطلاعات </Typography>
      </Box>
      <Box height={"100%"}  padding={4}>
        <Typography variant="custom" color={theme.palette.primary.main} >
          مشخصات اولیه
        </Typography>

        <Box className="md:grid md:grid-cols-4  gap-4 w-full mt-2 mb-6">
         
          {customerInfo.map((info, index) => (
            <Box key={index} className="w-full flex gap-1 mb-1"  sx={{
              gridColumn: (info.label.includes("آدرس")) ? "span 4" : "span 1"
            }}>
              <Typography variant="customBold">{info.label}:</Typography>
              <Typography variant="body1">
                {values[info.key]}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="custom" color={theme.palette.primary.main} >
          مشخصات وارث
        </Typography>

        <Box className="md:grid md:grid-cols-4  gap-4 w-full mt-2 mb-6">
         
          {HeiresInfo.map((info, index) => (
            <Box key={index} className="w-full flex gap-1 mb-1"  sx={{
              gridColumn: (info.label.includes("آدرس")) ? "span 2" : "span 1"
            }}>
              <Typography variant="customBold">{info.label}:</Typography>
              <Typography variant="body1">
                {values[info.key]}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="custom" color={theme.palette.primary.main} >
          مشخصات قیم
        </Typography>

        <Box className="md:grid md:grid-cols-4  gap-4 w-full mt-2 mb-6">
         
          {GuardianInfo.map((info, index) => (
            <Box key={index} className="w-full flex gap-1 mb-1"  sx={{
              gridColumn: (info.label.includes("آدرس")) ? "span 2" : "span 1"
            }}>
              <Typography variant="customBold">{info.label}:</Typography>
              <Typography variant="body1">
                {values[info.key]}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="custom" color={theme.palette.primary.main} >
          مشخصات معرف
        </Typography>

        <Box className="md:grid md:grid-cols-4  gap-4 w-full mt-2 mb-6">
         
          {ReferInfo.map((info, index) => (
            <Box key={index} className="w-full flex gap-1 mb-1"  sx={{
              gridColumn: (info.label.includes("آدرس")) ? "span 2" : "span 1"
            }}>
              <Typography variant="customBold">{info.label}:</Typography>
              <Typography variant="body1">
                {values[info.key]}
              </Typography>
            </Box>
          ))}
        </Box>
        <Typography variant="custom" color={theme.palette.primary.main} >
           اطلاعات بانکی
        </Typography>

        
         
        
         
        <Box className="md:grid md:grid-cols-4 gap-4 w-full mt-2 mb-6">
        {BankInfo.map((info, index) => (
            <Box key={index} className="w-full flex gap-1 mb-1"  sx={{
              gridColumn: (info.label.includes("آدرس")) ? "span 2" : "span 1"
            }}>
              <Typography variant="customBold">{info.label}:</Typography>
              <Typography variant="body1">
                {values[info.key]}
              </Typography>
            </Box>
          ))}
       
        </Box>
      </Box>
    </Box>
  );
};
export default ConfirmInformation;
