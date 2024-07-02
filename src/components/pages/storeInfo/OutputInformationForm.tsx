import { Box, Paper, Typography } from "@mui/material";
import theme from "../../../theme";
import FormikInput from "../../common/inputs/FormikInput";
import FormikFileInput from "../../common/inputs/FormikFileInput";
import FormikColorPicker from "../../common/inputs/FormikColorPicker";

const OutputInformationForm = () => {
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
        <Typography variant="h6">اطلاعات خروجی فروشگاه</Typography>
      </Box>

      <Box className="w-full h-fit p-4 md:grid md:grid-cols-2 gap-4">
        
        <FormikInput type="text" name="english_name" label="نام انگلیسی" />
        <FormikInput name="main_color" type="color" label="رنگ اصلی" />
        <Box className="md:col-span-2">
        <FormikInput  type="text" name="url" label="آدرس وبسایت" />
        </Box>
          
      </Box>
    </Box>
  );
};

export default OutputInformationForm;
