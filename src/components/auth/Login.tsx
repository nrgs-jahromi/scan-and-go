import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import image from "../../assets/loginImage.png";
import FormikInput from "../common/inputs/FormikInput";
import { Lock1, Sms } from "iconsax-react";

type LoginFormT = {
  email: string;
  password: string;
};
const Login = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  // 'token' variable contains the decoded token
  console.log("Decoded token:", token);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const formik = useFormik<LoginFormT>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email.")
        .required("Please enter you account's email."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: () => {},
  });
  const handleSubmit = () => {
    navigate("/dashboard");
  };

  return (
    <Box className="h-screen w-full flex bg-slate-100 items-center justify-center ">
      <Box className="w-[30rem]  bg-white rounded-xl shadow-2xl flex flex-col p-10	">
        <Box>
          <Typography variant="h5" align="center" fontWeight={"bold"}>
            ورود به بای‌نت
          </Typography>
          <Typography variant="body1" align="center">
            به بای‌نت خوش آمدید. جهت ورود اطلاعات خود را وارد کنید.
          </Typography>
        </Box>
        <Box className=" flex w-full justify-center items-center h-full ">
          <FormikProvider value={formik}>
            <Form
              onSubmit={formik.handleSubmit}
              className="h-full w-full  justify-center items-center  flex flex-col"
            >
              {/* <img src={logo}></img> */}

              <Box className=" w-full  ">
                <Box className="flex flex-col  my-10 w-full">
                  <FormikInput
                    type="email"
                    name="email"
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
                  onClick={handleSubmit}
                  variant="contained"
                  fullWidth
                  size="medium"
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
