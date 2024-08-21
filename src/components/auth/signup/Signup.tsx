import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import { Lock1, Sms } from "iconsax-react";
import FormikInput from "../../common/inputs/FormikInput";

type SignupFormT = {
  email: string;
  password: string;
};

const Signup = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  console.log("Decoded token:", token);

  const isLargeScreen = useMediaQuery("(min-width: 768px)");

  const formik = useFormik<SignupFormT>({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: Yup.object().shape({
      email: Yup.string()
        .email("Please enter a valid email.")
        .required("Please enter your account's email."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: () => {},
  });

  const handleSubmit = () => {
    navigate("/verify/signup");
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
                تایید و ادامه
              </Button>
              <Button
                onClick={handleSubmit}
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
