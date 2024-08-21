import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import theme from "../../theme";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import changePasswod from "../../assets/changePassword.png";
import logo from "../../assets/logo.svg";
import FormikInput from "../common/inputs/FormikInput";
import { Sms } from "iconsax-react";

type LoginFormT = {
  email: string;
};
const ForgotPass = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  // 'token' variable contains the decoded token
  console.log("Decoded token:", token);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");
  const formik = useFormik<LoginFormT>({
    initialValues: {
      email: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email.")
        .required("Please enter you account's email."),
    }),
    onSubmit: () => {},
  });
  const handleSubmit = () => {
    navigate("/verify/passrecovery");
  };

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
                  type="email"
                  name="email"
                  label="شماره همراه"
                  placeholder="شماره همراه"
                  Icon={<Sms />}
                />
              </Box>
              <Button
                type="submit"
                onClick={handleSubmit}
                variant="contained"
                fullWidth
                size="medium"
              >
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
