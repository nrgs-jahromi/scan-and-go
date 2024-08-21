import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import changePasswod from "../../../assets/changePassword.png";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState, useEffect } from "react";
import theme from "../../../theme";
import ConfirmationModal from "../../modal/ConfirmationModal";
import { notif } from "../../common/notification/Notification";
import { useUserVerification } from "../../../api/auth/verifyUser";

type LoginFormT = {
  otp: string;
};

const NumberVerification = () => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const { phoneNumber } = useParams<{ phoneNumber: string }>();
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10);
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const { mutate, isLoading, error } = useUserVerification();

  const formik = useFormik<LoginFormT>({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string().required("Please enter your verification code."),
    }),
    onSubmit: (values) => {
      mutate(
        {
          body: {
            mobile_number: phoneNumber || "",
            verification_code: values.otp,
          },
        },
        {
          onSuccess: (data) => {
            notif("با موفقیت وارد شدید.", { variant: "success" });
            navigate(`/setpassword/${phoneNumber}`);
          },
          onError: (err) => {
            notif("کد وارد شده معتبر نمی‌باشد.", { variant: "error" });
          },
        }
      );
    },
  });

  const handleChange = (newValue: string) => {
    setOtp(newValue);
    formik.setFieldValue("otp", newValue);
  };

  const handleResend = () => {
    navigate("/signup");
  };

  useEffect(() => {
    const expirationTime = localStorage.getItem("verificationExpirationTime");
    if (expirationTime) {
      // Parse the expiration time from localStorage
      const expirationDate = new Date(expirationTime);
      const now = new Date();

      // Calculate the difference in seconds
      const timeLeft = Math.max(
        0,
        Math.floor((expirationDate.getTime() - now.getTime()) / 1000)
      );
      setTimer(timeLeft);
      setIsTimerRunning(timeLeft > 0);
    }
  }, []);

  useEffect(() => {
    if (isTimerRunning && timer > 0) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => {
          if (prevTimer <= 1) {
            clearInterval(countdown);
            setIsTimerRunning(false);
            return 0;
          }
          return prevTimer - 1;
        });
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isTimerRunning, timer]);

  // Calculate minutes and seconds
  const minutes = Math.floor(timer / 60);
  const seconds = timer % 60;

  useEffect(() => {
    if (isTimerRunning) {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => (prevTimer === 0 ? 0 : prevTimer - 1));
      }, 1000);

      return () => clearInterval(countdown);
    }
  }, [isTimerRunning]);

  useEffect(() => {
    if (timer === 0) {
      setIsTimerRunning(false);
    }
  }, [timer]);

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
                تایید شماره همراه{" "}
              </Typography>
              <Typography variant="body1" align="center">
                برای احراز هویت، کد ارسال شده به شماره همراه خود را وارد کنید
              </Typography>
            </Box>
            <Box className="w-full">
              <Box className="flex flex-col gap-8 my-10 w-full">
                <Box>
                  <Typography variant="h6" marginBottom={1}>
                    کد تایید
                  </Typography>
                  <MuiOtpInput
                    dir="ltr"
                    value={otp}
                    length={4}
                    onChange={handleChange}
                    sx={{ padding: 0 }}
                    TextFieldsProps={{ type: "number" }}
                  />
                </Box>
                <Typography
                  variant="subtitle1"
                  marginTop={-3}
                  color={theme.palette.grey[500]}
                >
                  {timer === 0 ? (
                    <Button onClick={handleResend} color="primary" size="small">
                      ارسال مجدد کد تایید
                    </Button>
                  ) : (
                    `زمان باقی‌مانده: ${minutes} دقیقه و ${seconds} ثانیه`
                  )}
                </Typography>
              </Box>
              <Button type="submit" variant="contained" fullWidth size="medium">
                ادامه
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>

      {/* <ConfirmationModal
        isOpen={isModalOpen}
        onClose={handleModalClose}
        description="حساب کاربری شما با موفقیت ایجاد شد.آیا می‌خواهید اطلاعات فروشگاه خود را تکمیل کنید یا به داشبورد بروید؟"
        cancelButtonLabel="تکمیل اطلاعات"
        confirmButtonLabel="ورود به داشبورد"
        onCancelClick={handleCompleteInfo}
        onConfirmClick={handleGoToDashboard}
        mode="success"
      /> */}
    </Box>
  );
};

export default NumberVerification;
