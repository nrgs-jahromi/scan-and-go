import {
  Box,
  Paper,
  Button,
  Typography,
  RadioGroup,
  FormControlLabel,
  Radio,
  FormControl,
} from "@mui/material";
import { Formik, Form, FormikProvider } from "formik";

import { Padding } from "@mui/icons-material";
import FormikInput from "../../common/inputs/FormikInput";
import FormikRadioGroup from "../../common/inputs/FormikRadioGroup";
import FormikDatePicker from "../../common/inputs/FormikDatePicker";
import FormikTextArea from "../../common/inputs/FormikTextArea";
import FormikFileInput from "../../common/inputs/FormikFileInput";
import FormikAutocomplete from "../../common/inputs/FormikAutocomplete";

const AddProduct = () => {
  const initialValues = {
    price: "",
    initialInterestRate: "",
    startDate: null,
    finalDate: null,
    paymentPeriod: "",
    description: "",
    contractFile: null,
    investmentNotebookFile: null,
  };

  const handleSubmit = () => {};

  const paymentPeriodOptions = [
    { value: "monthly", label: "ماهانه" },
    { value: "bi-monthly", label: "دو ماه" },
    { value: "quarterly", label: "سه ماه" },
    { value: "four-monthly", label: "چهار ماه" },
    { value: "six-monthly", label: "شش ماه" },
    { value: "annually", label: "سالانه" },
  ];
  const categoryOptions = [
    "الکترونیک",
    "مد و لباس",
    "خانه و آشپزخانه",
    // سایر دسته‌بندی‌ها
  ];

  return (
    <Box component={Paper} width={"100%"} height={"100%"} p={4}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <FormikProvider value={formik}>
            <Form>
              <Box className="w-full md:grid md:grid-cols-2 gap-8">
                <Box>
                  <FormikInput
                    fullWidth
                    name="name"
                    label="نام محصول"
                    type="text"
                  />
                  <FormikAutocomplete
                    name="category"
                    label="دسته بندی"
                    options={categoryOptions}
                    fullWidth
                  />
                  <FormikTextArea
                    minRows={4}
                    name="description"
                    label="توضیحات"
                    fullWidth
                  />
                </Box>
                <FormikDatePicker name="startDate" label="تاریخ شروع" />
                <Box>
                  <FormikInput
                    name="barcode"
                    label="بارکد"
                    fullWidth
                    type="number"
                  />
                  <FormikInput
                    name="count"
                    label="موجودی"
                    type="number"
                    fullWidth
                  />
                  <FormikInput
                    name="min_inventory"
                    label="حداقل موجودی"
                    type="number"
                    fullWidth
                  />
                </Box>

                <FormikRadioGroup
                  name="paymentPeriod"
                  label="دوره پرداخت"
                  options={paymentPeriodOptions}
                  row
                  sx={{ width: "100%" }}
                />
                {/* </FormControl> */}
              </Box>
            </Form>
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default AddProduct;
