import { useFormik, FormikProvider, Form } from "formik";
import { Box, Button, Typography, useMediaQuery } from "@mui/material";
import * as Yup from "yup";
import { useNavigate, useParams } from "react-router";
import image from "../../../assets/loginImage.png";
import { Lock1, Sms } from "iconsax-react";
import theme from "../../../theme";
import FormikInput from "../../common/inputs/FormikInput";

type SignupFormT = {
  email: string;
  password: string;
};
const Signup = () => {
  const navigate = useNavigate();
  const { token } = useParams();
  // 'token' variable contains the decoded token
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
        .required("Please enter you account's email."),
      password: Yup.string().required("Please enter your password."),
    }),
    onSubmit: () => {},
  });
  const handleSubmit = () => {
    navigate("/signup/verify");
  };

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
                ثبت‌نام در بای‌نت
              </Typography>
              <Typography variant="body1" align="center">
                به بای‌نت خوش آمدید. جهت ثبت‌نام اطلاعات خود را وارد کنید.
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
                <FormikInput
                  type="password"
                  name="password"
                  label="رمز عبور"
                  placeholder="رمز عبور"
                  noPasswordVisibility={false}
                  Icon={<Lock1 />}
                /><FormikInput
                type="password"
                name="password2"
                label="تکرار رمز عبور"
                placeholder="تکرار رمز عبور"
                noPasswordVisibility={false}
                Icon={<Lock1 />}
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

export default Signup;
