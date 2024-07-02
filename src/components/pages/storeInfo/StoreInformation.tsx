import { Box, Button, Typography } from "@mui/material";
import CustomizedStepper from "../formPage/Stepper";
import ConfirmationModal from "../../modal/ConfirmationModal";
import { useEffect, useState } from "react";
import { CardAdd, Note1, NoteFavorite, TaskSquare } from "iconsax-react";
import BasicInformationForm from "./BasicInformationForm";
import { Form, FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import ConfirmInformation from "./ConfirmInformation";
import BankAccountForm from "./BankAccountForm";
import { useNavigate } from "react-router";
import theme from "../../../theme";
import OutputInformationForm from "./OutputInformationForm";

const steps = [
  { name: "اطلاعات فروشگاه", icon: <Note1 />, form: <BasicInformationForm /> },
  { name: "اطلاعات بانکی", icon: <NoteFavorite />, form: <BankAccountForm /> },
  { name: "اطلاعات لازم برای خروجی", icon: <CardAdd />, form: <OutputInformationForm /> },
];

const StoreInformation = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerExistModalOpen, setIsCustomerExistModalOpen] = useState(false);
  const [activeStepIndex, setActiveStepIndex] = useState(0);
  const [erroneousSteps, setErroneousSteps] = useState<number[]>([]);

  const formik = useFormik<StoreFormT>({
    initialValues: {
      store_name: "",
      store_type: "",
      business_number: "",
      product_count: 0,
      store_contact_number: "",
      store_address: "",

      bank_name: "",
      card_number: "",
      account_number: "",
      first_name: "",
      last_name: "",
      iban_number: "",

      logo: "",
      english_name: "",
      main_color: "",
      url: "",
    },
    validationSchema: Yup.object().shape({
      store_name: Yup.string().required("این فیلد اجباری است."),
      store_type: Yup.string().required("این فیلد اجباری است."),
      business_number: Yup.string().required("این فیلد اجباری است."),
      product_count: Yup.number().required("این فیلد اجباری است."),
      store_contact_number: Yup.string().required("این فیلد اجباری است."),
      store_address: Yup.string().required("این فیلد اجباری است."),

      bank_name: Yup.string().required("این فیلد اجباری است."),
      card_number: Yup.string().required("این فیلد اجباری است."),
      account_number: Yup.string().required("این فیلد اجباری است."),
      first_name: Yup.string().required("این فیلد اجباری است."),
      last_name: Yup.string().required("این فیلد اجباری است."),
      iban_number: Yup.string().required("این فیلد اجباری است."),

      logo: Yup.string().required("این فیلد اجباری است."),
      english_name: Yup.string().required("این فیلد اجباری است."),
      main_color: Yup.string().required("این فیلد اجباری است."),
      url: Yup.string().required("این فیلد اجباری است."),
    }),
    onSubmit: () => {
      navigate("/dashboard")
      console.log("Submitted!");
    },
  });

  useEffect(() => {
    const allFields = Object.keys(formik.errors) as (keyof StoreFormT)[];
    const stepsWithError: number[] = [];
    for (const key of allFields) {
      if (!formik.touched[key]) continue;

      if (!stepsWithError.includes(1) && Object.keys(formik.initialValues).slice(0, 6).includes(key)) {
        stepsWithError.push(1);
      } else if (!stepsWithError.includes(2) && Object.keys(formik.initialValues).slice(6, 12).includes(key)) {
        stepsWithError.push(2);
      } else if (!stepsWithError.includes(3) && Object.keys(formik.initialValues).slice(12).includes(key)) {
        stepsWithError.push(3);
      }
    }
    setErroneousSteps(stepsWithError);
  }, [formik.errors, formik.touched]);

  return (
    <Box className="h-full w-screen flex p-10 items-center justify-center overflow-auto" bgcolor={theme.palette.background.paper}>
      <Box width="70%" height="100%" className="flex flex-col items-center gap-4">
        <Box className="w-full">
          <CustomizedStepper steps={steps} activeIndex={activeStepIndex} erroneousSteps={erroneousSteps} />
        </Box>

        <FormikProvider value={formik}>
          <Form className="flex w-full flex-1 flex-col justify-between gap-4">
            {steps[activeStepIndex].form}

            <Box>
              {erroneousSteps.map((stepIndex) => (
                <Typography key={stepIndex} variant="body2" color="error">
                  خطاهای گام {stepIndex} را رفع کنید.
                </Typography>
              ))}
            </Box>

            <Box className="w-full flex gap-8 h-14">
              {activeStepIndex === 0 ? (
                <Button fullWidth variant="outlined">
                  انصراف
                </Button>
              ) : (
                <Button fullWidth variant="outlined" onClick={() => setActiveStepIndex(activeStepIndex - 1)}>
                  گام قبلی
                </Button>
              )}

              {activeStepIndex < steps.length - 1 ? (
                <Button fullWidth variant="contained" onClick={() => setActiveStepIndex((currStep) => currStep + 1)}>
                  تایید و ادامه
                </Button>
              ) : (
                <Button type="button" fullWidth variant="contained" onClick={formik.submitForm}>
                  ثبت و ارسال
                </Button>
              )}
            </Box>
          </Form>
        </FormikProvider>

        {isModalOpen && (
          <ConfirmationModal
            mode="success"
            description={`عملیات ثبت اطلاعات فروشگاه با موفقیت انجام شد`}
            isOpen={isModalOpen}
            onClose={() => {
              setActiveStepIndex(0);
              formik.resetForm();
              setIsModalOpen(false);
              navigate("/stores");
            }}
            cancelButtonLabel="افزودن فروشگاه جدید"
            onConfirmClick={() => navigate("/investments/add")}
            confirmButtonLabel="ایجاد سرمایه گذاری"
          />
        )}

        {isCustomerExistModalOpen && (
          <ConfirmationModal
            mode="error"
            description={`اطلاعات فروشگاه در گذشته ثبت شده است.`}
            isOpen={isCustomerExistModalOpen}
            onClose={() => setIsCustomerExistModalOpen(false)}
            cancelButtonLabel="افزودن فروشگاه جدید"
            onConfirmClick={() => navigate("/investments/add")}
            confirmButtonLabel="ایجاد سرمایه گذاری"
          />
        )}
      </Box>
    </Box>
  );
};

export default StoreInformation;
