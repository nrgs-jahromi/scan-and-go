import { Box, Paper, Typography } from "@mui/material";
import theme from "../../../theme";
import FormikInput from "../../common/inputs/FormikInput";

const BankAccountForm = () => {
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
        <Typography variant="h6">اطلاعات بانکی</Typography>
      </Box>

      <Box className="w-full h-fit p-4">
        <Box maxHeight={"100%"} overflow={"auto"} rowGap={1} className="md:grid md:grid-cols-2 grid-cols-1 gap-8 w-full mb-4">
          <FormikInput type="text" name="bank_first_name" label="نام" />
          <FormikInput type="text" name="bank_last_name" label="نام خانوادگی" />
          <FormikInput type="text" name="bank_name" label="نام بانک" />
          <FormikInput type="text" name="bank_account_number" label="شماره حساب" />
          <FormikInput type="text" name="bank_card_number" label="شماره کارت" />
          <FormikInput type="text" name="bank_iban_number" label="شماره شبا" />
        </Box>
      </Box>
    </Box>
  );
};

export default BankAccountForm;
