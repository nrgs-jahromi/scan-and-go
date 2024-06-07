import { Box, Paper, Typography } from "@mui/material";
import FormikInput from "../../../common/inputs/FormikInput";
import theme from "../../../../theme";
import FormikDatePicker from "../../../common/inputs/FormikDatePicker";
import FormikTextArea from "../../../common/inputs/FormikTextArea";
import FormikFileInput from "../../../common/inputs/FormikFileInput";

const BasicInformationForm = () => {
  return (
    <Box
      component={Paper}
      className="w-full h-full "
      height={"100%"}
      overflow={"auto"}
    >
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
        <Typography variant="h6"> مشخصات اولیه </Typography>
      </Box>

      <Box
        maxHeight={"100%"}
        overflow={"auto"}
        rowGap={1}
        className=" md:grid md:grid-cols-2 grid-cols-1  gap-8 p-4  w-full"
      >
        <FormikDatePicker name="customer_registration_date"label="تاریخ ثبت " />
        <FormikInput type="text" name="customer_first_name" label="نام" />
        <FormikInput
          type="text"
          name="customer_last_name"
          label=" نام خانوادگی"
        />

        <FormikDatePicker name="customer_birth_date" label="تاریخ تولد " />
        <FormikInput
          type="number"
          name="customer_national_code"
          label="کد ملی"
        />
        <FormikInput
          type="number"
          name="customer_id_number"
          label="شماره شناسنامه "
        />
        <FormikInput type="text" name="customer_father_name" label=" نام پدر" />
        <FormikInput type="text" name="customer_job_title" label=" شغل " />
        <FormikInput
          type="number"
          name="customer_phone_number2"
          label="تلفن ثابت"
        />
        <FormikInput
          type="number"
          name="customer_phone_number1"
          label=" تلفن همراه "
        />
        <FormikInput type="number" name="customer_zip_code" label=" کد پستی" />
        <FormikInput type="text" name="customer_state" label="استان " />
        <Box className="col-span-2">
          <FormikTextArea name="customer_address" label="آدرس" fullWidth />
        </Box>
        <FormikFileInput
          name="file"
          label="تصویر شناسنامه"
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
          name="file"
          label="تصویر کارت ملی"
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

export default BasicInformationForm;
