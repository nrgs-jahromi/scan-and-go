import { Box, Button } from "@mui/material";
import CustomizedStepper from "../../formPage/Stepper";
import ConfirmationModal from "../../../modal/ConfirmationModal";
import { useEffect, useState } from "react";
import { CardAdd, Note1, NoteFavorite, TaskSquare } from "iconsax-react";
import BasicInformationForm from "./BasicInformationForm";
import AdditionalInformationForm from "./AdditionalInformationFrom";
import { FormikProvider, useFormik } from "formik";
import * as Yup from "yup";
import ConfirmInformation from "./ConfirmInformation";
import BankAccountForm from "./BankAccountForm";
import { useNavigate } from "react-router";
import { useUserRegistration } from "../../../../api/customer/addCustomer";
import { useCustomerRegistered } from "../../../../api/customer/checkCustomerExist";

const steps = [
  { name: "مشخصات اولیه", icon: <Note1 />, form: <BasicInformationForm /> },
  {
    name: "مشخصات تکمیلی",
    icon: <NoteFavorite />,
    form: <AdditionalInformationForm />,
  },
  { name: "اطلاعات بانکی", icon: <CardAdd />, form: <BankAccountForm /> },
  { name: "تایید اطلاعات", icon: <TaskSquare />, form: <ConfirmInformation /> },
];

