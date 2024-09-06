import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate } from "react-router";
import FormikInput from "../common/inputs/FormikInput";
import { Lock1, Sms } from "iconsax-react";
import { useLogin } from "../../api/auth/login";
import { useEffect } from "react";
import { notif } from "../common/notification/Notification";
import { saveToLocalStorage } from "../../utils/localStorage";
import { LS_ACCESS_TOKEN } from "../../constants/localStorage";
import logo from "../../assets/scanbuy.svg";

type LoginFormT = {
  mobile_number: string;
  password: string;
};

const Login = () => {
  const navigate = useNavigate();
  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const {
    mutate: loginUser,
    isLoading,
    isError: isUserLoginError,
    isSuccess: isUserLoginSuccess,
    data: loginData,
  } = useLogin();

  const formik = useFormik<LoginFormT>({
    initialValues: {
      mobile_number: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      mobile_number: Yup.string()
        .required("لطفا شماره همراه خود را وارد کنید.")
        .matches(/^[0-9]{11}$/, "شماره همراه باید ۱۱ رقمی باشد."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: (values) => {
      loginUser({
        body: {
          mobile_number: values.mobile_number,
          password: values.password,
        },
      });
    },
  });

  useEffect(() => {
    if (isUserLoginSuccess) {
      notif("با موفقیت وارد شدید!", { variant: "success" });
      saveToLocalStorage(LS_ACCESS_TOKEN, loginData.token);
      navigate("/dashboard");
    } else if (isUserLoginError) {
      notif("نام کاربری یا رمز عبور نامعتبر می‌باشد.", { variant: "error" });
    }
  }, [
    isUserLoginSuccess,
    isUserLoginError,
    formik.setFieldError,
    navigate,
    loginData,
  ]);

  return (
    <Box
      className={`h-screen w-full flex bg-slate-100 items-center justify-center ${
        isLargeScreen ? "" : "p-0"
      }`}
    >
      <Box
        className={`${
          isLargeScreen
            ? "w-[30rem] bg-white rounded-xl shadow-2xl p-8"
            : "w-full h-full bg-white p-4"
        } flex flex-col`}
      >
        <Box className="flex w-full justify-center items-center h-full mb-4">
          <img src={logo} width={200} />
        </Box>
        <Box>
          <Typography variant="h5" align="center" fontWeight={"bold"}>
            ورود
          </Typography>
          <Typography variant="body1" align="center">
            جهت ورود به اسکن‌بای اطلاعات خود را وارد کنید.
          </Typography>
        </Box>
        <Box className="flex w-full justify-center items-center h-full">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              className="h-full w-full justify-center items-center flex flex-col"
            >
              <Box className="w-full">
                <Box className="flex flex-col my-10 w-full">
                  <FormikInput
                    type="text"
                    name="mobile_number"
                    label="شماره همراه"
                    placeholder="شماره همراه"
                    Icon={<Sms />}
                  />
                  <FormikInput
                    type="password"
                    name="password"
                    label="رمز عبور"
                    placeholder="رمز عبور"
                    noPasswordVisibility={false}
                    Icon={<Lock1 />}
                  />
                  <Typography
                    variant="subtitle2"
                    color={theme.palette.primary.main}
                    textAlign={"end"}
                    marginTop={-1}
                    sx={{ cursor: "pointer" }}
                    onClick={() => {
                      navigate("/passrecovery");
                    }}
                  >
                    فراموشی رمز عبور؟
                  </Typography>
                </Box>
                <Button
                  type="submit"
                  variant="contained"
                  fullWidth
                  size="medium"
                  disabled={isLoading}
                >
                  ورود
                </Button>

                <Button
                  onClick={() => navigate("/signup/")}
                  variant="text"
                  fullWidth
                  size="medium"
                >
                  قبلا وارد نشده‌اید؟ ایجاد حساب کاربری
                </Button>
              </Box>
            </Form>
          </FormikProvider>
        </Box>
      </Box>
    </Box>
  );
};

export default Login;
