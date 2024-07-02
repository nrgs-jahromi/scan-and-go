import { Box, Paper, Typography } from "@mui/material";
import FormikInput from "../../common/inputs/FormikInput";
import theme from "../../../theme";
import FormikDatePicker from "../../common/inputs/FormikDatePicker";
import FormikTextArea from "../../common/inputs/FormikTextArea";
import FormikFileInput from "../../common/inputs/FormikFileInput";

const StoreInformationForm = () => {
  return (
    <Box component={Paper} className="w-full h-full" height={"100%"} overflow={"auto"}>
      <Box
        sx={{
          position: "sticky",
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
        <Typography variant="h6">مشخصات فروشگاه</Typography>
      </Box>

      <Box
        maxHeight={"100%"}
        overflow={"auto"}
        rowGap={1}
        className="md:grid md:grid-cols-2 grid-cols-1 gap-8 p-4 w-full"
      >
        <FormikInput type="text" name="store_name" label="نام فروشگاه" />
        <FormikInput type="text" name="store_owner_name" label="نام مالک فروشگاه" />
        <FormikInput type="text" name="store_registration_number" label="شماره ثبت فروشگاه" />
        <FormikDatePicker name="store_establishment_date" label="تاریخ تأسیس فروشگاه" />
        <FormikInput type="text" name="store_phone_number" label="شماره تلفن فروشگاه" />
        <FormikInput type="text" name="store_email" label="ایمیل فروشگاه" />
        <FormikInput type="text" name="store_website" label="وبسایت فروشگاه" />
        <FormikInput type="text" name="store_zip_code" label="کد پستی فروشگاه" />
        <FormikInput type="text" name="store_city" label="شهر فروشگاه" />
        <FormikInput type="text" name="store_state" label="استان فروشگاه" />
        <Box className="col-span-2">
          <FormikTextArea name="store_address" label="آدرس فروشگاه" fullWidth />
        </Box>
        <FormikFileInput
          name="store_logo"
          label="لوگو فروشگاه"
          containerProps={{
            border: "dashed 1px #E1DEFA",
            borderRadius: "8px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
        <FormikFileInput
          name="store_license"
          label="مجوز کسب و کار"
          containerProps={{
            border: "dashed 1px #E1DEFA",
            borderRadius: "8px",
            height: "150px",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
          }}
        />
      </Box>
    </Box>
  );
};

export default StoreInformationForm;
