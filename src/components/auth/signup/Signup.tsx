import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { Sms } from "iconsax-react";
import FormikInput from "../../common/inputs/FormikInput";
import { useGetOtp } from "../../../api/auth/getOTP";
import { useEffect } from "react";
import { notif } from "../../common/notification/Notification";

type SignupFormT = {
  mobile_number: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log("Decoded token:", token);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const {
    mutate: getOtp,
    isLoading,
    isSuccess,
    isError,
    data: signupData,
  } = useGetOtp();

  const formik = useFormik<SignupFormT>({
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
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full justify-center items-center gap-10 flex flex-col"
          >
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                ثبت‌نام در بای‌نت
              </Typography>
              <Typography variant="body1" align="center">
                به بای‌نت خوش آمدید. جهت ثبت‌نام شماره تماس خود را وارد کنید.
              </Typography>
            </Box>
            <Box className="w-full">
              <Box className="flex flex-col gap-4 my-10 w-full">
                <FormikInput
                  type="text"
                  name="mobile_number"
                  label="شماره همراه"
                  placeholder="شماره همراه"
                  Icon={<Sms />}
                />
              </Box>
              <Button
                type="submit"
                variant="contained"
                fullWidth
                size="medium"
                disabled={isLoading} // غیر فعال کردن دکمه هنگام ارسال درخواست
              >
                {isLoading ? "در حال ارسال..." : "تایید و ادامه"}
              </Button>
              <Button
                onClick={() => navigate("/login")}
                variant="text"
                fullWidth
                size="medium"
              >
                قبلا وارد شده‌اید؟ ورود
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
    </Box>
  );
};

export default Signup;
