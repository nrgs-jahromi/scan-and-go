import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import image from "../../assets/loginImage.png";
import logo from "../../assets/logo.svg";
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
  const handleSubmit = () => { navigate("/dashboard")};



  return (
    <Box className="h-screen w-screen flex  ">
      <Box className=" flex w-full md:w-1/2 lg:w-2/5 justify-center items-center h-full">
        <FormikProvider value={formik}>
          <Form
            onSubmit={formik.handleSubmit}
            className="h-full w-full p-10 justify-center items-center gap-10 flex flex-col"
          >
            {/* <img src={logo}></img> */}
            <Box>
              <Typography variant="h5" align="center" fontWeight={"bold"}>
                ورود به بای‌نت
              </Typography>
              <Typography variant="body1" align="center">
                به بای‌نت خوش آمدید. جهت ورود اطلاعات خود را وارد کنید.
              </Typography>
            </Box>
            <Box className=" w-full  ">
              <Box className="flex flex-col gap-8 my-10 w-full">
                <FormikInput
                  type="email"
                  name="email"
                  label="ایمیل"
                  placeholder="ایمیل"
                  Icon = {<Sms/>}
                />
                <FormikInput
                  type="password"
                  name="password"
                  label="رمز عبور"
                  placeholder="رمز عبور"
                  noPasswordVisibility={false}
                  Icon={<Lock1/>}
                />
                <Typography variant="subtitle2" color={theme.palette.primary.main} textAlign={"end"} marginTop={-3} sx={{cursor:"pointer"}} onClick={()=>{navigate("/passrecovery")}}>فراموشی رمز عبور؟</Typography>
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
            </Box>
          </Form>
        </FormikProvider>
      </Box>
      {isLargeScreen && (
        <Box
          sx={{
            height: "100%",
            width: "60%",
            backgroundImage: `url(${image})`,
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

export default Login;