const FormBasePage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isCustomerExistModalOpen, setIsCustomerExistModalOpen] =
    useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const { mutate: addUser } = useUserRegistration();
  const {
    mutate: checkCustomerExist,
    data: isCustomerExist,
    isSuccess: CustomerSearchSuccessful,
    isLoading: CustomerSearching,
  } = useCustomerRegistered();
  const navigate = useNavigate();
  const formik = useFormik<CustomerFormT>({
    initialValues: {
      bank1_account_number: null,
      bank1_card_number: null,
      bank1_first_name: null,
      bank1_iban_number: null,
      bank1_last_name: null,
      bank1_name: null,
      customer_address: null,
      customer_birth_date: null,
      customer_father_name: null,
      customer_first_name: null,
      customer_last_name: null,
      customer_id_number: null,
      customer_job_title: null,
      customer_national_code: null,
      customer_phone_number1: null,
      customer_phone_number2: null,
      customer_registration_date: null,
      customer_state: null,
      customer_zip_code: null,
      guardian1_address: null,
      guardian1_first_name: null,
      guardian1_last_name: null,
      guardian1_national_code: null,
      guardian1_phone_number: null,
      guardian1_relation: null,
      guardian1_zip_code: null,
      heir1_address: null,
      heir1_first_name: null,
      heir1_last_name: null,
      heir1_national_code: null,
      heir1_phone_number: null,
      heir1_relation: null,
      heir1_share_percentage: null,
      referer1_first_name: null,
      referer1_last_name: null,
      referer1_phone_number: null,
      referer1_national_code: null,
    },
    validationSchema: Yup.object().shape({
      bank1_account_number: Yup.string().required("This field is required."),
      bank1_card_number: Yup.string().required("This field is required."),
      bank1_first_name: Yup.string().required("This field is required."),
      bank1_iban_number: Yup.string().required("This field is required."),
      bank1_last_name: Yup.string().required("This field is required."),
      bank1_name: Yup.string().required("This field is required."),

      customer_address: Yup.string().required("This field is required."),
      customer_birth_date: Yup.string().required("This field is required."),
      customer_registration_date: Yup.string().required(
        "This field is required."
      ),
      customer_father_name: Yup.string().required("This field is required."),
      customer_first_name: Yup.string().required("This field is required."),
      customer_last_name: Yup.string().required("This field is required."),
      customer_id_number: Yup.string().required("This field is required."),
      customer_job_title: Yup.string().required("This field is required."),
      customer_national_code: Yup.string().required("This field is required."),
      customer_phone_number1: Yup.string().required("This field is required."),
      customer_phone_number2: Yup.string().required("This field is required."),
      customer_register_date: Yup.string().required("This field is required."),
      customer_state: Yup.string().required("This field is required."),
      customer_zip_code: Yup.string().required("This field is required."),

      guardian1_address: Yup.string().required("This field is required."),
      guardian1_first_name: Yup.string().required("This field is required."),
      guardian1_last_name: Yup.string().required("This field is required."),
      guardian1_national_code: Yup.string().required("This field is required."),
      guardian1_phone_number: Yup.string().required("This field is required."),
      guardian1_relation: Yup.string().required("This field is required."),
      guardian1_zip_code: Yup.string().required("This field is required."),

      heir1_address: Yup.string().required("This field is required."),
      heir1_first_name: Yup.string().required("This field is required."),
      heir1_last_name: Yup.string().required("This field is required."),
      heir1_national_code: Yup.string().required("This field is required."),
      heir1_phone_number: Yup.string().required("This field is required."),
      heir1_relation: Yup.string().required("This field is required."),
      heir1_share_percentage: Yup.number().required("This field is required."),

      referer1_first_name: Yup.string().required("This field is required."),
      referer1_last_name: Yup.string().required("This field is required."),
      referer1_phone_number: Yup.string().required("This field is required."),
      referer1_national_code: Yup.string().required("This field is required."),
    }),
    onSubmit: () => {},
  });

  useEffect(() => {
    if (CustomerSearchSuccessful && isCustomerExist.is_exist) {
      console.log("sss");
      
      setIsCustomerExistModalOpen(true);
    } else if (CustomerSearchSuccessful && !isCustomerExist.is_exist) {
      setActiveIndex(activeIndex + 1);
    }
  }, [isCustomerExist , CustomerSearchSuccessful]);
  return (
    <Box
      width={"100%"}  
      height={"100%"}
      className="flex flex-col justify-between gap-4"
    >
      <Box className="w-full">
        <CustomizedStepper steps={steps} activeIndex={activeIndex} />
      </Box>

      <Box
        height={"100%"}
        overflow={"auto"}
        className="flex flex-col justify-between gap-4"
      >
        <FormikProvider value={formik}>
          {steps[activeIndex].form}
          <Box className="w-full flex gap-8 h-14">
            {activeIndex === 0 ? (
              <Button fullWidth variant="outlined">
                {" "}
                انصراف
              </Button>
            ) : (
              <Button
                fullWidth
                variant="outlined"
                onClick={() => setActiveIndex(activeIndex - 1)}
              >
                گام قبلی
              </Button>
            )}{" "}
            {activeIndex < steps.length - 1 ? (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  if (
                    activeIndex === 0 &&
                    formik.values.customer_national_code!
                  ) {
                    checkCustomerExist({
                      body: {
                        customer_national_code:
                          formik.values.customer_national_code,
                      },
                    });
                  } else setActiveIndex(activeIndex + 1);
                }}
              >
                تایید و ادامه
              </Button>
            ) : (
              <Button
                fullWidth
                variant="contained"
                onClick={() => {
                  addUser({
                    body: formik.values,
                  });
                  setIsModalOpen(true);
                }}
              >
                {" "}
                ثبت و ارسال{" "}
              </Button>
            )}
          </Box>
        </FormikProvider>
      </Box>

      <ConfirmationModal
        mode="success"
        description={`عملیات ثبت مشتری با موفقیت انجام شد `}
        isOpen={isModalOpen}
        onClose={() => {
          navigate("/add-user");
          setActiveIndex(0);
          setIsModalOpen(false);
        }}
        cancelButtonLabel="افزودن کاربر جدید"
        onConfirmClick={() => navigate("/add-fund")}
        confirmButtonLabel="ایجاد سرمایه گذاری"
      />
       <ConfirmationModal
        mode="error"
        description={`اطلاعات مشتری در گذشته ثبت شده است.`}
        isOpen={isCustomerExistModalOpen}
        onClose={() => {
          setIsCustomerExistModalOpen(false);
        }}
        cancelButtonLabel="افزودن کاربر جدید"
        onConfirmClick={() => navigate("/add-fund")}
        confirmButtonLabel="ایجاد سرمایه گذاری"
      />
    </Box>
  );
};
export default FormBasePage;