import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import changePasswod from "../../assets/changePassword.png";
import logo from "../../assets/logo.svg";
import { MuiOtpInput } from "mui-one-time-password-input";
import { useState, useEffect } from "react";

type LoginFormT = {
  otp: string;
};

const Verification = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  // 'token' variable contains the decoded token
  console.log("Decoded token:", token);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const formik = useFormik<LoginFormT>({
    initialValues: {
      otp: "",
    },
    validationSchema: Yup.object().shape({
      otp: Yup.string().required("Please enter your verification code."),
    }),
    onSubmit: () => {},
  });
  const [otp, setOtp] = useState("");
  const [timer, setTimer] = useState(10); // Initial timer value in seconds
  const [isTimerRunning, setIsTimerRunning] = useState(true);

  const handleChange = (newValue: string) => {
    setOtp(newValue);
  };

  const handleSubmit = () => {
    navigate("/passrecovery/setnew");
  };

  const handleResend = () => {
    setTimer(10);
    setIsTimerRunning(true);
    setOtp("")
  };

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
    <Box className="h-screen w-screen flex  ">
      <Box className=" flex w-full md:w-1/2 lg:w-2/5 justify-center items-center h-full">
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full p-10 justify-center items-center gap-10 flex flex-col"
          >
            {/* <img src={logo} alt="Logo"></img> */}
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                تایید ایمیل{" "}
              </Typography>
              <Typography variant="body1" align="center">
                برای بازیابی رمز عبور، کد ارسال شده به ایمیل را وارد کنید
              </Typography>
            </Box>
            <Box className=" w-full  ">
              <Box className="flex flex-col gap-8 my-10 w-full ">
                <Box>
                  {" "}
                  <Typography variant="h6" marginBottom={1}>
                    کد تایید
                  </Typography>
                  <MuiOtpInput
                    dir="ltr"
                    // name="otp"
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
                    `زمان باقی‌مانده: ${timer} ثانیه`
                  )}
                </Typography>
              </Box>

              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                size="medium"
              >
                ادامه
              </Button>
            </Box>
          </Form>
        </FormikProvider>
      </Box>
      {isLargeScreen && (
        <Box
          sx={{
            height: "100%",
            width: "60%",
            backgroundImage: `url(${changePasswod})`,
            backgroundSize: "contain",
            backgroundRepeat: "no-repeat",
            backgroundPosition: "center center",
            bgcolor: theme.palette.primary.main,
          }}
        />
      )}
    </Box>
  );
};

export default Verification;
