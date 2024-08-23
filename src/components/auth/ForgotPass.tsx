import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import FormikInput from "../common/inputs/FormikInput";
import { Sms } from "iconsax-react";
import { useSignup } from "../../api/auth/verifySignup";
import { useEffect } from "react";
import { notif } from "../common/notification/Notification";
import { useGetOtp } from "../../api/auth/getOTP";

type FormT = {
  mobile_number: string;
};
const ForgotPass = () => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const {
    mutate: getOtp,
    isLoading,
    isSuccess,
    isError,
    data: signupData,
  } = useGetOtp();

  const formik = useFormik<FormT>({
    initialValues: {
      mobile_number: "",
    },
    validationSchema: Yup.object().shape({
      mobile_number: Yup.string()
        .required("لطفا شماره همراه خود را وارد کنید.")
        .matches(/^[0-9]{11}$/, "شماره همراه باید ۱۱ رقمی باشد."),
    }),
    onSubmit: (values) => {
      getOtp({ body: { mobile_number: values.mobile_number } });
    },
  });

  useEffect(() => {
    if (isSuccess) {
      localStorage.setItem(
        "verificationExpirationTime",
        signupData!.expire_time
      );
      notif("کد احراز هویت برای شما پیامک شد.", { variant: "success" });
      navigate(`/verify/${formik.values.mobile_number}`);
    } else if (isError) {
      notif("َشماره وارد شده معتبر نمی‌باشد", { variant: "error" });
    }
  }, [isSuccess, isError]);

  return (
    <Box
      className={`h-screen w-full flex bg-slate-100 items-center justify-center ${
        isLargeScreen ? "" : "p-0"
      }`}
    >
      <Box
        className={`${
          isLargeScreen
            ? "w-[30rem] bg-white rounded-xl shadow-2xl p-10"
            : "w-full h-full bg-white p-4"
        } flex flex-col`}
      >
        {" "}
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full justify-center items-center gap-10 flex flex-col"
          >
            {/* <img src={logo}></img> */}
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                بازیابی رمز عبور
              </Typography>
              <Typography variant="body1" align="center">
                جهت بازیابی رمز عبور، شماره تماس خود را وارد کنید.
              </Typography>
            </Box>
            <Box className=" w-full  ">
              <Box className="flex flex-col gap-8 my-10 w-full">
                <FormikInput
                  type="text"
                  name="mobile_number"
                  label="شماره همراه"
                  placeholder="شماره همراه"
                  Icon={<Sms />}
                />
              </Box>
              <Button type="submit" variant="contained" fullWidth size="medium">
                ارسال کد
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default ForgotPass;
