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

  return (
    <Box component={Paper} width={"100%"} height={"100%"} p={4}>
      <Formik initialValues={initialValues} onSubmit={handleSubmit}>
        {(formik) => (
          <FormikProvider value={formik}>
            <Form>
              <Box className="w-full md:grid md:grid-cols-2 gap-8">
                <FormikInput
                  fullWidth
                  name="name"
                  label="نام محصول"
                  type="text"
                />
                <FormikInput
                  fullWidth
                  name="initialInterestRate"
                  label="نرخ سود اولیه"
                  type="number"
                />
                <FormikTextArea
                  minRows={4}
                  name="description"
                  label="توضیحات"
                  fullWidth
                />
                <FormikDatePicker name="startDate" label="تاریخ شروع" />
                <FormikDatePicker name="finalDate" label="تاریخ پایان" />
                {/* <FormControl component="fieldset" className="col-span-2"> */}
                <FormikRadioGroup
                  name="paymentPeriod"
                  label="دوره پرداخت"
                  options={paymentPeriodOptions}
                  row
                  sx={{ width: "100%" }}
                />
                {/* </FormControl> */}
                <Box className="col-span-1 ">
                  <Typography variant="custom" marginBottom={5.5}>
                    حساب های واریز
                  </Typography>
                  <Box className="w-full grid grid-cols-4 gap-4 mt-4">
                    <Box className="col-span-3">
                      <Typography variant="subtitle1">حساب مقصد</Typography>
                      <FormikInput fullWidth name="account1" />
                      <FormikInput fullWidth name="account2" />
                      <FormikInput fullWidth name="account3" />
                    </Box>
                    <Box className="col-span-1">
                      <Typography variant="subtitle1">درصد</Typography>
                      <FormikInput fullWidth type="number" name="account11" />
                      <FormikInput fullWidth type="number" name="account21" />
                      <FormikInput fullWidth type="number" name="account31" />
                    </Box>
                  </Box>
                </Box>
                
                

                <FormikFileInput
                  name="investmentNotebookFile"
                  label=" دفترچه سرمایه‌گذاری"
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
                  name="contractFile"
                  label=" فرم قرارداد"
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
            </Form>
          </FormikProvider>
        )}
      </Formik>
    </Box>
  );
};

export default AddProduct;
